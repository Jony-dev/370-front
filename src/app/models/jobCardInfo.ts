import { JobTest } from './jobTest';

export class JobCardInfo {

    cardId: number;
    name : string;
    introduction : string;
    description : string;
    skills : string [];
    requirements : string [];
    languages : string [];
    tests : JobTest [];
    startDate : Date;
    endDate : Date;
    travel : boolean;
    workingHours : number;
}