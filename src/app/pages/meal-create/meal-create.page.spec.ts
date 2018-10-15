import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCreatePage } from './meal-create.page';

describe('MealCreatePage', () => {
  let component: MealCreatePage;
  let fixture: ComponentFixture<MealCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
