import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sec-login',
  templateUrl: './sec-login.component.html',
  styleUrls: ['./sec-login.component.css']
})
export class SecLoginComponent implements OnInit {

  token;
  constructor(private http: HttpClient,private router: Router) { }
  username;
  pass;
  aud: Boolean = false;

  saveToken(){
    localStorage.setItem('token', this.token);
  }
  show: boolean= false;
  
  ngOnInit(): void {
    if (window.screen.width <= 500) { // 768px portrait
      this.show = true;
    }
    else{
      this.show = false;
    } 


    this.http.get<any>("https://api5.ecell.in/vsm/mazak/").subscribe(
      data=>{
        console.log(data)
        if (data == 'done'){
          this.aud = true
        }
        else{
          this.aud = false
        }
      }
    )

  }

  submit(){
    var body = new FormData();
    body.append('username', this.username);
    // body.append('fname', this.fname);
    // body.append('lname', this.lname);
    body.append('password', this.pass)
    // body.append('confirm', this.confirm)
    // body.append('email',this.email)
    
    this.http.post<any>("https://api5.ecell.in/api-token-auth/", body).subscribe(
      data=>{
        console.log(data)
        localStorage.setItem('token', data.token)
        this.router.navigate(['/dashboard'], { queryParams: { type: 't' } })
      },
      error=>{
        alert('Username already in user')
      }
    )
  }

}
