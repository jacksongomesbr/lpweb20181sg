import { Component } from '@angular/core';

/**
 * Representa o componente raiz.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Controla a visibilidade do menu em telas pequenas.
   * @type {boolean}
   */
  public isCollapsed = false;
}
