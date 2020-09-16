import { Test } from './test';
import { Skill } from './skill';
import { Language } from './language';
import { Requirement } from './requirement';
import { LongQuestion } from './longQuestion';
import { userCard } from './userCard';

export class EditJobCard{

    basicDetails :{
        jobCardName : string;
        startDate : Date;
        endDate : Date;
        introduction : string;
        description : string;
        travel : number;
        publishDate : Date;
        closingDate : Date;
        scheduleId : number;
        locationId : number;
        raApprovalId : number;
        workingHours : number;
    }

    tests : Test [];
    skills : Skill [];
    languages : Language [];
    requirements : Requirement [];
    longQuestions : LongQuestion [];
    approvers : userCard [];
}