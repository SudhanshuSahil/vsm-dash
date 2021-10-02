import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "../../variables/charts";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  holdings;
  transactions;
  cash : number;
  count : number = 0;
  net : number = 0;
  net_worth: number;
  typ = 'social';
  constructor(private http: HttpClient, private spinnerService: SpinnerService,private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.spinnerService.requestStarted();



    this.route.queryParams.filter(params => params.type).subscribe(params => {
      console.log(params);
      console.log(params.type);
      this.typ = params.type
    }
    );

    if(this.typ == 't'){
      var retrievedObject = localStorage.getItem('holding_t');
      if (retrievedObject !=null){
        this.holdings  = JSON.parse(retrievedObject);
        this.count = this.holdings.length
        this.holdings.forEach(element => {
          this.net += element['quantity']*element['company_cmp']      
          this.net = Math.floor(this.net)
        });
        console.log('retrievedObject');
  
  
  
        var retrievedObject2 = localStorage.getItem('user_t');
        if (retrievedObject2 !=null){
          console.log('retrievedObject2')
          var temp  = JSON.parse(retrievedObject2);
          this.cash = temp['cash'];
          this.cash = Math.floor(this.cash)
          this.net_worth = this.net + this.cash;
  
        }
        else{

          var header = new HttpHeaders({
            'Authorization': "Token " + localStorage.getItem('token')
          });

          this.http.get<any>("https://api5.ecell.in/vsm/usr/", {headers: header}).subscribe(
          data => {
            console.log('cashhhhh')
            this.cash = data['cash'];
            this.cash = Math.floor(this.cash)
            this.net_worth = this.net + this.cash;
            localStorage.setItem('user_t', JSON.stringify(data));
  
            // this.spinnerService.requestEnded();              
          },
          error => {
            console.log(error);
          }
          )
        }
  
      }

      else{
        var header = new HttpHeaders({
          'Authorization': "Token " + localStorage.getItem('token')
        });
        this.http.get<any>('https://api5.ecell.in/vsm/my_holdings_token/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.holdings = data
  
            this.count = this.holdings.length
            localStorage.setItem('holding_t', JSON.stringify(this.holdings));
  
            this.holdings.forEach(element => {
              this.net += element['quantity']*element['company_cmp']      
              this.net = Math.floor(this.net)
            });
  

            var header = new HttpHeaders({
              'Authorization': "Token " + localStorage.getItem('token')
            });

            this.http.get<any>("https://api5.ecell.in/vsm/usr/", {headers: header}).subscribe(
                data => {
                  console.log('cashhhhh')
                  this.cash = data['cash'];
                  this.cash = Math.floor(this.cash)
                  this.net_worth = this.net + this.cash;
                  this.spinnerService.requestEnded();              
                },
                error => {
                  console.log(error);
                  
                }
            )
  
          },
          error => {
            console.error('error');
            
          }
        )
  
      }
        
  
      var retrievedObject1 = localStorage.getItem('trans_t');
      if (retrievedObject1 !=null){
        this.transactions  = JSON.parse(retrievedObject1);
        this.spinnerService.requestEnded();
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
  
        this.spinnerService.requestEnded();
      }
      else{
        var header = new HttpHeaders({
          'Authorization': "Token " + localStorage.getItem('token')
        });

        this.http.get<any>('https://api5.ecell.in/vsm/trac_token/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.transactions = data.reverse()
            localStorage.setItem('trans_t', JSON.stringify(this.transactions));
            this.spinnerService.requestEnded();
  
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
  
        this.spinnerService.requestEnded();
      }



    }

    else{
     
      // this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
      //   data => {
      //     console.log('cashhhhh')
      //     this.cash = data['cash'];
      //     this.cash = Math.floor(this.cash)
      //     this.net_worth = this.net + this.cash;
      //     // this.spinnerService.requestEnded();              
      //   },
      //   error => {
      //     console.log(error);
          
      //   }
      // )
  
      var retrievedObject = localStorage.getItem('holding');
      if (retrievedObject !=null){
        this.holdings  = JSON.parse(retrievedObject);
        this.count = this.holdings.length
        this.holdings.forEach(element => {
          this.net += element['quantity']*element['company_cmp']      
          this.net = Math.floor(this.net)
        });
        console.log('retrievedObject');
  
  
  
        var retrievedObject2 = localStorage.getItem('user');
        if (retrievedObject2 !=null){
          console.log('retrievedObject2')
          var temp  = JSON.parse(retrievedObject2);
          this.cash = temp['cash'];
          this.cash = Math.floor(this.cash)
          this.net_worth = this.net + this.cash;
  
        }
        else{
          var header = new HttpHeaders({
            'Authorization': "Bearer " + localStorage.getItem('token')
          });
      
          this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
          data => {
            console.log('cashhhhh')
            this.cash = data['cash'];
            this.cash = Math.floor(this.cash)
            this.net_worth = this.net + this.cash;
            localStorage.setItem('user', JSON.stringify(data));
  
            // this.spinnerService.requestEnded();              
          },
          error => {
            console.log(error);
          }
          )
        }
  
      }
  
      else{
        var header = new HttpHeaders({
          'Authorization': "Bearer " + localStorage.getItem('token')
        });
    
        this.http.get<any>('https://api5.ecell.in/vsm/my-holdings/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.holdings = data
  
            this.count = this.holdings.length
            localStorage.setItem('holding', JSON.stringify(this.holdings));
  
            this.holdings.forEach(element => {
              this.net += element['quantity']*element['company_cmp']      
              this.net = Math.floor(this.net)
            });
  
            this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
                data => {
                  console.log('cashhhhh')
                  this.cash = data['cash'];
                  this.cash = Math.floor(this.cash)
                  this.net_worth = this.net + this.cash;
                  this.spinnerService.requestEnded();              
                },
                error => {
                  console.log(error);
                  
                }
            )
  
          },
          error => {
            console.error('error');
            
          }
        )
  
      }
        
  
      var retrievedObject1 = localStorage.getItem('trans');
      if (retrievedObject1 !=null){
        this.transactions  = JSON.parse(retrievedObject1);
        this.spinnerService.requestEnded();
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
  
        this.spinnerService.requestEnded();
      }
      else{
        var header = new HttpHeaders({
          'Authorization': "Bearer " + localStorage.getItem('token')
        });
  
        
        this.http.get<any>('https://api5.ecell.in/vsm/trans/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.transactions = data.reverse()
            localStorage.setItem('trans', JSON.stringify(this.transactions));
            this.spinnerService.requestEnded();
  
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
  
        this.spinnerService.requestEnded();
      }
  

    }
    
    
  }

}
