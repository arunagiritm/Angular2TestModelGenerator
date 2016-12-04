import {Injectable}             from "angular2/core";
import {Http}    from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService{
    url="https://jsonplaceholder.typicode.com/users";
    
    constructor(private http:Http){
       
    }
     editUser(id){
          return this.http
                .get(this.url +'/'+id)
                .map(res => res.json());

     }
     getUsers(){
          return this.http.get(this.url)
            .map(res => res.json());
     }
    

    addUser(user){
        return this.http.post(this.url,JSON.stringify(user))
            .map(res => res.json());
    }
    deleteUser(id){
        return this.http.delete(this.url + "/"+ id).map(res => res.json());
    }

}