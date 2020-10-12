import { Pipe, PipeTransform } from '@angular/core';
import { MyListings } from 'src/app/models/myListings';

@Pipe({
    name: 'filterMyListings'
})
export class FilterMyListings implements PipeTransform {

    transform(items: MyListings [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( listing => {
           let listRec = listing.cardName + listing.description;
           if(listRec.toLocaleLowerCase().includes(searchText))
                return listing;
        });

    }
}
