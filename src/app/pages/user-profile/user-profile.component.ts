import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username;
  fname;
  lname;
  email;
  is_iitb: Boolean;
  cash;
  city;
  zip;
  image_src;
  roll_number;
  program;
  hostel;
  count;

  constructor(private http: HttpClient, private spinner: SpinnerService,private route: ActivatedRoute,) {}

  update_profile(){

    if(this.typ == 't'){

      var access_token = localStorage.getItem('token');
      var header = new HttpHeaders({
        'Authorization': "Token " + access_token 
      });

      var body = new FormData();

      body.append('city', this.city);
      body.append('zip_code', this.zip);

      if(this.is_iitb){
        body.append('is_iitb', JSON.stringify(this.is_iitb));
        body.append('college', 'IIT Bombay');
        body.append('roll_number', this.roll_number);
        body.append('program', this.program);
        body.append('hostel', this.hostel);
        body.append('roll_number', this.roll_number);
      }

      this.http.patch<any>("https://api5.ecell.in/vsm/current_user_token/", body,  {headers: header}).subscribe(
        data => {
          console.log(data);
          alert("your profile has been successfully updated");
        },
        error => {
          console.log(error);
          
        }
      )

    }
    else{

      var access_token = localStorage.getItem('token');
      var header = new HttpHeaders({
        'Authorization': "Bearer " + access_token 
      });

      var body = new FormData();

      body.append('city', this.city);
      body.append('zip_code', this.zip);

      if(this.is_iitb){
        body.append('is_iitb', JSON.stringify(this.is_iitb));
        body.append('college', 'IIT Bombay');
        body.append('roll_number', this.roll_number);
        body.append('program', this.program);
        body.append('hostel', this.hostel);
        body.append('roll_number', this.roll_number);
      }

      this.http.patch<any>("https://api5.ecell.in/vsm/me/", body,  {headers: header}).subscribe(
        data => {
          console.log(data);
          alert("your profile has been successfully updated");
        },
        error => {
          console.log(error);
          
        }
      )
    }


  }
  typ = 'social'

  ngOnInit() {
    this.spinner.requestStarted();
    this.route.queryParams.filter(params => params.type).subscribe(params => {
      console.log(params);
      console.log(params.type);
      this.typ = params.type
    }
    );
    this.image_src = 'https://2k21.s3.ap-south-1.amazonaws.com/logo-small.png';
    var access_token = localStorage.getItem('token');
    this.is_iitb = false;

    if(this.typ == 't'){

      this.image_src ='https://2k21.s3.ap-south-1.amazonaws.com/logo-small.png';

      var header = new HttpHeaders({
        'Authorization': "Token " + localStorage.getItem('token')
      });

      var retrievedObject2 = localStorage.getItem('user_t');
        if (retrievedObject2 !=null){
          console.log('retrievedObject2')
          var temp  = JSON.parse(retrievedObject2);
          var data = temp
          this.username = data['username'];
          this.email = data['email'];
          this.fname = data['fname'];
          this.lname = data['lname'];
          this.cash = data['cash'];
          this.city = data['city'];
          this.zip = data['zip_code'];
          this.roll_number = data['roll_number'];
          this.is_iitb = JSON.parse(data['is_iitb']);
          this.hostel = data['hostel'];
          this.program = data['program'];
          this.roll_number = data['roll_number'];
          if(this.roll_number == 'not_iitb'){
            this.roll_number = ''
          } 
          this.cash = temp['cash'];
          this.cash = Math.floor(this.cash)
          this.spinner.requestEnded();  
  
        }
        else{
          this.http.get<any>("https://api5.ecell.in/vsm/usr/", {headers: header}).subscribe(
          data => {
            console.log('cashhhhh')
            this.cash = data['cash'];
            this.cash = Math.floor(this.cash)
            this.username = data['username'];
            this.email = data['email'];
            this.fname = data['fname'];
            this.lname = data['lname'];
            this.cash = data['cash'];
            this.city = data['city'];
            this.zip = data['zip_code'];
            this.roll_number = data['roll_number'];
            this.is_iitb = JSON.parse(data['is_iitb']);
            this.hostel = data['hostel'];
            this.program = data['program'];
            this.roll_number = data['roll_number'];
            if(this.roll_number == 'not_iitb'){
              this.roll_number = ''
            } 
            localStorage.setItem('user_t', JSON.stringify(data));
  
            this.spinner.requestEnded();               
          },
          error => {
            console.log(error);
          }
          )
        }

      var retrievedObject = localStorage.getItem('holding_t');
      if (retrievedObject !=null){
        this.count  = JSON.parse(retrievedObject).length;
        console.log('retrievedObject');
      }
      else{
        this.http.get<any>('https://api5.ecell.in/vsm/my_holdings_token/', {headers: header}).subscribe(
          data => {
            console.log('from server')
            this.count = data.length
          console.log(this.count)
        });
      }


    }

    else{
      if(localStorage.getItem('image_url')){
        // console.log('url');
        this.image_src = localStorage.getItem('image_url');
      }
  
      var header = new HttpHeaders({
        'Authorization': "Bearer " + access_token 
      });
  
      this.http.get<any>("https://api5.ecell.in/vsm/me/", {headers: header}).subscribe(
        data => {
          console.log(data)
          this.username = data['username'];
          this.email = data['email'];
          this.fname = data['fname'];
          this.lname = data['lname'];
          this.cash = data['cash'];
          this.city = data['city'];
          this.zip = data['zip_code'];
          this.roll_number = data['roll_number'];
          this.is_iitb = JSON.parse(data['is_iitb']);
          this.hostel = data['hostel'];
          this.program = data['program'];
          this.roll_number = data['roll_number'];
          if(this.roll_number == 'not_iitb'){
            this.roll_number = ''
          }     
          this.spinner.requestEnded();   
        },
        error => {
          console.log(error);
          this.spinner.requestEnded();        
        }
      )


      var header = new HttpHeaders({
        'Authorization': "Bearer " + localStorage.getItem('token')
      });

      this.http.get<any>('https://api5.ecell.in/vsm/my-holdings/', {headers: header}).subscribe(
        data => {
                  this.count = data.length
                  console.log(this.count)
        }
      )
    }

    



  }
}
