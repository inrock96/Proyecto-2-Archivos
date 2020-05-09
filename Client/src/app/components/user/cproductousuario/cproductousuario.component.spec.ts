import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CproductousuarioComponent } from './cproductousuario.component';

describe('CproductousuarioComponent', () => {
  let component: CproductousuarioComponent;
  let fixture: ComponentFixture<CproductousuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CproductousuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CproductousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
