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

  }

}
