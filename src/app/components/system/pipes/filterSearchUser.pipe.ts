import { Pipe, PipeTransform } from '@angular/core';
import { SearchUser } from 'src/app/models/searchUser';


@Pipe({
    name: 'filterSearchUser'
})
export class FilterSearchUser implements PipeTransform {

    transform(items: SearchUser [], searchText : string, typeId : number, departmentId : number ): any[] {
        if(!items)
            return [];
        if(!searchText && !typeId && !departmentId)
            return items;

        let users = items.filter(x =>{

            if(typeId == null)
                return x;
            else if(x.typeId == typeId)
                return x;
        });

        users = users.filter(x =>{

            if(departmentId == null)
                return x;
            else if(x.departmentId == departmentId)
                return x;
        });

        if(searchText)
            searchText = searchText.toLowerCase();

        users = users.filter(x =>{

            if(!searchText || searchText == "")
                return x;
            else if((x.name.toLowerCase()+x.surname.toLowerCase()).includes(searchText))
                return x;
        });
        
        return users;
    }
}
