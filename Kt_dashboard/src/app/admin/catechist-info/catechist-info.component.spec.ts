import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechistInfoComponent } from './catechist-info.component';

describe('CatechistInfoComponent', () => {
  let component: CatechistInfoComponent;
  let fixture: ComponentFixture<CatechistInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechistInfoComponent]
    });
    fixture = TestBed.createComponent(CatechistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
