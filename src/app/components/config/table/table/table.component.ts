import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  host : { class : 'full-component'},
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
