import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowColoredComponent } from './box-shadow-dynamic-colored.component';

describe('BoxShadowColoredComponent', () => {
  let component: BoxShadowColoredComponent;
  let fixture: ComponentFixture<BoxShadowColoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxShadowColoredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShadowColoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
