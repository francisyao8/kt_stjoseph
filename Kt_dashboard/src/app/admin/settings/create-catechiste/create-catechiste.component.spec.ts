import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatechisteComponent } from './create-catechiste.component';

describe('CreateCatechisteComponent', () => {
  let component: CreateCatechisteComponent;
  let fixture: ComponentFixture<CreateCatechisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCatechisteComponent]
    });
    fixture = TestBed.createComponent(CreateCatechisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
