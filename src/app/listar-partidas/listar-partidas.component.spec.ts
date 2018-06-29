import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPartidasComponent } from './listar-partidas.component';

describe('ListarPartidasComponent', () => {
  let component: ListarPartidasComponent;
  let fixture: ComponentFixture<ListarPartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
