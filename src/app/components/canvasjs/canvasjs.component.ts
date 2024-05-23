import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { Subject, interval, merge, switchMap, takeUntil } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-canvasjs',
  templateUrl: './canvasjs.component.html',
  styleUrls: ['./canvasjs.component.css']
})
export class CanvasjsComponent implements OnInit, OnDestroy{

  dataChart: Board[] = []; 
  cantidadChart: any[] = [];
  public chartTop: any;

  constructor(private _boardService: BoardService){}

  private readonly refresh$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    // this.getLineChart();
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
  }

  ngOnDestroy(): void {
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
          // const cantidades: any[] = this.dataChart.map(board => board.cantidad);

          // this.cantidadChart = cantidades;
          // console.log(this.cantidadChart);

          this.linesChart();
          this.pieChart();
        }
      },
      error:(e) => {}
    });
  }
  
  // chartOptions = {
  //   title: {
  //     text: "Boards chart"
  //   },
  //   data: [{
  //     type: "column",
  //     dataPoints: [
  //       { label: this.dataChart[0].nombre, y: this.dataChart[0].cantidad },
  //       { label: "2", y: 2 },
  //       { label: "3", y: 3 },
  //       { label: "4", y: 4 },
  //       { label: "5", y: 5 },
  //     ]
  //   }]
  // }

  linesChart(){
    this.chartTop = new CanvasJS.Chart("chartTop", {
      animationEnabled: true,
      title: {
        text: "Top Boards"
      },
      axisY: {
        title: "Cantidad"
      },
      toolTip: {
        shared: true
      },
      legend:{
        cursor:"pointer",
        itemclick: function(e: any){
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [
        {
          type: "column",	
          name: "Boards (pz)",
          legendText: "Boards",
          showInLegend: true, 
          dataPoints:
          [
            {label: this.dataChart[0].nombre, y: this.dataChart[0].cantidad},
            {label: this.dataChart[1].nombre, y: this.dataChart[1].cantidad},
            {label: this.dataChart[2].nombre, y: this.dataChart[2].cantidad},
            {label: this.dataChart[3].nombre, y: this.dataChart[3].cantidad},
            {label: this.dataChart[4].nombre, y: this.dataChart[4].cantidad},
            {label: this.dataChart[5].nombre, y: this.dataChart[5].cantidad},
            {label: this.dataChart[6].nombre, y: this.dataChart[6].cantidad},
          ]
        }
      ]
    });
    
    this.chartTop.render();
  }

  pieChart(){
    this.chartTop = new CanvasJS.Chart("chartPie", {
      animationEnabled: true,
      title: {
        text: "Top Boards"
      },
      axisY: {
        title: "Cantidad"
      },
      toolTip: {
        shared: true
      },
      legend:{
        cursor:"pointer",
        itemclick: function(e: any){
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [
        {
          type: "pie",	
          name: "Boards (pz)",
          legendText: "Boards",
          showInLegend: true, 
          dataPoints:[
            {label: this.dataChart[0].nombre, y: this.dataChart[0].cantidad},
            {label: this.dataChart[1].nombre, y: this.dataChart[1].cantidad},
            {label: this.dataChart[2].nombre, y: this.dataChart[2].cantidad},
            {label: this.dataChart[3].nombre, y: this.dataChart[3].cantidad},
            {label: this.dataChart[4].nombre, y: this.dataChart[4].cantidad},
            {label: this.dataChart[5].nombre, y: this.dataChart[5].cantidad},
            {label: this.dataChart[6].nombre, y: this.dataChart[6].cantidad},
          ]
        }
      ]
    });
    
    this.chartTop.render();
  }

}
