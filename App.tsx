/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  PanResponder,
  Dimensions,
} from 'react-native';
import AnimatedModal from './AnimatedModal';

import {
  GestureHandlerStateChangeNativeEvent,
  PanGestureHandlerEventExtra,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Animated, {
  add,
  block,
  cond,
  Easing,
  eq,
  event,
  set,
  timing,
  Value,
} from 'react-native-reanimated';

type PanGestureHandlerNativeEventType = GestureHandlerStateChangeNativeEvent &
  PanGestureHandlerEventExtra;

const { width, height } = Dimensions.get('window');
const App = () => {
  const modalHeight = new Value<number>(0);
  const modalTranslateY = new Value<number>(height);
  const [text, setText] = useState<string>('default');
  const handleTapStateChange = (event: TapGestureHandlerGestureEvent) => {
    Animated.timing(modalTranslateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.sin,
    }).start();
    Animated.timing(modalHeight, {
      toValue: height,
      duration: 300,
      easing: Easing.sin,
    }).start();
    console.log('hi');
    console.log('event', event.nativeEvent);
  };

  const translateX = new Value<number>();
  const translateY = new Value<number>();
  const offsetX = new Value<number>();
  const offsetY = new Value<number>();
  const panHandler = event(
    [
      {
        nativeEvent: ({
          translationX: x,
          translationY: y,
          state,
        }: PanGestureHandlerNativeEventType) =>
          block([
            set(translateX, add(x, offsetX)),
            set(translateY, add(y, offsetY)),
            cond(eq(state, State.END), [
              set(offsetX, add(offsetX, x)),
              set(offsetY, add(offsetY, y)),
            ]),
          ]),
      },
    ],
    { useNativeDriver: true },
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <PanGestureHandler
          maxPointers={1}
          onHandlerStateChange={panHandler}
          onGestureEvent={panHandler}>
          <Animated.View
            style={[
              {
                height: 100,
                width: 100,
                backgroundColor: 'red',
              },
              {
                transform: [
                  { translateX: translateX },
                  { translateY: translateY },
                ],
              },
            ]}
          />
        </PanGestureHandler> */}

        <TapGestureHandler
          onHandlerStateChange={handleTapStateChange}
          numberOfTaps={1}>
          <View
            style={{
              padding: 10,
              width: 300,
              borderColor: 'grey',
              borderWidth: 1,
            }}>
            <Text>{text}</Text>
          </View>
        </TapGestureHandler>
      </View>
      <AnimatedModal
        animatedHeight={modalHeight}
        translateY={modalTranslateY}
      />
    </SafeAreaView>
  );
};

export default App;
