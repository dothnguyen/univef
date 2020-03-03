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


}
