import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileSupplierPage } from './profile-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSupplierPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileSupplierPage]
})
export class ProfileSupplierPageModule {}
