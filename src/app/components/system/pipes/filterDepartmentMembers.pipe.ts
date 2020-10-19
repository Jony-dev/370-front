import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentsMembers } from 'src/app/models/departmentsMembers';

@Pipe({
    name: 'filterDepartmentMembers'
})
export class FilterDepartmentMembers implements PipeTransform {

    transform(items: DepartmentsMembers [], searchText : string): any[] {
        
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( person => {
           let fullname = person.name.toLowerCase()+ person.surname.toLowerCase();
           if(fullname.includes(searchText.toLocaleLowerCase()))
                return person;
        });

    }
}