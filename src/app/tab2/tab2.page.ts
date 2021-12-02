import { Component } from '@angular/core';
import { StoreIshService } from '../store-ish.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  store$ = this.storeIsh.store$;

  constructor(
    private storeIsh: StoreIshService,
  ) {}

  doRefresh(event) {
    this.storeIsh.refreshCards(['Page2Card1', 'Page2Card2', 'Page2Card2', 'Page2Card2']);
    event.target.complete();
  }

}
