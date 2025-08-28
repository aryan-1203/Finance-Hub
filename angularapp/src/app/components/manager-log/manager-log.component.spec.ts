import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLogComponent } from './manager-log.component';

describe('ManagerLogComponent', () => {
  let component: ManagerLogComponent;
  let fixture: ComponentFixture<ManagerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
