import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  access_token;
  username;
  fname;
  lname;
  pass;
  confirm;
  email;
  show: boolean =false;
  
  constructor(private authService: SocialAuthService, 
    private http: HttpClient, private router: Router) {}

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   // this.authService.initState.subscribe(() => {}, console.error, () => {console.log('all providers are ready')});
    
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  
    
  ngOnInit() {
    if (window.screen.width <= 500) { // 768px portrait
      this.show = true;
    }
    else{
      this.show = false;
    } 
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   // console.log(user)
    //   if(user.provider == 'GOOGLE'){
    //     var backend = 'google-oauth2'
    //     localStorage.setItem('image_url', user.photoUrl);
    //     this.get_token(backend, user.authToken);
    //   }
    //   if(user.provider == "FACEBOOK"){        
    //     var backend = 'facebook';
    //     localStorage.setItem('image_url', user.photoUrl);
    //     this.get_token(backend, user.authToken);
    //   }
    // });
  }

  
  submit(){
    console.log(this.username)
    var body = new FormData();
    body.append('username', this.username);
    body.append('fname', this.fname);
    body.append('lname', this.lname);
    body.append('password', this.pass)
    body.append('confirm', this.confirm)
    body.append('email',this.email)
    
    this.http.post<any>("https://api5.ecell.in/vsm/register/", body).subscribe(
      data=>{
        console.log(data)
        // localStorage.setItem('token', data.token)
        // this.router.navigate(['/dashboard'], { queryParams: { type: 't' } })
      },
      error=>{
        alert('Username already in user')
      }
    ) 
  }

}
