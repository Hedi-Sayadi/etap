import { Component, OnInit } from '@angular/core';
import { VideoRecordingService } from '../service/video-recording.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null;

  constructor(private videoRecordingService: VideoRecordingService , private route:Router) { }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadVideo(): void {
    if (this.selectedFile) {
      const fileName = this.selectedFile.name;
      this.videoRecordingService.saveVideo(this.selectedFile, fileName);
    } else {
      console.error('No file selected.');
    }
    this.route.navigate(['videos'])
  }

}
