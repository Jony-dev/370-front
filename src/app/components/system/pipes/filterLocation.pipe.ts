import { Pipe, PipeTransform } from '@angular/core';
import { Location } from 'src/app/models/location';

@Pipe({
    name: 'filterLocation'
})
export class FilterLocation implements PipeTransform {

    transform(items: Location [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( location => {
           let locationRec = location.name;
           if(locationRec.toLowerCase().includes(searchText))
                return location;
        });

    }
}
