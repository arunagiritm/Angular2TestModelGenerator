import {Component,Input} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators,FORM_DIRECTIVES,Control}   from "angular2/common";

import {BasicValidators} from './basicvalidators';

@Component({
    template : `
             <form>
             <div class="form-group">
                    <label>Email</label>
                    <input #email="ngForm" ngControl="email" type="text" class="form-control">
                    {{email.errors}}
                    <div *ngIf="email.touched && !email.valid" class="alert alert-danger">
                        Please type a valid email.
                    </div>
                </div>
            </form>
    `,
    selector : 'my-email'
   
    

})
export class EmailComponent{
    // @Input() usermail:string;
    form : ControlGroup;
    constructor(private fb:FormBuilder){
        this.form = fb.group({
            email : ['',Validators.required]
        });

    }
  

}