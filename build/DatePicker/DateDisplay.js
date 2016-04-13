'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _SlideIn = require('../internal/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var datePicker = context.muiTheme.datePicker;
  var selectedYear = state.selectedYear;


  var styles = {
    root: {
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      color: datePicker.textColor,
      height: 60,
      padding: 20
    },
    monthDay: {
      display: 'inline-block',
      fontSize: 36,
      fontWeight: '400',
      lineHeight: '36px',
      height: props.mode === 'landscape' ? 76 : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: _transitions2.default.easeOut(),
      width: '100%'
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer'
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: _transitions2.default.easeOut(),
      marginBottom: 10
    },
    yearTitle: {
      cursor: !selectedYear && !props.disableYearSelection ? 'pointer' : 'default'
    }
  };

  return styles;
}

var DateDisplay = function (_React$Component) {
  _inherits(DateDisplay, _React$Component);

  function DateDisplay() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DateDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateDisplay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      selectedYear: !_this.props.monthDaySelected,
      transitionDirection: 'up'
    }, _this.handleTouchTapMonthDay = function () {
      if (_this.props.onTouchTapMonthDay && _this.state.selectedYear) {
        _this.props.onTouchTapMonthDay();
      }

      _this.setState({ selectedYear: false });
    }, _this.handleTouchTapYear = function () {
      if (_this.props.onTouchTapYear && !_this.props.disableYearSelection && !_this.state.selectedYear) {
        _this.props.onTouchTapYear();
      }

      if (!_this.props.disableYearSelection) {
        _this.setState({ selectedYear: true });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateDisplay, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedDate !== this.props.selectedDate) {
        var direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
        this.setState({
          transitionDirection: direction
        });
      }

      if (nextProps.monthDaySelected !== undefined) {
        this.setState({
          selectedYear: !nextProps.monthDaySelected
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var locale = _props.locale;
      var selectedDate = _props.selectedDate;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'locale', 'selectedDate', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var year = selectedDate.getFullYear();
      var styles = getStyles(this.props, this.context, this.state);

      var dateTimeFormatted = new DateTimeFormat(locale, {
        month: 'short',
        weekday: 'short',
        day: '2-digit'
      }).format(selectedDate);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            style: styles.year,
            direction: this.state.transitionDirection
          },
          _react2.default.createElement(
            'div',
            { key: year, style: styles.yearTitle, onTouchTap: this.handleTouchTapYear },
            year
          )
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            style: styles.monthDay,
            direction: this.state.transitionDirection
          },
          _react2.default.createElement(
            'div',
            {
              key: dateTimeFormatted,
              style: styles.monthDayTitle,
              onTouchTap: this.handleTouchTapMonthDay
            },
            dateTimeFormatted
          )
        )
      );
    }
  }]);

  return DateDisplay;
}(_react2.default.Component);

DateDisplay.propTypes = {
  DateTimeFormat: _react2.default.PropTypes.func.isRequired,
  disableYearSelection: _react2.default.PropTypes.bool,
  locale: _react2.default.PropTypes.string.isRequired,
  mode: _react2.default.PropTypes.oneOf(['portrait', 'landscape']),
  monthDaySelected: _react2.default.PropTypes.bool,
  onTouchTapMonthDay: _react2.default.PropTypes.func,
  onTouchTapYear: _react2.default.PropTypes.func,
  selectedDate: _react2.default.PropTypes.object.isRequired,
  style: _react2.default.PropTypes.object,
  weekCount: _react2.default.PropTypes.number
};
DateDisplay.defaultProps = {
  disableYearSelection: false,
  monthDaySelected: true,
  weekCount: 4
};
DateDisplay.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired
};
exports.default = DateDisplay;