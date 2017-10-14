import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { style, state, animate, transition, trigger } from '@angular/core';

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

  musicSources = [
    {
      title: "Summer' 78",
      author: 'Yann Tiersen (DG Cover)',
      album: 'N/A',
      src: './assets/summer.mp3'
    },
    {
      title: "Arrivals N.2",
      author: "Dustin O'Halloran (DG Cover)",
      album: 'N/A',
      src: './assets/arrivals.mp3'
    }
  ]

  userData;
  constructor( ) {
    Observable.interval( 1000 ).subscribe( x => {
      this.value( )
    });
    this.userData = JSON.parse( JSON.parse( localStorage.getItem( 'userData' ) )._body )
  }

  ngOnInit( ) {
    let audio = this.myAudio.nativeElement;
    audio.src = this.musicSources[ 0 ].src;
    this.currentIndex = 0;
    //for ( var i = 0; i < 20; i++ ) {
    //  this.musicSources.push( this.musicSources[ 0 ] )
    //}
  }

  playMusic( index ) {
    let audio = this.myAudio.nativeElement;

    if ( this.currentIndex != index ) {
      audio.src = this.musicSources[ index ].src;
      this.currentIndex = index;
    }

    if ( audio.paused ) {
      audio.play( )
      this.paused = false
    }
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
    let audio = this.myAudio.nativeElement;
    this.currentIndex = ( this.currentIndex + 1 ) % this.musicSources.length;
    audio.src = this.musicSources[ this.currentIndex ].src;
    if ( !this.paused )
      audio.play( )
  }

  prevSong( ) {
    let audio = this.myAudio.nativeElement;
    if ( this.currentIndex > 0 )
      this.currentIndex = ( this.currentIndex - 1 )
    else
      this.currentIndex = ( this.musicSources.length - 1 )
    audio.src = this.musicSources[ this.currentIndex ].src;
    if ( !this.paused )
      audio.play( )
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

}
