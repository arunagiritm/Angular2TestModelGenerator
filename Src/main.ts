import {parse } from './visitor'
import {readFileSync} from "fs";
import * as ts from "typescript";

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    console.log(fileName);
    // Parse a file
    let sourceFile = ts.createSourceFile(fileName, readFileSync(fileName).toString(), ts.ScriptTarget.ES6, /*setParentNodes */ true);

    // delint it
    parse(sourceFile);
});