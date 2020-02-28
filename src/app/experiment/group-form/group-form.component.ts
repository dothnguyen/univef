import { Component, OnInit, Injectable, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { Group } from '../groups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  groupForm: FormGroup;

  @Input('group') group: Group;

  @ViewChild('contentTemplate', {static: true}) contentTemplate: TemplateRef<any>;
  @ViewChild('footerTemplate', {static: true}) footerTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.groupForm = this.fb.group({
      group_code:['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      name: ['', Validators.required]
    })
  }

  saveGroup(value) {
    for (const i in this.groupForm.controls) {
      this.groupForm.controls[i].markAsDirty();
      this.groupForm.controls[i].updateValueAndValidity();
    }

    if (!this.groupForm.valid) {
      return;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class GroupFromModalService {
  constructor(private factoryResolver: ComponentFactoryResolver,
            private modalService: NzModalService){ }

  rootViewContainerRef: ViewContainerRef;

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = viewContainerRef;
  }

  showGroupFormModal(group: Group) {
    this.modalService.create({
      nzContent: GroupFormComponent,
      nzTitle: 'Add / Edit Group Information',
      nzWidth: 800,
      nzComponentParams: {
        group: group
      }
    });
  }
}
