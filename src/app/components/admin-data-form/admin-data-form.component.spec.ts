import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataFormComponent } from './admin-data-form.component';

describe('AdminDataFormComponent', () => {
  let component: AdminDataFormComponent;
  let fixture: ComponentFixture<AdminDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
