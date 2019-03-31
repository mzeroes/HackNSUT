import React from 'react';

import { View, ImageBackground, Image, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';

import { ActivityIndicator, FAB, Text } from 'react-native-paper';

import { getDataFromFire } from 'api/user';
import TopSearchBar from 'components/bars/TopSearchBar';
import { Theme, styles } from 'theme';

class GraphScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isLoadingComplete: false,
  };

  onRefresh = () => {
    this.loadResourcesAsync();
  }

  loadResourcesAsync = async () => {
    await getDataFromFire();
  };

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async componentWillMount() {
    try {
      await this.loadResourcesAsync();
    } catch (err) {
      await this.handleLoadingError(err);
    } finally {
      await this.handleFinishLoading();
    }
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: Theme.background }}>
          <View>
            <Text style={{ alignSelf: 'center', padding: 20 }}>
              Your Monthly Expenses
            </Text>
            <LineChart
              data={{
                labels: ['December', 'January', 'February', 'March', 'April'],
                datasets: [{
                  data: [
                    8000, 7000, 17000, 32000, 0
                  ]
                }]
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel="₹"
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#777',
                backgroundGradientTo: '#666',
                padding: 20,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  padding: 10
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(GraphScreen);
