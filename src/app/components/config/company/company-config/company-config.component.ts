import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-config',
  host : { class : 'full-component'},
  templateUrl: './company-config.component.html',
  styleUrls: ['./company-config.component.css']
})
export class CompanyConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
