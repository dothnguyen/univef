// definition model of dynamic form
export class FormDef {

        title: string;
        fields: FormFieldDef[];
        fieldMappings: FieldOptionMapping[];
}

export class FormFieldDef {
        label: string;
        type: number;
}

export class FieldOptionDef {
        id: number;
        value: number;
}

export class FieldOptionMapping {

}
