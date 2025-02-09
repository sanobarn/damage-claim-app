import { TestBed } from '@angular/core/testing';

import { DamageAssessmentService } from './damage-assessment.service';

describe('DamageAssessmentService', () => {
  let service: DamageAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
