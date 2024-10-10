import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechumenInfoComponent } from './catechumen-info.component';

describe('CatechumenInfoComponent', () => {
  let component: CatechumenInfoComponent;
  let fixture: ComponentFixture<CatechumenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechumenInfoComponent]
    });
    fixture = TestBed.createComponent(CatechumenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
