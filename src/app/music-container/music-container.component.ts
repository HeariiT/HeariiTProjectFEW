import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-music-container',
  templateUrl: './music-container.component.html',
  styleUrls: ['./music-container.component.css']
})
export class MusicContainerComponent implements OnInit {

  @ViewChild( 'myAudio' ) myAudio: any;
  @ViewChild( 'musicSlider' ) mySlider: any;

  user = 'djguzmanc'
  paused = false;
  currentIndex = -1;
  time="0:00";

  musicSources = [
    {
      title: "Summer' 78",
      author: 'Yann Tiersen (DG Cover)',
      src: './assets/summer.mp3'
    },
    {
      title: "Arrivals N.2",
      author: "Dustin O'Halloran (DG Cover)",
      src: './assets/arrivals.mp3'
    }
  ]

  constructor( ) {
    Observable.interval( 1000 ).subscribe( x => {
      this.value( )
    });
  }

  ngOnInit() {
  }

  playMusic( index ) {
    let audio = this.myAudio.nativeElement;
    if ( this.currentIndex != index ) {
      audio.src = this.musicSources[ index ].src;
      this.currentIndex = index;
    }
    if ( audio.paused )
      audio.play( )
    else
      audio.pause( )
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

    var minutes = Math.floor( audio.currentTime / 60 )
    var seconds = Math.floor( audio.currentTime - minutes * 60 )
    return minutes + ":" + seconds
  }

  value( ) {
    let audio = this.myAudio.nativeElement;
    this.time = this.timeToString( )
    return audio.currentTime
  }

}
