import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { MATERIAL_MODULES } from '../../../material-module';
import { DamageAssessmentResponse } from '../models/assessment-response.model';
import { DamageAssessmentService } from '../damage-assessment.service';

@Component({
  selector: 'app-damage-list',
  standalone: true,
  imports: [ 
    RouterModule,
    CommonModule,
      ...MATERIAL_MODULES],
  templateUrl: './damage-list.component.html',
  styleUrl: './damage-list.component.css',
  providers: [DamageAssessmentService]
})
export class DamageListComponent implements OnInit {
  damageAssessments: DamageAssessmentResponse[] = [];  
  isLoading = true;  
  displayedColumns: string[] = ['claimId', 'fileName', 'description', 'uploadTimestamp', 'fileSize', 'fileType','download'];


  constructor(private damageAssessmentService: DamageAssessmentService) {}

  ngOnInit(): void {
    this.fetchDamageAssessments();
  }

  
  fetchDamageAssessments(): void {
    this.damageAssessmentService.getAllDamageAssessments().subscribe({
      next: (data: DamageAssessmentResponse[]) => {
        console.log('Fetched Data:', data);  // Debugging Output
        this.damageAssessments = data; 
        this.isLoading = false;  
      },
      error: (err) => {
        console.error('Error fetching damage assessments:', err);
        this.isLoading = false; 
      }
    });
  }

  openFile(fileName: string) {
    this.damageAssessmentService.getBlobUrl(fileName).subscribe({
      next: (sasUrl: string) => {
        if (sasUrl) {
          window.open(sasUrl, '_blank'); // Open the file in a new tab
        } else {
          console.error("No URL received");
        }
      },
      error: (err) => console.error("Error fetching file URL:", err)
    });
  }

  downloadFile(fileName: string) {
    this.damageAssessmentService.getBlobUrl(fileName).subscribe({
      next: (sasUrl: string) => {
        if (sasUrl) {
          fetch(sasUrl) // Fetch the file from the SAS URL
          .then(response => response.blob()) // Convert to Blob
          .then(blob => {
            const objectUrl = window.URL.createObjectURL(blob); // Create Object URL
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = fileName; // Set downloaded filename
            document.body.appendChild(a);
            a.click(); // Trigger the download
            document.body.removeChild(a);
            window.URL.revokeObjectURL(objectUrl); // Cleanup memory
          })
          .catch(error => console.error('Error downloading file:', error));
        } else {
          console.error('No download URL received');
        }
      },
      error: (err) => console.error('Error fetching file URL:', err)
    });
  }
  
  
}
