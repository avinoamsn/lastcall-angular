import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSupplierPage } from './profile-supplier.page';

describe('ProfileSupplierPage', () => {
  let component: ProfileSupplierPage;
  let fixture: ComponentFixture<ProfileSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSupplierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
