import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './global';
import { User } from '../models/user';

 

@Injectable()
export class UserService{
    public identity;
    public token;
    public url :string;
    constructor( public http: HttpClient ){
        this.url =GLOBAL.url;
    }
    signup(userToLogin, gethash = null): Observable<any>{ 
        if(gethash != null){
            userToLogin.gethash =gethash;
        }
        let json =JSON.stringify(userToLogin);   
        let params=json;

        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(this.url+'login',params,{headers:headers}); 
    }

    register(user_to_register): Observable<any>{
        let json =JSON.stringify(user_to_register);   
        let params=json;

        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(this.url+'register',params,{headers:headers}); 
    }

    updateUser(user_to_update):Observable<any>{

        let params = JSON.stringify(user_to_update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':this.getToken()
        });

        return this.http.put(this.url+'update-user/'+user_to_update._id,params,{headers:headers});
     
    }

    getIdentity(){
        let identity =JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity=identity;
        } else {
            this.identity=null;
        }
        return this.identity;
    }

    getToken(){
        let token =(localStorage.getItem('token'));
        if (token != "undefined") {
            this.token=token;
        } else {
            this.token=null;
        }
        return this.token;
    }
}