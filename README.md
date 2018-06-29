# Lpweb20181sg

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 6.0.8.

Este é um software "de brinquedo", utilizado na disciplina **Linguagem de Programação para a Web**, 
do Departamento de Computação do CEULP/ULBRA, em Palmas - TO, para demonstrar conceitos e funcionalidades 
do Framework Angular e recursos e tecnologias para o desenvolvimento de software moderno para a Web.

Os principais recursos e conceitos apresentados são:

* criação de componentes
* criação de serviços
* utilização de Injeção de Dependência (*Dependency Injection* -- DI)
* utilização do `LocalStorage` para o armazenamento de dados
* utilização do `HttpClient` para utilizar `XHR` e carregar dados de um arquivo `.json` (utilizando o módulo `HttpClientModule` disponível no pacote `@angular/common/http`)
* criação de rotas e utilização do módulo `RouterModule` (disponível no pacote `@angular/router`)
* utilização do Bootstrap para criação da interface gráfica com o usuário
* utilização de formulários baseados em template para receber entrada do usuário (módulo `FormsModule` disponível no pacote `@angular/forms`)

## Demonstração 

Você pode utilizar o software no StackBlitz.com: [].

## Documentação 

Este projeto utiliza o **Compodoc** para gerar a documentação do código, que é publicada online utilizando o Github Pages: https://jacksongomesbr.github.io/lpweb20181sg/index.html.

## Como contribuir com este projeto ou desenvolver novas funcionalidades

A seguir, instruções de desenvolvimento do projeto, baseadas no Angular CLI:

* Servidor de desenvolvimeto: execute `ng serve` no termianl e acesse `http://localhost:4200/` no browser para utilizar o servidor de desenvolvimento local
* Geração de código: execute `ng generate component component-name` para criar um componente. Você também pode utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`
* Construir: execute `ng build` para construir (compilar). O diretório `dist/` armazena os arquivos que podem ser implantados em um servidor de produção produção
* Testes unitários: execute `ng test` para executar testes unitários utilizando [Karma](https://karma-runner.github.io)
* Testes end-to-end: execute `ng e2e` para executar testes end-to-end utilizando [Protractor](http://www.protractortest.org/)
* Ajuda adicional: execute `ng help` ou veja o [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)
