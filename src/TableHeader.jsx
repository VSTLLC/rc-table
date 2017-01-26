import React, { PropTypes } from 'react';
import shallowequal from 'shallowequal';

export default React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
    getHeaderWrapper: PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  },
  render() {
    const { prefixCls, rowStyle, rows, getHeaderWrapper } = this.props;
    return getHeaderWrapper(
      <thead className={`${prefixCls}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => <th {...cellProps} key={i} />)}
            </tr>
          ))
        }
      </thead>
    );
  },
});
