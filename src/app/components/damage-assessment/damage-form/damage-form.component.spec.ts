import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageFormComponent } from './damage-form.component';

describe('DamageFormComponent', () => {
  let component: DamageFormComponent;
  let fixture: ComponentFixture<DamageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
