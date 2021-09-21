import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-popularity-indicator',
  templateUrl: './popularity-indicator.component.html',
  styleUrls: ['./popularity-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularityIndicatorComponent {
  @Input()
  popularityCount: number;
}
