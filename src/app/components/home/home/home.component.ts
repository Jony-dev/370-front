import { Component, OnInit } from '@angular/core';
import { HomeCard } from 'src/app/models/homeCard';
import { View } from 'src/app/models/view';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private api : ApiService, private auth : AuthService) { }

  homeCards : HomeCard;
  views : View[] = [];
  ngOnInit(): void {
    this.api.getHomeCards().subscribe(x => {
      this.homeCards = x;
      });
      this.views = this.auth.getUsersViews();
      console.log(this.views);
  }

  canView(viewName : string)
  {
    if( this.views.filter(el => el.view === viewName).length > 0)
      return true;
    
    else
      return false;
  }


}
