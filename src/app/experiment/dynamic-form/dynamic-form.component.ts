import { Component, OnInit, Input } from '@angular/core';
import { FormDef } from './dynamic-form.models';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  // form definition
  // tslint:disable-next-line: no-input-rename
  @Input('formDef') formDef: FormDef;

  constructor() { }

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
            validations: []
          }
        ],
        fieldMappings: []
      };
    }
  }

}
