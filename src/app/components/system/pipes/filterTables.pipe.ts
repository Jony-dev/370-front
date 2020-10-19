import { Pipe, PipeTransform } from '@angular/core';
import { Tafel } from 'src/app/models/tafel';

@Pipe({
    name: 'filterTables'
})
export class FilterTables implements PipeTransform {

    transform(items: Tafel [], searchText : string, type : number, buildingId : number, floorId : number): any[] {
        if(!items)
            return [];
        if(!searchText && !type && !buildingId && !floorId)
            return items;

        let tables : Tafel [] = items.filter(x=>{
            if(type == null)
                return x;
            else if(type == x.ttypeId)
                return x;
        });

        tables = tables.filter(x =>{

            if(buildingId == null)
                return x;
            else if(x.buildingId == buildingId)
                return x
        });

        tables = tables.filter(x =>{

            if(floorId == null)
                return x;
            else if(x.floorId == floorId)
                return x
        });

        if(searchText)
            searchText = searchText.toLowerCase();

            tables = tables.filter(x =>{

            if(searchText == null || "")
                return x;
            else if((x.name+x.buildingName).toLowerCase().includes(searchText))
                return x
        });

        return tables;

    }
}
