import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultComponent } from './adult.component';

describe('AdultComponent', () => {
  let component: AdultComponent;
  let fixture: ComponentFixture<AdultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdultComponent]
    });
    fixture = TestBed.createComponent(AdultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
