import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-transac',
  templateUrl: './transac.component.html',
  styleUrls: ['./transac.component.css']
})
export class TransacComponent implements OnInit {

  companies;
  typ = 'social';
  constructor(private http: HttpClient, private spinner: SpinnerService,private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.spinner.requestStarted()

    this.route.queryParams.filter(params => params.type).subscribe(params => {
      console.log(params);
      console.log(params.type);
      this.typ = params.type
    }
    );

    if (this.typ == 't'){
      
      var retrievedObject1 = localStorage.getItem('trans_t');
      if (retrievedObject1 !=null){
        this.companies  = JSON.parse(retrievedObject1);
        
        this.spinner.requestEnded();
        console.log('retrievedObject1');
        // this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
        //     data => {
        //       console.log('cashhhhh')
        //       this.cash = data['cash'];
        //       this.cash = Math.floor(this.cash)
        //       this.net_worth = this.net + this.cash;
        //       this.spinnerService.requestEnded();              
        //     },
        //     error => {
        //       console.log(error);
              
        //     }
        // )
  
        this.spinner.requestEnded();
      }
      else{
        var header = new HttpHeaders({
          'Authorization': "Token " + localStorage.getItem('token')
        });
        this.http.get<any>('https://api5.ecell.in/vsm/trac_token/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.companies = data.reverse()
            localStorage.setItem('trans_t', JSON.stringify(this.companies));
            
            this.spinner.requestEnded();
  
      //       this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
      //     data => {
      //       console.log('cashhhhh')
      //       this.cash = data['cash'];
      //       this.cash = Math.floor(this.cash)
      //       this.net_worth = this.net + this.cash;
      //       // this.spinnerService.requestEnded();              
      //     },
      //     error => {
      //       console.log(error);
            
      //     }
      // )
          },
          error => {
            console.error('error');
            
          }
        )
  
        this.spinner.requestEnded();
      }


    }

    else{

     
  
      var retrievedObject = localStorage.getItem('trans');
      if (retrievedObject !=null){
        console.log('retrievedObject');
        this.companies  = JSON.parse(retrievedObject);
        this.spinner.requestEnded();
      }
      else{
        var header = new HttpHeaders({
          'Authorization': "Bearer " + localStorage.getItem('token')
        });
        this.http.get<any>('https://api5.ecell.in/vsm/trans/', {headers: header}).subscribe(
          data => {
            
            console.log('from server')
            this.companies = data.reverse()
            this.spinner.requestEnded()
            localStorage.setItem('trans', JSON.stringify(this.companies));
            // var retrievedObject = localStorage.getItem('trans');
            // console.log(JSON.parse(retrievedObject))
          },
          error => {
            this.spinner.requestEnded();
            console.error('error');
            
          }
        )
      }
  

    }



      
  }

}
