class Holiday {
  constructor(container, holidayDetails, onClick) {
    this._onClick = this._onClick.bind(this);
    this.onClick = onClick;
    this.holidayDetails = holidayDetails;
    container.classList.add('holiday');
    container.addEventListener('click', this._onClick);
  }

  _onClick(event) {
    this.onClick(this.holidayDetails);
  }
}
