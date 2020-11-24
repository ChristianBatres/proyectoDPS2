import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { AppComponent } from '../app.component';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { SongService } from '../services/song.service';


import { Song } from '../models/song';




@Component({
	selector: 'album-detail',
	templateUrl: '../views/album-detail.html',
	providers: [ UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit {
	public album: Album;
	public identity;
	public token;
	public url: string;
	public errorMessage;
	public albums: Album[];

	public songs: Song[];
	public confirmado;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _albumService: AlbumService,
	    private _songService: SongService,

        
        public app: AppComponent

	){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		this.getAlbum();

	}

	getAlbum(){
		
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._albumService.getAlbum(this.token, id).subscribe(
				response => {
					if(!response['album']) {
						this._router.navigate(['/']);
					} else {
						this.album = response['album'];
						// Obtener canciones del album
						
						this._songService.getSongs(this.token, response['album']._id).subscribe(
							response => {
								if(!response['songs']){
									console.log('Este album no tiene canciones');
								} else {
									this.songs = response['songs'];
								}
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
					var errorMessage = <any>error;
	                if(errorMessage != null){
	                	var body = JSON.parse(error._body);
	                    console.log(error.error.message);
	                }
	            }
			);
		});
		
	}

	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelSong(){
		this.confirmado = null;
	}

	onDeleteSong(id){
		this._songService.deleteSong(this.token, id).subscribe(
			response => {
				if(!response['entityName']) {
					alert('Cancion Eliminada correctamente');
				}
				this.getAlbum();
			},
			error => {
                if(error != null){
                    console.log(error.error.message);
                }
            }
		);
	}




	startPlayer(song){
		let song_player = JSON.stringify(song);
		let file_path = this.url + 'get-song-file/' + song.file;
		let image_path = this.url + 'get-image-album/' + song.album.image;

		localStorage.setItem('sound_song', song_player);
		document.getElementById("mp3-source").setAttribute("src",file_path);
		(document.getElementById("player") as any).load();
		(document.getElementById("player") as any).play();

		document.getElementById('play-song-title').innerHTML = song.name;
		document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
		document.getElementById('play-image-album').setAttribute('src',image_path);
	}


}