import { Component, OnInit } from '@angular/core';
import { loadPlaylistsCallback } from 'src/app/playlists/types';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { Category as CategoryEnum } from '../../shared/enums/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadCategoriesPlaylistsCallbacks: loadPlaylistsCallback[] = [];
  loadFuturedPlaylistsCallback: loadPlaylistsCallback;
  categories: CategoryEnum[] = [];

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  getCategoryName(category: CategoryEnum): string {
    const categoryName = CategoryEnum[category].split('_').join(' ');
    return categoryName;
  }

  ngOnInit(): void {
    this.initializeCategoriesPlaylistsCallbacks();
    this.initializeFuturedPlaylistsCallback();
  }

  private initializeCategoriesPlaylistsCallbacks(): void {
    const categories: CategoryEnum[] = [];
    categories.push(CategoryEnum.toplists);
    categories.push(CategoryEnum.mood);
    categories.push(CategoryEnum.focus);

    categories.forEach(currentCategory => {
      this.categories.push(currentCategory);
      this.loadCategoriesPlaylistsCallbacks.push(() => {
        return this.playlistService.getByCategory(currentCategory, this.playlistLoadLimit);
      });
    });
  }

  private initializeFuturedPlaylistsCallback(): void {
    this.loadFuturedPlaylistsCallback = () => {
      return this.playlistService.getFutured(this.playlistLoadLimit);
    }
  }
} 
