import { Pipe, PipeTransform } from '@angular/core';
import { Department } from 'src/app/models/department';

@Pipe({
    name: 'filterDepartment'
})
export class FilterDepartment implements PipeTransform {

    transform(items: Department [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( department => {
           let departmentRec = department.description + department.name;
           if(departmentRec.toLocaleLowerCase().includes(searchText))
                return department;
        });

    }
}
