import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject, interval, merge, switchMap, takeUntil } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';
// import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit, OnDestroy{

  // chartOptions: any;
  // highcharts: typeof Highcharts = Highcharts;

  dataChart!: Board[];
  cantidadChart: any[] = [];

  public lineCharts: any;
  public pieCharts: any;
  public stackLineCharts: any;
  public pointLine: any;
  public point2Lines: any;
  public donutChart: any;
  // public gaugeChart: any;

  constructor(private _boardService: BoardService){}

  private readonly refresh$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.getBoards();
    
    const autoRefresh$ = interval(1000*60*3);
    const trigger$ = merge(autoRefresh$, this.refresh$);
    trigger$.pipe(
      switchMap(() => this._boardService._getBoards()),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.dataChart = res;
      this.getBoards();
    });

    // this.getLineChart();
    
    // this.createCharts();
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBoards(){
    this._boardService._getBoards().subscribe({
      next: (data) => {
        if(data == null){
          console.log("No se encontraron datos");
        }else{
          console.log(data);
          
          this.dataChart = data;
          const cantidades: any[] = this.dataChart.map(board => board.cantidad);

          this.cantidadChart = cantidades;
          console.log(this.cantidadChart);
          this.createLineCharts();
          this.createPieChart();
          this.createStackLineChart();
          this.createPointLine();
          this.createPoint2Lines();
          this.createDonutChart();
          // this.createGaugeChart();
        }
      },
      error:(e) => {}
    });
  }


  createLineCharts(){
    this.lineCharts = new Chart({  
      chart: {  
          type: 'column'  
      },  
      title: {  
          text: 'Boards Line Chart'  
      },  
      xAxis: {  
          type: 'category',  
          labels: {  
              rotation: -45,  
              style: {  
                  fontSize: '13px',  
                  fontFamily: 'Verdana, sans-serif'  
              }  
          }  
      },  
      yAxis: {  
          min: 0,  
          title: {  
              text: 'Cantidad de tarjetas'  
          }  
      },  
      legend: {  
          enabled: false  
      },  
      tooltip: {  
          pointFormat: '{point.y:.2f} pz'  
      },  

      series: [{  
          type: 'column',  
          data: 
          [
            [this.dataChart[0].nombre, this.dataChart[0].cantidad],
            [this.dataChart[1].nombre, this.dataChart[1].cantidad],
            [this.dataChart[2].nombre, this.dataChart[2].cantidad],
            [this.dataChart[3].nombre, this.dataChart[3].cantidad],
            [this.dataChart[4].nombre, this.dataChart[4].cantidad],
            [this.dataChart[5].nombre, this.dataChart[5].cantidad],
            [this.dataChart[6].nombre, this.dataChart[6].cantidad],
          ]
          // this.cantidadChart
          // [  
          //     { name: this.dataChart[0].nombre, y: this.dataChart[0].cantidad, color: 'rgba(253, 185, 19, 0.85)' },  
          //     { name: this.dataChart[1].nombre, y: this.dataChart[1].cantidad, color: 'rgba(0, 76, 147, 0.85)' },  
          //     { name: this.dataChart[2].nombre, y: this.dataChart[2].cantidad, color: 'rgba(170, 69, 69, 0.85)' },  
          //     { name: this.dataChart[3].nombre, y: this.dataChart[3].cantidad, color: 'rgba(112, 69, 143, 0.85)' },  
          //     { name: this.dataChart[4].nombre, y: this.dataChart[4].cantidad, color: 'rgba(0, 93, 160, 0.85)' },  
          //     { name: this.dataChart[5].nombre, y: this.dataChart[5].cantidad, color: 'rgba(45, 77, 157, 0.85)' },  
          //     { name: this.dataChart[6].nombre, y: this.dataChart[6].cantidad, color: 'rgba(0, 0, 0, 0.85)' },  
          //     { name: this.dataChart[7].nombre, y: this.dataChart[7].cantidad, color: 'rgba(251, 100, 62, 0.85)' }  
          // ],  
      }]

  });  


  }

  createPieChart(){

    this.pieCharts = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Boards Pie Chart',
        align: 'left'
      },
      subtitle: {
        text: 'Custom animation of pie series',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage}%',
                distance: 20,
            }
        }
      },
      series: [{  
        type: 'pie',  
        data: 
        [
          [this.dataChart[0].nombre, this.dataChart[0].cantidad],
          [this.dataChart[1].nombre, this.dataChart[1].cantidad],
          [this.dataChart[2].nombre, this.dataChart[2].cantidad],
          [this.dataChart[3].nombre, this.dataChart[3].cantidad],
          [this.dataChart[4].nombre, this.dataChart[4].cantidad],
          [this.dataChart[5].nombre, this.dataChart[5].cantidad],
          [this.dataChart[6].nombre, this.dataChart[6].cantidad],
        ]
      }]
    });
  }

  createStackLineChart(){
    this.stackLineCharts = new Chart({
      chart: {
        type: 'column'
    },

    title: {
        text: 'Boards Stack Line Chart',
        align: 'left'
    },

    xAxis: {
        categories: ['Transducer','Ultrasonido','Ena','Medtronic','Axis','Hologic','Ford',]
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Cantidad de tarjetas'
        }
    },

    tooltip: {
        format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
            'Total: {point.stackTotal}'
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    series: [{  
      type: 'column',  
      name: 'Edificio A',
      data: 
      [this.dataChart[0].cantidad, this.dataChart[1].cantidad, this.dataChart[2].cantidad, this.dataChart[3].cantidad, this.dataChart[4].cantidad]
    },
    {
      type: 'column',  
      name: 'Edificio B',
      data: 
      [this.dataChart[2].cantidad, this.dataChart[5].cantidad, this.dataChart[3].cantidad, this.dataChart[4].cantidad, this.dataChart[6].cantidad]
    },
    {
      type: 'column',  
      name: 'Edificio Q',
      data: 
      [this.dataChart[4].cantidad, this.dataChart[2].cantidad, this.dataChart[6].cantidad, this.dataChart[3].cantidad, this.dataChart[1].cantidad]
    }
    ]
    });
  }

  createPointLine(){
    this.pointLine = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Boards Point line Chart',
        align: 'left'
      },
      subtitle: {
        text: 'Custom animation of pie series',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage}%',
                distance: 20
            }
        }
      },
      series: [
        {
          type: 'column',
          data:
          [
            [this.dataChart[0].nombre, this.dataChart[0].cantidad],
            [this.dataChart[1].nombre, this.dataChart[1].cantidad],
            [this.dataChart[2].nombre, this.dataChart[2].cantidad],
            [this.dataChart[3].nombre, this.dataChart[3].cantidad],
            [this.dataChart[4].nombre, this.dataChart[4].cantidad],
            [this.dataChart[5].nombre, this.dataChart[5].cantidad],
            [this.dataChart[6].nombre, this.dataChart[6].cantidad],
          ]
        },
        {  
        type: 'line',  
        data: 
        [
          [this.dataChart[0].nombre, this.dataChart[0].cantidad],
          [this.dataChart[1].nombre, this.dataChart[1].cantidad],
          [this.dataChart[2].nombre, this.dataChart[2].cantidad],
          [this.dataChart[3].nombre, this.dataChart[3].cantidad],
          [this.dataChart[4].nombre, this.dataChart[4].cantidad],
          [this.dataChart[5].nombre, this.dataChart[5].cantidad],
          [this.dataChart[6].nombre, this.dataChart[6].cantidad],
        ] 
        }
    ]
    });
  }

  createPoint2Lines(){
    this.point2Lines = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Boards Point 2 lines Chart',
        align: 'left'
      },
      subtitle: {
        text: 'Custom animation of pie series',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage}%',
                distance: 20
            }
        }
      },
      series: [
        {  
          type: 'area',  
          data: 
          [
            [this.dataChart[0].nombre, this.dataChart[0].cantidad],
            [this.dataChart[1].nombre, this.dataChart[1].cantidad],
            [this.dataChart[2].nombre, this.dataChart[2].cantidad],
            [this.dataChart[3].nombre, this.dataChart[3].cantidad],
            [this.dataChart[4].nombre, this.dataChart[4].cantidad],
            [this.dataChart[5].nombre, this.dataChart[5].cantidad],
            [this.dataChart[6].nombre, this.dataChart[6].cantidad],
          ] 
        },
        {  
        type: 'spline',  
        data: 
        [
          [this.dataChart[0].nombre, this.dataChart[0].cantidad],
          [this.dataChart[1].nombre, this.dataChart[1].cantidad],
          [this.dataChart[2].nombre, this.dataChart[2].cantidad],
          [this.dataChart[3].nombre, this.dataChart[3].cantidad],
          [this.dataChart[4].nombre, this.dataChart[4].cantidad],
          [this.dataChart[5].nombre, this.dataChart[5].cantidad],
          [this.dataChart[6].nombre, this.dataChart[6].cantidad],
        ] 
        },
        {
          type: 'spline', 
          data:
          [
            [this.dataChart[0].nombre, this.dataChart[0].cantidad],
            [this.dataChart[3].nombre, this.dataChart[3].cantidad],
            [this.dataChart[5].nombre, this.dataChart[5].cantidad],
            [this.dataChart[4].nombre, this.dataChart[4].cantidad],
            [this.dataChart[6].nombre, this.dataChart[6].cantidad],
            [this.dataChart[2].nombre, this.dataChart[2].cantidad],
            [this.dataChart[1].nombre, this.dataChart[1].cantidad],
          ]
        }
      ]
    });
  }

  createDonutChart(){
    this.donutChart = new Chart({
      chart: {
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: '#02779e'
      },
      title: {
        text: 'Boards Donut Chart',
        style: {
          color: 'white'
        },
        align: 'center',
        verticalAlign: 'middle',
        y: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage}%',
                distance: 20,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
            },
            startAngle: -90,
            endAngle: -180,
            center: ['50%', '50%'],
            size: '90%',
            showInLegend: true
        }
      },
      series: [{  
        type: 'pie',  
        innerSize: '80%',
        data: 
        [
          [this.dataChart[0].nombre, this.dataChart[0].cantidad],
          [this.dataChart[1].nombre, this.dataChart[1].cantidad],
          [this.dataChart[2].nombre, this.dataChart[2].cantidad],
          [this.dataChart[3].nombre, this.dataChart[3].cantidad],
          [this.dataChart[4].nombre, this.dataChart[4].cantidad],
          [this.dataChart[5].nombre, this.dataChart[5].cantidad],
          [this.dataChart[6].nombre, this.dataChart[6].cantidad],
        ]
      }]
    });
  }

  // createGaugeChart(){
  //   this.gaugeChart = new Chart({

  //     chart:{
  //       type: 'gauge'
  //     },
  //     title: {
  //       text: 'Boards Gauge Chart',
  //     },
  //     pane: {
  //       startAngle: -90,
  //       endAngle: 89.9,
  //       center: ['50%', '75%'],
  //       size: '110%',
  //     },
  //     tooltip: {
  //       enabled: false,
  //     },
  //     yAxis: {
  //       stops: [
  //         [0.1, "#55BF3B"], // green
  //         [0.5, "#DDDF0D"], // yellow
  //         [0.9, "#DF5353"] // red
  //       ],
  //       lineWidth: 0,
  //       tickWidth: 0,
  //       // minorTickInterval: null,
  //       tickAmount: 2,
  //       title: {
  //         y: -70
  //       },
  //       labels: {
  //         y: 16
  //       }
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           y: 5,
  //           borderWidth: 0,
  //           useHTML: true
  //         }
  //       }
  //     },
  //     series: [{  
  //       type: 'gauge',
  //       data: 
  //       [
  //         80
  //       ]
        
  //     }]
  //   });
  // }


  // getLineChart(){
  //   this.chartOptions = {
  //     chart: {
  //       type: 'spline'
  //     },
  //     title:{
  //       text: 'Production boards'
  //     },
  //     subtitle:{
  //       source: 'Flex Aguascalientes'
  //     },
  //     xAxies: {
  //       categories:[
  //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  //       ]
  //     },
  //     yAxis:{
  //       title:{
  //         text:'Boards'
  //       }
  //     },
  //     tooltip:{
  //       valueSuffix:'Bx'
  //     },
  //     credits:{
  //       enabled:false
  //     },
  //     navigator:{
  //       enabled:false
  //     },
  //     rangeSelector:{
  //       enabled:false
  //     },
  //     scrollbar:{
  //       enabled:false
  //     },
  //     series:this.chartData
  //   }
  // }

  // chartData = [
  //   {
  //     name: 'Tokyo',
  //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  //   },
  //   {
  //     name: 'New York',
  //     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  //   },
  //   {
  //     name: 'Berlin',
  //     data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  //   },
  //   {
  //     name: 'London',
  //     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  //   }
  // ]

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
  //       data: this.cantidadChart
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
  //         [this.dataChart[0].nombre, this.dataChart[0].cantidad, '#eeeeee'],
  //           [this.dataChart[1].nombre, this.dataChart[1].cantidad, '#393e46'],
  //           [this.dataChart[2].nombre, this.dataChart[2].cantidad, '#00adb5'],
  //         // {name: 'COVID 19', y: 1, color: '#eeeeee'},
  //         // {name: 'HIV/AIDS', y: 2, color: '#393e46'},
  //         // {name: 'EBOLA', y: 3, color: '#00adb5'},
  //         // {name: 'DISPORA', y: 4, color: '#eeeeee'},
  //         // {name: 'DIABETES', y: 5, color: '#506ef9'},
  //       ]
  //     } as any
  //   ]
  // })
  
}
