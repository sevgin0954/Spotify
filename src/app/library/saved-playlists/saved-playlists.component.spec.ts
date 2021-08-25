import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPlaylistsComponent } from './saved-playlists.component';

describe('SavedPlaylistsComponent', () => {
  let component: SavedPlaylistsComponent;
  let fixture: ComponentFixture<SavedPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
