import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaylistsShortComponent } from './category-playlists-short.component';

describe('CategoryPlaylistsShortComponent', () => {
  let component: CategoryPlaylistsShortComponent;
  let fixture: ComponentFixture<CategoryPlaylistsShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPlaylistsShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPlaylistsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
