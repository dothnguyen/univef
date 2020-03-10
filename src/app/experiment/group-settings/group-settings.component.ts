import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, concatMap, tap, delay, shareReplay } from 'rxjs/operators';
import { Group, GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  groupId$: Observable<number>;
  groupInfo$: Observable<Group>;

  group: Group = {
    name: '',
    group_code: '',
    id: 0
  };

  groupSub: Subscription;

  constructor(private route: ActivatedRoute,
              private groupService: GroupsService) { }

  ngOnInit() {
    this.groupId$ = this.route.params.pipe(
      map(params => +params.id)
    );

    this.groupInfo$ = this.groupId$.pipe(
      tap(() => this.loading = true),
      concatMap(id => this.groupService.getGroup(id)),
      delay(1000),
      shareReplay(),
      tap(() => this.loading = false)
    );

    this.groupSub = this.groupInfo$.subscribe((grp) => {
      this.group = grp;
      //this.route.data = grp.name;
      this.route.snapshot.data.breadcrumb = grp.name;
    });
  }

  ngOnDestroy() {
    if (this.groupSub) {
      this.groupSub.unsubscribe();
    }
  }
}
