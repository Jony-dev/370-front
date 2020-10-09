import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistBookingComponent } from './assist-booking.component';

describe('AssistBookingComponent', () => {
  let component: AssistBookingComponent;
  let fixture: ComponentFixture<AssistBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
