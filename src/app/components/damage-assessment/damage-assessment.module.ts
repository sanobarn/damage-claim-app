import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes   } from './damage-assessment.routes';
import { DamageAssessmentService } from './damage-assessment.service';

export const DamageAssessmentModule: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DamageAssessmentService]
};