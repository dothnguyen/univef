import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Group, GroupsService } from '../../groups.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { GroupFormComponent } from '../../group-form/group-form.component';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-groups-experiment',
  templateUrl: './groups-experiment.component.html',
  styleUrls: ['./groups-experiment.component.css']
})
export class GroupsExperimentComponent implements OnInit {

  constructor(private factoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private modalService: NzModalService,
              private groupService: GroupsService,
              private message: NzMessageService) {


  }

  ngOnInit() {
  }

  showGroupModal(group: Group) {

    console.log(group);

    // this.groupModalService.showGroupFormModal(group);
    const modal = this.modalService.create({
      nzContent: GroupFormComponent,
      nzTitle: 'Add / Edit Group Information',
      nzWidth: 800,
      nzComponentParams: {
        group
      }
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

        // TODO reload table
      });
    });
  }
}
