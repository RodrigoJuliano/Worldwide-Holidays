class Calendar {
  constructor(container, month) {
    this.container = container;
    this.month = month;

    this._renderTable();
    this.updateTitle();

    const modalView = document.querySelector('#modal-view');
    this.modal = new Modal(modalView);

    const prevBtn = document.querySelector('#previous-month');
    const nextBtn = document.querySelector('#next-month');

    this._onClickHoliday = this._onClickHoliday.bind(this);
    this._onClickChangeMonth = this._onClickChangeMonth.bind(this);

    prevBtn.addEventListener('click', this._onClickChangeMonth);
    nextBtn.addEventListener('click', this._onClickChangeMonth);
  }

  addHolidays(holidays) {
    if (this.holidays) this._renderTable(); // Rerender table to remove old holidays
    this.holidays = this._splitByMonth(holidays);
    this._renderHolidays();
  }

  _renderTable() {
    // Clear previous rendering
    this.container.innerHTML = '';
    // Table cells
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');
      this.container.appendChild(row);
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        cell.dataset.index = i * 7 + j;
        row.appendChild(cell);
      }
    }

    // Day numbers
    const firstDay = Calendar.getFirstWeakDay(this.month, YEAR);
    const cells = this.container.querySelectorAll('td');
    cells.forEach((cell) => {
      const index = parseInt(cell.dataset.index);
      const numDays = Calendar.daysInMonth(this.month, YEAR);
      if (index >= firstDay && index < numDays + firstDay) {
        cell.textContent = `${index - firstDay + 1}`;
      }
    });
  }

  _renderHolidays() {
    const firstDay = Calendar.getFirstWeakDay(this.month, YEAR);
    const cells = this.container.querySelectorAll('td');
    for (let h of this.holidays[this.month]) {
      const cellIndex = firstDay + h.date.getDate() - 1;
      const holiday = new Holiday(cells[cellIndex], h, this._onClickHoliday);
    }
  }

  _onClickHoliday(holidayDetails) {
    const title = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');

    title.textContent = holidayDetails.name;
    p1.textContent = `Date: ${holidayDetails.date.toLocaleDateString()}`;
    p2.textContent = `Local Name: ${holidayDetails.localName}`;
    p3.textContent = `Fixed Date: ${holidayDetails.fixed ? 'Yes' : 'No'}`;

    this.modal.showContent([title, p1, p2, p3]);
  }

  _onClickChangeMonth(event) {
    // next
    if (event.target.id === 'next-month') {
      if (this.month < 11) this.month += 1;
      else return;
    }
    // previous
    else {
      if (this.month > 0) this.month -= 1;
      else return;
    }

    this._renderTable();
    this._renderHolidays();
    this.updateTitle();
  }

  // returns a 12-position vector containing the
  // holidays of each month
  _splitByMonth(holidays) {
    let splited = [];
    for (let i = 0; i < 12; i++) splited[i] = [];
    for (let h of holidays) {
      const date = Calendar.getDateFromString(h.date);
      const month = date.getMonth();
      h = { ...h, date }; // save the converted date
      if (!splited[month]) {
        splited[month] = [h];
      } else {
        splited[month].push(h);
      }
    }
    return splited;
  }

  updateTitle() {
    const titleEL = document.querySelector('#calendar-title');
    const d = new Date(YEAR, this.month, 1);
    const _month = d.toLocaleString('en', { month: 'short' });
    titleEL.textContent = `${_month} ${YEAR}`;
  }

  static getFirstWeakDay(month, year) {
    const date = new Date(year, month, 1);
    return date.getDay();
  }

  static daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  static getDateFromString(str) {
    const _str = str.replaceAll('-', '/');
    return new Date(_str);
  }
}
