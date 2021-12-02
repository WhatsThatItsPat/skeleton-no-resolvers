import { Component } from '@angular/core';
import { StoreIshService } from '../store-ish.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  store$ = this.storeIsh.store$;

  constructor(
    private storeIsh: StoreIshService,
  ) {}

  doRefresh(event) {
    this.storeIsh.refreshCards(['Page1Card1', 'Page1Card2', 'Page1Card3']);
    event.target.complete();
  }

}
