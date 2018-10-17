import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealListPage } from './meal-list.page';

describe('MealListPage', () => {
  let component: MealListPage;
  let fixture: ComponentFixture<MealListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
