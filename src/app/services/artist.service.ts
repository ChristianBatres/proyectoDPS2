import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Artist} from "../models/artist";

@Injectable()
export class ArtistService {
  public url: string;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getArtists(token, page){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.get(this.url + "artists/" + page, {headers: headers})
  }

  getArtist(token, id: string){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.get(this.url + "artist/" + id, {headers: headers})
     
  }

  addArtist(token, artist: Artist){
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.post(this.url+"artist", params, {headers: headers})
  }

  editArtist(token, id:string , artist: Artist){
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.put(this.url+"artist/" + id, params, {headers: headers})
  }

  deleteArtistById(token, id: string){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.delete(this.url + "artist/" + id, {headers: headers})
  }
}