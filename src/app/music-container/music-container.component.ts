import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-container',
  templateUrl: './music-container.component.html',
  styleUrls: ['./music-container.component.css']
})
export class MusicContainerComponent implements OnInit {

  @ViewChild( 'myAudio' ) myAudio: any;

  user = 'djguzmanc'
  paused = false;
  currentIndex = -1;

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

  constructor() { }

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

}
