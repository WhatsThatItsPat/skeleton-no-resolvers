import { Component } from '@angular/core';
import { StoreIshService } from '../store-ish.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  store$ = this.storeIsh.store$;

  constructor(
    private storeIsh: StoreIshService,
  ) {}

  doRefresh(event) {
    this.storeIsh.refreshCards(['Page3Card1', 'Page3Card2']);
    event.target.complete();
  }

}
