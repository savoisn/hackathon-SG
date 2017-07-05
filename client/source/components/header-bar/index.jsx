import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';

import styles from './index.css';

export default class HeaderBar extends Component {
  render() {
    return (
      <div>

      <AppBar
        onLeftIconButtonTouchTap={this.props.onOpenSideBar}
        title="Cash Pool"
      />

      <div className={styles.btnLine}>

        <Link className={styles.firstLink} to="/"><i></i><span>solder</span></Link>
        <Link className={styles.secondLink}><span>- 46 e</span></Link>
        <Link className={styles.thirdLink} to="/"><i></i><span>activité</span></Link>
      </div>

      </div>

    );
  }
}

HeaderBar.propTypes = {
  onOpenSideBar: PropTypes.func,
};
