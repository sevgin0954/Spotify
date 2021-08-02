import { Component, OnInit } from '@angular/core';
import { Category as CategoryEnum } from '../../shared/enums/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: CategoryEnum[] = [];

  getCategoryName(category: CategoryEnum): string {
    const categoryName = CategoryEnum[category].split('_').join(' ');
    return categoryName;
  }

  ngOnInit(): void {
    this.categories.push(CategoryEnum.toplists);
    this.categories.push(CategoryEnum.mood);
    this.categories.push(CategoryEnum.focus);
  }
}
