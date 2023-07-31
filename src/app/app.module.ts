import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoRecordingService } from './service/video-recording.service';
import { HttpClientModule } from '@angular/common/http';
import { RecordComponent } from './record/record.component';
import { VideosComponent } from './videos/videos.component';
import { UploadComponent } from './upload/upload.component';
@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    VideosComponent,
    UploadComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [VideoRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
