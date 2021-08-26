import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongsHeaderComponent } from './playlist-songs-header.component';

describe('PlaylistSongsHeaderComponent', () => {
  let component: PlaylistSongsHeaderComponent;
  let fixture: ComponentFixture<PlaylistSongsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSongsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
