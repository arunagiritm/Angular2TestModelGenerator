
export interface Angular2Model {
   decorators:DecoratorModel;
   class:ClassModel;
   imports:Array<string>;
}

export interface ClassModel{
    name: string;
    // constructor:constructorModel;
    methods:Array<MethodModel>;
}
export interface constructorModel{
     parameters:Array<ParameterModel>;
}
export interface MethodModel{
    name:string;
    decorator:string;
    parameters:Array<ParameterModel>;
    returnType: ReturnTypeModel;
}
export interface ReturnTypeModel{
     name: string;
     type: string;
}
export interface ParameterModel{
    name: string;
    type: string;
    typeName:string;
}
export interface DecoratorModel{
   component:ComponentModel;
   input: Array<string>;
   output: Array<string>;

}

export interface ComponentModel{
    name: string;
    moduleId: string;
    selector: string;
    templateUrl:string;
    styleUrls: Array<string>;
    providers: Array<string>;
}
export interface InputModel{
    name: string;
    type: string;
}