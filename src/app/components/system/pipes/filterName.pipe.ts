import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterName'
})
export class FilterName implements PipeTransform {

    transform(items: any [], searchText : string): any[] {
        
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( person => {
           let fullname = person.userName.toLowerCase()+ person.userSurname.toLowerCase();
           if(fullname.includes(searchText.toLocaleLowerCase()))
                return person;
        });

    }
}