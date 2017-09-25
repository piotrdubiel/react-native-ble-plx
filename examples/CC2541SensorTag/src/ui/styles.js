// @flow
import { Easing } from 'react-native'

export const sizes = {
  margin: 15
}

export const colors = {
  red: '#e8524b'
}

export const animations = {
  easeIn: {
    toValue: 1,
    useNativeDriver: true,
    duration: 300,
    easing: Easing.ease
  },
  easeOut: {
    toValue: 0,
    useNativeDriver: true,
    duration: 300,
    easing: Easing.ease
  },
  fastEaseIn: {
    toValue: 1,
    useNativeDriver: true,
    duration: 100,
    easing: Easing.ease
  },
  fastEaseOut: {
    toValue: 0,
    useNativeDriver: true,
    duration: 100,
    easing: Easing.ease
  }
}
