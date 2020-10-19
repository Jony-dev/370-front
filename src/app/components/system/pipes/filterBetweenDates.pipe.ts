import { Pipe, PipeTransform } from '@angular/core';
import { Building } from 'src/app/models/building';
import { Date } from 'src/app/models/date';

@Pipe({
    name: 'filterBetweenDates'
})
export class FilterBetweenDates implements PipeTransform {

    transform(items: Date [], startDate : Date, endDate : Date): any[] {
        if(!items)
            return [];
        if(!startDate && !startDate)
            return items;

        let dates : Date[] = items.filter( calendarDate => {
            if(calendarDate.date >= startDate)
                 return calendarDate;
         });
        
         if(endDate)
         dates = dates.filter( calendarDate => {
            if(calendarDate.date <= endDate)
                 return calendarDate;
         });

    }
}
