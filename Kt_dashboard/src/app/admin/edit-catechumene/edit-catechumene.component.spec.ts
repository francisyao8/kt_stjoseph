import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatechumeneComponent } from './edit-catechumene.component';

describe('EditCatechumeneComponent', () => {
  let component: EditCatechumeneComponent;
  let fixture: ComponentFixture<EditCatechumeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCatechumeneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCatechumeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
