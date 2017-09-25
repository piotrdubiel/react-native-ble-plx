// @flow

import * as React from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableWithoutFeedback } from 'react-native'
import { colors, animations, sizes } from './styles'

type Props = {
  title: string,
  onBack?: () => void,
  children: React.Element<any>[]
}

type State = {
  animation: Animated.Value
}

export default class HeaderComponent extends React.Component<void, Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0)
    }
  }

  componentWillMount() {
    Animated.timing(this.state.animation, animations.easeIn).start()
  }

  _renderBackButton() {
    if (this.props.onBack == null) return null

    return (
      <TouchableWithoutFeedback onPress={this.props.onBack}>
        <View>
          <Text style={styles.backStyle}>{'<'}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Animated.View
          style={[
            styles.headerView,
            {
              opacity: this.state.animation,
              transform: [
                { translateY: this.state.animation.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }
              ]
            }
          ]}
        >
          <Image source={require('./header.png')} resizeMode={'contain'} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{this.props.title}</Text>
          {this._renderBackButton()}
        </Animated.View>
        <View style={styles.contentView}>{this.props.children}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  headerView: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10
  },
  backStyle: {
    fontSize: 40,
    width: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.red
  },
  imageStyle: {
    position: 'absolute',
    left: '50%',
    height: '100%'
  },
  textStyle: {
    fontSize: 20,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: 'transparent'
  },
  contentView: {
    margin: sizes.margin
  }
})
