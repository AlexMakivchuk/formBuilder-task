import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNdropComponent } from './drag-n-drop.component';

describe('DragNdropComponent', () => {
  let component: DragNdropComponent;
  let fixture: ComponentFixture<DragNdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragNdropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
