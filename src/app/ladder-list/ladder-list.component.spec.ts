import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderListComponent } from './ladder-list.component';

describe('LadderListComponent', () => {
  let component: LadderListComponent;
  let fixture: ComponentFixture<LadderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
