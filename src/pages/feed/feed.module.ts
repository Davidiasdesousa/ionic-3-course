import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';

@NgModule({
  declarations: [
    FeedPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicPageModule.forChild(FeedPage),
  ],
})
export class FeedPageModule { }
