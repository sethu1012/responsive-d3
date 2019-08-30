import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { from } from 'rxjs';

@Component({
  selector: 'app-bar-chart-assignment',
  templateUrl: './bar-chart-assignment.component.html',
  styleUrls: ['./bar-chart-assignment.component.css']
})
export class BarChartAssignmentComponent implements OnInit {

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
      .text("Month");

    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', - (height / 2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text("Revenue");
    
    from(d3.json('assets/data/revenues.json')).subscribe((data: any[]) => {
      console.log(data);

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(d => d.month))
        .padding(0.3);

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => +d.revenue)]);

      const xAxis = d3        
        .axisBottom(x);
      g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

      const yAxis = d3
        .axisLeft(y).tickFormat(d => "$" + d);
      g.append('g')
        .call(yAxis);

      const rects = g.selectAll('rect').data(data);

      rects
        .enter()
        .append('rect')
        .attr('x', d => x(d.month))
        .attr('y', d => y(d.revenue))
        .attr('height', d => height - y(d.revenue))
        .attr('width', x.bandwidth)
        .attr('fill', 'grey');
    });
  }

}
