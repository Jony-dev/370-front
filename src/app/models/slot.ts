import { Time } from '@angular/common';

export class Slot {

    dateId : number;
    slotId : number;
    startTime : Time;
    endTime : Time;
    userId : number;
    userName : string;
    userSurname : string;
    booked : boolean;
    bookingId : number;
}