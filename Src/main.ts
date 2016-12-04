import { Angular2Model } from './model/angular2.model';
import {parse } from './visitor'
import {readFileSync} from "fs";
import * as ts from "typescript";

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    console.log(fileName);
    let fileContent = readFileSync(fileName).toString();
    // Parse a file
    let sourceFile = ts.createSourceFile(fileName, fileContent, ts.ScriptTarget.ES6, /*setParentNodes */ true);
    
    // delint it
    let angular2Model:Angular2Model = parse(sourceFile);
    angular2Model.imports = fileContent.match(/import.*/g);
     console.log(JSON.stringify(angular2Model));
});