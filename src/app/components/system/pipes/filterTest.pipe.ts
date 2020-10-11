
import { Pipe, PipeTransform } from '@angular/core';
import { Test } from 'src/app/models/test';

@Pipe({
    name: 'filterTest'
})
export class FilterTest implements PipeTransform {

    transform(items: Test [], searchText : string): any[] {
        
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( test => {
           let testName = test.testName.toLowerCase();
           if(testName.includes(searchText.toLocaleLowerCase()))
                return test;
        });

    }
}