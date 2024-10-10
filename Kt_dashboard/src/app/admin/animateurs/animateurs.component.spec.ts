import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateursComponent } from './animateurs.component';

describe('AnimateursComponent', () => {
  let component: AnimateursComponent;
  let fixture: ComponentFixture<AnimateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimateursComponent]
    });
    fixture = TestBed.createComponent(AnimateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
