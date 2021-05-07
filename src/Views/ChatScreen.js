import React, {useState, useContext, useEffect} from 'react';
import {GiftedChat, Composer, Send, Bubble} from 'react-native-gifted-chat';
import {AuthContext} from '../navigation/AuthProvider';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatScreen({route}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const {displayName, uniqueID, email} = route.params;
  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();

  async function handleSend(message) {
    const text = message[0].text ? message[0].text : message;

    const array1 = [currentUser.displayName, displayName];
    array1.sort();
    var newId = array1[0] + array1[1];

    await firestore()
      .collection('chats')
      .doc(newId)
      .collection('chat')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: currentUser.displayName,
        },
      });

    await firestore()
      .collection('chats')
      .doc(newId)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
            from: currentUser.displayName,
            to: displayName,
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const array1 = [currentUser.displayName, displayName];
    array1.sort();
    var newId = array1[0] + array1[1];
    const messagesListener = firestore()
      .collection('chats')
      .doc(newId)
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              displayName: firebaseData.user.displayName,
            };
          }
          return data;
        });
        setMessages(messages);
      });
    return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#33A6D7',
          },
          left: {
            backgroundColor: '#006894',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#33A6D7" />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  function renderSend(props) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Send {...props}>
          <View>
            <Ionicons name="send" size={28} color="#33A6D7" />
          </View>
        </Send>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => handleSend(message)}
      user={{
        _id: currentUser.uid,
      }}
      placeholder="Type your message here..."
      alwaysShowSend
      scrollToBottom
      renderBubble={renderBubble}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSend={renderSend}
    />
  );
}
