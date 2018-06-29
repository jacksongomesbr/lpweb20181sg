import {Component, OnInit} from '@angular/core';
import {LancesWebService} from '../lances-web.service';
import {TrustedHtmlString} from '@angular/core/src/sanitization/sanitization';

/**
 * Representa a interface de um formulário para o cadastro da partida.
 */
@Component({
  selector: 'app-cadastrar-partida',
  templateUrl: './cadastrar-partida.component.html',
  styleUrls: ['./cadastrar-partida.component.css']
})
export class CadastrarPartidaComponent implements OnInit {
  /**
   * A lista de times
   * @type {null}
   */
  times = null;

  /**
   * A data da partida
   * @type {null}
   */
  data = null;

  /**
   * O horário da partida
   * @type {null}
   */
  horario = null;

  /**
   * O time mandante da partida
   * @type {null}
   */
  mandante = null;

  /**
   * O time visitante da partida
   * @type {null}
   */
  visitante = null;

  /**
   * Resultado do processo de salvar os dados
   * @type {null}
   */
  salvar_ok = null;

  /**
   * Injeta uma instância de {@link LancesWebService} para o componente acessar e salvar dados.
   *
   * @param {LancesWebService} api
   */
  constructor(private api: LancesWebService) {
  }

  /**
   * Obtém a lista de times para preencher o `select`. Para isso utiliza
   * o método [`LancesWebService.getTimes()`]{@link LancesWebService#getTimes}.
   *
   * O código chama o método
   * [`LancesWebService.setupInitialData()`]{@link LancesWebService#setupInitialData}
   * para garantir que o software tenha acesso aos dados.
   */
  ngOnInit() {
    this.api.setupInitialData(() => {
      this.times = this.api.getTimes();
    });
  }

  /**
   * Salva os dados da partida utilizando os campos do formulário, utilizando o método
   * [`LancesWebService.addPartida()`]{@link LancesWebService#addPartida}. Depois de salvar, limpa
   * os campos do formulário utiliza `salvar_ok` com valor `true` para indicar
   * que a partida foi salva com sucesso.
   */
  salvar() {
    this.api.addPartida(this.data, this.horario, this.mandante, this.visitante);
    this.salvar_ok = true;
    this.data = null;
    this.horario = null;
    this.mandante = null;
    this.visitante = null;
  }
}
