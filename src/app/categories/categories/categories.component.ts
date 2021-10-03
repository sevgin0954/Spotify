import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Category } from 'src/app/models/category/category';
import { RouteConstants } from 'src/app/shared/constants/route-constants';
import { PageArguments } from 'src/app/shared/page-arguments';
import { CategoryService } from '../services/category.service';

const CATEGORIES_DISPLAY_LIMIT = 50;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService
  ) { }

  getCategoryRoute(category: Category): string {
    const categoryName = category.id;
    return `/${RouteConstants.CATEGORY_PLAYLISTS_BASE}/${categoryName}`;
  }

  ngOnInit(): void {
    const pageArgs = new PageArguments(CATEGORIES_DISPLAY_LIMIT);
    this.categories$ = this.categoryService.getCategories(pageArgs).pipe(
      pluck('items')
    );
  }
}