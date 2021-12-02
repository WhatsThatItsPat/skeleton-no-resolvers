import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, shareReplay, tap } from 'rxjs/operators';
import { Card, StoreIshService } from '../store-ish.service';

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss'],
})
export class SkeletonCardComponent implements OnInit {
  @Input() name: string;

  // Fake amount of items so the cards look different
  @Input() numberOfItems: number;

  mySelector$: Observable<Card>;
  isLoaded$: Observable<boolean>;
  hasError$: Observable<boolean>;
  data$: Observable<string>;

  constructor(
    private storeIsh: StoreIshService,
  ) { }

  ngOnInit() {

    this.mySelector$ = this.storeIsh.fakeSelector(this.name).pipe(
      tap(cardSelector => {
        // console.log(`SkCC>ngOnInit>cardSelector for ${this.name}`, cardSelector);
      }),
      // shareReplay()
    );

    this.isLoaded$ = this.mySelector$.pipe(
      map(cardSelector => !!cardSelector.data)
    );

    this.hasError$ = this.mySelector$.pipe(
      map(cardSelector => !!cardSelector.error)
    );

    this.data$ = this.mySelector$.pipe(
      map(cardSelector => cardSelector.data)
    );

  }

}
