"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.reverse.js");
var _react = _interopRequireWildcard(require("react"));
var _reactJss = require("react-jss");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _dateFormat = _interopRequireDefault(require("../dateFormat"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import './Datepicker.css'
const dateNow = new Date();
const yearNow = dateNow.getFullYear();
const useStyles = (0, _reactJss.createUseStyles)({
  "cal-button": {
    "font-family": 'sans-serif',
    "align-self": "center",
    "padding": "0.25rem",
    "font-size": "0.75rem",
    // "line-height": "1rem",
    "border-radius": "0.25rem",
    "background-color": "#3a33a4",
    "color": "white"
  },
  "cal-button:hover": {
    "background-color": "white",
    "color": "black",
    "box-shadow": "0 2px 10px 5px #bcbcbc"
  },
  "darkBG": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "background-color": "rgba(0, 0, 0, 0.2)",
    "width": "100%",
    "height": "100%",
    "overflow": "hidden",
    "z-index": "0",
    "position": "absolute",
    "top": "0",
    "left": "0"
  },
  "cal-cell": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "cursor": "pointer",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "100%",
    "border-radius": "0.25rem"
  },
  "cal-cell:hover": {
    "background-color": "#082450",
    "color": "white"
  },
  "year-grid": {
    "font-family": 'sans-serif',
    "display": "grid",
    "grid-template-columns": "repeat(5, minmax(0, 1fr))",
    "width": "100%",
    "padding-right": "0.25rem",
    "cursor": "default",
    "font-size": "1rem",
    "line-height": "1.5rem",
    "text-align": "center",
    "height": "9.6em",
    "overflow-y": "auto"
  },
  "days-header": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "grid-template-columns": "repeat(7, minmax(0, 1fr))",
    "gap": "0.25rem",
    "border-bottom-width": "2px",
    "text-align": "center",
    "cursor": "default"
  },
  "days-grid": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "margin-top": "0.25rem",
    "grid-template-columns": "repeat(7, minmax(0, 1fr))",
    "gap": "0.25rem",
    "text-align": "center"
  },
  "day-selected": {
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "year-selected": {
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "month-grid": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "display": "grid",
    "grid-template-columns": "repeat(3, minmax(0, 1fr))",
    "width": "100%",
    "padding-right": "0.25rem",
    "cursor": "default",
    "line-height": "1.5rem",
    "text-align": "center",
    "height": "9em",
    "overflow-y": "auto"
  },
  "month-selected": {
    "font-size": ".95em",
    "font-weight": "700",
    "background-color": "rgba(0, 0, 0, 0.2)"
  },
  "italic": {
    "font-style": "italic"
  },
  "nav-container": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    'margin-bottom': '0.5em',
    "display": "flex",
    "justify-content": "space-between"
  },
  "nav-buttons": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    margin: 0,
    "display": "flex",
    "gap": "0.5rem",
    "align-self": "center",
    "font-weight": "700"
  },
  "nav-button": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    margin: '0.5em',
    "padding-left": "0.25rem",
    "padding-right": "0.25rem",
    "cursor": "pointer"
  },
  "nav-button:hover": {
    "border-radius": "0.25rem",
    "color": "#ffffff",
    "background-color": "#082450"
  },
  "main-container": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "position": "fixed",
    "border-radius": "0.5rem",
    "width": "auto",
    "height": "auto",
    "background-color": "white",
    "box-shadow": "0 5px 20px 0px #00011c"
  },
  "date-picker-container": {
    "font-family": 'sans-serif',
    "font-size": "1em",
    "padding-top": "0.5rem",
    "padding-bottom": "0.5rem",
    "margin-left": "0.75rem",
    "margin-right": "0.75rem",
    "text-align": "left",
    "width": "16.3em",
    "height": "auto"
  },
  "margin-left": {
    "margin-left": "0.25rem"
  }
});
const DatePicker = _ref => {
  let {
    setModalDateIsOpen,
    clickedInput,
    endYear = yearNow,
    yearCount = 100
  } = _ref;
  const styles = useStyles();
  const [selectedDate, setSelectedDate] = (0, _react.useState)(new Date());
  const [yearSelectIsOpen, setYearSelectIsOpen] = (0, _react.useState)(false);
  const [monthSelectIsOpen, setMonthSelectIsOpen] = (0, _react.useState)(false);
  const changeMonth = amount => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + amount);
    setSelectedDate(newDate);
  };
  const changeYear = year => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    toggleYearScreen();
  };
  const selectMonth = month => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(month);
    setSelectedDate(newDate);
    toggleMonthScreen();
  };
  const selectDate = date => {
    document.getElementById(clickedInput).value = (0, _dateFormat.default)(date);
    setModalDateIsOpen(false);
  };
  const toggleYearScreen = () => {
    setYearSelectIsOpen(!yearSelectIsOpen);
    setMonthSelectIsOpen(false);
  };
  const toggleMonthScreen = () => {
    setMonthSelectIsOpen(!monthSelectIsOpen);
    setYearSelectIsOpen(false);
  };
  const getFirstDayOfWeek = () => {
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    if (firstDay.getDay() === 0) return 7;else return firstDay.getDay();
  };
  const generateYears = () => {
    const today = new Date();
    const yearToday = today.getFullYear();
    const years = [];
    for (let year = endYear - yearCount; year <= endYear; year++) {
      years.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "year-".concat(year),
        id: "year-".concat(year),
        onClick: () => changeYear(year),
        className: styles['cal-cell'] + (yearToday === year ? ' ' + styles['year-selected'] : '')
      }, year));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles["year-grid"]
    }, years.reverse());
  };
  const generateMonths = () => {
    const today = new Date();
    const monthToday = today.getMonth();
    const months = [];
    const yearToday = today.getFullYear();
    const selectedYear = selectedDate.getFullYear();
    for (let month = 1; month <= 12; month++) {
      const date = new Date(Date.UTC(2000, month, 1));
      const monthString = date.toLocaleString('default', {
        month: 'long'
      });
      months.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "month-".concat(month),
        id: "month-".concat(month),
        onClick: () => selectMonth(month - 1),
        className: styles['cal-cell'] + (monthToday === month - 1 && yearToday === selectedYear ? ' ' + styles['month-selected'] : '')
      }, monthString));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      // ref={refYearsList}
      className: styles["month-grid"]
    }, months);
  };
  const generateDays = () => {
    const days = [];
    const firstDayOfWeek = getFirstDayOfWeek();
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const today = new Date();
    const dayToday = today.getDate();
    const yearToday = today.getFullYear();
    const selectedYear = selectedDate.getFullYear();
    const monthToday = today.getMonth();
    const selectedMonth = selectedDate.getMonth();
    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "empty-".concat(i)
      }));
    }
    for (let date = 1; date <= lastDay.getDate(); date++) {
      days.push( /*#__PURE__*/_react.default.createElement("div", {
        key: date,
        className: styles['cal-cell'] + (dayToday === date && monthToday === selectedMonth && yearToday === selectedYear ? ' ' + styles['day-selected'] : ''),
        onClick: () => selectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date))
      }, date));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: styles["days-header"]
    }, /*#__PURE__*/_react.default.createElement("div", null, "Mon"), /*#__PURE__*/_react.default.createElement("div", null, "Tue"), /*#__PURE__*/_react.default.createElement("div", null, "Wed"), /*#__PURE__*/_react.default.createElement("div", null, "Thu"), /*#__PURE__*/_react.default.createElement("div", null, "Fri"), /*#__PURE__*/_react.default.createElement("div", {
      className: "italic"
    }, "Sat"), /*#__PURE__*/_react.default.createElement("div", {
      className: "italic"
    }, "Sun")), /*#__PURE__*/_react.default.createElement("div", {
      className: styles["days-grid"]
    }, days));
  };
  const datePickerNavigator = () => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles["nav-container"]
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      className: styles["cal-button"],
      icon: _freeSolidSvgIcons.faArrowLeft,
      onClick: () => changeMonth(-1)
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: styles["nav-buttons"]
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      className: styles["nav-button"],
      onClick: toggleMonthScreen
    }, selectedDate.toLocaleDateString('default', {
      month: 'long'
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: styles["margin-left"]
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: monthSelectIsOpen ? _freeSolidSvgIcons.faCaretDown : _freeSolidSvgIcons.faCaretUp
    })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      className: styles["nav-button"],
      onClick: toggleYearScreen
    }, selectedDate.toLocaleDateString('default', {
      year: 'numeric'
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: styles["margin-left"]
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: yearSelectIsOpen ? _freeSolidSvgIcons.faCaretDown : _freeSolidSvgIcons.faCaretUp
    }))))), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      className: styles["cal-button"],
      icon: _freeSolidSvgIcons.faArrowRight,
      onClick: () => changeMonth(1)
    }));
  };
  if (clickedInput) {
    const inputElement = document.getElementById(clickedInput);
    const inputRect = inputElement.getBoundingClientRect();
    const topOffset = inputRect.top + window.scrollY + 32;
    const leftOffset = inputRect.left + window.scrollX;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles["darkBG"],
      onClick: e => {
        e.target.className === styles['darkBG'] && setModalDateIsOpen(false);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: styles["main-container"],
      style: {
        top: topOffset,
        left: leftOffset
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: styles["date-picker-container"]
    }, datePickerNavigator(), /*#__PURE__*/_react.default.createElement("div", null, yearSelectIsOpen ? generateYears() : monthSelectIsOpen ? generateMonths() : generateDays()))));
  }
};
var _default = exports.default = DatePicker;