import { Language } from './language';
import { LongQuestion } from './longQuestion';
import { Requirement } from './requirement';
import { Skill } from './skill';
import { Test } from './test';

export class ApplicationQuestions{

    cardId : number;
    tests : Test [];
    skills : Skill[];
    languages : Language [];
    requirements : Requirement [];
    longQuestions : LongQuestion [];
}