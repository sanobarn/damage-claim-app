import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DamageAssessmentResponse } from './models/assessment-response.model';
import { Observable } from 'rxjs';


@Injectable()
export class DamageAssessmentService {
  private apiUrl = `${environment.apiBaseUrl}/damage-assessments`;
  constructor(private httpClient: HttpClient) { }


  // Fetch all damage assessments
  getAllDamageAssessments(): Observable<DamageAssessmentResponse[]> {
    return this.httpClient.get<DamageAssessmentResponse[]>(this.apiUrl);
  }

  uploadDamageAssessment(formData: FormData): Observable<any> {
    const uploadUrl = `${this.apiUrl}`; // Your file upload URL
    return this.httpClient.post<any>(uploadUrl, formData, {
      headers: new HttpHeaders(),
      observe: 'events',  // Observe all HTTP events (progress, response, etc.)
      reportProgress: true // Enable reporting of upload progress
    }).pipe(
      map((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload Progress Event:", event);
          return { progress: event.total ? Math.round((100 * event.loaded) / event.total) : 0 };
        } 
        if (event.type === HttpEventType.Response) {
          console.log("Upload Completed:", event.body);
          return { progress: 100, response: event.body as DamageAssessmentResponse };
        }
        return { progress: 0 }; // Default return value
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  getBlobUrl(fileName: string): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/getblob`, {
      params: { fileName }, 
      responseType: 'text' as 'json' 
    });
  }
}
