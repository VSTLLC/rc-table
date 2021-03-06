'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TableCell = _react2["default"].createClass({
  displayName: 'TableCell',

  propTypes: {
    record: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    index: _react.PropTypes.number,
    indent: _react.PropTypes.number,
    indentSize: _react.PropTypes.number,
    column: _react.PropTypes.object,
    expandIcon: _react.PropTypes.node
  },
  isInvalidRenderCellText: function isInvalidRenderCellText(text) {
    return text && !_react2["default"].isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
  },
  handleClick: function handleClick(e) {
    var _props = this.props,
        record = _props.record,
        onCellClick = _props.column.onCellClick;

    if (onCellClick) {
      onCellClick(record, e);
    }
  },
  render: function render() {
    var _props2 = this.props,
        record = _props2.record,
        indentSize = _props2.indentSize,
        prefixCls = _props2.prefixCls,
        indent = _props2.indent,
        index = _props2.index,
        expandIcon = _props2.expandIcon,
        column = _props2.column;
    var dataIndex = column.dataIndex,
        render = column.render,
        _column$className = column.className,
        className = _column$className === undefined ? '' : _column$className;

    // We should return undefined if no dataIndex is specified, but in order to
    // be compatible with object-path's behavior, we return the record object instead.

    var text = void 0;
    if (typeof dataIndex === 'number') {
      text = (0, _lodash2["default"])(record, dataIndex);
    } else if (!dataIndex || dataIndex.length === 0) {
      text = record;
    } else {
      text = (0, _lodash2["default"])(record, dataIndex);
    }
    var tdProps = void 0;
    var colSpan = void 0;
    var rowSpan = void 0;

    if (render) {
      text = render(text, record, index);
      if (this.isInvalidRenderCellText(text)) {
        tdProps = text.props || {};
        rowSpan = tdProps.rowSpan;
        colSpan = tdProps.colSpan;
        text = text.children;
      }
    }

    // Fix https://github.com/ant-design/ant-design/issues/1202
    if (this.isInvalidRenderCellText(text)) {
      text = null;
    }

    var indentText = expandIcon ? _react2["default"].createElement('span', {
      style: { paddingLeft: indentSize * indent + 'px' },
      className: prefixCls + '-indent indent-level-' + indent
    }) : null;

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }
    return _react2["default"].createElement(
      'td',
      {
        colSpan: colSpan,
        rowSpan: rowSpan,
        className: className,
        onClick: this.handleClick
      },
      indentText,
      expandIcon,
      text
    );
  }
});

exports["default"] = TableCell;
module.exports = exports['default'];