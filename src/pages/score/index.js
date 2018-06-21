import React, {Component} from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from '../../components/loader';
import './styles.css';

import {loadingSelector, loadedSelector, scoresListSelector, fetchAllScores} from '../../ducks/scores';

class ScorePage extends Component {
  componentDidMount() {
    this.props.fetchAllScores();
  }

  render() {
    return (
      this.props.loading ?
        <Loader/>
        : <div className="table-holder">{this.getTables()}</div>
    );
  }

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

  getCell = (cell) => (
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
        </div>
      </TableCell>
    </TableRow>
  );

  getScore = (cell) => (
    <span className="score">
      <b className="">{cell.score1}</b>
      <b>-</b>
     <b className="">{cell.score2}</b>
    </span>
  );
}

export default connect((state) => ({
  scores: scoresListSelector(state),
  loading: loadingSelector(state),
  loaded: loadedSelector(state)
}), {fetchAllScores})(ScorePage);
