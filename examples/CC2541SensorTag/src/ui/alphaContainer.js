// @flow

import * as React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { animations } from './styles'

type Props = {
  currentView: number,
  children: React.Element<any>[]
}

type State = {
  previousView: ?number,
  animation: Animated.Value
}

export default class AlphaContainer extends React.Component<void, Props, State> {
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      previousView: null,
      animation: new Animated.Value(1)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.currentView !== nextProps.currentView) {
      this.setState({ previousView: this.props.currentView })
      Animated.timing(this.state.animation, animations.easeOut).start(() => {
        this.setState({
          animation: new Animated.Value(1),
          previousView: null
        })
      })
    }
  }

  render() {
    const previousView = this.state.previousView ? this.props.children[this.state.previousView] : null
    const currentView = this.props.children[this.props.currentView]
    return (
      <View style={styles.mainView}>
        <View style={styles.childView}>{currentView}</View>
        {previousView ? (
          <Animated.View style={[styles.childView, { opacity: this.state.animation }]} pointerEvents={'none'}>
            {previousView}
          </Animated.View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  childView: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
