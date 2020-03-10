import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, concatMap, tap, delay } from 'rxjs/operators';
import { Group, GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit {

  loading: boolean = false;

  groupId$: Observable<number>;
  groupInfo$: Observable<Group>;

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
      tap(() => this.loading = false)
    );
  }

}
