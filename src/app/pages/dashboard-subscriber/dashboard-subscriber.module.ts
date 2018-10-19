import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardSubscriberPage } from './dashboard-subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSubscriberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardSubscriberPage]
})
export class DashboardSubscriberPageModule {}
