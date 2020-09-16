import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCardComponent } from './reject-card.component';

describe('RejectCardComponent', () => {
  let component: RejectCardComponent;
  let fixture: ComponentFixture<RejectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
