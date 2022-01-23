class Select {
  constructor(container, options, defaultOption, onSelectionChange) {
    this._onSelectionChange = onSelectionChange;
    this._onChange = this._onChange.bind(this);

    this._render(container, options, defaultOption);

    container.addEventListener('change', this._onChange);
  }

  _render(container, options, defaultOption) {
    for (let option of options) {
      const optionEl = document.createElement('option');
      optionEl.textContent = option.name;
      optionEl.dataset.code = option.countryCode;
      // default value
      if (option.countryCode === defaultOption) optionEl.selected = true;
      container.appendChild(optionEl);
    }
  }

  _onChange(event) {
    this._onSelectionChange(event.target.selectedOptions[0].dataset.code);
  }
}
