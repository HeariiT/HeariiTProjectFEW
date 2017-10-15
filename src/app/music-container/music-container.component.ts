import { Component, OnInit, ViewChild } from '@angular/core';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { NewMatchComponent } from '../new-match/new-match.component';
import { Observable } from 'rxjs/Rx';
import { style, state, animate, transition, trigger } from '@angular/core';
import { SongManagementService } from '../services/song-management.service';
import { CategoryService } from '../services/category.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-music-container',
  templateUrl: './music-container.component.html',
  styleUrls: ['./music-container.component.css'],
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(250, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(250, style({opacity:0}))
        ])
    ])
  ]
})
export class MusicContainerComponent implements OnInit {

  @ViewChild( 'myAudio' ) myAudio: any;
  @ViewChild( 'musicSlider' ) mySlider: any;

  user = 'djguzmanc'
  paused = true;
  currentIndex = -1;
  time="0:00";
  diameter = 10;

  musicSources = []
  songRequested = false;
  downloadRequested = false;
  downloadIndex = -1;

  cache = []

  userData;
  constructor( private songService: SongManagementService, public dialog: MatDialog,
                 private catService: CategoryService ) {
    Observable.interval( 1000 ).subscribe( x => {
      this.value( )
    });

    if ( localStorage.getItem( 'userData' ) != null )
      this.userData = JSON.parse( JSON.parse( localStorage.getItem( 'userData' ) )._body )

    songService.getAllSongs( ).subscribe(
      res => {
        for ( var i = 0; i < res.json( ).length; i++ ) {
          this.musicSources.push({
            title: res.json( )[ i ].title,
            author: res.json( )[ i ].author,
            album: res.json( )[ i ].album,
            id: res.json( )[ i ].id
          })
        }
        if ( this.musicSources.length > 0 ) {
          this.songRequested = true
          let audio = this.myAudio.nativeElement;
          var song_id = this.musicSources[ 0 ].id;
          this.currentIndex = 0;
          this.songService.downloadSong( song_id ).subscribe(
            res => {
              var blob = res.blob( )
              audio.src = URL.createObjectURL( blob )
              this.addSongToCache({
                song_id: song_id,
                blob: blob
              })

              this.songRequested = false
            }
          )
        }
      }
    )
  }

  myControl: FormControl = new FormControl();
  options = [];
  categories_data =[]
  filteredOptions: Observable<string[]>;

  ngOnInit( ) {
    if ( localStorage.getItem( 'userData' ) != null )
      this.userData = JSON.parse( JSON.parse( localStorage.getItem( 'userData' ) )._body )
    this.catService.getDefaultCategories( ).subscribe(
      res => {
        this.categories_data = res.json( )
        this.catService.getUserCategories( ).subscribe(
          ans => {
            this.categories_data = this.categories_data.concat( ans.json( ) )
            this.options.push( 'All' )
            for ( var i = 0; i < this.categories_data.length; i++ )
              this.options.push( this.categories_data[ i ].category_name )
            this.filteredOptions = this.myControl.valueChanges
               .startWith( null )
               .map( val => val ? this.filter( val ) : this.options.slice( ) );
          }
        )
      }
    )
  }

  filter( val: string ): string[] {
    return this.options.filter(
      option => option.toLowerCase( ).indexOf( val.toLowerCase( ) ) === 0
    );
  }

  playMusic( index ) {
    if ( !this.songRequested && this.currentIndex != index ) {
      this.songRequested = true
      let audio = this.myAudio.nativeElement;
      audio.pause( )

      var song_id = this.musicSources[ index ].id;
      this.currentIndex = index;

      var cacheIndex = this.isOnCache( song_id )
      if ( cacheIndex != -1 ) {
        audio.src = URL.createObjectURL( this.cache[ cacheIndex ].blob )
        this.songRequested = false
        if ( audio.paused ) {
          audio.play( )
          this.paused = false
        }
      } else
        this.songService.downloadSong( song_id ).subscribe(
          res => {
            var blob = res.blob( )
            audio.src = URL.createObjectURL( blob )
            this.addSongToCache({
              song_id: song_id,
              blob: blob
            })

            this.songRequested = false

            if ( audio.paused ) {
              audio.play( )
              this.paused = false
            }
          }
        )
    }
  }

