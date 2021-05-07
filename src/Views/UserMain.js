import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../Components/PostCard';
import {Container} from '../Styles/FeedStyles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const UserMain = ({navigation, route}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '!=', user.uid)
        .orderBy('userId')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              postId,
              userId,
              post,
              postTime,
              likes,
              comments,
              triggerWarning,
              feeling,
            } = doc.data();
            list.push({
              id: doc.id,
              postId,
              userId,
              postTime: postTime,
              post,
              liked: false,
              likes,
              comments,
              triggerWarning,
              feeling,
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
  }, [posts]);

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}></ScrollView>
      ) : (
        <Container style={{backgroundColor: '#D6F0FF'}}>
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
                onPress1={() =>
                  navigation.navigate('PostInfo', {
                    id: item.id,
                    userEmail: item.userEmail,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
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

export default UserMain;
