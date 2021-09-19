import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTracksBodyComponent } from './album-tracks-body.component';

describe('AlbumTracksBodyComponent', () => {
  let component: AlbumTracksBodyComponent;
  let fixture: ComponentFixture<AlbumTracksBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumTracksBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTracksBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
