import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Pipe({
    name: 'filterSkills'
})
export class FilterSkills implements PipeTransform {

    transform(items: Skill [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( skill => {
           let skillRec = skill.skill;
           if(skillRec.toLocaleLowerCase().includes(searchText))
                return skill;
        });

    }
}
