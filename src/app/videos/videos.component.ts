import { Component, OnInit } from '@angular/core';
import { VideoRecordingService } from '../service/video-recording.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: string[] = []; 
  private apiServerUrl=environment.apiBaseUrl

  constructor(private videoRecordingService: VideoRecordingService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos(): void {
    this.videoRecordingService.getAllVideos()
      .then((videos: string[]) => {
        this.videos = videos;
      })
      .catch((error: any) => {
        console.error('Error retrieving videos:', error);
      });
  }

  videoUrl(videoName: string): string {
    return `${this.apiServerUrl}/${videoName}`;
  }

}
