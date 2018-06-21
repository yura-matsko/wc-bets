import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Loader(props) {
  const { classes } = props;
  return (
    <div className="lds">
      <div className="lds-ripple">
        <CircularProgress className={classes.progress} size={50} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Loader);
