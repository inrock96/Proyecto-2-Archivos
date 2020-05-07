import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserasideComponent } from './useraside.component';

describe('UserasideComponent', () => {
  let component: UserasideComponent;
  let fixture: ComponentFixture<UserasideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserasideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
