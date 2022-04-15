/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

export class themeSwitch extends LitElement {
  static get styles() {
    return css`
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");
          
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
.theme-toggle__fixed{
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
        `;
  }

  static get properties() {
    return {

      isFixed: { type: Boolean },
      currentTheme: { type: Object },

    };
  }

  constructor() {
    super();

  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    if (this.isFixed == true) {
      return html`
    <div><h1 class="theme-toggle__fixed" @click="${this._setTheme}">theme-switch</h1></div>
        `;
    } else {
      return html`
    <div><h1 class="theme-toggle__floating" @click="${this._setTheme}">theme switch</h1></div>
        `;
    }


  }
  firstUpdated() {
    this.getTheme();
  }

  _commitTheme(payload) {

    document.documentElement.setAttribute('data-theme', payload.theme);
    localStorage.setItem('theme', payload.theme);

    console.log(payload);
  }
  _defineThemeIcon(payload) {
    if (payload.theme === 'light') {
      payload.themeIcon = ' bi bi-sun';
    } else {
      payload.themeIcon = 'bi bi-moon-stars';
    }
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
    this._defineThemeIcon(CURRENT_THEME);
    // if storedTheme doesn't have value save calculated theme in storage
    if (!storedTheme) {
      localStorage.setItem('theme', CURRENT_THEME.theme);
    }
    this._commitTheme(CURRENT_THEME);
  }
  _setTheme() {
    const STORED_THEME = localStorage.getItem('theme');
    const THEME_PAYLOAD = {
      theme: '',
      themeIcon: '',
    };

    if (STORED_THEME === 'light') {
      THEME_PAYLOAD.theme = 'dark';
    } else {
      THEME_PAYLOAD.theme = 'light';
    }
    this._defineThemeIcon(THEME_PAYLOAD);
    this._commitTheme(THEME_PAYLOAD);
  }
}
customElements.define('theme-switch', themeSwitch);
