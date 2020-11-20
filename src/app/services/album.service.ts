import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Album} from "../models/album";
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable()
export class AlbumService {
  public url: string;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url;
  }

// getAlbum(token, id:string){
  //let headers = new HttpHeaders({
    //'Content-Type': 'application/json',
    //'Authorization': token
  //});

  //let options=new RequestOptions({headers:headers});
  //return this.http.get(this.url+"album/"+id, options)
  //.map(res =>res.json); 
//}


/*
getAlbums(token, artistId=null){
  let headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": token
  });
  if (artistId==null) {
    return this.http.get(this.url + "artists/" , {headers: headers})
  } else {
    return this.http.get(this.url + "artists/"+artistId , {headers: headers})
  }
 
}
*/
/*
getAlbums(token, artistId = null){
  let headers = new HttpHeaders({
     'Content-Type':'application/json',
     'Authorization': token
  });

  if(artistId == null) {
    return this.http.get(this.url + 'albums', {headers: headers}).pipe(map(res => res));
  } else {
    return this.http.get(this.url + 'albums/' + artistId, {headers: headers}).pipe(map(res => res));
  }
}
*/

getAlbums(token, artistId = null){
  let headers = new HttpHeaders({
     'Content-Type':'application/json',
     'Authorization': token
  });

  if(artistId == null) {
    return this.http.get(this.url + 'albums', {headers: headers}).pipe(map(res => res));
  } else {
    return this.http.get(this.url + 'albums/' + artistId, {headers: headers}).pipe(map(res => res));
  }

}
deleteAlbum(token, id:string){
  let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
  });
  if(id == null) {
    return this.http.get(this.url + 'albums/', {headers: headers}).pipe(map(res => res));
  } else {
    return this.http.delete(this.url + 'album/' + id, {headers: headers}).pipe(map(res => res));
  }

}

getAlbum(token, id: string){
  let headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": token
  });

  return this.http.get(this.url + "album/" + id, {headers: headers})
   
}

editAlbum(token, id:string , album: Album){
  let params = JSON.stringify(album);
  let headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": token
  });

  return this.http.put(this.url+"album/" + id, params, {headers: headers})
}

  addAlbum(token, album: Album){
    let params = JSON.stringify(album);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.post(this.url+"album", params, {headers: headers})
  }

}