import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: HttpClient) {
  }

  title = 'checkMathClient';
  uploadedFiles: any[] = [];
  url: string = environment.baseUrl + 'recognition/uploadFile';

  static downloadFile(data: Response) {
    const blob = new Blob([JSON.parse(data.toString())], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  upload(event) {
    this.http.post(this.url, event.files[0]).subscribe((data: Response) => AppComponent.downloadFile(data));
  }
}
