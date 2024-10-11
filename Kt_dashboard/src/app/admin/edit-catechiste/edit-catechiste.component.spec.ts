import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatechisteComponent } from './edit-catechiste.component';

describe('EditCatechisteComponent', () => {
  let component: EditCatechisteComponent;
  let fixture: ComponentFixture<EditCatechisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCatechisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCatechisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
