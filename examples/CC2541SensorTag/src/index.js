// @flow

import React, { Component } from 'react'
import { StyleSheet, StatusBar, View, Text } from 'react-native'
import Header from './ui/header'
import Button from './ui/button'
import AlphaContainer from './ui/alphaContainer'
import { sizes } from './ui/styles'

import Preview from './preview/preview'
import Test from './test/test'

type State = {
  currentViewIndex: number
}

export default class MainComponent extends Component<void, void, State> {
  state: State

  constructor(props: void) {
    super(props)
    this.state = {
      currentViewIndex: 1
    }
  }

  _goBack = () => {
    this.setState({ currentViewIndex: 1 })
  }

  _goToPreview = () => {
    this.setState({ currentViewIndex: 2 })
  }

  _goToTest = () => {
    this.setState({ currentViewIndex: 3 })
  }

  _goToBackground = () => {
    this.setState({ currentViewIndex: 4 })
  }

  render() {
    return (
      <AlphaContainer currentView={this.state.currentViewIndex}>
        <StatusBar backgroundColor={'transparent'} barStyle="light-content" translucent={true} />

        {/* Main screen */}
        <Header title={'CC2541 SensorTag'}>
          <Button title={'Preview'} onPress={this._goToPreview} />
          <View style={styles.spacing} />
          <Text style={styles.textView}>Scan, connect and show basic information about sensor tag.</Text>
          <View style={styles.spacing} />

          <Button title={'Test'} onPress={this._goToTest} disabled={true} />
          <View style={styles.spacing} />
          <Text style={styles.textView}>Run basic test case on your SensorTag to check if library behaves well</Text>
          <View style={styles.spacing} />

          <Button title={'Background'} onPress={this._goToBackground} disabled={true} />
          <View style={styles.spacing} />
          <Text style={styles.textView}>Check if communication with device works in background mode</Text>
          <View style={styles.spacing} />
        </Header>

        {/* Preview screen */}
        <Header title={'Preview'} onBack={this._goBack}>
          <Preview />
        </Header>

        {/* Test screen */}
        <Header title={'Test'} onBack={this._goBack}>
          <Test />
        </Header>

        {/* Background screen */}
        <Header title={'Background'} onBack={this._goBack}>
          <Test />
        </Header>
      </AlphaContainer>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  doubleSpacing: {
    marginTop: 2 * sizes.margin
  },
  spacing: {
    marginTop: sizes.margin
  },
  textView: {
    textAlign: 'justify'
  }
})
