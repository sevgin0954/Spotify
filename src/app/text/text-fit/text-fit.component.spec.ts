import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFitComponent } from './text-fit.component';

describe('TextFitComponent', () => {
  let component: TextFitComponent;
  let fixture: ComponentFixture<TextFitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
