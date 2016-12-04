import {Component,OnInit}                  from "angular2/core";
import {FormBuilder,ControlGroup, Validators,Control}   from "angular2/common";
import {BasicValidators } from "./basicvalidators";
import {CanDeactivate,Router,RouteParams } from "angular2/router"
import {UsersService } from "./users.service";
import {Address,User}              from "./user"
import {EmailComponent}   from './email.component'

@Component({
    templateUrl : "app/user-form.component.html",
    providers: [UsersService],
    directives : [EmailComponent]
})
export class UserFormComponent implements OnInit,CanDeactivate{
    form : ControlGroup;
    title: string;
    user = new User();
   
    constructor(
        private fb:FormBuilder,
        private userService : UsersService,
        private router : Router,
        private routeparams : RouteParams
    ){

    }
    ngOnInit(){
        this.form = this.fb.group({
                name : ['',Validators.required],
                 email : [],
                phone : [],
                address : this.fb.group({
                    street: [],
                    suite: [],
                    city: [],
                    zipcode: []
                })
            }
        );
        var id =this.routeparams.get('id');
        if(id){
            this.title="Edit User";
            this.edit(id);

        }
        else{
            this.title="New User";
        }

    }
    routerCanDeactivate(){
      
        if(this.form.dirty){
            return confirm("Changes are made to this form? do you want to Leave anyway");
        }
        return true;
    }
    save(myemail){
        console.log(this.form);
        return;
        this.userService
            .addUser(this.form.value)
            .subscribe(x =>  this.router.navigate(['Users']) );
    }

    edit(id){

       this.userService
            .editUser(id)
            .subscribe(user => this.user = user,
                        response => {
                            if(response.status==404){
                                this.router.navigate(['NotFound']);
                            }
                        }
            );
    }
}   