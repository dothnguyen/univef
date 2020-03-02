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
        public required?: boolean = false;
        public validations?: any[];
        public show?: boolean = true;
        public options?: FieldOptionDef[];
}

export class FieldOptionDef {
        id: number;
        value: number;
}

export class FieldOptionMapping {
        parentFieldId: number;
        parentOptionId: number;
        childFieldId: number;
}


