import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FlexRow } from './Layout';
import styled from 'styled-components/native';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openSearchTag: tagId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SearchList',
        params: { tagId },
      }),
    ),
});

class Tag extends React.Component {
  render() {
    if (this.props.dark) {
      return (
        <TouchableOpacity
          style={styles.dark}
          onPress={() => this.props.openSearchTag(this.props.data.id)}
        >
          <Text style={styles.item}>{this.props.data.name}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.rectangle}
        onPress={() => this.props.openSearchTag(this.props.data.id)}
      >
        <Text style={styles.item}>{this.props.data.name}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  rectangle: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 7,
    height: 39,
    borderRadius: 76,
    backgroundColor: '#87df91',
  },
  dark: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 7,
    height: 39,
    borderRadius: 76,
    backgroundColor: '#6eb1ea',
  },
  item: {
    height: 20,
    // fontFamily: "NunitoSans",
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.43,
    textAlign: 'center',
    color: '#2d4359',
  },
  nameView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 60,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Tag);
