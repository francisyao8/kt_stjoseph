import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechisteReceivedComponent } from './catechiste-received.component';

describe('CatechisteReceivedComponent', () => {
  let component: CatechisteReceivedComponent;
  let fixture: ComponentFixture<CatechisteReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatechisteReceivedComponent]
    });
    fixture = TestBed.createComponent(CatechisteReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
