import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import * as fileSaver from 'file-saver';

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
    // const blob = new Blob([JSON.parse(data.toString())], {type: 'application/json'});
    fileSaver.saveAs(data, 'filename.docx');
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  upload(event) {
    let formdata: FormData = new FormData();

    formdata.append('file', event.files[0]);

    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      responseType: 'blob'
    });

    this.http.request(req).subscribe(event => {
      if (event instanceof HttpResponse) {
        AppComponent.downloadFile((<Response> event.body));
      }
    });
    // this.http.post(this.url, event.files[0],
    //   {
    //     headers: {'Content-Type': 'multipart/form-data'}
    // }).subscribe((data: Response) => AppComponent.downloadFile(data));
  }
}
