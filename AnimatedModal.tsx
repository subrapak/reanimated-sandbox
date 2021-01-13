import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type Props = {
  translateY: Animated.Value<number>;
  animatedHeight: Animated.Value<number>;
};

const mockData: string[] = Array.from(Array(10).keys()).map(
  (item: number) => `Item: ${item}`,
);
console.log(mockData);
const renderItem = ({ item }: { item: string }) => <Text>{item}</Text>;

const AnimatedModal: FunctionComponent<Props> = ({
  translateY,
  animatedHeight,
}: Props) => {
  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      easing: Easing.ease,
    }).start();
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
    }).start();
  };
  return (
    <>
      <Animated.View
        style={{
          ...styles.animatedModal,
          height: animatedHeight,
          transform: [{ translateY: translateY }],
        }}>
        <View style={styles.mainContent}>
          <View style={styles.searchBar}></View>
          <View>
            <FlatList
              data={mockData}
              renderItem={renderItem}
              keyExtractor={(item: string) => item}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default AnimatedModal;

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    backgroundColor: 'yellow',
  },
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
  },
  animatedModal: {
    position: 'absolute',
    top: 0,
    height: height,
    width: width,
    marginHorizontal: 'auto',
    display: 'flex',
    borderRadius: 25,
    paddingVertical: 50,
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
});
