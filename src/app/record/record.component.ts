import { ChangeDetectorRef, Component,ViewChild } from '@angular/core';
import { VideoRecordingService } from '../service/video-recording.service';
import { DomSanitizer } from '@angular/platform-browser';

type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})

export class RecordComponent   {
  @ViewChild('videoElement') videoElement: any;
  videoBlobUrl: any = null;
  video: any;
  state: RecordingState = 'NONE';
  selectedFile: File | null;
  show =false ;
  
  constructor(
    private videoRecordingService: VideoRecordingService,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
    this.videoRecordingService.getMediaStream().subscribe((data) => {
      this.video.srcObject = data;
      this.ref.detectChanges();
    });
    this.videoRecordingService.getBlob().subscribe((data:any) => {
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
      this.video.srcObject = null;
      this.ref.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;
  }

  startRecording() {
    this.videoRecordingService.startRecording();
    this.state = 'RECORDING';
  }

  stopRecording() {
    this.videoRecordingService.stopRecording();
    this.state = 'RECORDED';
  }
 
  submitRecording(){
    this.videoRecordingService.submitRecording();
  }

}
