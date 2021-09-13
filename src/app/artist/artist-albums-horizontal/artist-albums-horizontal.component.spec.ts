import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumsHorizontalComponent } from './artist-albums-horizontal.component';

describe('ArtistAlbumsHorizontalComponent', () => {
  let component: ArtistAlbumsHorizontalComponent;
  let fixture: ComponentFixture<ArtistAlbumsHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistAlbumsHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumsHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
