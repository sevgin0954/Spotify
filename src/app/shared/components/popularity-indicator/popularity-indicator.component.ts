import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isInRange from '../../decorators/isInRange';

@Component({
  selector: 'app-popularity-indicator',
  templateUrl: './popularity-indicator.component.html',
  styleUrls: ['./popularity-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularityIndicatorComponent {
  @Input()
  @isInRange(1, 5)
  popularityCount: number;
}
