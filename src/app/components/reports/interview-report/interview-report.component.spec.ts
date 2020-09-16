import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewReportComponent } from './interview-report.component';

describe('InterviewReportComponent', () => {
  let component: InterviewReportComponent;
  let fixture: ComponentFixture<InterviewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
