import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import {updateLoaded} from '../../ducks/bets';
import './styles.css';

class Loaded extends Component {
  render() {
    return (
      <div className="loaded-component">
        <div className="loaded-component-holder">
          <div className="icon-wrapper">
            <CheckIcon/>
          </div>
          <Typography variant="title" gutterBottom>Hooh, that was hard, but we did it - your bets were saved</Typography>
          <Typography className="title" variant="title" gutterBottom>Now go and check total score</Typography>
          <Link onClick={this.props.updateLoaded} to='/total'>
            <Button variant="contained" color="primary">
              Move to total
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, {updateLoaded})(Loaded);
