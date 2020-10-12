import { Pipe, PipeTransform } from '@angular/core';
import { Floor } from 'src/app/models/floor';

@Pipe({
    name: 'filterFloor'
})
export class FilterFloor implements PipeTransform {

    transform(items: Floor [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( floors => {
           let buildingFloor = floors.buildingName + floors.floorNumber;
           if(buildingFloor.toLocaleLowerCase().includes(searchText))
                return floors;
        });

    }
}
