import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, map, shareReplay, tap } from 'rxjs/operators';

export interface Card {
  name: string;
  data: string;
  error: boolean;
}

interface Store {
  [ componentName: string ]: Card;
}

@Injectable({
  providedIn: 'root'
})
export class StoreIshService {

  private storeSubject = new BehaviorSubject<Store>(undefined);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public store$: Observable<Store> = this.storeSubject;

  constructor() {
    this.storeSubject.next({
      ...this.storeSubject.value,
      test: {
        // isLoading: true, ??
        name: 'TEST',
        data: this.timestamp(),
        error: false
      }
    });
  }

  /**
   * Kind of a fake selector combined with fake effect
   */
   fakeSelector(cardName: string) {
    return this.store$.pipe(
      map(store => store[cardName]),
      tap(selector => {
        // console.log(`does ${cardName} exist?:`, !!selector);
        if (!selector) {
          // console.log(`adding ${cardName}`);
          this.loadCard(cardName);
        }
      }),
      // Prevent initial empty value from getting through
      filter(selector => !!selector),
      shareReplay(),
    );
  }

  loadCard(cardName){
    console.log(`loadCard() ${cardName}`);
    // console.log(`store before:`, {...this.storeSubject.value});
    this.storeSubject.next({
      ...this.storeSubject.value,
      [cardName]: {
        name: cardName,
        // Start with nulls (this is the LOADING state)
        data: null,
        error: null
      }
    });
    // console.log(`store after:`, {...this.storeSubject.value});
    this.fakeApi(cardName);
  }


  fakeApi(cardName) {
    setTimeout(() => {
      this.storeSubject.next({
        ...this.storeSubject.value,
        [cardName]: {
          // name: cardName,
          ...this.storeSubject.value[cardName],
          data: this.timestamp(),
          error: Math.random() < 0.1
        }
      });
    }, Math.random() * 3000 + 500);
  }


  refreshCards(cardNames: string[]) {
    cardNames.forEach(name => {
      this.loadCard(name);
    });

  }

  timestamp() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  }

}
