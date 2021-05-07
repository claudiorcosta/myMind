import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostCard from '../Components/PostCard';
import PostCardMyposts from '../Components/PostCardMyposts';

const ProfileMenu = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
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
              triggerWarning,
              feeling,
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
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .where('userId', '==', route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        deleteFirestoreData(postId);
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting post.', e));
  };

  return (
    <SafeAreaView style={{flex: 1}} style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          style={styles.userImg}
          source={{
            uri:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <View style={{alignContent: 'center'}}>
          <Text>
            {' '}
            {userData ? userData.displayName || 'Test' : 'Test'} /{' '}
            {userData ? userData.age || '00' : '00'} years
          </Text>
          <Text> {userData ? userData.about || '' : ''}</Text>
          <View style={{flexDirection: 'row'}}>
            {route.params ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('ChatScreen', {
                      email: userData.email,
                      displayName: userData.displayName,
                    });
                  }}>
                  <Icon name="envelope" color="black" size={20} />
                  <Text>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Icon name="ban" color="black" size={20} />
                  <Text>Report</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <Icon name="edit" color="#black" size={20} />
                  <Text>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  title="Logout"
                  onPress={logout}>
                  <Icon name="sign-out" color="#black" size={20} />
                  <Text>Logout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        {/*  {loading ? ( */}
        {route.params ? (
          <View style={{paddingTop: 20}}>
            {posts.map((item) => (
              <PostCard key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <View style={{paddingTop: 20}}>
            {posts.map((item) => (
              <PostCardMyposts
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6F0FF',
  },
  linearGradient: {
    paddingTop: 300,
    paddingBottom: 300,
    paddingLeft: 100,
    paddingRight: 100,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  button: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#D6F0FF',
  },
});

export default ProfileMenu;
