import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerFrameComponent } from './messenger-frame.component';

describe('MessengerFrameComponent', () => {
  let component: MessengerFrameComponent;
  let fixture: ComponentFixture<MessengerFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
