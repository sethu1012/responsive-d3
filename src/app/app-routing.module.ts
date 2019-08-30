import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartAssignmentComponent } from './bar-chart-assignment/bar-chart-assignment.component';
import { ScatterChartAssignmentComponent } from './scatter-chart-assignment/scatter-chart-assignment.component';
import { AreaChartComponent } from './area-chart/area-chart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bar-chart'
  },
  {
    path: 'area-chart',
    component: AreaChartComponent
  },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'scatter-chart',
    component: ScatterChartComponent
  },
  {
    path: 'line-chart',
    component: LineChartComponent
  },
  {
    path: 'bar-chart-assignment',
    component: BarChartAssignmentComponent
  },
  {
    path: 'scatter-chart-assignment',
    component: ScatterChartAssignmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
