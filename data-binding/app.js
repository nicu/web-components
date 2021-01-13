class UserCard {
  constructor(user, email, picture) {
    this.elem = document.createElement('div');

    // this.user = user;
    this.prop('user', user);
    this.prop('email', email);
    this.prop('picture', picture);

    this.render();
  }

  prop(name, defaultValue) {
    const internalPropName = `_${name}`;
    this[internalPropName] = defaultValue;

    Object.defineProperty(this, name, {
      get() {
        return this[internalPropName];
      },
      set(value) {
        this[internalPropName] = value;
        this.render();
      },
    });
  }

  render() {
    this.elem.innerHTML = `
      <div class="bws-card">
        <img class="bws-card__picture" src="${this.picture}" />
        <div class="bws-card__text">
          <div class="bws-card__user">${this.user}</div>
          <div class="bws-card__email">${this.email}</div>
        </div>
      </div>
    `;
  }
}

window.card = new UserCard('nicu', 'nicu@example.com', 'thumb.jpg');
document.body.appendChild(window.card.elem);
