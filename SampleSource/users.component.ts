import { Component,OnInit } from 'angular2/core';
import {UsersService} from './users.service';
import {RouterLink} from 'angular2/router';


@Component({
   templateUrl: 'app/users.component.html',
   directives : [RouterLink],
   providers : [UsersService]
})
export class UsersComponent implements OnInit  {
    users : any[];
    constructor(private userService : UsersService ) { }
   
    ngOnInit(){
		this.userService.getUsers().subscribe(user => this.users = user);
        
    }
 
    deleteUser(user){
      if(confirm('do you want to delete this user ' + user.name)){
        var index = this.users.indexOf(user);
        this.users.splice(index,1);
        this.userService
            .deleteUser(user.id)
            .subscribe(null,err=>{
                this.users.splice(index,0,user);
            });
      }
    }  
    
}