import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaylistBasicComponent } from './category-playlist-basic.component';

describe('CategoryPlaylistBasicComponent', () => {
  let component: CategoryPlaylistBasicComponent;
  let fixture: ComponentFixture<CategoryPlaylistBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPlaylistBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPlaylistBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
