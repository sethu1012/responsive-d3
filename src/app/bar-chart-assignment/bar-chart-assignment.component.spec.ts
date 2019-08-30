import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartAssignmentComponent } from './bar-chart-assignment.component';

describe('BarChartAssignmentComponent', () => {
  let component: BarChartAssignmentComponent;
  let fixture: ComponentFixture<BarChartAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
