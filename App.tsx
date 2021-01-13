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
import { View, SafeAreaView, Text, Dimensions, StyleSheet } from 'react-native';
import AnimatedModal from './AnimatedModal';

import {
  // GestureHandlerStateChangeNativeEvent,
  // PanGestureHandlerEventExtra,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, { Easing, Value } from 'react-native-reanimated';

// type PanGestureHandlerNativeEventType = GestureHandlerStateChangeNativeEvent &
//   PanGestureHandlerEventExtra;

const { height } = Dimensions.get('window');
const App = () => {
  const modalHeight = new Value<number>(0);
  const modalTranslateY = new Value<number>(height);
  const mainTextOpacity = new Value<number>(1);
  const [mainText, setMainText] = useState<string>('');
  const handleTapStateChange = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      Animated.timing(mainTextOpacity, {
        toValue: 0.2,
        duration: 50,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(mainTextOpacity, {
        toValue: 1,
        duration: 50,
        easing: Easing.ease,
      }).start();
    }
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
  };

  // const translateX = new Value<number>();
  // const translateY = new Value<number>();
  // const offsetX = new Value<number>();
  // const offsetY = new Value<number>();
  // const panHandler = reanimatedEvent(
  //   [
  //     {
  //       nativeEvent: ({
  //         translationX: x,
  //         translationY: y,
  //         state,
  //       }: PanGestureHandlerNativeEventType) =>
  //         block([
  //           set(translateX, add(x, offsetX)),
  //           set(translateY, add(y, offsetY)),
  //           cond(eq(state, State.END), [
  //             set(offsetX, add(offsetX, x)),
  //             set(offsetY, add(offsetY, y)),
  //           ]),
  //         ]),
  //     },
  //   ],
  //   { useNativeDriver: true },
  // );

  return (
    <SafeAreaView style={styles.flexOne}>
      <View style={styles.mainViewStyle}>
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
          <Animated.View
            style={[styles.animatedViewStyle, { opacity: mainTextOpacity }]}>
            <Text style={styles.mainText}>{mainText}</Text>
          </Animated.View>
        </TapGestureHandler>
      </View>
      <AnimatedModal
        animatedHeight={modalHeight}
        translateY={modalTranslateY}
        datalist={Array.from(Array(50).keys()).map(
          (item: number) => `Val: ${item}`,
        )}
        autocompleteText={mainText}
        setAutocompleteText={setMainText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  mainText: {
    fontSize: 25,
  },
  animatedViewStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    padding: 10,
    width: 200,
  },
  mainViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
