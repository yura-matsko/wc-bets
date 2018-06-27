import React, {Component} from 'react';
import {connect} from 'react-redux';

import Pie from '../../components/pie';

import {scoresMutateListSelector, fetchAllScores} from '../../ducks/scores';
import {betsListSelector, fetchAllBets} from '../../ducks/bets';

class TotalPage extends Component {
  componentDidMount() {
    const { fetchAllScores, fetchAllBets } = this.props;

    fetchAllScores();
    fetchAllBets();
  }

  render() {
    const { total } = this.props;

    return (
      <Pie width={480} height={480} total={total} />
    );
  }
}

export default connect((state) => {
  const scores = scoresMutateListSelector(state);
  const bets = betsListSelector(state);
  const total = [];

  bets.map(item => {
    const score = Object.keys(item.bets).reduce((acc, val) => {

      if(scores[val].option === item.bets[val].option) acc += 1;

      if(item.bets[val].score &&
        (JSON.stringify(item.bets[val].score) === JSON.stringify(scores[val].score))) acc += 1;

      return acc;
    }, 0);

    total.push({ name: item.name, score })
  });

  return {total}
  }, {fetchAllScores, fetchAllBets})(TotalPage);
