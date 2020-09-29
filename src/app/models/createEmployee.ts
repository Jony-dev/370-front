import { Role } from './role';

export class CreateEmployee{

    userId: number;
    name : string;
    surname : string;
    picture : string;
    contact : string;
    email : string;
    nationality : string;
    country : string
    jobId : number;
    locationId : number;
    startDate : Date;
    endDate : Date;
    scheduleId : number;
    departmentId : number;
    salary : number;
    contract : string;
    userType : number;
    roles : Role [];
}