import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList, StatusBar} from 'react-native';
import {messagesData} from '../../sampleData';
import Message from '../components/Message';
import Header from '../components/Header';
import PortalView from '../components/PortalView';

const MessageScreen = () => {
  const [messageCordinates, setMessageCordinates] = useState({x: 0, y: 0});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isSender, setSender] = useState(false);
  const onLongPress = (e, message) => {
    console.log('onLongPress', e.nativeEvent);
    const {pageY, locationY} = e.nativeEvent;
    let y = pageY - locationY;

    setMessageCordinates({
      x: 0,
      y,
    });
    setSelectedMessage(message);
  };

  console.log('messageCordinates', messageCordinates);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <FlatList
        data={messagesData}
        keyExtractor={item => item.createdAt}
        renderItem={({item}) => (
          <Message {...item} onLongPress={onLongPress} onPressIn={setSender} />
        )}
      />
      <PortalView
        selectedMessage={selectedMessage}
        messageCordinates={messageCordinates}
        setSelectedMessage={setSelectedMessage}
        isSender={isSender}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
