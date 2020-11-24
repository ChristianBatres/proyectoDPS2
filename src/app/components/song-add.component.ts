import { Component, OnInit} from "@angular/core";
import { Router,ActivatedRoute, Params } from "@angular/router";

import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { AlbumService } from "../services/album.service";
import { SongService } from "../services/song.service";
import { Album } from "../models/album";
import { Song } from "../models/song";

@Component({
  selector: "song-add",
  templateUrl: "../views/song-add.html",
  providers: [UserService, AlbumService,SongService]
})

export class SongAddComponent implements  OnInit {
  public titulo: string;
  public song: Song;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit=false;
  constructor(private _route:ActivatedRoute,private _router: Router, private _userService: UserService, private _songService: SongService, private _albumService: AlbumService){
    this.titulo = "Crear nuevo cancion";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song( 1 ,"","","","",);
  }
  ngOnInit(){
    console.log("songadd.component.ts cargando");
  }
  onSubmit(){
    this._route.params.forEach((params: Params) => 
    {
      let album_id= params['album'];
      this.song.album=album_id;
      let success = function (response) {
          if(!this.song){
            this.alertMessage="Error en el servidor"
          }
          else{
            
            this.song = response.song;
            this._router.navigate(["/editar-cancion", response.song._id ]);
            this.alertMessage='El album se ha creado';
          }
        };
        let error = function (error) {
          var errorMessage=<any>error;
          if (errorMessage != null) {
            var body =JSON.parse(error._body);
            this.alertMessage=body.message;
            console.log(error)
          }
        }
        this._songService.addSong(this.token, this.song).subscribe(success.bind(this), error.bind(this));
    });
  }}
