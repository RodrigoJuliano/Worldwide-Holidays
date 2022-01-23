class App {
  constructor() {
    const calendarContainer = document.querySelector('#calendar');
    this.calendar = new Calendar(calendarContainer, 11);

    this._onCountriesJsonReady = this._onCountriesJsonReady.bind(this);
    this._onHolidaysJsonReady = this._onHolidaysJsonReady.bind(this);

    this.loadCountries();
  }

  _renderSelect() {
    const selectContainer = document.querySelector('#countries');
    const select = new Select(
      selectContainer,
      this.countries,
      DEFAULT_COUNTRY,
      (code) => {
        console.log('Loading holidays from', code);
        this.loadHolidays(code);
      }
    );
  }

  loadCountries() {
    fetch(`${BASE_API}/AvailableCountries`)
      .then(this._onResponse, this._onError)
      .then(this._onCountriesJsonReady)
      .catch(this._onerror);
  }

  loadHolidays(country) {
    fetch(`${BASE_API}/PublicHolidays/${YEAR}/${country}`)
      .then(this._onResponse, this._onError)
      .then(this._onHolidaysJsonReady)
      .catch(this._onerror);
  }

  _onCountriesJsonReady(json) {
    this.countries = json;
    this._renderSelect();
    this.loadHolidays(DEFAULT_COUNTRY);
  }

  _onHolidaysJsonReady(json) {
    this.holidays = json;
    this.calendar.addHolidays(this.holidays);
  }

  _onResponse(response) {
    return response.json();
  }

  _onerror(error) {
    console.log(error);

    const modalView = document.querySelector('#modal-view');
    const modal = new Modal(modalView);

    const title = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const link = document.createElement('a');

    title.textContent = 'Error connecting with API';
    p1.textContent = `Check if the services are working: `;
    link.href = 'https://date.nager.at/';
    link.textContent = 'https://date.nager.at/';
    link.target = '_blank';
    p1.appendChild(link);
    p2.textContent = `Error: ${error.message}`;

    modal.showContent([title, p1, p2]);
  }
}
