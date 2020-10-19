import { Pipe, PipeTransform } from '@angular/core';
import { Building } from 'src/app/models/building';
import { SearchUser } from 'src/app/models/searchUser';

@Pipe({
    name: 'filterSearchUser'
})
export class FiltersearchUser implements PipeTransform {

    transform(items: SearchUser [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( building => {
           let searchUserText = building.name.toLocaleLowerCase();
           if(searchUserText.includes(searchText.toLocaleLowerCase()))
                return building;
        });

    }
}
