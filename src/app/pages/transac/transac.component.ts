import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-transac',
  templateUrl: './transac.component.html',
  styleUrls: ['./transac.component.css']
})
export class TransacComponent implements OnInit {

  companies;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.requestStarted()
    // https://django.ecell.in/vsm/trans/
    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    this.http.get<any>('https://django.ecell.in/vsm/trans/', {headers: header}).subscribe(
      data => {
        // console.log(data)
        this.spinner.requestEnded();
        this.companies = data.reverse()

      },
      error => {
        this.spinner.requestEnded();
        console.error('error');
        
      }
    )
  }

}
