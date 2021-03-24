import React, {useCallback, useEffect, useState} from "react";
import { View, FlatList, Text, TouchableHighlight, Button, StyleSheet } from "react-native";
import someListener from "some-listener-library";

/*
  PURPOSE: The purpose of this exercise is for you to demonstrate
  your understanding and ability to work with React Native components.

  TASK: 
  - Refactor this component to make use of React Hooks.
  - Identify and address any performance issues.
  - Identify and address any poor code practices/implementation.
  - In the comment block at the end of the file, write any notes about
  what you did, anything you've identified and improved.
*/

/*
  THINGS TO NOTE: 
  - someListener returns a function with a remove method on it.

  - This component is implemented poorly on purpose.

  - This file is not meant to compile nor depend on the help of
  linting or formatting tools. It is simple enough that we expect
  you to identify what can be improved with it visually.
*/

const getTimeStamp = () => {
  const date = new Date();
  return date.toLocaleString();
}

const refactorComponent = props => {

  const [ time, setTimeState ] = useState(getTimeStamp());

  useEffect(() => {
    const listener = someListener.register((e) => {
      // This callback for the listener is arbitrary and can
      // be ignored for this exercise
    });
    return function clean() {
      listener.clear();
    };
  });

  const onPressButton = useCallback(() => {
    setTimeState(getTimeStamp());
  }, []);

  const renderItem = useCallback(
    ({ item: { title }, separators }) => {
      function onPressItem() {
        Alert.alert("Title", title);
      }

      return (
        <TouchableHighlight
          onPress={onPressItem}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <View style={{ backgroundColor: "white" }}>
            <Text>{title}</Text>
            <Text>{time}</Text>
          </View>
        </TouchableHighlight>
      );
    },
    [time]
  );

  const { dataSet } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Current Time: {time}</Text>
        <Button title="Update Timestamp" onPress={onPressButton} />
      </View>
      <FlatList data={dataSet} renderItem={renderItem} />
    </View>
  );
}

export default refactorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  content: {
    width: "100%",
    height: 60,
  },
});

/*
  Write your notes below:

  -Delete componentDidMount() because functional components does not have it.
  -Implement useEffect instead
  -Put styles in a constant
  -Make use of useCallback for performance

*/