  download( index ) {
    if ( !this.downloadRequested ) {
      this.downloadRequested = true
      this.downloadIndex = index
      let audio = this.myAudio.nativeElement;
      var song_id = this.musicSources[ index ].id;

      var cacheIndex = this.isOnCache( song_id )
      if ( cacheIndex != -1 ) {
        FileSaver.saveAs( this.cache[ cacheIndex ].blob, this.createSongName( song_id ) )
        this.downloadRequested = false
      } else
        this.songService.downloadSong( song_id ).subscribe(
          res => {
            var blob = res.blob( )
            FileSaver.saveAs( blob, this.createSongName( song_id ) )
            this.addSongToCache({
              song_id: song_id,
              blob: blob
            })
            this.downloadRequested = false
          }
        )
    }
  }

  createSongName( song_id ) {
    var name = ""
    for ( var i = 0; i < this.musicSources.length; i++ )
      if ( this.musicSources[ i ].id == song_id ) {
        name += this.musicSources[ i ].title + " - ";
        name += this.musicSources[ i ].author + " ";
        break
      }
    return name + '.mp3'
  }

  audioEnded( ) {
    let audio = this.myAudio.nativeElement;
    return audio.ended
  }

  max( ) {
    let audio = this.myAudio.nativeElement;
    return audio.duration
  }

  timeToString( ) {
    let audio = this.myAudio.nativeElement;

    if ( audio.currentTime == 0 )
      return "0:00"

    if ( audio.currentTime == audio.duration ) {
      this.paused = false
      this.nextSong( )
      return "0:00"
    }

    var minutes = Math.floor( audio.currentTime / 60 )
    var seconds = Math.floor( audio.currentTime - minutes * 60 )
    if ( seconds < 10 )
      return minutes + ":0" + seconds
    return minutes + ":" + seconds
  }

  setCurrentTime( seconds ) {
    let audio = this.myAudio.nativeElement;
    audio.currentTime = seconds
  }

  value( ) {
    let audio = this.myAudio.nativeElement;
    this.time = this.timeToString( )
    return audio.currentTime
  }

  toggleAudio( ) {
    let audio = this.myAudio.nativeElement;
    if ( audio.paused ) {
      audio.play( )
      this.paused = false
    }
    else {
      audio.pause( )
      this.paused = true
    }
  }

  nextSong( ) {

    if ( !this.songRequested ) {
      this.songRequested = true
      this.currentIndex = ( this.currentIndex + 1 ) % this.musicSources.length;

      var song_id = this.musicSources[ this.currentIndex ].id;

      let audio = this.myAudio.nativeElement;
      audio.pause( )

      var cacheIndex = this.isOnCache( song_id )
      if ( cacheIndex != -1 ) {
        audio.src = URL.createObjectURL( this.cache[ cacheIndex ].blob )
        this.songRequested = false
        if ( !this.paused ) {
          audio.play( )
          this.paused = false
        }
      } else
        this.songService.downloadSong( song_id ).subscribe(
          res => {
            var blob = res.blob( )
            audio.src = URL.createObjectURL( blob )
            this.addSongToCache({
              song_id: song_id,
              blob: blob
            })
            if ( !this.paused ) {
              audio.play( )
              this.paused = false
            }
            this.songRequested = false
          }
        )
    }
  }

  prevSong( ) {
    if ( !this.songRequested ) {
      this.songRequested = true
      if ( this.currentIndex > 0 )
        this.currentIndex = ( this.currentIndex - 1 )
      else
        this.currentIndex = ( this.musicSources.length - 1 )
        var song_id = this.musicSources[ this.currentIndex ].id;

      let audio = this.myAudio.nativeElement;
      audio.pause( )

      var cacheIndex = this.isOnCache( song_id )
      if ( cacheIndex != -1 ) {
        audio.src = URL.createObjectURL( this.cache[ cacheIndex ].blob )
        this.songRequested = false
        if ( !this.paused ) {
          audio.play( )
          this.paused = false
        }
      } else
        this.songService.downloadSong( song_id ).subscribe(
          res => {
            var blob = res.blob( )
            audio.src = URL.createObjectURL( blob )
            this.addSongToCache({
              song_id: song_id,
              blob: blob
            })
            if ( !this.paused ) {
              audio.play( )
              this.paused = false
            }
            this.songRequested = false
          }
        )
    }
  }

