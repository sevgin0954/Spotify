import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-section-row',
  templateUrl: './section-row.component.html',
  styleUrls: ['./section-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionRowComponent {
  @Input()
  elements: any[] = [];

  @Input()
  template: TemplateRef<any>;
}