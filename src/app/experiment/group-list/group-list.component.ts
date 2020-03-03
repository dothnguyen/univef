import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Group, GroupsService } from '../groups.service';
import { Observable, BehaviorSubject, combineLatest, empty, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap, shareReplay, pluck } from 'rxjs/operators';
import { FormControl, ValidationErrors } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { GroupFormComponent } from '../group-form/group-form.component';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  //@Output('editGroup') editGroupEvent = new EventEmitter<Group>();

  loading = true;

  // source streams
  // stream of filter terms
  filterTerm$ = new BehaviorSubject('');
  // stream of page Index changes
  pageIndex$ = new BehaviorSubject(1);
  // stream of page size changes
  pageSize$ = new BehaviorSubject(10);
  // stream of sort changes
  sortBy$ = new BehaviorSubject(['group_code', 'ascend']);

  reloadList$ = new BehaviorSubject('');

  // presentational streams
  // stream of filtered data
  filteredGroupData: Observable<Group[]>;
  // total number of filtered data
  total$: Observable<number>;
  // holds current sort values for each columns
  currentSort$: Observable<any>;

  constructor(private groupService: GroupsService,
    private modalService: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {

    // an intermediate stream that combine all the sources
    // then create a http request
    // and share the response for further process
    const intermediate$ = combineLatest(
      this.filterTerm$.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.pageIndex$,
      this.pageSize$,
      this.sortBy$,
      this.reloadList$
      ).pipe(
        tap(() => {this.loading = true; }),  // show loading
        switchMap(
          ([filterTerm, pageIdx, pageSz, sortBy]) => {
            return this.groupService.getGroups(filterTerm, pageIdx, pageSz, sortBy);
          }
        ),
        shareReplay(),
        tap((val) => {
          this.loading = false;   // hide loading
        }),
      );

    // get only groups data from the response
    this.filteredGroupData = intermediate$.pipe(
      pluck('groups')
    );

    // get only the total number from the response
    this.total$ = intermediate$.pipe(
      pluck('total')
    );

    // convert sort values to object for deciding sorting in template
    this.currentSort$ = this.sortBy$.pipe(
      map(sort => {
        const ret = {
          name: null,
          group_code: null
        };

        ret[sort[0]] = sort[1];

        return ret;
      })
    );

  }

  onChangePageIndex(pageIndex) {
    this.pageIndex$.next(pageIndex);
  }

  onChangePageSize(pageSize) {
    this.pageSize$.next(pageSize);
  }

  sort($event) {
    this.sortBy$.next([$event.key, $event.value]);
  }

  searchTermChange($event) {
    this.filterTerm$.next($event.target.value);
  }

  showGroupModal(group: Group) {

    // this.groupModalService.showGroupFormModal(group);
    const modal = this.modalService.create({
      nzContent: GroupFormComponent,
      nzTitle: 'Add / Edit Group Information',
      nzWidth: 800,
      nzComponentParams: {
        group
      },
      // nzNoAnimation: true
    });

    modal.afterOpen.subscribe(() => {
      const comp = modal.getContentComponent();
      const save$ = comp.saveGroup$.pipe(
        switchMap(grp => {
          if (grp.id) {
            return this.groupService.updateGroup(grp);
          } else {
            return this.groupService.addGroup(grp);
          }
        })
      );

      const sub = save$.subscribe(ret => {
        this.message.success('Group saved.', { nzDuration: 2500 });
        modal.close();
        sub.unsubscribe();

        // reload table
        this.reloadList$.next('');
      });
    });
  }

  // // edit group info
  editGroup(group) {
    this.showGroupModal(group);
  }
}
