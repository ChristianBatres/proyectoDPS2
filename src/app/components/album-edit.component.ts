import { Component, OnInit} from "@angular/core";
import { Router,ActivatedRoute, Params } from "@angular/router";

import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { AlbumService } from "../services/album.service";
import { UploadService } from "../services/upload.service";
import { Artist } from "../models/artist";
import { Album } from "../models/album";

@Component({
  selector: "album-edit",
  templateUrl: "../views/album-edit.html",
  providers: [UserService,AlbumService, UploadService]
})

export class AlbumEditComponent implements  OnInit {
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public editAlbumFormMessage;
  public is_edit;

  constructor(private _route:ActivatedRoute,private _uploadService:UploadService,private _router: Router, private _userService: UserService, private _albumService: AlbumService){
    this.titulo = "Editar album";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album("","","","2020","","");
    this.is_edit=true;
  }
  ngOnInit(){
    console.log("album-add.component.ts cargando");
   this.getAlbum();
  }
  

  getAlbum(){
    let success = function (response) {
      if(!response.album){
        this._router.navigate(["/"]);
      }
      else{
        this.album = response.album;
      }
    };

    let error = function (error) {
      let errorMessage = <any>error;
      if(errorMessage){
        this.editAlbumFormMessage = JSON.parse(errorMessage._body).message;
      }
    };

    this._route.params.forEach(function (params: Params) {
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(success.bind(this), error.bind(this));
    }.bind(this));
  }

  onSubmit(){
    let error = function (error) {
      let errorMessage = <any>error;
      if(errorMessage){
        this.editAlbumFormMessage = JSON.parse(errorMessage._body).message;
      }
    };

    
    this._route.params.forEach(function (params: Params) {
      let id = params['id'];
      let token = this.token;

      let success = function () {
        this.editAlbumFormMessage = "Album editado con éxito";

        if(!this.filesToUpload){
          this._router.navigate(["/artista",this.album.artist._id]);
          return;
        }

        this._uploadService.makeFileRequest(this.url + 'upload-image-album/'+id, this.filesToUpload, token, "image")
          .then(function () {
            this._router.navigate(["/artista",this.album.artist._id]);
          }.bind(this), error.bind(this));
      };

      this._albumService.editAlbum(this.token, id, this.album).subscribe(success.bind(this), error.bind(this));
    }.bind(this));
    
  }

  fileChangeEvent(fileInput){
    this.filesToUpload = <Array<File>> fileInput.target.files;

  }
}
