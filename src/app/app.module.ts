import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartAssignmentComponent } from './bar-chart-assignment/bar-chart-assignment.component';
import { ScatterChartAssignmentComponent } from './scatter-chart-assignment/scatter-chart-assignment.component';
import { AreaChartComponent } from './area-chart/area-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    LineChartComponent,
    BarChartAssignmentComponent,
    ScatterChartAssignmentComponent,
    AreaChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
