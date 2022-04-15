/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

export class themeSwitch extends LitElement {
  static get styles() {
    return css`
          
          :host{
            
          }
.theme-toggle__floating {
 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    height: 3rem;
    width: 3rem;
    border-radius: 20rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.25s ease-in-out;
    overflow: hidden;
}
.theme-toggle__floating:hover{
   transform: scale(1.05);
      &[class*=' bi-'] {
        &::before {
          transform: rotate(45deg) scale(1.2);
        }
      }

}
        `;
  }

  static get properties() {
    return {

      name: { type: String },
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
    this.SCROLL_INDICATOR = '';
    this.SCROLL_INDICATOR_OVERFLOW = '';
    this.SCROLL_INDICATOR_BACKGROUND = '';
    this.addScrollIndicator = this.addScrollIndicator.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.addScrollIndicator);
  }

  render() {
    return html`
    <div><h1 class="theme-toggle__floating" @click="${this._getTheme}">theme switch</h1></div>
        `;

  }
  firstUpdated() {
    this.getTheme();
  }

  addScrollIndicator() {
    this.SCROLL_INDICATOR = this.shadowRoot.getElementById('scrollIndidcator');
    this.SCROLL_INDICATOR_OVERFLOW = this.shadowRoot.getElementById('scrollIndicator__content--overflow');
    this.SCROLL_INDICATOR_BACKGROUND = this.shadowRoot.getElementById('scrollIndicator__background');
    console.log(`${this.SCROLL_INDICATOR} ${this.SCROLL_INDICATOR_OVERFLOW} ${this.SCROLL_INDICATOR_BACKGROUND}`)
    console.log('scroll triggered');
    console.log(`${this.SCROLL_INDICATOR} ${this.SCROLL_INDICATOR_OVERFLOW} ${this.SCROLL_INDICATOR_BACKGROUND}`)
    if (this.SCROLL_INDICATOR && this.SCROLL_INDICATOR_BACKGROUND) {

      let pageOffset = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      let documentHeight = document.body.scrollHeight; // documentHeight = document.height || document.body.clientHeight || document.body.scrollHeight
      let windowInnerHeight = window.innerHeight;
      let result = Math.floor(100 * pageOffset / (documentHeight - windowInnerHeight));
      let fillHeight = result + '%';
      let fillOverflow = Math.abs(100 - result);

      this.SCROLL_INDICATOR.style.opacity = result > 0 ? '1' : '0';
      this.SCROLL_INDICATOR_BACKGROUND.style.height = fillHeight;
      this.SCROLL_INDICATOR_OVERFLOW.style.clipPath = `inset(${fillOverflow}% 0px 0px 0px)`;
    }
    this.dispatchEvent(new CustomEvent('page-scrolled'));
  }

  _getTheme() {
    const TODAY = new Date();
    const CURRENT_HOUR = TODAY.getHours();
    const CURRENT_THEME = {
      theme: '',
      themeIcon: '',
    };
    const STORED_THEME = localStorage.getItem('theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '');

    if (STORED_THEME) {
      CURRENT_THEME.theme = STORED_THEME;
    } else if (CURRENT_HOUR >= 18) {
      CURRENT_THEME.theme = 'dark';
    } else if (CURRENT_HOUR >= 12) {
      CURRENT_THEME.theme = 'light';
    } else if (CURRENT_HOUR >= 6) {
      CURRENT_THEME.theme = 'light';
    } else {
      CURRENT_THEME.theme = 'light';
    }
    document.documentElement.setAttribute('data-theme', CURRENT_THEME.theme);
    localStorage.setItem('theme', CURRENT_THEME.theme);
  }
  _setTheme() {
    const CURRENT_THEME = {
      theme: '',
      themeIcon: '',
    };
    const STORED_THEME = localStorage.getItem('theme')
  }
}
customElements.define('theme-switch', themeSwitch);
