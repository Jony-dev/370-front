import { Pipe, PipeTransform } from '@angular/core';
import { ViewAuth } from 'src/app/models/viewAuth';

@Pipe({
    name: 'filterViewAuths'
})
export class FilterViewAuth implements PipeTransform {

    transform(items: ViewAuth [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( auth => {
           let authRec = auth.view.view+auth.role.roleName;
           if(authRec.toLocaleLowerCase().includes(searchText))
                return auth;
        });

    }
}
