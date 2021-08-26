import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongsBodyComponent } from './playlist-songs-body.component';

describe('PlaylistSongsBodyComponent', () => {
  let component: PlaylistSongsBodyComponent;
  let fixture: ComponentFixture<PlaylistSongsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSongsBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
