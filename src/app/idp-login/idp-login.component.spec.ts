import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpLoginComponent } from './idp-login.component';

describe('IdpLoginComponent', () => {
  let component: IdpLoginComponent;
  let fixture: ComponentFixture<IdpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdpLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
