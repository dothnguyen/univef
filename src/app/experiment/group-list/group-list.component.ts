import { Component, OnInit } from '@angular/core';
import { Group } from '../groups.service';
import { Observable, BehaviorSubject, combineLatest, empty } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Group[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];


  // source streams
  filterTerm$ = new BehaviorSubject('');
  pageIndex$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(10);
  sortBy$ = new BehaviorSubject(1);

  filteredGroupData: Observable<any>;

  constructor() { }

  ngOnInit() {

    this.filteredGroupData = combineLatest(
      this.filterTerm$.pipe(
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.pageIndex$,
      this.pageSize$,
      this.sortBy$
      ).pipe(
        switchMap(
          ([filterTerm, pageIdx, pageSz, sortBy]) => {
            return empty();
          }
        )
      )
  }

}
