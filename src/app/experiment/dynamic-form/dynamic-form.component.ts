import { Component, OnInit, Input } from '@angular/core';
import { FormDef } from './dynamic-form.models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  // form definition
  // tslint:disable-next-line: no-input-rename
  @Input('formDef') formDef: FormDef;

  // the form groups
  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.formDef) {
      this.formDef = {
        id: 1,
        title: 'Wayne Test first form',
        fields: [
          {
            id: 1,
            label: 'First field',
            type: 1, // short text,
            required: true
          },
          {
            id: 2,
            label: 'Second field',
            type: 1, // short text,
          }
        ],
        fieldMappings: []
      };
    }

    // generate the form
    this.dynamicForm = this.buildForm(this.formDef);
  }

  buildForm(formDef: FormDef) {
    const dynamicForm = this.fb.group({

    });
    for(const f of formDef.fields) {
      dynamicForm.addControl(`field_${f.id}`, this.fb.control(''));
    }

    return dynamicForm;
  }
}
