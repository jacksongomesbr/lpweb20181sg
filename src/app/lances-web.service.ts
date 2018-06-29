import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancesWebService {
  /**
   * O caminho para o arquivo dos dados iniciais
   * @type {string}
   */
  dadosUrl = 'assets/dados.json';

  /**
   * O nome da chave para os dados no LocalStorage
   * @type {string}
   */
  lskey = 'lancesweb-dados';

  /**
   * Injeta uma instância de `HttpClient` e executa o método [`setupInitialData`]{@link LancesWebService#setupInitialData}
   * @param {HttpClient} http Uma instância de `HttpClient` utilizada para carregar os dados iniciais
   */
  constructor(private http: HttpClient) {
    this.setupInitialData();
  }

  /**
   * Verifica se há dados no LocalStorage e, quando não houver, carrega dados iniciais
   * declarados no arquivo `assets/dados.json`. Quando terminar de carregar os dados
   * executa o método [`setupDadosOnStorage`]{@link LancesWebService#setupDadosOnStorage} e
   * a função `fn`, se definida.
   *
   * @param fn Uma função callback para ser chamada quando concluir o processo de carregar os dados
   */
  setupInitialData(fn) {
    if (!localStorage.getItem(this.lskey)) {
      this.http.get(this.dadosUrl).subscribe(retorno => {
        this.setupDadosOnStorage(retorno);
        if (fn) {
          fn();
        }
      });
    } else {
      if (fn) {
        fn();
      }
    }
  }

  /**
   * Analisa `dados` e (re)cria uma estrutura preparada para o funcionamento do software:
   * 1. para cada time, obtém os identificadores dos jogadores e recria o atributo `jogadores` com objetos correspondentes
   * 2. para cada partida:
   *  1. utiliza os identificadores do mandante e do visitante para obter os objetos correspondentes
   *  2. inicia o `placar` com zero (para mandante e visitante)
   *  3. inicia o array `palpites` (vazio)
   *  4. para cada lance, utiliza o identificador do jogador para obter o objeto correspondente
   *  5. para cada lance, se for do tipo "Gol", atualiza o placar
   *  6. inicia as estatísticas
   *
   * Este método faz bastante uso do método {@link Array#find}
   *
   * *Importante*: este método deve ser chamado apenas uma vez.
   *
   * @param dados Os dados que devem ser analisados
   */
  setupDadosOnStorage(dados) {
    for (let time of dados.times) {
      let jogadores = [];
      for (const jogadorId of time.jogadores) {
        jogadores.push(dados.jogadores.find(jogador => jogador.id === jogadorId));
      }
      time.jogadores = jogadores;
    }
    for (let partida of dados.partidas) {
      partida.mandante = dados.times.find(time => time.id === partida.mandanteId);
      partida.visitante = dados.times.find(time => time.id === partida.visitanteId);
      partida.placar = {
        'mandante': 0,
        'visitante': 0
      };
      if (!partida.palpites) {
        partida.palpites = [];
      }
      for (let lance of partida.lances) {
        lance.jogador = dados.jogadores.find(jogador => jogador.id === lance.jogadorId);
      }
      for (let lance of partida.lances) {
        if (lance.tipo === 'Gol') {
          if (lance.jogador.timeId === partida.mandanteId) {
            partida.placar.mandante++;
          }
          if (lance.jogador.timeId === partida.visitanteId) {
            partida.placar.visitante++;
          }
        }
      }
      partida.estatisticas = {
        quantidadeDePalpites: 0,
        quantidadeDePalpitesCorretos: 0,
        quantidadeDePalpitesIncorretos: 0,
        porcentagemDePalpitesCorretos: 0,
        porcentagemDePalpitesIncorretos: 0,
        usuarioTop: null
      };
    }
    this.setDados(dados);
  }

  /**
   * Retorna os dados armazenados no LocalStorage utilizando a chave `lskey`.
   *
   * @returns {any}
   */
  getDados() {
    let dados = null;
    const ls = localStorage.getItem(this.lskey);
    if (ls) {
      dados = JSON.parse(ls);
    }
    return dados;
  }

  /**
   * Atualiza as estatísticas das partidas e armazena os dados novamente no LocalStorage
   * executando o método [`setDados`]{@link LancesWebService#setDados}.
   */
  updateStatistics() {
    let dados = this.getDados();
    for (let partida of dados.partidas) {
      let contador_usuarios = {};
      for (const palpite of partida.palpites) {
        if (!contador_usuarios[palpite.usuario]) {
          contador_usuarios[palpite.usuario] = 0;
        }
        partida.estatisticas.quantidadeDePalpites++;
        if (palpite.correto) {
          partida.estatisticas.quantidadeDePalpitesCorretos++;
          contador_usuarios[palpite.usuario]++;
        } else {
          partida.estatisticas.quantidadeDePalpitesIncorretos++;
        }
      }
      if (partida.estatisticas.quantidadeDePalpites) {
        partida.estatisticas.porcentagemDePalpitesCorretos = partida.estatisticas.quantidadeDePalpitesCorretos / partida.estatisticas.quantidadeDePalpites;
        partida.estatisticas.porcentagemDePalpitesIncorretos = 1 - partida.estatisticas.porcentagemDePalpitesCorretos;
      }
      let m = 0;
      for (const usuario in contador_usuarios) {
        const n = contador_usuarios[usuario];
        if (n >= m) {
          m = n;
          partida.estatisticas.usuarioTop = usuario;
        }
      }
    }
    this.setDados(dados);
  }

  /**
   * Converte `dados` para string JSON e os armazena no LocalStorage.
   *
   * @param dados Os dados a serem armazenados no LocalStorage
   */
  setDados(dados) {
    localStorage.setItem(this.lskey, JSON.stringify(dados));
  }

  /**
   * Salva os dados de uma partida.
   *
   * @param data A data da partida
   * @param horario O horário da partida
   * @param mandanteId O identificador do time mandante
   * @param visitanteId O identificador do time visitante
   */
  addPartida(data: string, horario: string, mandanteId: number, visitanteId: number) {
    let dados = this.getDados();
    const partida = {
      'id': dados.partidas.length + 1,
      'data': data,
      'horario': horario,
      'mandanteId': mandanteId,
      'visitanteId': visitanteId,
      'mandante': dados.times.find(time => time.id === mandanteId),
      'visitante': dados.times.find(time => time.id === visitanteId)
    };

    dados.partidas.push(partida);
    this.setDados(dados);
  }

  /**
   * Encontra e retorna uma partida com base no identificador `id`.
   *
   * @param {number} id O identificador da partida
   * @returns {any}
   */
  getPartida(id) {
    const dados = this.getDados();
    const partida = dados.partidas.find(p => p.id == id);
    return partida;
  }

  /**
   * Retorna as partidas.
   *
   * @returns {any}
   */
  getPartidas() {
    const dados = this.getDados();
    return dados.partidas;
  }

  /**
   * Salva os dados de um palpite de placar, criando um objeto com os atributos:
   *
   * * `tipo`: o tipo do palpite, nesse caso, com o valor `'placar'`
   * * `usuario`: o nome do usuário (valor do parâmetro `usuario`)
   * * `mandante`: o número de gols do mandante (valor do parâmetro `golsDoMandante`)
   * * `visitante`: o número de gols do visitante (valor do parâmetro `golsDoVisitante`)
   * * `correto`: um `boolean` que indica se o palpite está correto ou não
   *
   * O código também verifica se o palpite está correto. Para isso utiliza os
   * parâmetros `golsDoMandante` e `golsDoVisitante` e os compara com o placar da partida.
   *
   * Por fim, o código atualiza os dados do LocalStorage e também as estatísticas executando,
   * respectivamente, os métodos [`setDados`]{@link LancesWebService#setDados} e
   * [`updateStatistics`]{@link LancesWebService#updateStatistics}.
   *
   * @param usuario O nome do usuário
   * @param partidaId O identificador da partida
   * @param golsDoMandante O número de gols do mandante
   * @param golsDoVisitante O número de gols do visitante
   * @returns {boolean} `True`, se o palpite está correto ou `False`, caso contrário
   */
  addPalpiteDePlacar(usuario: string, partidaId: number, golsDoMandante: number, golsDoVisitante: number) {
    let dados = this.getDados();
    let partida = dados.partidas.find(p => p.id === partidaId);
    let correto = false;
    if (golsDoMandante === partida.placar.mandante && golsDoVisitante === partida.placar.visitante) {
      correto = true;
    }
    const palpite = {tipo: 'placar', usuario: usuario, mandante: golsDoMandante, visitante: golsDoVisitante, correto: correto};
    partida.palpites.push(palpite);
    this.setDados(dados);
    this.updateStatistics();
    return correto;
  }

  /**
   * Salva os dados de um palpite de quantidade de gols de um jogador, criando um objeto com os atributos:
   *
   * * `tipo`: o tipo do palpite, nesse caso, com o valor `'gols'`
   * * `usuario`: o nome do usuário (valor do parâmetro `usuario`)
   * * `gols`: o número de gols (valor do parâmetro `gols`)
   * * `jogador`: o identificador do jogador (valor do parâmetro `jogador`)
   * * `correto`: um `boolean` que indica se o palpite está correto ou não
   *
   * O código também verifica se o palpite está correto. Para isso encontra os lances da partida
   * que sejam do tipo `Gol` e do jogador conforme o parâmetro `jogador`. Se a quantidade de gols
   * (parâmetro `gols`) estiver de acordo com a quantidade de lances encontrados, então o palpite está correto.
   *
   * Por fim, o código atualiza os dados do LocalStorage e também as estatísticas executando,
   * respectivamente, os métodos [`setDados`]{@link LancesWebService#setDados} e
   * [`updateStatistics`]{@link LancesWebService#updateStatistics}.
   *
   * @param usuario O nome do usuário
   * @param partidaId O identificador da partida
   * @param jogador O identificador do jogador
   * @param gols A quantidade de gols
   * @returns {boolean} `True`, se o palpite está correto ou `False`, caso contrário
   */
  addPalpiteDeGols(usuario: string, partidaId: number, jogador: number, gols: number) {
    let dados = this.getDados();
    let partida = dados.partidas.find(p => p.id === partidaId);
    let gols_do_jogador = partida.lances.filter(lance => lance.tipo === 'Gol' && lance.jogadorId === jogador).length;
    let correto = false;
    if (gols === gols_do_jogador) {
      correto = true;
    }
    const palpite = {tipo: 'gols', usuario: usuario, gols: gols, jogador: jogador, correto: correto};
    partida.palpites.push(palpite);
    this.setDados(dados);
    this.updateStatistics();
    return correto;
  }

  /**
   * Retorna os times.
   *
   * @returns {Array} A lista dos times
   */
  getTimes() {
    const dados = this.getDados();
    return dados.times;
  }

  /**
   * Retorna os jogadores
   *
   * @returns {Array} A lista dos jogadores
   */
  getJogadores() {
    const dados = this.getDados();
    return dados.jogadores;
  }

}
