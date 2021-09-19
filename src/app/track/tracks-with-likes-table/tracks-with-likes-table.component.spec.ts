import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksWithLikesTableComponent } from './tracks-with-likes-table.component';

describe('TracksWithLikesTableComponent', () => {
  let component: TracksWithLikesTableComponent;
  let fixture: ComponentFixture<TracksWithLikesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksWithLikesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksWithLikesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
