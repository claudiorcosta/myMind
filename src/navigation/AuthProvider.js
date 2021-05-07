import React, {createContext, useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        register: async (displayName, email, password) => {
          setLoading(true);
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((credentials) => {
                const currentUser = auth().currentUser;
                currentUser.updateProfile({
                  displayName: displayName,
                });
                firebase
                  .firestore()
                  .collection('users')
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    uniqueID: credentials.user.uid,
                    displayName: displayName,
                    email: email,
                    dateOfBirth: '00/00/0000',
                    age: null,
                    about: null,
                    userImg: null,
                  });
              });
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        },
        logout: async () => {
          try {
            await auth().signOut();
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
