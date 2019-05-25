export type FormState<V = any> = Record<string, V>;
export type FormStateSetter<V = any> = (name: string) => FieldStateSetter<V>;
export type FieldStateSetter<V = any> = (val: V) => any;
