
import {readFileSync} from "fs";
import * as ts from "typescript";
import { Angular2Model, ParameterModel, ClassModel, DecoratorModel, MethodModel, ReturnTypeModel, InputModel } from './model/angular2.model';
import * as util from 'util';

export function parse(sourceFile: ts.SourceFile) {
    let angular2Class = {
        decorators: {
            component: {
                name: '',
                moduleId: '',
                selector: '',
                templateUrl: '',
                styleUrls: [],
                providers: []
            },
            input: [],
            output: [] 
        },
        class: {
            name: '',
            constructor: {
                parameters: []
            },
            methods: []
        }
    }
    
    let component = angular2Class.decorators.component;
    let decorators = angular2Class.decorators;
    let parseClass = angular2Class.class;
    let parseMethods = angular2Class.class.methods;
    let parseMethodModel: MethodModel = {
        name: '',
        decorator:'',
        parameters: [],
        returnType: {
            name: '',
            type: ''
        }
    }
    let parseParameterModel: ParameterModel = {
        name: '',
        type: ''
    };
    
    delintNode(sourceFile);
    console.log(JSON.stringify(angular2Class));
    function delintNode(node: ts.Node) {
        //  console.log(`${node} : ${node.kind}`);
        let propertyType: Object;
        switch (node.kind) {
            case ts.SyntaxKind.ImportEqualsDeclaration:
                console.log(node);
            case ts.SyntaxKind.ClassDeclaration:
                angular2Class.class.name = node.name.text;
                console.log(`Class Name : ${node.name.text}`);
                node.decorators.forEach(decorator => {
                    component.name = decorator.expression.expression.text;
                    console.log(`Decorator name : ${decorator.expression.expression.text}`);
                    decorator.expression.arguments.forEach(argument => {
                        argument.properties.forEach(property => {
                            console.log(`property name: ${property.name.text} `);
                            if (property.initializer.name) {
                                if (component[property.name.text].length > 0) {
                                    component[property.name.text] += ',' + property.initializer.name.text;
                                } else {
                                    component[property.name.text] = property.initializer.name.text;
                                }

                                console.log(`value : ${property.initializer.name.text}`);
                            }
                            else if (property.initializer.elements) {
                                property.initializer.elements.forEach(element => {
                                    if (component[property.name.text].length > 0) {
                                        component[property.name.text] += ',' + element.text;
                                    } else {
                                        component[property.name.text] = element.text;
                                    }
                                    console.log(`value : ${element.text}`)
                                });
                            }
                            else {
                                component[property.name.text] = property.initializer.text;
                                console.log(`value : ${property.initializer.text}`)
                            }
                        });
                    });
                });
                node.members.forEach(member => {
                    let parseMethodModelLocal = JSON.parse(JSON.stringify(parseMethodModel));
                    if (member.name) {
                        parseMethodModelLocal.name = member.name.text;
                        console.log(`Member name: ${member.name.text}`);
                    } else if (member.kind == ts.SyntaxKind.Constructor) {
                        parseMethodModelLocal.name = 'constructor';
                        console.log(`Member name: constructor`);
                    }
                    if (member.decorators && member.decorators.length > 0) {
                        member.decorators.forEach(decorator => {
                            parseMethodModelLocal.decorator = decorator.expression.expression.text;
                            console.log(`Decorator type: ${decorator.expression.expression.text}`);
                        });
                        if (member.type && member.type.typeName){
                            parseMethodModelLocal.returnType = member.type.typeName.text;
                            console.log(`return type: ${member.type.typeName.text}`);
                        }
                    } else if (member.type) {
                        parseMethodModelLocal.returnType = member.type.kind.toString();
                        console.log(`return type: ${member.type.kind}`)
                    }
                    if (member.parameters) {
                        member.parameters.forEach(parameter => {
                            let parseParameterModelLocal = JSON.parse(JSON.stringify(parseParameterModel));
                            parseParameterModelLocal.name = parameter.name.text;
                            console.log(`Parameter name:  ${parameter.name.text}`);
                            if (parameter.type) {
                                parseParameterModelLocal.type = parameter.type.kind.toString();
                                console.log(`Parameter type:  ${parameter.type.kind}`);
                            }
                            parseMethodModelLocal.parameters.push(parseParameterModelLocal);

                        });
                    };

                    parseMethods.push(parseMethodModelLocal);

                });
                break;


        }

        ts.forEachChild(node, delintNode);
    }

    function report(node: ts.Node, message: string) {
        let { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
    }
}



