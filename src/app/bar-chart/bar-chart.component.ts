import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @ViewChild('chart') chartContainer: ElementRef;
  data: any;

  constructor() { }

  ngOnInit() {
    this.data = [
      {
        letter: 'A',
        frequency: 5
      },
      {
        letter: 'B',
        frequency: 1
      },
      {
        letter: 'C',
        frequency: 2
      }
    ];
    let margin = {top: 30, right: 20, bottom: 30, left: 40};
    d3.select('svg').remove();

    // make new svg
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).append('svg')
      .attr('height', element.offsetHeight)
      .attr('width', element.offsetWidth);

    const contentWidth = element.offsetWidth - margin.left - margin.right;
    const contentHeight = element.offsetHeight - margin.top - margin.bottom;
    
    // configure x-axis data & re-scale them
    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(this.data.map(d => d.letter));

    // configure y-axis data & re-scale them
    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(this.data, d => +d["frequency"])]);

    // add an SVG Group
    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // append x-axis to the group
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    // append y-axis to the group
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).tickFormat((d) => d + "m").ticks(5))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    // add all the bars
    g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d["letter"]))
        .attr('y', d => y(d["frequency"]))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d["frequency"]));
  }

}
