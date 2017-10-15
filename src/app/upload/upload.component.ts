import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { SongManagementService } from '../services/song-management.service';
import { GlobalDataService } from '../services/global-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileName:string;
  fileList: FileList;
  file:File;
  fileReader: FileReader = new FileReader();
  uploadSongResponse$;

  uploadForm = new FormGroup({
    titl: new FormControl(null,[Validators.required]),
    attachment: new FormControl(null,[Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<UploadComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private songManService: SongManagementService,
                 private gbService: GlobalDataService) { }

  ngOnInit() {
  }

  fileChange(event) {
    this.fileList = event.target.files;
    if(this.fileList.length > 0) {
        this.file = this.fileList[0];
        this.fileName = this.file.name;
        console.log(this.file.type);
    }
  }

  onSubmit(){
    this.uploadSongResponse$ = this.songManService.uploadSong(this.uploadForm.value,this.file);
    this.uploadSongResponse$.subscribe(
      res => {
        if (res.status == 200){
          console.log( "OK: user posted!" )
        }
      },
      err => {
        console.log( err );
      },
      () => this.dialogRef.close()
    );
  }

}
