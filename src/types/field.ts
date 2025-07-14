export type FieldType = "text" | "email" | "phone" | "file" | "address";

export interface BaseField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
}
