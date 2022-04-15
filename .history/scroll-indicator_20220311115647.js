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
export class scrollIndicator extends LitElement {
    static get styles() {
        return css`
          
          :host{
            
          }
          .scrollIndicator {
            position: fixed;
            right: 1.5rem;
            bottom: 1.5rem;
            width: 3rem;
            height: 3rem;
            padding: 0;
            border: none;
            border-radius: 50%;
            background: white;
            overflow: hidden;
            z-index: 99;
            opacity: 0;
            transition: 0.15s ease-in-out all;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          }

          .scrollIndicator:hover {
            transform: scale(1.15);
          }

          .scrollIndicator__content::before {
            content: 'Top';
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            height: 3rem;
            width: 3rem;
            top: 0;
            left: 0;
            font-size: 0.75rem;
            color: black;
            transform: translateY(0);
            transition: 0.15s ease-in-out all;
            z-index: 99;
          }

          .scrollIndicator__content--overflow {
            height: 3rem;
            width: 3rem;
            position: relative;
            z-index: 99;
            background: linear-gradient(136deg, #8c193c 0%, #c30045 100%);
          }
          .scrollIndicator__content--overflow::before {
              content: 'Top';
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              height: 3rem;
              width: 3rem;
              top: 0;
              left: 0;
              font-size: 0.75rem;
              color: white;
              transform: translateY(0);
              transition: 0.15s ease-in-out all;
              z-index: 100;
            }
          

          .scrollIndicator__background {
            height: 0;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 0;
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
        this.SCROLL_INDICATOR = '';
        this.SCROLL_INDICATOR_OVERFLOW =  '';
        this.SCROLL_INDICATOR_BACKGROUND =  '';
        this.addScrollIndicator = this.addScrollIndicator.bind(this);


    }

    connectedCallback() {
        super.connectedCallback();
    window.addEventListener('scroll', this.addScrollIndicator);

  }

    render() {
        return html`
            <div id="scrollIndidcator" class="scrollIndicator">
              <div id="scrollIndicator__content" class="scrollIndicator__content"></div>
              <div id="scrollIndicator__content--overflow" class="scrollIndicator__content--overflow"></div>
              <div id="scrollIndicator__background" class="scrollIndicator__background"></div>
            </div>
        `;

    }
    firstUpdated() {

        this.SCROLL_INDICATOR = this.shadowRoot.getElementById('scrollIndidcator');
        this.SCROLL_INDICATOR_OVERFLOW =  this.shadowRoot.getElementById('scrollIndicator__content--overflow');
        this.SCROLL_INDICATOR_BACKGROUND =  this.shadowRoot.getElementById('scrollIndicator__background');
        console.log(`${this.SCROLL_INDICATOR} ${this.SCROLL_INDICATOR_OVERFLOW} ${this.SCROLL_INDICATOR_BACKGROUND}`)
        this.requestUpdate();
    }

    addScrollIndicator() {
        this.SCROLL_INDICATOR = this.shadowRoot.getElementById('scrollIndidcator');
        this.SCROLL_INDICATOR_OVERFLOW =  this.shadowRoot.getElementById('scrollIndicator__content--overflow');
        this.SCROLL_INDICATOR_BACKGROUND =  this.shadowRoot.getElementById('scrollIndicator__background');
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
    /**
     * Formats a greeting
     * @param name {string} The name to say "Hello" to
     * @returns {string} A greeting directed at `name`
     */
    sayHello(name) {
        return `Hello, ${name}`;
    }
}
customElements.define('scroll-indicator', scrollIndicator);
