import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasDePalpitesComponent } from './estatisticas-de-palpites.component';

describe('EstatisticasDePalpitesComponent', () => {
  let component: EstatisticasDePalpitesComponent;
  let fixture: ComponentFixture<EstatisticasDePalpitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasDePalpitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasDePalpitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
