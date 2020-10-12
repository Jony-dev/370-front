import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/app/models/role';

@Pipe({
    name: 'filterRoles'
})
export class FilterRoles implements PipeTransform {

    transform(items: Role [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( role => {
           let roleRec = role.roleName;
           if(roleRec.toLocaleLowerCase().includes(searchText))
                return role;
        });

    }
}
