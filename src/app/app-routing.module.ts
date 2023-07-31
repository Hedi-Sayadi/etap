import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { VideosComponent } from './videos/videos.component';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
  { path: 'record-video', component: RecordComponent },
  { path: 'videos', component: VideosComponent},
  { path: 'upload', component: UploadComponent},
];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
