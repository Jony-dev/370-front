import { Pipe, PipeTransform } from '@angular/core';
import { Job } from 'src/app/models/job';

@Pipe({
    name: 'filterJobs'
})
export class FilterJobs implements PipeTransform {

    transform(items: Job [], searchText : string): any[] {
        if(!items)
            return [];
        if(!searchText)
            return items;

        searchText = searchText.toLowerCase();

        return items.filter( job => {
           let jobRec = job.name;
           if(jobRec.toLocaleLowerCase().includes(searchText))
                return job;
        });

    }
}
