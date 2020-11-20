import { Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router,Params} from "@angular/router";

import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { Artist } from "../models/artist";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";
import { Album } from "../models/album";

@Component({
  selector: "artist-detail",
  templateUrl: "../views/artist-detail.html",
  providers: [UserService, ArtistService,AlbumService]
})

export class ArtistDetailComponent implements  OnInit {

  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public albums: Album[];
  public errorMessage;

  constructor(private _route: ActivatedRoute, 
    private _router: Router, 
    private _albumService: AlbumService,
    private _userService: UserService,
     private _artistService: ArtistService){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   

    
  }

  ngOnInit(){
    console.log("Ver artista");

    this.getArtist();
  }


  getArtist(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._artistService.getArtist(this.token, id).subscribe(
				response => {
					if(!response['artist']) {
						this._router.navigate(['/']);
					} else {
						this.artist = response['artist'];
            // Obtener albums del artista
           
						this._albumService.getAlbums(this.token, response['artist']._id).subscribe(
							response => {
                this.albums=response['albums'];

								//response['entityName'] ? (this.albums = response['entityName']) :
								//console.log('Este artista no tiene albums')
							},
							error => {
				                if(error != null){
				                    console.log(error.error.message);
				                }
				            }
						);
					}
				},
				error => {
	                if(error != null){
	                    this.errorMessage = error.error.message;
	                    console.log(this.errorMessage);
	                }
	            }
			);
		});
  }
  public confirmado;
  onDeleteConfirm(id){
      this.confirmado = id;
  }

  onCancelAlbum(){
      this.confirmado = null;
  }

  onDeleteAlbum(id){
		this._albumService.deleteAlbum(this.token, id).subscribe(
			response => {
				if(!response['album']) {
					alert('Error en el servidor');
				}
				this.getArtist();
			},
			error => {
                if(error != null){
                    console.log(error.error.message);
                }
            }
		);
	}
/*
  getArtist(){
    let success = function (response) {
      if(!response.artist){
        this._router.navigate(["/"]);
      }
      else{
        this.artist = response.artist;
        //sacando los albumes
        this._albumService.getAlbums(this.token, response.artist._id).subscribe(
          response=>{
          this.albums=response.albums;
            if (!response.albums) {
              
            } else {
              this.albums=response.albums;
            }
          }
        );
      }
    };

    let error = function (error) {
      let errorMessage = <any>error;
      if(errorMessage){
        this.editArtistFormMessage = JSON.parse(errorMessage._body).message;
      }
    };

    this._route.params.forEach(function (params: Params) {
      let id = params['id'];

      this._artistService.getArtist(this.token, id).subscribe(success.bind(this), error.bind(this));
    }.bind(this));
  }
  */
}
