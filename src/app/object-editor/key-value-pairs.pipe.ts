import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'keyValuePairs'})
export class KeyValuePairsPipe implements PipeTransform {

    transform(object: any): {key: string, value: any, type: string}[] {
        if (object == null) {
            return []
        }
        return Object.keys(object).map(key => {
            const value = object[key]
            const type = typeof value
            return {key, value, type}
        })
    }

}
