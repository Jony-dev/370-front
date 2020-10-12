import { Pipe, PipeTransform } from '@angular/core';
import { Requirement } from 'src/app/models/requirement';

@Pipe({
    name: 'filterRequirements'
})
export class FilterRequirements implements PipeTransform {

    transform(items: Requirement [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( requirement => {
           let requirementRec = requirement.requirement;
           if(requirementRec.toLocaleLowerCase().includes(searchText))
                return requirement;
        });

    }
}
