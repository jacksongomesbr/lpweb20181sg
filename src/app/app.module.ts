import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RodapeComponent} from './rodape/rodape.component';
import {SobreComponent} from './sobre/sobre.component';
import {CabecalhoComponent} from './cabecalho/cabecalho.component';
import {CadastrarPartidaComponent} from './cadastrar-partida/cadastrar-partida.component';
import {LancesWebService} from './lances-web.service';
import {ListarPartidasComponent} from './listar-partidas/listar-partidas.component';
import {DetalhesPartidaComponent} from './detalhes-partida/detalhes-partida.component';
import {PalpiteDePlacarComponent} from './palpite-de-placar/palpite-de-placar.component';
import {EstatisticasDePalpitesComponent} from './estatisticas-de-palpites/estatisticas-de-palpites.component';
import {PalpiteDeGolsComponent} from './palpite-de-gols/palpite-de-gols.component';

const rotas: Routes = [
  // { path: 'partidas', component: CadastroDePartidaComponent },
  // { path: 'partidas/:id', component: DetalheDePartidaComponent },
  // { path: 'partidas/:id/lances', component: CadastroDeLanceComponent }
  // {path: 'disciplinas/:id', component: EditorDeDisciplinaComponent},
  {path: 'partidas', component: ListarPartidasComponent},
  {path: 'partidas/cadastrar', component: CadastrarPartidaComponent},
  {path: 'partidas/:id', component: DetalhesPartidaComponent},
  {path: 'partidas/:id/palpite/placar', component: PalpiteDePlacarComponent},
  {path: 'partidas/:id/palpite/gols', component: PalpiteDeGolsComponent},
  {path: 'partidas/:id/palpite/estatisticas', component: EstatisticasDePalpitesComponent},
  {path: 'sobre', component: SobreComponent},
  {path: '', component: HomeComponent},
  // {path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RodapeComponent,
    SobreComponent,
    CabecalhoComponent,
    CadastrarPartidaComponent,
    ListarPartidasComponent,
    DetalhesPartidaComponent,
    PalpiteDePlacarComponent,
    EstatisticasDePalpitesComponent,
    PalpiteDeGolsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      rotas,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LancesWebService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
