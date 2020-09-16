import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageReportComponent } from './stage-report.component';

describe('StageReportComponent', () => {
  let component: StageReportComponent;
  let fixture: ComponentFixture<StageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
