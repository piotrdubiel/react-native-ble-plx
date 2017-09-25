// @flow

import * as React from 'react'
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native'
import { colors, animations } from './styles'

type Props = {
  title: string,
  onPress?: () => void,
  disabled?: boolean,
  style?: mixed
}

type State = {
  animation: Animated.Value
}

export default class Button extends React.Component<void, Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0)
    }
  }

  _onPressIn = () => {
    Animated.timing(this.state.animation, animations.fastEaseIn).start()
  }

  _onPressOut = () => {
    Animated.timing(this.state.animation, animations.fastEaseOut).start()
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.disabled ? undefined : this.props.onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <View style={[styles.buttonView, this.props.disabled ? styles.disabledButtonView : null]}>
          {this.props.disabled ? null : (
            <Animated.View
              style={[
                styles.hoverView,
                {
                  transform: [
                    { scaleX: this.state.animation.interpolate({ inputRange: [0, 1], outputRange: [0.05, 2.0] }) }
                  ],
                  opacity: this.state.animation
                }
              ]}
            />
          )}
          <Text style={styles.textView}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.red,
    overflow: 'hidden',
    elevation: 2,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 1
  },
  disabledButtonView: {
    backgroundColor: 'gray'
  },
  textView: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    margin: 5,
    backgroundColor: 'transparent'
  },
  hoverView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '-50%',
    backgroundColor: 'pink',
    borderRadius: 3
  }
})
