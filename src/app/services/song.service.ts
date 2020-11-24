import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Song} from "../models/song";

@Injectable()
export class SongService {
  public url: string;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addSong(token, song: Song){
    let params = JSON.stringify(song);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this.http.post(this.url+"song", params, {headers: headers})
}
 

  getSongs(token, almbunId=null){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });
    if(almbunId==null){
      return this.http.get(this.url + "songs/", {headers: headers})
    }else{
        return this.http.get(this.url + "songs/"+almbunId, {headers: headers})
    }
    
  }

  getSong(token, id: string){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.get(this.url + "song/" + id, {headers: headers})
     
  }
  editSong(token, id:string , song: Song){
    let params = JSON.stringify(song);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });
  
    return this.http.put(this.url+"song/" + id, params, {headers: headers})
  }

  deleteSong(token, id: string){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.delete(this.url + "song/" + id, {headers: headers})
  }
  

}