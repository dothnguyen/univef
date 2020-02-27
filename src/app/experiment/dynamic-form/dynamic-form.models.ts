// definition model of dynamic form
export class FormDef {
        public id: number;
        public title: string;
        public fields: FormFieldDef[];
        public fieldMappings?: FieldOptionMapping[];
}

export class FormFieldDef {
        public id: number;
        public label: string;
        public type: number;
        public validations?: any[];
}

export class FieldOptionDef {
        id: number;
        value: number;
}

export class FieldOptionMapping {
        fieldId: number;
        optionId: number;
        childFieldId: number;
}


