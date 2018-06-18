import { required, mapClass, mapField } from "../annotation/model-annotation";
@mapClass()
export class PersonalInfo {
    @required("{a=1}")
    @mapField()
    name:string
    age:number
    sex:string
    birthDay:Date

}
