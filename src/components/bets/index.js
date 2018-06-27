import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loader from '../../components/loader';
import RadioComponent from '../../components/form/radio';
import InputComponent from '../../components/form/input';
import LoadedContainer from './loaded';
import './styles.css';

import {loadingSelector, scoresListSelector, fetchAllScores} from '../../ducks/scores';

class BetsComponent extends Component {
  componentDidMount() {
    this.props.fetchAllScores();
  }

  render() {
    const {loaded, loading} = this.props;
    return (
      loading ?
        <Loader/>
        : <form onSubmit={this.props.handleSubmit} className="bets-form">
          {
            !loaded ?
              <div>
                {this.getHeader()}
                {this.getTables()}
              </div>
              : <LoadedContainer />
          }
        </form>
    );
  }

  getHeader = () => {
    const {pristine, submitting} = this.props;

    return (
      <header className="app_bar">
        <Typography variant="title" gutterBottom>Place your bets, gentlemen</Typography>
        <Button variant="contained" type="submit" disabled={pristine || submitting} color="secondary">Save</Button>
      </header>
    )
  };

  getTables = () => this.props.scores.map(this.getRows);

  getRows = (score) => (
    <Table key={score.name}>
      <TableHead>
        <TableRow>
          <TableCell>
            <div className="match-header">
              <span className="match-date">{score.matches[0] ? score.matches[0].date : null}</span>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {score.matches.map(this.getCell)}
      </TableBody>
    </Table>
  );

  getCell = (cell) => {
    const id = cell.team1.code
      + cell.team2.code
      + (cell.group ? cell.group.split(' ')[1] : '');

    const currentDate = new Date();
    const matchDate = new Date(cell.date);
    const isDisabled = matchDate < currentDate.setDate(currentDate.getDate() - 1);

    return (
      <TableRow key={cell.team1.name}>
        <TableCell>
          <div className="match-row">
            <span className="time">{cell.time}</span>
            <i className="group-name">{cell.group}</i>
            <span className="team-info">
            <span className="first-team">
              {cell.team1.name}
            </span>
              {this.getScore(cell)}
              <span className="second-team">
              {cell.team2.name}
            </span>
          </span>
            <FormSection className='bet-holder' name={id}>
              {this.betsContainer(isDisabled)}
              {this.scoreContainer(isDisabled)}
            </FormSection>
          </div>
        </TableCell>
      </TableRow>
    )
  };

  getScore = (cell) => (
    <span className="score">
      <b className="">{cell.score1}</b>
      <b>-</b>
     <b className="">{cell.score2}</b>
    </span>
  );

  betsContainer = (isDisabled) => (
    <Field className="radio-holder" name='option' component={RadioComponent}>
      <FormControlLabel value="V1" disabled={isDisabled} control={<Radio />} label="V1"/>
      <FormControlLabel value="D" disabled={isDisabled} control={<Radio />} label="D"/>
      <FormControlLabel value="V2" disabled={isDisabled} control={<Radio />} label="V2"/>
    </Field>
  );

  scoreContainer = (scoreContainer) => (
    <FormSection className="input-holder" name='score'>
      <Field
        className="input"
        disabled={scoreContainer}
        name='t1'
        type="number"
        component={InputComponent}
      />
      <span>-</span>
      <Field
        className="input"
        disabled={scoreContainer}
        name='t2'
        type="number"
        component={InputComponent}
      />
    </FormSection>
  );
}

const BetsFormComponent = reduxForm({ form: 'betsForm' })(BetsComponent);

export default connect((state) => ({
  scores: scoresListSelector(state),
  loading: loadingSelector(state)
}), {fetchAllScores})(BetsFormComponent);
