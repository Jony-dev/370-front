import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/models/toast';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-backup-restore',
  templateUrl: './backup-restore.component.html',
  styleUrls: ['./backup-restore.component.css']
})
export class BackupRestoreComponent implements OnInit {

  constructor(private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
  }

  error(er : any){
    this.toast.display({type : "Success",heading : (<any>er).Title, message : (<any>er).message});
  }
  backup(){
    this.api.makeBackup().subscribe(x => this.toast.display({type : "Success",heading : (<any>x).Title, message : (<any>x).message}), er => this.error(er));
  }

  restore(){
    this.api.restoreBackup().subscribe(x => this.toast.display({type : "Success",heading : (<any>x).Title, message : (<any>x).message}), er => this.error(er));
  }
}
