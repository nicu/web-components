import {
  LitElement,
  html,
  css,
} from 'https://unpkg.com/lit-element/lit-element.js?module';

class BWSCard extends LitElement {
  static get properties() {
    return {
      dynamic: {
        type: Boolean,
        converter: {
          fromAttribute: (value, type) => {
            return value === 'true';
          },
          toAttribute: (value, type) => {
            return value.toString();
          },
        },
      },
      user: { type: String },
      email: { type: String },
      picture: { type: String },
    };
  }

  static get styles() {
    return css`
      .bws-card {
        background-color: #252525;
        color: #dadada;
        border-radius: 4px;
        padding: 16px;
        width: 400px;
        box-shadow: 2px 2px 4px 0px #888888;
        display: flex;
        font-family: sans-serif;
        margin-bottom: 8px;
      }

      .bws-card__picture {
        border-radius: 50%;
      }

      .bws-card__text {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .bws-card__email {
        color: #22acff;
      }

      .bws-card__actions {
        flex: 1;
        text-align: right;
      }

      .bws-card__actions--refresh {
        background-color: #252525;
        border: 2px solid white;
        color: white;
        border-radius: 4px;
      }

      .hidden {
        display: none;
      }
    `;
  }

  async refreshUser() {
    const data = await fetch('https://randomuser.me/api');
    const json = await data.json();
    const [user] = json.results;

    this.user = `${user.name.first} ${user.name.last}`;
    this.email = user.email;
    this.picture = user.picture.thumbnail;
  }

  render() {
    return html`
      <div class="bws-card">
        <img class="bws-card__picture" src="${this.picture}" />
        <div class="bws-card__text">
          <div class="bws-card__user">${this.user}</div>
          <div class="bws-card__email">${this.email}</div>
        </div>
        ${this.dynamic
          ? html`
              <div class="bws-card__actions">
                <button
                  class="bws-card__actions--refresh"
                  @click="${this.refreshUser}"
                >
                  Refresh
                </button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('bws-card', BWSCard);
