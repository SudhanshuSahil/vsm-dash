import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/market', title: 'Market',  icon:'ni-delivery-fast text-info', class: '' },
    { path: '/holding', title: 'Holdings',  icon:'ni-delivery-fast text-info', class: '' },
    { path: '/transac', title: 'Transaction Requests',  icon:'ni-delivery-fast text-info', class: '' },
    { path: '/news', title: 'News',  icon:'ni-delivery-fast text-info', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'My Holdings',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Leader board',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/faq', title: 'F.A.Q.',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/leaderboard', title: 'Leaderboard',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/sponser', title: 'Genral Instructions',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/bonus', title: 'Claim Bonus',  icon:'ni-money-coins text-primary', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  url;
  game_time;


  constructor(private router: Router) { }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    var base_min = 0
    var now = new Date();
    console.log(now.getMonth(), now.getDate(), now.getHours())
    if(now.getDate() == 21 && now.getHours() < 16) {
      console.log('day 1 testing');      
      var start_time = new Date('2020-08-21 12:30:00')
      var end_time = new Date('2020-08-21 13:30:00')
    }
    else if(now.getDate() == 21){
      console.log('day 1');      
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }
    else if(now.getDate() == 22){
      console.log('day 2');
      var start_time = new Date('2020-08-22 21:00:00')
      var end_time = new Date('2020-08-22 22:00:00')
      base_min = 60
    }
    else if(now.getDate() == 23){
      console.log('day 3');
      var start_time = new Date('2020-08-23 21:00:00')
      var end_time = new Date('2020-08-23 22:00:00')
      base_min = 120
    }
    else {
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }

    if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
      this.game_time = true;
    }
    else {
      this.game_time = false;
    }
    const check = interval(1000)
    check.subscribe(val => {
      now = new Date()
      if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
        this.game_time = true;
      }
      else {
        this.game_time = false;
      }
    })

    this.url = 'https://www.ecell.in/ca/dash/assets/img/person_holder.jpg';
    if(localStorage.getItem('image_url')){
      this.url = localStorage.getItem('image_url');
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
