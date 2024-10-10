import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungComponent } from './young.component';

describe('YoungComponent', () => {
  let component: YoungComponent;
  let fixture: ComponentFixture<YoungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoungComponent]
    });
    fixture = TestBed.createComponent(YoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
