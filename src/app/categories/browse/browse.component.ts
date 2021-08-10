import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services-singleton/category-service';

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

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll().pipe(
      pluck('items')
    );
  }
}
