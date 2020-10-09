import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterStage'
})
export class FilterStage implements PipeTransform {

    transform(items: any [], searchText : string): any[] {
        
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( stage => {
           let stageName = stage.stage.toLowerCase();
           if(stageName.includes(searchText.toLocaleLowerCase()))
                return stage;
        });

    }
}