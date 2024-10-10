import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtStJosephComponent } from './kt-st-joseph.component';

describe('KtStJosephComponent', () => {
  let component: KtStJosephComponent;
  let fixture: ComponentFixture<KtStJosephComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KtStJosephComponent]
    });
    fixture = TestBed.createComponent(KtStJosephComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
