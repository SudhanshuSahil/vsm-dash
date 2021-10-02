import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

// ?type=t
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-atom text-primary', class: '' },
    { path: '/market', title: 'Market',  icon:'ni-chart-bar-32 text-danger', class: '' },
    { path: '/holding', title: 'Holdings',  icon:'ni-box-2 text-success', class: '' },
    { path: '/transac', title: 'Transaction Requests',  icon:'ni-delivery-fast text-warning', class: '' },
    { path: '/news', title: 'News',  icon:'ni-world-2  text-info', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'My Holdings',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Leader board',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/faq', title: 'F.A.Q.',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/leaderboard', title: 'Leaderboard',  icon:'ni-trophy text-red', class: '' },
    { path: '/resources', title: 'Resources',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/bonus', title: 'Sponsors',  icon:'ni-diamond text-primary', class: '' },
    // { path: '/charts', title: 'Charts',  icon:'ni-key-25 text-info', class: '' },
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
  game_time: boolean = false;
  show: boolean= false;

  constructor(private router: Router,private route: ActivatedRoute,) { }
  typ ='social';
  logout(){
    localStorage.clear();
    // window.location.reload();
    alert('You have successfully logout')
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    if (window.screen.width <= 500) { // 768px portrait
      this.show = true;
    }
    this.route.queryParams.filter(params => params.type).subscribe(params => {
      console.log(params);
      console.log(params.type);
      this.typ = params.type
    }
    );


    if (this.typ == 't'){
      ROUTES : [
        { path: '/dashboard?type=t', title: 'Dashboard',  icon: 'ni-atom text-primary', class: '' },
        { path: '/market?type=t', title: 'Market',  icon:'ni-chart-bar-32 text-danger', class: '' },
        { path: '/holding?type=t', title: 'Holdings',  icon:'ni-box-2 text-success', class: '' },
        { path: '/transac?type=t', title: 'Transaction Requests',  icon:'ni-delivery-fast text-warning', class: '' },
        { path: '/news?type=t', title: 'News',  icon:'ni-world-2  text-info', class: '' },
        // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
        // { path: '/maps', title: 'My Holdings',  icon:'ni-pin-3 text-orange', class: '' },
        // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
        // { path: '/tables', title: 'Leader board',  icon:'ni-bullet-list-67 text-red', class: '' },
        { path: '/faq?type=t', title: 'F.A.Q.',  icon:'ni-bullet-list-67 text-red', class: '' },
        { path: '/leaderboard?type=t', title: 'Leaderboard',  icon:'ni-trophy text-red', class: '' },
        { path: '/resources?type=t', title: 'Resources',  icon:'ni-bullet-list-67 text-red', class: '' },
        { path: '/bonus?type=t', title: 'Sponsors',  icon:'ni-diamond text-primary', class: '' },
        // { path: '/charts', title: 'Charts',  icon:'ni-key-25 text-info', class: '' },
        // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
    ];

    }





    var base_min = 0
    var now = new Date();
    // console.log(now.getMonth(), now.getDate(), now.getHours())
    if(now.getDate() < 4 && now.getHours() <= 11) {
      // console.log('day 1 testing');      
      var start_time = new Date('2021-09-1 12:30:00')
      var end_time = new Date('2021-09-1 13:30:00')
    }
    else if(now.getDate() == 1){
      console.log('day 1');      
      var start_time = new Date('2021-10-01 21:00:00')
      var end_time = new Date('2021-10-01 23:00:00')
    }
    else if(now.getDate() == 22){
      console.log('day 2');
      var start_time = new Date('2021-10-02 21:00:00')
      var end_time = new Date('2021-10-02 23:59:00')
      base_min = 60
    }
    else if(now.getDate() == 23){
      console.log('day 3');
      var start_time = new Date('2021-10-03 21:00:00')
      var end_time = new Date('2021-10-03 23:00:00')
      base_min = 120
    }
    else {
      var start_time = new Date('22021-10-04 21:00:00')
      var end_time = new Date('2021-10-04 23:00:00')
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

    this.url = 'https://2k21.s3.ap-south-1.amazonaws.com/logo-small.png';
    if(localStorage.getItem('image_url')){
      this.url = localStorage.getItem('image_url');
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }



  send(value){
    // console.log(value)
    if (this.typ == 't'){
      this.router.navigate(['/'+value], { queryParams: { type: 't' } })
      
    }
    else{

    this.router.navigate(['/'+value])
  
    }
  }

  // , { queryParams: { type: 't' } }


}
