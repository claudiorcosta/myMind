import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Card,
  UserInfo,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  Reply,
} from '../Styles/CommentStyle';
import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>
              {userData ? userData.displayName || 'Test' : 'Test'}{' '}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.commentTime.toDate()).fromNow()}</PostTime>
          <PostText>{item.comment}</PostText>
        </UserInfoText>
      </UserInfo>
    </Card>
  );
};

export default PostCard;
