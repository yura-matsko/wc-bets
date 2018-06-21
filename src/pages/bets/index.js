import React, {Component} from 'react';
import {connect} from 'react-redux';
import BetsComponent from '../../components/bets';

import {betsListSelector, fetchAllBets, loadingSelector, loadedSelector, patchBets} from '../../ducks/bets';
import Loader from '../../components/loader';

class BetsPage extends Component {
  componentDidMount() {
    this.props.fetchAllBets();
  }

  render() {
    const { loading, loaded } = this.props;

    return (
      loading ?
        <Loader />
      : <BetsComponent
          data={this.getData()}
          enableReinitialize={true}
          initialValues={this.getData().map(i => i.bets)[0]}
          onSubmit={this.handleSubmit}
          loaded={loaded}
        />
    );
  }

  getData = () => {
    const { bets, location: {pathname} } = this.props;
    return bets ? bets.filter(item => item.name.toLowerCase() === pathname.replace('/', '')) : {};
  };

  handleSubmit = (bets) => {
    const uid = this.getData().map(i => i.uid)[0];
    this.props.patchBets({uid, bets})
  };
}

export default connect((state) => ({
  bets: betsListSelector(state),
  loading: loadingSelector(state),
  loaded: loadedSelector(state),
}), {fetchAllBets, patchBets})(BetsPage);
