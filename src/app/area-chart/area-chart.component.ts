import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { parse } from 'querystring';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  @ViewChild('chart') chartContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    d3.select('svg').remove();

    const margin = { top: 10, bottom: 100, right: 10, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const parseTime = d3.utcParse("%Y-%m-%d");
    const x = d3.scaleUtc()
      .rangeRound([0, width]);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    const area = d3.area()
      .x((d: any) => x(d["date"]))
      .y0(y(0))
      .y1((d: any) => y(d.close));
    
    const line = d3.line()
      .x((d: any) => x(d["date"]))
      .y((d: any) => y(d["close"]) - 10)
      .curve(d3.curveBasis);

    d3.csv('assets/data/area.csv').then((data: any) => {
      data.forEach((d: any) => {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });

      x.domain(d3.extent(data, (d) => +d["date"]));
      y.domain([0, d3.max(data, (d) => +d["close"])]);

      g.append('path')
        .datum(data)
        .attr('fill', 'steelblue')
        .attr('d', area);

      g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
        .attr('d', line(data));
      
      g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    });
  }

}
