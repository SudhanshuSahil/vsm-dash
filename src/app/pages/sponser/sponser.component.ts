import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';


@Component({
  selector: 'app-sponser',
  templateUrl: './sponser.component.html',
  styleUrls: ['./sponser.component.css']
})
export class SponserComponent implements OnInit {

  countDownDate;
  time;
  clock: Observable<any>;
  days;
  hr;
  min;
  sec;

  constructor(private http: HttpClient,) { 

  }

  temp =[];

  ngOnInit() {

    var retrievedObject = localStorage.getItem('resource');
    if (retrievedObject !=null){
      console.log('retrievedObject');
      this.temp  = JSON.parse(retrievedObject);
      this.http.get<any>('https://api3.ecell.in/vsm/resource/').subscribe(
        data => {  
          // console.log(data)
          localStorage.setItem('resource', JSON.stringify(data));
          console.log('from server');
        },
        err=>{
          console.log(err)
        }

      )
    }
    else{
      this.http.get<any>('https://api3.ecell.in/vsm/resource/').subscribe(
      data => {  
        console.log(data)
        this.temp= data
        localStorage.setItem('resource', JSON.stringify(data));
        console.log('from server');
      },
      err=>{
        console.log(err)
      }

    )
    }
    

  }

}
