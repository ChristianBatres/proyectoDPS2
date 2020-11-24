import { Component, OnInit} from "@angular/core";
import { Router,ActivatedRoute, Params } from "@angular/router";

import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
//import { AlbumService } from "../services/album.service";
import { UploadService } from "../services/upload.service";
import { Song } from "../models/song";
import { Album } from "../models/album";
import { SongService } from "../services/song.service";

@Component({
  selector: "song-edit",
  templateUrl: "../views/song-edit.html",
  providers: [UserService,SongService, UploadService]
})

export class SongEditComponent implements  OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public editSongFormMessage;
  public is_edit;

  constructor(private _route:ActivatedRoute,private _uploadService:UploadService,private _router: Router, private _userService: UserService, private _songService: SongService){
    this.titulo = "Editar Song";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,"","","","");
    this.is_edit=true;
  }
  ngOnInit(){
    console.log("song-edit.component.ts cargando");
   this.getSong();
  }
  

  getSong(){
    let success = function (response) {
      if(!response.song){
        this._router.navigate(["/"]);
      }
      else{
        this.song = response.song;
      }
    };

    let error = function (error) {
      let errorMessage = <any>error;
      if(errorMessage){
        this.editSongFormMessage = JSON.parse(errorMessage._body).message;
      }
    };

    this._route.params.forEach(function (params: Params) {
      let id = params['id'];

      this._songService.getSong(this.token, id).subscribe(success.bind(this), error.bind(this));
    }.bind(this));
  }

  onSubmit(){
    let error = function (error) {
      let errorMessage = <any>error;
      if(errorMessage){
        this.editSongFormMessage = JSON.parse(errorMessage._body).message;
      }
    };

    
    this._route.params.forEach(function (params: Params) {
      let id = params['id'];
      let token = this.token;

      let success = function () {
        this.editSongFormMessage = "Cancion editada con éxito";

        if(!this.filesToUpload){
          this._router.navigate(["/album",this.song.album]);
          return;
        }

   
        this._uploadService.makeFileRequest(this.url + 'upload-file-song/'+id, this.filesToUpload, token, "file")
          .then(function () {
            this._router.navigate(["/album",this.song.album._id]);
          }.bind(this), error.bind(this));
      };

      this._songService.editSong(this.token, id, this.song).subscribe(success.bind(this), error.bind(this));
    }.bind(this));
    
  }

  fileChangeEvent(fileInput){
    this.filesToUpload = <Array<File>> fileInput.target.files;

  }
}
