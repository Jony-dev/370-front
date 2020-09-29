import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview-comment',
  templateUrl: './interview-comment.component.html',
  styleUrls: ['./interview-comment.component.css']
})
export class InterviewCommentComponent implements OnInit {

  @Input() commentCard : any = null;
  
  user: any = {};
  constructor() { }

  ngOnInit(): void {
    
  }

  

}
