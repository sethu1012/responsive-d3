import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { from } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @ViewChild('chart') chartContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    d3.select('svg').remove();

    const margin = { top: 10, right: 10, left: 100, bottom: 150 };

    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = d3.select(this.chartContainer.nativeElement)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', 250)
      .attr('y', height + 140)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text("The world's tallest buildings");

    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', - (height / 2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text("Height (m)");

    from(d3.json('assets/data/buildings.json')).subscribe((data: any[]) => {
      console.log(data);

      data.forEach(d => {
        d.height = +d.height;
      });

      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.3);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height)])
        .range([height, 0]);

      const xAxis = d3.axisBottom(x);

      g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis)
          .selectAll('text')
          .attr('y', '10')
          .attr('x', '-5')
          .attr('text-anchor', 'end')
          .attr('transform', 'rotate(-40)');

      const yAxis = d3.axisLeft(y).tickFormat(d => d + "m");

      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

      const legend_height = ["height"];

      const legend = g.append('g')
        .attr('transform', 'translate(' + (width - 10) + ', ' + (height - 125) + ')');

      

      const rects = g.selectAll('rect')
        .data(data);
      
      rects
        .enter()
        .append('rect')
        .attr('y', d => y(d.height))
        .attr('x', (d) => {
          return x(d.name)
        })
        .attr('width', x.bandwidth)
        .attr('height', (d) => {
          return height - y(d.height);
        })
        .attr('fill', (d) => "grey");
    });
  }

}
