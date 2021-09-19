import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksWithLikesTableShortComponent } from './tracks-with-likes-table-short.component';

describe('TracksWithLikesTableShortComponent', () => {
  let component: TracksWithLikesTableShortComponent;
  let fixture: ComponentFixture<TracksWithLikesTableShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksWithLikesTableShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksWithLikesTableShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
