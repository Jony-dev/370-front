import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Building } from 'src/app/models/building';
import { Slot } from 'src/app/models/slot';
import { SlotTable } from 'src/app/models/slotTable';
import { userCard } from 'src/app/models/userCard';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-add-edit-slot-booking',
  templateUrl: './add-edit-slot-booking.component.html',
  styleUrls: ['./add-edit-slot-booking.component.css']
})
export class AddEditSlotBookingComponent implements OnInit {

  @Input()booking : any = null;
  @Input()user : userCard = null;

  buildings : Building [] = [];
  boardRooms : any [] = [];
  boardRoomControls : FormControl [] = [];
  tables : SlotTable [] = [];
  buildingId : FormControl = new FormControl('null');
  usersId : number;
  constructor(private api : ApiService, private toast : ToastsService, private auth : AuthService, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.loadData();
    this.usersId = this.auth.getUserId();
    if(this.user)
      this.usersId = this.user.id;
  }

  loadData(){
    this.getBuildings();
    
  }

  loadError(er : any){
    this.toast.display({type : "Error", heading : er.error.Title, message : er.error.message});
  }

  getBuildings(){
    this.api.getBuildings().subscribe(x => this.buildings = x, er => this.loadError(er));
  }

  getSlots(){
    
    this.api.getBoardRoomSlots(this.buildingId.value,this.booking.dateId).subscribe(x => this.gotSlots(x), err => this.loadError(err));
  }

  gotSlots(succ : SlotTable[]){

    this.tables = succ;
    this.boardRooms = this.tables.map(x => {
      this.boardRoomControls.push(new FormControl());
      return {id: x.tableId, name : x.name};
    });
    this.boardRooms.unshift({id: null, name : "All"})
    this.boardRoomControls.push(new FormControl());
  }
  canBeSeen(index : number){

    if(this.boardRoomControls[0].value == true)
      return true;
    
    if(this.boardRoomControls[index].value == true)
      return true;
    
    return false;
  }
  toggleBooking(slot : Slot, tableId : number){
    let request :any = { tableId , dateId : slot.dateId, slotId : slot.slotId};
    if(!slot.userId){
      if(!this.user)
        this.api.makeOwnGroupBooking(request).subscribe(x => {this.getSlots(); this.helper.emitRefresh();},er => this.loadError(er));
      else{
        request.user = this.usersId
        this.api.makeEmpGroupBooking(request).subscribe(x => {this.getSlots(); this.helper.emitRefresh();},er => this.loadError(er));
      }
        
    }
    else if(slot.userId == this.usersId){
      this.api.cancelBooking(slot.bookingId).subscribe(x => {this.getSlots(); this.helper.emitRefresh();},er => this.loadError(er));
    }
  }
}
