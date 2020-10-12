import { Pipe, PipeTransform } from '@angular/core';
import { Division } from 'src/app/models/division';

@Pipe({
    name: 'filterDivision'
})
export class FilterDivision implements PipeTransform {

    transform(items: Division [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( division => {
           let divisionRec = division.name + division.description;
           if(divisionRec.toLocaleLowerCase().includes(searchText))
                return division;
        });

    }
}
