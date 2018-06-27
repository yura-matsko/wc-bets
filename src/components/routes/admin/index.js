import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import TotalPage from '../../../pages/total';
import ScorePage from '../../../pages/score';
import BetsPage from '../../../pages/bets';
import Wrapper from '../../wrapper';

class AdminRoute extends Component {
  render() {
    return (
      <Wrapper>
        <Switch>
          <Route path='/dima' component={BetsPage} />
          <Route path='/sasha' component={BetsPage} />
          <Route path='/yura' component={BetsPage} />
          <Route path='/total' component={TotalPage} />
          <Route path='/' component={ScorePage} />
          <Redirect from='/wc-bets' to='/score' component={ScorePage} />
        </Switch>
      </Wrapper>
    );
  }
}

export default AdminRoute;
