import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFitUnescapedComponent } from './text-fit-unescaped.component';

describe('TextFitUnescapedComponent', () => {
  let component: TextFitUnescapedComponent;
  let fixture: ComponentFixture<TextFitUnescapedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFitUnescapedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFitUnescapedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
