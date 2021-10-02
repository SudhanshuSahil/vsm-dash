import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  countDownDate;
  time;
  clock: Observable<any>;
  days;
  hr;
  min;
  sec;

  // stock: StockChart;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, ], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,) { 

  }

  temp =[];
  dataset =[];
  company;
  details;
  Close;
  Open;
  lower;
  upper;

  ngOnInit() {

    this.route.queryParams.filter(params => params.company).subscribe(params => {
      console.log(params.company);
      this.company = params.company
    }
    );


    this.countDownDate = new Date("August 21, 2020 21:00:00").getTime();
    var now = new Date().getTime();

    var distance = this.countDownDate - now;
    this.time = distance/100;

    const source = interval(1000);
    source.subscribe(val => this.callFunc())
    
    var body = new FormData()
    body.append('code', this.company)
    this.http.post<any>('https://api6.ecell.in/vsm/thread_cmp/', body).subscribe(
      data => {  
        console.log(data.data[0].code)
        data.data.forEach(element => {
          element.time = new Date(element.timestamp).toLocaleString()
          this.temp.push(element.time)
          this.dataset.push(element.cmp)
        });
        // console.log(this.dataset)
        this.lineChartLabels  = this.temp
        console.log(this.lineChartData)
        // this.lineChartData = {
        //   data:this.dataset,
        //   label: 'some'
        // }
        this.lineChartData = [
          {
            data: this.dataset,
            label: data.data[0].code
          }
        ]
      }

    )

    this.http.get<any>('https://2k21.s3.ap-south-1.amazonaws.com/vsm/file.json').subscribe(
      data=>{
        console.log(data)
        var temp = data.filter(element=>{return element.fields.code===this.company})
        console.log(temp)
        this.details = temp
        console.log(this.details)
      }
    )

  }

  callFunc(){
    var now = new Date().getTime();
    var distance = this.countDownDate - now;
    distance /= 1000;
    this.time = distance;
    var days: number = Math.floor (distance / (24 * 3600))
    distance -= days * 24 * 3600
    var hr: number = Math.floor(distance / 3600);
    var min: number = Math.floor( (distance - hr*3600)/60 );
    var seconds: number = Math.floor( (distance - hr*3600 - min*60));
    // console.log(days, hr, min, seconds)
    this.days = days;
    this.hr = hr;
    this.min = min;
    this.sec = seconds;

    // console.log(distance);
    
  }

}
