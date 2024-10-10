import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechisteComponent } from './catechiste.component';

describe('CatechisteComponent', () => {
  let component: CatechisteComponent;
  let fixture: ComponentFixture<CatechisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechisteComponent]
    });
    fixture = TestBed.createComponent(CatechisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
