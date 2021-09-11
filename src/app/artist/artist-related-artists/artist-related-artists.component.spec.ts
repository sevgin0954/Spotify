import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRelatedArtistsComponent } from './artist-related-artists.component';

describe('ArtistRelatedArtistsComponent', () => {
  let component: ArtistRelatedArtistsComponent;
  let fixture: ComponentFixture<ArtistRelatedArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistRelatedArtistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistRelatedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
