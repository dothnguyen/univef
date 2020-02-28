import { Component, OnInit, Injectable, ViewChild,
  TemplateRef, ComponentFactoryResolver, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { Group, GroupsService } from '../groups.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  groupForm: FormGroup;

  // tslint:disable-next-line: no-output-rename
  saveGroup$ = new Subject<Group>();

  // tslint:disable-next-line: no-input-rename
  @Input('group') group: Group;

  @ViewChild('contentTemplate', {static: true}) contentTemplate: TemplateRef<any>;
  @ViewChild('footerTemplate', {static: true}) footerTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder,
              private groupService: GroupsService) { }

  ngOnInit() {
    this.groupForm = this.fb.group({
      group_code: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
          [this.groupCodeUniquevalidator]],
      name: ['', Validators.required]
    });
  }

  get group_code() {
    return this.groupForm.get('group_code');
  }

  get name() {
    return this.groupForm.get('name');
  }

  saveGroup() {
    // tslint:disable-next-line: forin
    // for (const i in this.groupForm.controls) {
    //   this.groupForm.controls[i].markAsDirty();
    //   this.groupForm.controls[i].updateValueAndValidity();
    // }

    if (!this.groupForm.valid) {
      return;
    }

    const newGroup: Group = {
      group_code: this.group_code.value,
      name: this.name.value,
      id: null
    };

    if (this.group && this.group.id) {
      newGroup.id = this.group.id;
    }

    this.saveGroup$.next(newGroup);
  }

  // validator to validate unique group code
  groupCodeUniquevalidator = (control: FormControl) => this.groupService.checkUniqueGroupCode(control.value);

}

