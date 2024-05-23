import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Dashboard-exercise';

  //// Highcharts
  // lineCharts = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Boards'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Boards admitted',
  //       data: [1, 2, 3, 4, 5, 6, 7, 3, 5]
  //     } as any
  //   ]
  // });

  // pieChart = new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false,
  //   },
  //   credits: {
  //     enabled: false
  //   },

  //   plotOptions:{
  //     pie: {
  //       innerSize: '99%',
  //       borderWidth: 10,
  //       borderColor: '',
  //       slicedOffset: 10,
  //       dataLabels: {
  //         connectorWidth: 0,
  //       },
  //     },
  //   },

  //   title: {
  //     verticalAlign: 'middle',
  //     floating: true,
  //     text: 'Diseases'
  //   },

  //   legend: {
  //     enabled: false,
  //   },

  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         {name: 'COVID 19', y: 1, color: '#eeeeee'},
  //         {name: 'HIV/AIDS', y: 2, color: '#393e46'},
  //         {name: 'EBOLA', y: 3, color: '#00adb5'},
  //         {name: 'DISPORA', y: 4, color: '#eeeeee'},
  //         {name: 'DIABETES', y: 5, color: '#506ef9'},
  //       ]
  //     } as any
  //   ]
  // })


  // // CanvasJS
  // chartOptions = {
  //   title: {
  //     text: "Boards chart"
  //   },
  //   data: [{
  //     type: "column",
  //     dataPoints: [
  //       { label: "Apple", y: 10 },
  //       { label: "Orange", y: 15 },
  //       { label: "Banana", y: 25 },
  //       { label: "Mango", y: 30 },
  //       { label: "Grape", y: 28 },
  //     ]
  //   }]
  // }
}
