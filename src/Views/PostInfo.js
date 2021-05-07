import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../Components/PostCard';
import CommentCard from '../Components/CommentCard';
import {GiftedChat, Composer, Send, Bubble} from 'react-native-gifted-chat';
import {TextInput} from 'react-native-gesture-handler';

const PostInfo = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(null);
  const {user, logout} = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('postId', '==', route.params ? route.params.id : item.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postTime,
              likes,
              comments,
              userEmail,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              postTime: postTime,
              post,
              liked: false,
              likes,
              comments,
              userEmail,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const submitComment = async () => {
    var newDocRef = firestore()
      .collection('posts')
      .doc(route.params ? route.params.id : item.id)
      .collection('comments')
      .doc();

    newDocRef
      .set({
        commentId: newDocRef.id,
        userId: user.uid,
        comment: comment,
        commentTime: firestore.Timestamp.fromDate(new Date()),
        userEmail: user.email,
      })
      .then(() => {
        console.log('Comment Added!');
        setComment(null);
        firestore()
          .collection('posts')
          .doc(route.params ? route.params.id : item.id)
          .update({
            comments: FieldValue.increment(1),
          });
      })
      .catch((error) => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const fetchComments = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .doc(route.params ? route.params.id : item.id)
        .collection('comments')
        .orderBy('commentTime', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {commentId, userId, commentTime, comment} = doc.data();
            list.push({
              id: doc.id,
              comment,
              commentId,
              userId,
              commentTime: commentTime,
            });
          });
        });

      setComments(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comments]);

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D6F0FF'}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <>
          {posts.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </>
        <>
          {comments.map((item) => (
            <CommentCard key={item.id} item={item}>
              {' '}
            </CommentCard>
          ))}
        </>
      </ScrollView>
      <TextInput
        placeholder="Add comment"
        value={comment}
        onChangeText={(content) => setComment(content)}></TextInput>
      <Button title="Comment" onPress={submitComment} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingTop: 300,
    paddingBottom: 300,
    paddingLeft: 100,
    paddingRight: 100,
  },
});

export default PostInfo;
