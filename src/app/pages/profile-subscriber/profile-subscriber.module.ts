import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileSubscriberPage } from './profile-subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSubscriberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileSubscriberPage]
})
export class ProfileSubscriberPageModule {}
