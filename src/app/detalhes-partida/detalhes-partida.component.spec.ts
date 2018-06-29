import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPartidaComponent } from './detalhes-partida.component';

describe('DetalhesPartidaComponent', () => {
  let component: DetalhesPartidaComponent;
  let fixture: ComponentFixture<DetalhesPartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesPartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
