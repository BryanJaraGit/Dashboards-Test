import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasjsComponent } from './canvasjs.component';

describe('CanvasjsComponent', () => {
  let component: CanvasjsComponent;
  let fixture: ComponentFixture<CanvasjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
