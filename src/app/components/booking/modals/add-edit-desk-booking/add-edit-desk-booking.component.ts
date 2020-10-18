import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Building } from 'src/app/models/building';
import { Tafel } from 'src/app/models/tafel';
import { UserBooking } from 'src/app/models/userBooking';
import { userCard } from 'src/app/models/userCard';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-add-edit-desk-booking',
  templateUrl: './add-edit-desk-booking.component.html',
  styleUrls: ['./add-edit-desk-booking.component.css']
})
export class AddEditDeskBookingComponent implements OnInit {

  editing : boolean = false;
  @Input()booking : any = null;
  @Input()dateId : number = null;
  @Input()user : userCard = null;
  //need a date ID

  buildings : Building [] = [];
  tables : Tafel [] = [];
  bookingForm : FormGroup;
  constructor( private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder, private helper : JobCardHelperService, private activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
    if(this.booking && this.booking.buildingId)
      this.editing = true;
  }

  buildForm(){
    this.bookingForm = this.formBuilder.group({
      buildingId : [null, [Validators.required]],
      tableId : [null, [Validators.required]]
    });
  }

  getBuildingTables(){
    let buildingId = this.bookingForm.get('buildingId').value;
    this.api.getBuildingTables(buildingId,this.booking.dateId).subscribe(x => 
    {
      this.tables = x;
      if(this.editing)
        this.tables.push({id: this.booking.tableId, name : this.booking.tableName, ttypeId : null, floorId : null, barcode : null, buildingId : null, buildingName : null});
    });

    console.log(this.buildings);
    console.log(this.tables);
  }

  loadData(){
    this.loadingBuildings();
  }

  loadingBuildings(){
    this.api.getBuildings().subscribe(x =>
      { 
        this.buildings = x;
        if(this.booking){
          this.bookingForm.setValue({
            buildingId : this.booking.buildingId,
            tableId : this.booking.tableId
          });
          this.getBuildingTables();
        }  
      }, er => this.loadError(er));
  }

  loadError(err : any){
    this.toast.display({type : "Error", heading : err.error.Title, message: err.error.message});
  }

  makeBooking(){
    let newBooking = this.bookingForm.value;
    newBooking.dateId = this.booking.dateId;
    if(this.booking.buildingId == this.bookingForm.get('buildingId').value && this.booking.tableId == this.bookingForm.get('tableId').value)
      this.activeModal.close();
    else{
      if(!this.user)
        this.api.userBooking(newBooking).subscribe(x =>
        {
          this.toast.display({type : "Success", heading : (<any>x).Title, message: (<any>x).message});
          this.activeModal.close();
          this.helper.emitRefresh();
        },
        er =>
        {
          this.loadError(er);
        });
      else{
        newBooking.user = this.user.id;
        this.api.userEmpBooking(newBooking).subscribe(x =>
          {
            this.toast.display({type : "Success", heading : (<any>x).Title, message: (<any>x).message});
            this.activeModal.close();
            this.helper.emitRefresh();
          },
          er =>
          {
            this.loadError(er);
          });
      }
    }
  }
}
