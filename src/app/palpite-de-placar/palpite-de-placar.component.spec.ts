import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalpiteDePlacarComponent } from './palpite-de-placar.component';

describe('PalpiteDePlacarComponent', () => {
  let component: PalpiteDePlacarComponent;
  let fixture: ComponentFixture<PalpiteDePlacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalpiteDePlacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalpiteDePlacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
