import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeComponent {
  @Input()
  isLiked: boolean;

  @Output()
  onLike = new EventEmitter<string>();
// TODO: Rename event on fallow
  @Output()
  onDislike = new EventEmitter<string>();

  onClickLike(): void {
    this.onLike.emit('like');
  }

  onClickDislike(): void {
    this.onDislike.emit('dislike');
  }
}
