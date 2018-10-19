import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubscriberPage } from './dashboard-subscriber.page';

describe('DashboardSubscriberPage', () => {
  let component: DashboardSubscriberPage;
  let fixture: ComponentFixture<DashboardSubscriberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubscriberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubscriberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
