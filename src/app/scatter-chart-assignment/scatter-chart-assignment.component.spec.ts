import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterChartAssignmentComponent } from './scatter-chart-assignment.component';

describe('ScatterChartAssignmentComponent', () => {
  let component: ScatterChartAssignmentComponent;
  let fixture: ComponentFixture<ScatterChartAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterChartAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterChartAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
