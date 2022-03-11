/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      .card{
        padding: 2rem;
        border: 1px solid gray;
        border-radius: 0.5rem;
        box-shadow: 0 8px 4px rgba(0,0,0,0.15);
      }
      .header{
        margin: 0 0 1rem 0;
        font-family: 'Open Sans', arial, sans-serif;
        font-size: 3rem;
      }
      .btn{
        padding: 0.5rem 1rem;
        border: 1px solid gray;
        border-radius: 1920px;
        color: #272822;
      }
      .btn-primary{
        background-color: red;
        border-color: red;
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      count: {type: Number},
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
  }

  render() {
    return html`
<div class="card">
  <h1 class="header">${this.sayHello(this.name)}!</h1>
  <button @click=${this._onClick} part="button" class=" btn btn-primary">
    Click Count: ${this.count}
  </button>
  <slot class="slot"></slot>
</div>
    `;
  }

  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name {string} The name to say "Hello" to
   * @returns {string} A greeting directed at `name`
   */
  sayHello(name) {
    return `Hello, ${name}`;
  }
}

window.customElements.define('my-element', MyElement);
