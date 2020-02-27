import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {



constructor(private http: HttpClient) {



 }

}


export interface Group {
  name: string;
  group_code: string;
  id: number;
}
