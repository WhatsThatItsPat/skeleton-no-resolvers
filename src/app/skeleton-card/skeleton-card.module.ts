import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkeletonCardComponent } from './skeleton-card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [SkeletonCardComponent],
  exports: [SkeletonCardComponent]
})
export class SkeletonCardComponentModule {}
