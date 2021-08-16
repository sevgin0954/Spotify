import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services-singleton/category-service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

const CATEGORIES_DISPLAY_LIMIT = 50;

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService
  ) { }

  getCategoryRoute(category: Category): string {
    const categoryName = category.id;
    return `/${RouteConstants.CATEGORY_PLAYLISTS_BASE}/${categoryName}`;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories(CATEGORIES_DISPLAY_LIMIT).pipe(
      pluck('items')
    );
  }
}
