import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechumeneReceivedComponent } from './catechumene-received.component';

describe('CatechumeneReceivedComponent', () => {
  let component: CatechumeneReceivedComponent;
  let fixture: ComponentFixture<CatechumeneReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechumeneReceivedComponent]
    });
    fixture = TestBed.createComponent(CatechumeneReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
