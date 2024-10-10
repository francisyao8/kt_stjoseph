import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechumeneComponent } from './catechumene.component';

describe('CatechumeneComponent', () => {
  let component: CatechumeneComponent;
  let fixture: ComponentFixture<CatechumeneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechumeneComponent]
    });
    fixture = TestBed.createComponent(CatechumeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
