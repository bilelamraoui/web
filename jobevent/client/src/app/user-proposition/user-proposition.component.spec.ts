import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPropositionComponent } from './user-proposition.component';

describe('UserPropositionComponent', () => {
  let component: UserPropositionComponent;
  let fixture: ComponentFixture<UserPropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
