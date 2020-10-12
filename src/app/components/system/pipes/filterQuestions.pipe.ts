import { Pipe, PipeTransform } from '@angular/core';
import { LongQuestion } from 'src/app/models/longQuestion';

@Pipe({
    name: 'filterQuestions'
})
export class FilterQuestions implements PipeTransform {

    transform(items: LongQuestion [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( question => {
           let questionRec = question.question;
           if(questionRec.toLocaleLowerCase().includes(searchText))
                return question;
        });

    }
}
