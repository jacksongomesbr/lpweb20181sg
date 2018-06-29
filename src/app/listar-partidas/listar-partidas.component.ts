import {Component, OnInit} from '@angular/core';
import {LancesWebService} from '../lances-web.service';

/**
 * Representa a interface para apresetar a lista das partidas
 */
@Component({
  selector: 'app-listar-partidas',
  templateUrl: './listar-partidas.component.html',
  styleUrls: ['./listar-partidas.component.css']
})
export class ListarPartidasComponent implements OnInit {
  /**
   * A lista das partidas que será aprsentada na interface
   * @type {Array<any>}
   */
  partidas = null;

  /**
   * Injeta uma instância de [`LancesWebService`]{@link LancesWebService} para obter a lista das partidas
   * @param {LancesWebService} api
   */
  constructor(private api: LancesWebService) {

  }

  /**
   * Obtém a lista das partidas para apresentar na interface utilizando
   * o método [`LancesWebService.getPartidas()`]{@link LancesWebService#getPartidas}. Para isso, chama o método
   * [`LancesWebService.setupInitialData()`]{@link LancesWebService#setupInitialData}
   * para garantir que o software tenha acesso aos dados.
   */
  ngOnInit() {
    this.api.setupInitialData(() => {
      this.partidas = this.api.getPartidas();
    });
  }

}
