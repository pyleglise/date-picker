"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePicker;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.reverse.js");
var _react = _interopRequireWildcard(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _dateFormat = _interopRequireDefault(require("../dateFormat"));
var _utilsModule = _interopRequireDefault(require("./styles/utils.module.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const dateNow = new Date();
const yearNow = dateNow.getFullYear();
function DatePicker(_ref) {
  let {
    setModalDateIsOpen,
    clickedInput,
    endYear = yearNow,
    yearCount = 100
  } = _ref;
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
    return firstDay.getDay();
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
        className: _utilsModule.default['cal-cell'] + (yearToday === year ? ' font-bold bg-[rgba(0,0,0,0.2)]' : '')
      }, year));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: 'grid grid-cols-5 w-full pr-1 text-base text-center cursor-default h-[10.4em] overflow-y-auto'
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
        className: _utilsModule.default['cal-cell'] + (monthToday === month - 1 && yearToday === selectedYear ? ' text-[.95em] font-bold bg-[rgba(0,0,0,0.2)]' : '')
      }, monthString));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      // ref={refYearsList}
      className: 'grid grid-cols-3 w-full text-base cursor-default h-[10.4em] overflow-y-auto'
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
        className: _utilsModule.default['cal-cell'] + (dayToday === date && monthToday === selectedMonth && yearToday === selectedYear ? ' font-bold bg-[rgba(0,0,0,0.2)]' : ''),
        onClick: () => selectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date))
      }, date));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "grid grid-cols-7 gap-1 text-center border-b-2 cursor-default"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, "Mon"), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, "Tue"), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, "Wed"), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, "Thu"), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, "Fri"), /*#__PURE__*/_react.default.createElement("div", {
      className: "italic "
    }, "Sat"), /*#__PURE__*/_react.default.createElement("div", {
      className: "italic "
    }, "Sun")), /*#__PURE__*/_react.default.createElement("div", {
      className: "grid grid-cols-7 gap-1 text-center mt-1"
    }, days));
  };
  const datePickerNavigator = () => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "flex justify-between mb-1"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      className: _utilsModule.default['cal-button'],
      icon: _freeSolidSvgIcons.faArrowLeft,
      onClick: () => changeMonth(-1)
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "flex self-center font-bold gap-2"
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      className: "px-1 cursor-pointer hover:bg-bg-color-light hover:text-white hover:rounded ",
      onClick: toggleMonthScreen
    }, selectedDate.toLocaleDateString('default', {
      month: 'long'
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "ml-1"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: monthSelectIsOpen ? _freeSolidSvgIcons.faCaretDown : _freeSolidSvgIcons.faCaretUp
    })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      className: "px-1 cursor-pointer hover:bg-bg-color-light hover:text-white hover:rounded ",
      onClick: toggleYearScreen
    }, selectedDate.toLocaleDateString('default', {
      year: 'numeric'
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "ml-1"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: yearSelectIsOpen ? _freeSolidSvgIcons.faCaretDown : _freeSolidSvgIcons.faCaretUp
    }))))), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      className: _utilsModule.default['cal-button'],
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
      className: _utilsModule.default['darkBG'],
      onClick: e => {
        e.target.className === _utilsModule.default['darkBG'] && setModalDateIsOpen(false);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "fixed h-auto w-auto  bg-white rounded-lg shadow-[0_5px_20px_0] really-dark",
      style: {
        top: topOffset,
        left: leftOffset
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-left mx-3 py-2 w-[16.3em] h-[13.1em] "
    }, datePickerNavigator(), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, yearSelectIsOpen ? generateYears() : monthSelectIsOpen ? generateMonths() : generateDays()))));
  }
}