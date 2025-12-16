import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [eliteTools, setEliteTools] = useState([]);
  const [authError, setAuthError] = useState(null);

  // Verificar si el email está autorizado en Supabase (con RLS habilitado)
  const checkEmailAuthorization = async (email) => {
    try {
      // Limpiar y normalizar el email
      const normalizedEmail = email.trim().toLowerCase();
      console.log('Verificando email:', normalizedEmail);
      
      // Usar cliente público - es seguro porque RLS está habilitado
      const { data, error } = await supabase
        .from('authorized_users')
        .select('email')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        return false;
      }
      
      console.log('Resultado de Supabase:', data);
      return data !== null;
    } catch (error) {
      console.error('Error checking authorization:', error);
      return false;
    }
  };

  // Cargar favoritos y elite tools del usuario
  const loadFavorites = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setFavorites(userDoc.data().favorites || []);
        setEliteTools(userDoc.data().eliteTools || []);
      } else {
        // Crear documento de usuario si no existe
        await setDoc(doc(db, 'users', userId), {
          favorites: [],
          eliteTools: [],
          createdAt: new Date()
        });
        setFavorites([]);
        setEliteTools([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
      setEliteTools([]);
    }
  };

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Verificar si el email está autorizado
        const isAuthorized = await checkEmailAuthorization(firebaseUser.email);
        
        if (!isAuthorized) {
          // Si NO está autorizado, cerrar sesión automáticamente
          await firebaseSignOut(auth);
          setUser(null);
          setFavorites([]);
          setEliteTools([]);
          setAuthError('Tu email no está autorizado para acceder a esta aplicación.');
          setLoading(false);
          return;
        }
        
        // Si está autorizado, cargar datos del usuario
        setUser(firebaseUser);
        setAuthError(null);
        await loadFavorites(firebaseUser.uid);
      } else {
        setUser(null);
        setFavorites([]);
        setEliteTools([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Registro con email y contraseña
  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        favorites: [],
        eliteTools: [],
        createdAt: new Date()
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Iniciar sesión con email y contraseña
  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Verificar si el email está autorizado
      const isAuthorized = await checkEmailAuthorization(result.user.email);
      
      if (!isAuthorized) {
        // Cerrar sesión automáticamente si no está autorizado
        await firebaseSignOut(auth);
        throw new Error('Tu email no está autorizado para acceder a esta aplicación.');
      }
      
      // Verificar si el usuario ya existe en Firebase
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          favorites: [],
          eliteTools: [],
          createdAt: new Date()
        });
      }
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setFavorites([]);
      setEliteTools([]);
    } catch (error) {
      throw error;
    }
  };

  // Agregar a favoritos
  const addFavorite = async (toolId, toolName, toolUrl, toolDesc, category) => {
    if (!user) return;

    try {
      const favoriteItem = {
        id: toolId,
        name: toolName,
        url: toolUrl,
        description: toolDesc,
        category: category,
        addedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'users', user.uid), {
        favorites: arrayUnion(favoriteItem)
      });

      setFavorites(prev => [...prev, favoriteItem]);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  // Remover de favoritos
  const removeFavorite = async (toolId) => {
    if (!user) return;

    try {
      const favoriteToRemove = favorites.find(fav => fav.id === toolId);
      if (favoriteToRemove) {
        await updateDoc(doc(db, 'users', user.uid), {
          favorites: arrayRemove(favoriteToRemove)
        });

        setFavorites(prev => prev.filter(fav => fav.id !== toolId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  // Verificar si una herramienta está en favoritos
  const isFavorite = (toolId) => {
    return favorites.some(fav => fav.id === toolId);
  };

  // Promover a Elite Tools
  const addToElite = async (toolId, toolName, toolUrl, toolDesc, category) => {
    if (!user) return;

    try {
      const eliteItem = {
        id: toolId,
        name: toolName,
        url: toolUrl,
        description: toolDesc,
        category: category,
        addedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'users', user.uid), {
        eliteTools: arrayUnion(eliteItem)
      });

      setEliteTools(prev => [...prev, eliteItem]);
    } catch (error) {
      console.error('Error adding to elite:', error);
      throw error;
    }
  };

  // Remover de Elite Tools
  const removeFromElite = async (toolId) => {
    if (!user) return;

    try {
      const eliteToRemove = eliteTools.find(tool => tool.id === toolId);
      if (eliteToRemove) {
        await updateDoc(doc(db, 'users', user.uid), {
          eliteTools: arrayRemove(eliteToRemove)
        });

        setEliteTools(prev => prev.filter(tool => tool.id !== toolId));
      }
    } catch (error) {
      console.error('Error removing from elite:', error);
      throw error;
    }
  };

  // Verificar si una herramienta está en Elite
  const isElite = (toolId) => {
    return eliteTools.some(tool => tool.id === toolId);
  };

  const value = {
    user,
    loading,
    favorites,
    eliteTools,
    authError,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToElite,
    removeFromElite,
    isElite
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
