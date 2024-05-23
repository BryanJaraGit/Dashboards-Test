import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasjsComponent } from './components/canvasjs/canvasjs.component';
import { HighchartsComponent } from './components/highcharts/highcharts.component';

const routes: Routes = [
  {path:'canvasjs', component:CanvasjsComponent},
  {path:'highcharts', component:HighchartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
