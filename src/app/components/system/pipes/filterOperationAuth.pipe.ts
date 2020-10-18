import { Pipe, PipeTransform } from '@angular/core';
import { OperationAuthorisation } from 'src/app/models/operationAuthorization';

@Pipe({
    name: 'filterOperationAuth'
})
export class FilterOperationAuth implements PipeTransform {

    transform(items: OperationAuthorisation [], rE : number, rT: number, dbId : number, opId : number): any[] {
        
        if(!items)
            return [];
        if(rE == null && rT == null && dbId == null && opId == null)
            return items;

        // FILTER BASED ON EFFECTED
        let filteredArr : OperationAuthorisation [] = items.filter(x => {
            if(rE == null)
                return x;
            
            else if(rE == x.effectedId)
                return x;
        });

        //FILTER FURTHER BASED ON TARGET
        filteredArr = filteredArr.filter(x => {
            if(rT == null)
                return x;
            
            else if(rT == x.targetId)
                return x;
        });

        //FILTER FURTHER BASED ON OPERATION
        filteredArr = filteredArr.filter(x => {
            if(opId == null)
                return x;
            
            else if(opId == x.operationId)
                return x;
        });

        //FILTER FURTHER BASED ON DATABASE
        filteredArr = filteredArr.filter(x => {
            if(dbId == null)
                return x;
            
            else if(dbId == x.databaseId)
                return x;
        });

        console.log('affecting ',rE);
        console.log('target ',rT);
        console.log('database ',dbId);
        console.log('operation ',opId);

        return filteredArr;
    }
}
