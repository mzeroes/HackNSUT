import * as React from 'react';
import { List, Chip } from 'react-native-paper';
import { summaryDataUpdate } from 'utils/summaryDataUpdate';
import { connect } from 'react-redux';
import store from 'redux/store';

class MyComponent extends React.Component {
  componentWillMount() {
    summaryDataUpdate();
  }

  render() {
    const { summary } = this.props;
    console.log(JSON.stringify(summary, null, 4));
    return (
      <List.Section>
        {/* <List.Subheader>Summary</List.Subheader> */}
        <List.Section style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
          <Chip
            icon="error"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
         Expenses :
            {' '}
            {summary.Expense}
          </Chip>
          <Chip
            icon="add"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
          Income :
            {' '}
            {summary.Income}
          </Chip>
          <Chip
            icon="done"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
          Balance :
            {' '}
            {summary.Balance}
          </Chip>
        </List.Section>
      </List.Section>
    );
  }
}


const mapStateToProps = state => ({
  summary: state.summary
});

export default connect(mapStateToProps)(MyComponent);
