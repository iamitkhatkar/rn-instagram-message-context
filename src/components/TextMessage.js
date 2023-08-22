import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const TextMessage = ({content, isSender}) => {
  return (
    <View
      pointerEvents="none"
      style={[styles.container, isSender && styles.sender]}>
      <Text style={[styles.text, isSender && styles.senderText]}>
        {content.text}
      </Text>
    </View>
  );
};

export default TextMessage;

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get('window').width * 0.8,
    alignItems: 'flex-start',
    backgroundColor: '#eee',
    padding: 10,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 16,
  },
  text: {
    fontSize: 15,
  },
  senderText: {
    color: 'white',
  },
  sender: {
    backgroundColor: '#0084ff',
  },
});
