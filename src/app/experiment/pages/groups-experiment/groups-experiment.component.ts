import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Group } from '../../groups.service';
import { NzModalService } from 'ng-zorro-antd';
import { GroupFormComponent, GroupFromModalService } from '../../group-form/group-form.component';

@Component({
  selector: 'app-groups-experiment',
  templateUrl: './groups-experiment.component.html',
  styleUrls: ['./groups-experiment.component.css']
})
export class GroupsExperimentComponent implements OnInit {

  constructor(private factoryResolver: ComponentFactoryResolver,
          private viewContainerRef: ViewContainerRef,
          private groupModalService: GroupFromModalService) {
    this.groupModalService.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
  }

  showGroupModal(group: Group) {
    this.groupModalService.showGroupFormModal();
  }
}
