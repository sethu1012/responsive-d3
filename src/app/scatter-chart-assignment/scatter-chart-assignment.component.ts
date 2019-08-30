import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { from } from 'rxjs';

@Component({
  selector: 'app-scatter-chart-assignment',
  templateUrl: './scatter-chart-assignment.component.html',
  styleUrls: ['./scatter-chart-assignment.component.css']
})
export class ScatterChartAssignmentComponent implements OnInit {

  @ViewChild('chart') chartContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    d3.select('svg').remove();

    const margin = { 
      left: 100, 
      right: 10,
      top: 10,
      bottom: 150
    };

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
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text("GDP Per Capita ($)");

    g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (height / 2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text("Life Expectancy (Years)");
    
    from(d3.json('assets/data/gapminder.json')).subscribe((data: any[]) => {
      console.log(data);

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(d => d["countries"][0].life_exp))
        .padding(0.3);

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => +d["countries"][0].income)]);

      const xAxis = d3        
        .axisBottom(x);
      g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

      const yAxis = d3
        .axisLeft(y).tickFormat(d => "$" + d);
      g.append('g')
        .call(yAxis);

      const rects = g.selectAll('rect').data(data[0]);

      rects
        .enter()
        .append('circle')
        .attr('cx', d => x(d["countries"][0].life_exp) + x.bandwidth() / 2)
        .attr('cy', d => y(d["countries"][0].income))
        .attr('r', 5)
        .attr('height', d => height - y(d["countries"][0].income))
        .attr('width', x.bandwidth)
        .attr('fill', 'grey');
    });
  }

}
