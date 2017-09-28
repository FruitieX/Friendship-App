import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Title } from '../../components/Text';
import { ViewContainer, Centered, IconImage } from '../../components/Layout';
import Person from '../../components/Person';
import Spinner from '../../components/Spinner';

const mapStateToProps = state => ({});

export class PeopleView extends React.Component {
  static navigationOptions = {
    title: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/search0.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    data: {},
    page: 0,
    loading: false,
    filteredUsers: [],
    searchedUsername: '',
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Person color="#939795" data={item} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      `http://0.0.0.0:3888/users/page/${this.state.page}`,
      {
        method: 'get',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
        },
      },
    );
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json],
      loading: false,
    }));
  };

  handleEnd = () => {
    this.setState(
      state => ({ page: this.state.page + 1 }),
      () => this.fetchData(),
    );
  };

  getUserByUsername(username) {
    this.setState({ searchedUsername: username });

    fetch(`http://0.0.0.0:3888/users/search/${username}`, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(filteredUsers => this.setState({ filteredUsers }));
  }

  renderFlatList() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={
          this.state.searchedUsername.length > 0
            ? this.state.filteredUsers
            : this.state.data
        }
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onEndReached={this.handleEnd}
        onEndReachedThreshold={0.4}
        //ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
        horizontal
      />
    );
  }

  render = () => (
    <ViewContainer>
      <Title> People </Title>
      <SearchBar
        round
        lightTheme
        onChangeText={username => this.getUserByUsername(username)}
        placeholder="Search"
      />
      <Centered>{this.renderFlatList()}</Centered>
    </ViewContainer>
  );
}

export default connect(undefined)(PeopleView);
