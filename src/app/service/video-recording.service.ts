import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as RecordRTC from "recordrtc";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";

declare const navigator: any;
@Injectable()
export class VideoRecordingService {
  private mediaStream: any;   
  private recorder: any;  
  private blob: any;  
  private _mediaStream = new Subject<any>(); 
  private _blob = new Subject<any>();    
  private apiServerUrl=environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getMediaStream():Observable<any> {
    return this._mediaStream.asObservable();
  }

  getBlob(): Observable<any> {
    return this._blob.asObservable();
  }

  startRecording():void {
    this.handleRecording();
  }

  async handleRecording(): Promise<void>{
    alert('Please select this current window to validate the step of recording wich is mandatory to achieve the test !');
    // this.mediaStream = await navigator.mediaDevices.getDisplayMedia({
    //   "cursor": "always",
    //   "displaySurface": "'monitor'",
    //   "logicalSurface": true,
    //   audio: true,
    //   video: true
    // });

    ////////
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      "cursor": "always",
      "displaySurface": "'monitor'",
      "logicalSurface": true,
      video: true
    });
      // Get the audio stream
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  // Combine the screen and audio streams
  const mixedStream = new MediaStream();
  screenStream.getTracks().forEach((track: MediaStreamTrack) => mixedStream.addTrack(track));
  audioStream.getTracks().forEach((track: MediaStreamTrack) => mixedStream.addTrack(track));
  this.mediaStream = mixedStream;

  ///////////
    this._mediaStream.next(this.mediaStream);
    // this.recorder = new RecordRTC(this.mediaStream, { type: 'video'});
        this.recorder = new RecordRTC(mixedStream, { type: 'video'});

    this.recorder.startRecording();
  }
  
  stopRecording():void {
    if (!this.recorder) {
      return;
    }
    this.recorder.stopRecording(() => {
      this.blob = this.recorder.getBlob();
      this._blob.next(URL.createObjectURL(this.blob));
      this.mediaStream.stop();
      this.recorder.destroy();
      this.mediaStream = null;
      this.recorder = null;
    })
  }
  
  saveVideo(file: Blob, name: string): void {
    const formData = new FormData();
    formData.append('file', file, name);
    formData.append('name', name); 
  
    this.http.post(`${this.apiServerUrl}`, formData).subscribe(
      response => {
        console.log('Video saved successfully!', response);
      },
      error => {
        console.error('Error saving video:', error);
      }
    );
  }
  
  getAllVideos(): Promise<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/videoBlobStorage`).toPromise();
  }

  submitRecording(): void {
    if (this.blob) {
      const fileName = `${Date.now()}.webm`;
      const formData = new FormData();
      formData.append('file', this.blob, fileName);
      this.http.post(`${this.apiServerUrl}/upload`, formData).subscribe(
        (response) => {
          console.log('Video uploaded successfully:', response);
        },
        (error) => {
          console.error('Failed to upload video:', error);
        }
      );
    } else {
      console.error('No video recorded.');
    }
  }
  
}
