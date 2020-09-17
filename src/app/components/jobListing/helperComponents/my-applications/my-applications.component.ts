import { Component, Input, OnInit } from '@angular/core';
import { MyApplication } from 'src/app/models/myApplication';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  @Input() application : MyApplication;
  constructor() { }

  ngOnInit(): void {
  }

}
