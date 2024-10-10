import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatechumeneComponent } from './create-catechumene.component';

describe('CreateCatechumeneComponent', () => {
  let component: CreateCatechumeneComponent;
  let fixture: ComponentFixture<CreateCatechumeneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCatechumeneComponent]
    });
    fixture = TestBed.createComponent(CreateCatechumeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
