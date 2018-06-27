import React, {Component} from 'react';
import {connect} from 'react-redux';

import {scoresListSelector, scoresMutateListSelector, fetchAllScores} from '../../ducks/scores';
import {betsListSelector, fetchAllBets} from '../../ducks/bets';

class TotalPage extends Component {
  componentDidMount() {
    const { fetchAllScores, fetchAllBets } = this.props;

    fetchAllScores();
    fetchAllBets();
  }

  render() {
    const { bets, scores } = this.props;

    console.log(bets);

    return (
      <div>
        Total
      </div>
    );
  }
}

export default connect((state) => ({
  scores: scoresMutateListSelector(state),
  bets: betsListSelector(state)
}), {fetchAllScores, fetchAllBets})(TotalPage);
