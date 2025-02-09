import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../material-module';
import { DamageAssessmentService } from '../damage-assessment.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { LoggerService } from '../../../shared/services/logger.service';

@Component({
  selector: 'app-damage-form',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
        ...MATERIAL_MODULES],
  templateUrl: './damage-form.component.html',
  styleUrl: './damage-form.component.css',
  providers: [DamageAssessmentService]
})
export class DamageFormComponent {
  [x: string]: any;
  assessmentForm: FormGroup;
  selectedFile: File | null = null;
  filePreviewUrl: SafeResourceUrl | null = null;
  fileType: 'image' | 'pdf' | null = null;
  uploadProgress: number = 0;
  isUploading = false;

  constructor(
    private fb: FormBuilder,
    private damageService: DamageAssessmentService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private logger: LoggerService
  ) {
    this.assessmentForm = this.fb.group({
      claimId: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith('image/') && fileType !== 'application/pdf') {
        this.showNotification('Invalid file type! Only images and PDFs are allowed.', 'error');
        return;
      }

      this.selectedFile = file;
      this.fileType = fileType.startsWith('image/') ? 'image' : 'pdf';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
      };

      reader.readAsDataURL(file);
      this.assessmentForm.patchValue({ file: file });
      this.assessmentForm.get('file')?.updateValueAndValidity();
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileInput({ target: { files } });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  

  clearFile(): void {
    this.selectedFile = null;
    this.filePreviewUrl = null;
    this.fileType = null;
    this.assessmentForm.patchValue({ file: null });
  }

  onSubmit(): void {
    if (this.assessmentForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('claimId', this.assessmentForm.value.claimId);
      formData.append('description', this.assessmentForm.value.description);
      formData.append('file', this.selectedFile);

      this.damageService.uploadDamageAssessment(formData).subscribe({
        next: (event) => {
          if (event.progress !== undefined) {
            this.logger.log("Upload Progress:" + event.progress);
            this.isUploading = true;
            this.uploadProgress = event.progress;  // Directly use progress percentage
          }
          
          if (event.response) {            
            this.clearFile(); 
            this.assessmentForm.reset({
              claimId: '',
              description: '',
              file: null
            });
            this.isUploading = false;
            this.showNotification('Upload Successful', 'success');
            this.logger.log('Server Response:'+ event.response);
          }
        },
        error: (error) => {
          this.isUploading = false; 
          this.logger.error(error);
          this.showNotification('Upload Failed', 'error');
        }
      });
    } else {
      this.showNotification('Please fill out all required fields', 'error');
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'center',  
      verticalPosition: 'top'  
    });
  }

  
}
