import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaylistsFuturedShortComponent } from './category-playlists-futured-short.component';

describe('CategoryPlaylistsFuturedShortComponent', () => {
  let component: CategoryPlaylistsFuturedShortComponent;
  let fixture: ComponentFixture<CategoryPlaylistsFuturedShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPlaylistsFuturedShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPlaylistsFuturedShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
