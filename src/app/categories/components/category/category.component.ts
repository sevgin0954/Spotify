import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  @Input()
  category: Category
}
