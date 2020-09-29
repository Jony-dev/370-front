import { Time } from '@angular/common';
import { userCard } from './userCard';

export class EditInterview{

    applicant : userCard;
    interviewers : userCard [] = [];
    date : Date;
    place : string;
    time : Time;
    bookingId : number;
    applicationId : number;
    interviewId : number;
}