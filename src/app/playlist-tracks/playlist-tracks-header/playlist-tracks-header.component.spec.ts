import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTracksHeaderComponent } from './playlist-tracks-header.component';

describe('PlaylistSongsHeaderComponent', () => {
  let component: PlaylistTracksHeaderComponent;
  let fixture: ComponentFixture<PlaylistTracksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistTracksHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTracksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
