import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTableShortComponent } from './tracks-table-short.component';

describe('TracksTableShortComponent', () => {
  let component: TracksTableShortComponent;
  let fixture: ComponentFixture<TracksTableShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksTableShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksTableShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
