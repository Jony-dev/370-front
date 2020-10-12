import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFloor'
})
export class FilterFloor implements PipeTransform {

    transform(items: any [], searchText : string): any[] {

        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( floors => {
           //let buildingFloor = floors.buildingId;
           //if(buildingFloor.includes(searchText.toLocaleLowerCase()))
               // return floors;
            return floors.includes(searchText);
        });

    }
}
