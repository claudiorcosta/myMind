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
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../Styles/FeedStyles';
import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, onPress, onPress1}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [likes, setLikes] = useState(false);
  const [comments, setComments] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeDocID, setLikeDocID] = useState('');

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

  const likePost = async () => {
    const {id} = await firestore().collection('likes').add({
      userID: user.uid,
      postId: item.id,
      post: item.post,
      userEmail: user.email,
      author: userData.displayName,
    });

    setLikeDocID(id);
    setIsLiked(true);
  };

  const dislikePost = () => {
    firestore().collection('likes').doc(likeDocID).delete();

    setIsLiked(false);
  };

  const getlikes = async () => {
    if (user) {
      async function checkForLikes() {
        const docs = await firestore()
          .collection('likes')
          .where('userID', '==', user.uid)
          .where('postId', '==', item.id)
          .get();
        if (docs.size === 1) {
          setIsLiked(true);
          setLikeDocID(docs.docs[0].id);
        }
      }
      checkForLikes();
    }
  };

  const fetchLikes = (postId) => {
    return firestore().collection('likes').where('postId', '==', postId).get();
  };

  const getComments = async () => {
    setComments((await fetchComments(item.id)).size);
    async function checkForComments() {
      await firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .get();
    }
    checkForComments;
  };

  const fetchComments = (postId) => {
    return firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .get();
  };

  useEffect(() => {
    getlikes();
    getUser();
    getComments();
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
          <TouchableOpacity onPress={onPress}>
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
        {isLiked ? (
          <Interaction onPress={dislikePost}>
            <Ionicons name="heart" size={25} color="red" />
            <InteractionText>{likes}</InteractionText>
          </Interaction>
        ) : (
          <Interaction onPress={likePost}>
            <Ionicons name="heart-outline" size={25} color="red" />
            <InteractionText>{likes}</InteractionText>
          </Interaction>
        )}

        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} onPress={onPress1} />
          <InteractionText onPress={onPress1}>{comments}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
