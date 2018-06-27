export class Required {}
export const RequiredField = Symbol("required");
export function required(args?: Required) {
  return Reflect.metadata(RequiredField, args);
}
export class MapField {}
export const mappedField = Symbol("mappedField");
export function mapField(args?: MapField) {
  return Reflect.metadata(mappedField, args);
}
export class MapClass {}
export const mappedClass = Symbol("mappedClass");
export function mapClass(args?: MapClass) {
  return Reflect.metadata(mappedClass, args);
}
