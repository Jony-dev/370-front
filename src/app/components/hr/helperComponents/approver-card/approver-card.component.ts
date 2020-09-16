import { Component, OnInit, Input } from '@angular/core';
import { UserApprover } from 'src/app/models/userApprover';

@Component({
  selector: 'app-approver-card',
  templateUrl: './approver-card.component.html',
  styleUrls: ['./approver-card.component.css']
})
export class ApproverCardComponent implements OnInit {
  
  @Input() user : UserApprover = null;
  constructor() { }

  ngOnInit(): void {
  }

}
