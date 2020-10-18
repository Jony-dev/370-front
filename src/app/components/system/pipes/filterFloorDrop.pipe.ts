import { Pipe, PipeTransform } from '@angular/core';
import { Floor } from 'src/app/models/floor';


@Pipe({
    name: 'filterFlrDrop'
})
export class FilterFloorDrop implements PipeTransform {

    transform(items: Floor [], buildingId : number): any[] {
        
        if(!items)
            return [];
        if(!buildingId)
            return [];

        return items.filter( floors => {
          if(floors.buildingId == buildingId)
            return floors;
        });

    }
}