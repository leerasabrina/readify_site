import React, { useEffect, useState } from 'react';
// import { getIdToken } from 'firebase/auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
 
  const saveUserToDB = async (user) => {
    if (!user?.email) return;
    const token = await auth.currentUser.accessToken;

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
    };

    try {
      const res = await fetch('https://server-site-sigma-ashy.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
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

 


  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
      const token = await auth.currentUser.accessToken ;
      await fetch('https://server-site-sigma-ashy.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }),
      });
    
  
   
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  
    setUser(newUser);
    return result;
  };


  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resister = (email, password, name, photo) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 chars");
      return Promise.reject(new Error("Password too short"));
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain uppercase");
      return Promise.reject(new Error("No uppercase"));
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain lowercase");
      return Promise.reject(new Error("No lowercase"));
    } else if (!/\d/.test(password)) {
      toast.error("Password must contain a number");
      return Promise.reject(new Error("No number"));
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain a special character");
      return Promise.reject(new Error("No special char"));
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo
        });
        
        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          photoURL: photo,
        };

        
        await saveUserToDB(newUser);

        setUser(newUser);
      });
  };

  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  const fetchUserFromDB = async (firebaseUser) => {
    const token = await firebaseUser.accessToken;
    console.log(token)
    console.log(firebaseUser)
    if (!firebaseUser?.email) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch(`https://server-site-sigma-ashy.vercel.app/users/${firebaseUser.email}`,{
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 404) {
        setUser(null);
        return;
      }
      const data = await res.json();

      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user from database", error);
      setUser(null);
    }
  };


  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        fetchUserFromDB(currentUser);
      } else {
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
    resister,
    logout,
    googleSignin,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
