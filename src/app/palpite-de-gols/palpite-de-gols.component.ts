import {Component, OnInit} from '@angular/core';
import {LancesWebService} from '../lances-web.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-palpite-de-gols',
  templateUrl: './palpite-de-gols.component.html',
  styleUrls: ['./palpite-de-gols.component.css']
})
export class PalpiteDeGolsComponent implements OnInit {
  /**
   * A partida usada para apresentar dados e receber o palpite
   * @type {any}
   */
  partida = null;

  /**
   * O número de gols do palpite
   * @type {number}
   */
  gols = 0;

  /**
   * O jogador do palpite
   * @type {any}
   */
  jogador = null;

  /**
   * O usuário do palpite
   * @type {any}
   */
  usuario = null;

  /**
   * O resultado da avaliação do palpite
   * @type {boolean}
   */
  resultado = null;

  /**
   * A lista de jogadores para preencher o `select` do campo jogador
   * @type {Array}
   */
  jogadores = null;

  /**
   * Uma variável de controle para a mensagem de erro de validação do número de gols
   * @type {boolean}
   */
  erroNumGols = false;

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
   * Obtém o valor do parâmetro de roda `id` e busca os dados da partida utilizando o método
   * `LancesWebService.getPartida`. Por fim, também utiliza o serviço, chamando o método
   * `getJogadores` para obter os jogadores cadastrados e preencher os elementos `select`.
   *
   * O código também chama o método
   * [`LancesWebService.setupInitialData()`]{@link LancesWebService#setupInitialData}
   * para garantir que o software tenha acesso aos dados.
   */
  ngOnInit() {
    this.api.setupInitialData(() => {
      this.partida = this.api.getPartida(this.route.snapshot.paramMap.get('id'));
      this.jogadores = this.api.getJogadores();
    });
  }

  /**
   * Verifica se o palpite está correto. Antes de chamar o método `LancesWebService.addPalpiteDeGols`
   * verifica se o número de gols é maior do que zero. Senão, uma o atributo `erroNumGols` para
   * apresentar uma mensagem de erro no template. O resultado da verificação utiliza o atributo `resultado`
   * para apresentar uma mensagem de sucesso ou erro no template.
   */
  verificar() {
    this.gols = Number(this.gols);
    if (this.gols > 0) {
      this.resultado = this.api.addPalpiteDeGols(this.usuario, this.partida.id, Number(this.jogador), this.gols);
      this.erroNumGols = false;
    } else {
      this.erroNumGols = true;
    }
  }

  /**
   * Redefine os valores dos atributos para limpar o formulário e esconder mensagens que possam estar visíveis.
   */
  limpar() {
    this.gols = 0;
    this.jogador = null;
    this.usuario = null;
    this.resultado = null;
    this.erroNumGols = false;
  }


}
