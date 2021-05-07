import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../Styles/FeedStyles';
import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const PostCardMyPosts = ({item, onDelete, onPress, navigation}) => {
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
    <Card key={item.id} style={{width: 320}}>
      <UserInfo>
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <UserInfoText>
          <TouchableOpacity>
            <UserName>
              {userData ? userData.displayName || 'Test' : 'Test'}{' '}
            </UserName>
          </TouchableOpacity>
          <PostTime>
            {moment(item.postTime.toDate()).fromNow()} • {item.feeling}
          </PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>
        {item.triggerWarning ? 'Trigger Warning:' : ''} {item.post}
      </PostText>
      <InteractionWrapper>
        <Interaction onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" size={25} />
          <InteractionText>Delete</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCardMyPosts;
