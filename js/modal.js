class Modal {
  constructor(container) {
    this._onModalClick = this._onModalClick.bind(this);
    this._onClickCloseBtn = this._onClickCloseBtn.bind(this);

    this.container = container;
    this.contentContainer = container.querySelector('.content-container');
    this.container.addEventListener('pointerdown', this._onModalClick);

    const closeBtn = container.querySelector('button');
    closeBtn.addEventListener('click', this._onClickCloseBtn);
  }

  showContent(content) {
    for (let c of content) this.contentContainer.appendChild(c);
    this.container.classList.remove('hidden');
  }

  _onModalClick(event) {
    // Close the modal when clicking outside the content
    if (event.srcElement === this.container) {
      this.hide();
      this.clear();
    }
  }

  _onClickCloseBtn() {
    this.hide();
    this.clear();
  }

  clear() {
    this.contentContainer.innerHTML = '';
  }

  hide() {
    document.body.classList.remove('no-scroll');
    this.container.classList.add('hidden');
  }
}
