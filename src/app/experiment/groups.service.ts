import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { map, filter, count, delay, tap, flatMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {



  constructor(private http: HttpClient) {

  }


  getGroups(searchTerm: string, pageIndex: number, pageSize: number, sortBy: any[]): Observable<any> {
    const params = new HttpParams().set('q', searchTerm)
    .set('_page', pageIndex.toString())
    .set('_limit', pageSize.toString())
    .set('_sort', sortBy[0])
    .set('_order', sortBy[1] === 'ascend' ? 'asc' : (sortBy[1] === 'descend' ? 'desc' : ''));

    return this.http.get('http://localhost:3000/groups', {params: params, observe: 'response' as 'body'})
              .pipe(
                map((resp: HttpResponse<any>) => {
                  return {
                    total: resp.headers.get('X-Total-Count'),
                    groups: resp.body
                  }
                }),
                delay(1000)
              );
  }

  checkUniqueGroupCode(code: string, id: number = null) {
    const params = new HttpParams()
                .set('group_code', code);

    return this.http.get('http://localhost:3000/groups', {params})
                    .pipe(
                      flatMap((groups: Group[]) => from(groups)),  // convert the result to stream of array
                      filter((group: Group) => {                   // filter out the one that has same id
                        return !id || (id && group.id !== id);
                      }),
                      count(),                                    // count number of existing code
                      //delay(2000),   // TODO for testing
                      map(c => c > 0 ? {error: true, duplicated: true} : null),   // map to error or not
                    );
  }

  addGroup(group: Group) {
    return this.http.post('http://localhost:3000/groups', group);
  }

  updateGroup(group: Group) {
    return this.http.put('http://localhost:3000/groups/' + group.id, group);
  }

  getGroup(id: number) {
    return this.http.get('http://localhost:3000/groups/' + id)
                    .pipe(
                      map(obj => obj as Group)
                    );
  }

}


export interface Group {
  name: string;
  group_code: string;
  id: number;
}
