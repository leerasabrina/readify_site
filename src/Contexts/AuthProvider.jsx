import React, { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';

// Helper to store token in localStorage
const storeToken = (token) => {
  if (token) {
    localStorage.setItem('access-token', token);
  }
};

// Helper to remove token
const clearToken = () => {
  localStorage.removeItem('access-token');
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save user info to your backend DB
  const saveUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    try {
      const token = firebaseUser.accessToken;
      if (!token) throw new Error('No token found');

      storeToken(token); // Save token to localStorage

      const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      };

      const res = await fetch('https://server-site-sigma-ashy.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (data.insertedId) {
        console.log('User saved in database');
      }
    } catch (err) {
      console.error('Failed to save user to database', err);
    }
  };

  // Fetch user info from your backend DB by email
  const fetchUserFromDB = async (firebaseUser) => {
    if (!firebaseUser?.email) {
      setUser(null);
      return;
    }

    try {
      const token = firebaseUser.accessToken;
      if (!token) throw new Error('No token found');

      storeToken(token); // Save token to localStorage

      const res = await fetch(`https://server-site-sigma-ashy.vercel.app/users/${firebaseUser.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 404) {
        setUser(null);
        return;
      }

      const data = await res.json();
      if (data) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user from database', error);
      setUser(null);
    }
  };

  // Register user
  const register = async (email, password, name, photo) => {
    if (password.length < 6) {
      toast.error('Password must be at least 6 chars');
      return Promise.reject(new Error('Password too short'));
    } else if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain uppercase');
      return Promise.reject(new Error('No uppercase'));
    } else if (!/[a-z]/.test(password)) {
      toast.error('Password must contain lowercase');
      return Promise.reject(new Error('No lowercase'));
    } else if (!/\d/.test(password)) {
      toast.error('Password must contain a number');
      return Promise.reject(new Error('No number'));
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error('Password must contain a special character');
      return Promise.reject(new Error('No special char'));
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      storeToken(userCredential.user.accessToken); // Save token

      await saveUserToDB(userCredential.user);
      setUser(userCredential.user);
    } catch (error) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      storeToken(result.user.accessToken); // Save token
      setUser(result.user);
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Google Sign-in
  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      storeToken(firebaseUser.accessToken); // Save token

      await saveUserToDB(firebaseUser);
      setUser(firebaseUser);
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    clearToken(); // Remove token
    setUser(null);
    return signOut(auth);
  };

  // Monitor auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        storeToken(currentUser.accessToken); // Save token
        setUser(currentUser);
        await fetchUserFromDB(currentUser);
      } else {
        clearToken(); // Remove token
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    login,
    register,
    logout,
    googleSignin,
    loading,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;