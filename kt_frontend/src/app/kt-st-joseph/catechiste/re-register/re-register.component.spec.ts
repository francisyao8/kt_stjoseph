import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRegisterComponent } from './re-register.component';

describe('ReRegisterComponent', () => {
  let component: ReRegisterComponent;
  let fixture: ComponentFixture<ReRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReRegisterComponent]
    });
    fixture = TestBed.createComponent(ReRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
