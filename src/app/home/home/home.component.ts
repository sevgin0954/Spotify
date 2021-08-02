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
    return CategoryEnum[category];
  }

  ngOnInit(): void {
    this.categories.push(CategoryEnum.Mood);
    //this.categories.push(CategoryEnum.Focus);
  }
}
