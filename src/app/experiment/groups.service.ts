import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {



  constructor(private http: HttpClient) {

  }


  getGroups(searchTerm: string, pageIndex: number, pageSize: number, sortBy: any[]): Observable<any> {
    var params = new HttpParams().set('q', searchTerm)
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
                })
              );
  }

}


export interface Group {
  name: string;
  group_code: string;
  id: number;
}
