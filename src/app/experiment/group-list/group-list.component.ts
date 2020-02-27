import { Component, OnInit } from '@angular/core';
import { Group, GroupsService } from '../groups.service';
import { Observable, BehaviorSubject, combineLatest, empty } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap, shareReplay, pluck } from 'rxjs/operators';

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
  sortBy$ = new BehaviorSubject(['name', 'acs']);

  filteredGroupData: Observable<Group[]>;
  total$: Observable<number>;

  constructor(private groupService: GroupsService) { }

  ngOnInit() {

    const intermediate$ = combineLatest(
      this.filterTerm$.pipe(
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.pageIndex$,
      this.pageSize$,
      this.sortBy$
      ).pipe(
        tap(() => {this.loading = true}),
        switchMap(
          ([filterTerm, pageIdx, pageSz, sortBy]) => {
            return this.groupService.getGroups(filterTerm, pageIdx, pageSz, sortBy);
          }
        ),
        shareReplay(),
        tap(() => {this.loading = false}),
      );

    this.filteredGroupData = intermediate$.pipe(
      pluck('groups')
    );

    this.total$ = intermediate$.pipe(
      pluck('total')
    );
  }

}
