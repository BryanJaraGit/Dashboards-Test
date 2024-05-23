import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';
import { CanvasjsComponent } from './components/canvasjs/canvasjs.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HighchartsComponent } from './components/highcharts/highcharts.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CanvasjsComponent,
    HighchartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    CanvasJSAngularChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
