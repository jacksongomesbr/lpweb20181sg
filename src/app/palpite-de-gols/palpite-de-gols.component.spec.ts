import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalpiteDeGolsComponent } from './palpite-de-gols.component';

describe('PalpiteDeGolsComponent', () => {
  let component: PalpiteDeGolsComponent;
  let fixture: ComponentFixture<PalpiteDeGolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalpiteDeGolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalpiteDeGolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
