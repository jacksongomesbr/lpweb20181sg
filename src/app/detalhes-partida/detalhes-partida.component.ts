import {Component, OnInit} from '@angular/core';
import {LancesWebService} from '../lances-web.service';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Representa a interface que apresenta as informações de uma partida.
 */
@Component({
  selector: 'app-detalhes-partida',
  templateUrl: './detalhes-partida.component.html',
  styleUrls: ['./detalhes-partida.component.css']
})
export class DetalhesPartidaComponent implements OnInit {
  /**
   * A partida que será apresentada na interface
   * @type {any}
   */
  partida = null;

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
   * Obtém a partida para ser apresentada na interface. Para isso:
   *
   * 1. obtém o valor do parâmetro de rota `id`
   * 2. obtém a partida, chamando o método [`LancesWebService.getPartida()`]{@link LancesWebService#getTimesgetPartida}
   *
   * O código chama o método
   * [`LancesWebService.setupInitialData()`]{@link LancesWebService#setupInitialData}
   * para garantir que o software tenha acesso aos dados.
   */
  ngOnInit() {
    this.api.setupInitialData(() => {
      this.partida = this.api.getPartida(this.route.snapshot.paramMap.get('id'));
    });
  }

}
