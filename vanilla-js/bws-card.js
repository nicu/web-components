class BWSCard extends HTMLElement {
  static get observedAttributes() {
    return ['user', 'email', 'picture', 'dynamic'];
  }

  constructor() {
    super();

    const { content } = document.getElementById('bws-card-template');
    this.attachShadow({ mode: 'open' }).appendChild(content.cloneNode(true));

    this.refresh = this.refresh.bind(this);
  }

  async refresh() {
    const data = await fetch('https://randomuser.me/api');
    const json = await data.json();
    const [user] = json.results;

    this.updateInfo(
      `${user.name.first} ${user.name.last}`,
      user.email,
      user.picture.thumbnail
    );
  }

  updateInfo(user, email, picture) {
    const userElem = this.shadowRoot.querySelector('.bws-card__user');
    userElem.innerText = user;

    const emailElem = this.shadowRoot.querySelector('.bws-card__email');
    emailElem.innerText = email;

    const pictureElem = this.shadowRoot.querySelector('.bws-card__picture');
    pictureElem.src = picture;
  }

  connectedCallback() {
    this.updateStyle();
    this.shadowRoot
      .querySelector('.bws-card__actions--refresh')
      .addEventListener('click', this.refresh);
  }

  disconnectedCallback() {
    console.log(
      'removing',
      this.shadowRoot.querySelector('.bws-card__actions--refresh')
    );
    this.shadowRoot
      .querySelector('.bws-card__actions--refresh')
      .removeEventListener('click', this.refresh);
  }

  attributeChangedCallback() {
    this.updateStyle();
  }

  updateStyle() {
    this.updateInfo(
      this.getAttribute('user'),
      this.getAttribute('email'),
      this.getAttribute('picture')
    );

    const actions = this.shadowRoot.querySelector('.bws-card__actions');
    actions.classList.toggle('hidden', this.getAttribute('dynamic') !== 'true');
  }
}

customElements.define('bws-card', BWSCard);
