import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardSupplierPage } from './dashboard-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSupplierPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardSupplierPage]
})
export class DashboardSupplierPageModule {}
