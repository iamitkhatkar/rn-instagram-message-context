import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ImageMessage from './ImageMessage';
import TextMessage from './TextMessage';

const Message = props => {
  const {type, isSender, sender, onLongPress, onPressIn, ...rest} = props;
  const [layoutHeight, setLayoutHeight] = useState(0);

  const onLayout = e => {
    const {height} = e.nativeEvent.layout;
    setLayoutHeight(height);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => onPressIn(isSender)}
      onLayout={onLayout}
      onLongPress={e => onLongPress(e, {...props, layoutHeight})}>
      <View style={[styles.container, isSender && styles.sender]}>
        {!isSender && (
          <Image source={{uri: sender.avatar}} style={styles.avatar} />
        )}
        {type === 'text' ? (
          <TextMessage {...rest} isSender={isSender} />
        ) : (
          <ImageMessage {...rest} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sender: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 24,
    height: 24,
    marginLeft: 12,
    backgroundColor: '#eee',
    borderRadius: 15,
  },
});