  setVolume( v ) {
    let audio = this.myAudio.nativeElement;
    audio.volume = v / 100
  }

  stopSong( ) {
    let audio = this.myAudio.nativeElement;
    audio.pause( )
    this.paused = true
    audio.currentTime = 0
  }

  mute( ) {
    let audio = this.myAudio.nativeElement;
    audio.muted = !audio.muted
  }

  isOnCache( song_id ) {
    for ( var i = 0; i < this.cache.length; i++ )
      if ( this.cache[ i ].song_id == song_id )
        return i
    return -1
  }

  addSongToCache( obj ) {
    this.cache.push( obj )
    if ( this.cache.length > 5 )
      this.cache = this.cache.slice( 1, this.cache.length )
  }

  openNewCategory() {
    let dialogRef = this.dialog.open( NewCategoryComponent, {
        height: '210px',
        width: '300px'
    });
    dialogRef.afterClosed( ).subscribe(
      () => {
        this.categories_data = []
        this.options = []
        this.catService.getDefaultCategories( ).subscribe(
          res => {
            this.categories_data = res.json( )
            this.catService.getUserCategories( ).subscribe(
              ans => {
                this.categories_data = this.categories_data.concat( ans.json( ) )
                this.options.push( 'All' )
                for ( var i = 0; i < this.categories_data.length; i++ )
                  this.options.push( this.categories_data[ i ].category_name )
                this.filteredOptions = this.myControl.valueChanges
                   .startWith( null )
                   .map( val => val ? this.filter( val ) : this.options.slice( ) );
              }
            )
          }
        )
      }
    )
  }

  openNewMatch( index ) {
    this.catService.getCategoryForFile( this.musicSources[ index ].id ).subscribe(
      res => {
        let dialogRef = this.dialog.open( NewMatchComponent, {
            height: '230px',
            width: '300px'
        });
        dialogRef.componentInstance.res = res.json( )
        dialogRef.componentInstance.file_id = this.musicSources[ index ].id
      }
    )
  }

  categoryIdFrom( catName ) {
    for ( var i = 0; i < this.categories_data.length; i++ )
      if ( this.categories_data[ i ].category_name == catName )
        return this.categories_data[ i ].category_id
    return 'NotFound'
  }

  updateMusicResources( e ) {
    if ( e.option.value == 'All' ) {
      this.musicSources = []
      this.currentIndex = -1
      this.cache = []
      this.songService.getAllSongs( ).subscribe(
        res => {
          for ( var i = 0; i < res.json( ).length; i++ ) {
            this.musicSources.push({
              title: res.json( )[ i ].title,
              author: res.json( )[ i ].author,
              album: res.json( )[ i ].album,
              id: res.json( )[ i ].id
            })
          }
          if ( this.musicSources.length > 0 ) {
            this.songRequested = true
            let audio = this.myAudio.nativeElement;
            var song_id = this.musicSources[ 0 ].id;
            this.currentIndex = 0;
            this.songService.downloadSong( song_id ).subscribe(
              res => {
                var blob = res.blob( )
                audio.src = URL.createObjectURL( blob )
                this.addSongToCache({
                  song_id: song_id,
                  blob: blob
                })

                this.songRequested = false
              }
            )
          }
        }
      )
    }
    else
      this.catService.getFilesForCategory( this.categoryIdFrom( e.option.value ) ).subscribe(
        res => {
          this.musicSources = []
          this.cache = []
          for ( var i = 0; i < res.json( ).length; i++ ) {
            this.musicSources.push({
              title: res.json( )[ i ].title,
              author: res.json( )[ i ].author,
              album: res.json( )[ i ].album,
              id: res.json( )[ i ].id
            })
          }
          if ( this.musicSources.length > 0 ) {
            this.songRequested = true
            let audio = this.myAudio.nativeElement;
            var song_id = this.musicSources[ 0 ].id;
            this.currentIndex = 0;
            this.songService.downloadSong( song_id ).subscribe(
              res => {
                var blob = res.blob( )
                audio.src = URL.createObjectURL( blob )
                this.addSongToCache({
                  song_id: song_id,
                  blob: blob
                })

                this.songRequested = false
              }
            )
          } else {
            this.currentIndex = -1;
          }
        },
        error => {
          console.log( error )
        },
        () => {

        }
      )
  }

}
