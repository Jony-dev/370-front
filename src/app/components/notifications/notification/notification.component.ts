import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification : Notification[] = [];

  constructor(private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) {
  }

  ngOnInit(): void {

    this.getData();
  }


  getData(){

    this.getUserNotifications();
    this.getUserCount();
  }

  getUserNotifications(){

    this.api.getUserNotifications().subscribe( success => this.getNotificationSuccess(success), error => this.getNotificationFail(error));
  }
  //success
  getNotificationSuccess(success){

    this.notification = success;
    console.log(this.notification);
  }
  //fail
  getNotificationFail(error){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
    console.log(this.notification);
  }
  getUserCount(){

    this.api.getUserCount().subscribe( success => this.getUserCountSuccess(success), error => this.getUserCountFail(error));
  }
  //success
  getUserCountSuccess(success){

    this.notification = success;
    console.log(this.notification);
  }
  //fail
  getUserCountFail(error){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
    console.log(this.notification);
  }

  deleteNotification(id:number)
  {
    this.api.deleteNotification(id).subscribe(success=> this.deleteNotificationSuccess(success), error => this.deleteNotificationFail(error));
    console.log(this.notification);
  }

  deleteNotificationSuccess(success){

    this.notification = success;
    console.log(this.notification);
  }
  //fail
  deleteNotificationFail(error){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
    console.log(this.notification);
  }

}
