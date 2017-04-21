import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BottomTear from '../images/bottom-tear.svg'

class Widget extends Component{
  render() {
    let styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360
      },
      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden'
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360
      }
    };

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          {this.props.children}
        </div>
        <img style={styles.bottomTear} alt="bottom tear" src={BottomTear} />
      </div>
    );
  }
}

Widget.defaultProps = {
  height: '100%'
};

Widget.propTypes = {
  height: PropTypes.node
}

export default Widget
