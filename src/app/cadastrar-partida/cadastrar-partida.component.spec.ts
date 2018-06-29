import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPartidaComponent } from './cadastrar-partida.component';

describe('CadastrarPartidaComponent', () => {
  let component: CadastrarPartidaComponent;
  let fixture: ComponentFixture<CadastrarPartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
