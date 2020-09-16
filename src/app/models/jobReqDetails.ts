import { userLite } from './userLite';
import { Justification } from './justification';
import { Job } from './job';

export class JobRequestInfo{

    id : number;
    user : userLite;
    justification : Justification;
    fulfilmentDate : Date;
    jobPosition : Job;
    brief : string;
    jobCardId : number;

}