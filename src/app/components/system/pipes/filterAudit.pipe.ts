import { Pipe, PipeTransform } from '@angular/core';
import { Audit } from 'src/app/models/audit';


@Pipe({
    name: 'filterAudit'
})
export class FilterAudit implements PipeTransform {

    transform(items: Audit [], databaseId : number, startDate : Date, endDate : Date , searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText && !databaseId && !startDate && !endDate)
            return items;

        let audits : Audit [] = items.filter(x=>{
            if(databaseId == null)
                return x;
            else if(databaseId == x.operationId)
                return x;
        });

        audits = audits.filter(x =>{

            if(startDate == null)
                return x;
            else if(x.date >= startDate)
                return x
        });

        audits = audits.filter(x =>{

            if(endDate == null)
                return x;
            else if(x.date <= endDate)
                return x
        });

        audits = audits.filter(x =>{

            if(endDate == null)
                return x;
            else if(x.date <= endDate)
                return x
        });

        if(searchText)
            searchText = searchText.toLowerCase();

        audits = audits.filter(x =>{

            if(searchText == null || "")
                return x;
            else if((x.userName+x.userSurname).toLowerCase().includes(searchText))
                return x
        });

        return audits;
    }
}
