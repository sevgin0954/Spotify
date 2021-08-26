import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedArtistsComponent } from './saved-artists.component';

describe('SavedArtistsComponent', () => {
  let component: SavedArtistsComponent;
  let fixture: ComponentFixture<SavedArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedArtistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
