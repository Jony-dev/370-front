import { Pipe, PipeTransform } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Language } from 'src/app/models/language';

@Pipe({
    name: 'filterLanguages'
})
export class FilterLanguages implements PipeTransform {

    transform(items: Language [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( lang => {
           let langRec = lang.language;
           if(langRec.toLocaleLowerCase().includes(searchText))
                return lang;
        });

    }
}
