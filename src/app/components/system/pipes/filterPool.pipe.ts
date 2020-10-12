import { Pipe, PipeTransform } from '@angular/core';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';

@Pipe({
    name: 'filterApplicants'
})
export class FilterApplicants implements PipeTransform {

    transform(items: ApplicantPoolCard [], searchText : string, internal : string): any[] {
        if(!items)
            return [];

        if(!searchText && (!internal || internal == "null"))
            return items;

        if(!searchText && internal){
            return items.filter( applicant => {
                if(!!+applicant.internal == !!+internal)
                        return applicant;
                });
        }

        searchText = searchText.toLowerCase();

        if(internal == null)
            return items.filter( applicant => {
            let applicantRec = applicant.userName + applicant.userSurname;
            if(applicantRec.toLocaleLowerCase().includes(searchText))
                    return applicant;
            });
        else
            return items.filter( applicant => {
            let applicantRec = applicant.userName + applicant.userSurname;
            if(applicantRec.toLocaleLowerCase().includes(searchText) && !!+applicant.internal == !!+internal)
                    return applicant;
            });

    }
}
