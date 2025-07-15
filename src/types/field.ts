export type FieldType = "text" | "email" | "phone" | "file" | "address";

export interface BaseField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
}


export interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

export interface FormType {
  name: string;
  fields: Field[];
}
