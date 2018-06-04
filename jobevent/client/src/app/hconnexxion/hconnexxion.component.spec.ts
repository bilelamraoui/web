import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HconnexxionComponent } from './hconnexxion.component';

describe('HconnexxionComponent', () => {
  let component: HconnexxionComponent;
  let fixture: ComponentFixture<HconnexxionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HconnexxionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HconnexxionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
