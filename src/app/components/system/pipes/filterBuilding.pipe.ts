import { Pipe, PipeTransform } from '@angular/core';
import { Building } from 'src/app/models/building';

@Pipe({
    name: 'filterBuilding'
})
export class FilterBuilding implements PipeTransform {

    transform(items: Building [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( building => {
           let buildingText = building.name.toLocaleLowerCase();
           if(buildingText.includes(searchText.toLocaleLowerCase()))
                return building;
        });

    }
}
