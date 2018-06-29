import {Component, OnInit} from '@angular/core';
import {LancesWebService} from '../lances-web.service';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Representa a interface para o cadastro de um palpite de placar
 */
@Component({
  selector: 'app-palpite-de-placar',
  templateUrl: './palpite-de-placar.component.html',
  styleUrls: ['./palpite-de-placar.component.css']
})
export class PalpiteDePlacarComponent implements OnInit {
  /**
   * A partida que será apresentada na interface e que receberá o palpite
   * @type {null}
   */
  partida = null;

  /**
   * A quantidade de gols do time mandante
   * @type {number}
   */
  golsDoMandante = 0;

  /**
   * A quantidade de gols do time visitante
   * @type {number}
   */
  golsDoVisitante = 0;

  /**
   * O resultado da análise do palpite
   * @type {boolean}
   */
  resultado = null;

  /**
   * O usuário do palpite
   * @type {string}
   */
  usuario = null;

  /**
   * Injeta uma instância de [`LancesWebService`]{@link LancesWebService}, `ActivatedRoute` e `Router` para,
   * respectivamente:
   *
   * * acessar os dados do software
   * * realizar navegação interna utilizando rotas
   * * obter valores de parâmetros de rota
   *
   * @param {LancesWebService} api
   * @param {ActivatedRoute} route
   * @param {Router} router
   */
  constructor(private api: LancesWebService, private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * Obtém os dados da partida, utilizando o método [`LancesWebService.getPartida()`]{@link LancesWebService#getPartida}.
   *
   * O código também chama o método
   * [`LancesWebService.setupInitialData()`]{@link LancesWebService#setupInitialData}
   * para garantir que o software tenha acesso aos dados.
   */
  ngOnInit() {
    this.api.setupInitialData(() => {
      this.partida = this.api.getPartida(this.route.snapshot.paramMap.get('id'));
    });
  }

  /**
   * Verifica se o palpite do usuário está correto. Para isso utiliza o método
   * [`LancesWebService.addPalpiteDePlacar()`]{@link LancesWebService#addPalpiteDePlacar}
   * informando os valores inseridos no formulário.
   */
  verificar() {
    this.resultado = this.api.addPalpiteDePlacar(this.usuario, this.partida.id,
      Number(this.golsDoMandante), Number(this.golsDoVisitante));
  }

  /**
   * Limpa os campos do formulário e redefine a variável utilizada para mostrar a mensagem
   * de erro ou sucesso de validação.
   */
  limpar() {
    this.resultado = null;
    this.golsDoMandante = 0;
    this.golsDoVisitante = 0;
    this.usuario = null;
  }
}
