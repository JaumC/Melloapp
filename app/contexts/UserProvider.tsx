import { createContext, useState, PropsWithChildren, useEffect, useContext } from 'react';
import { notifyToast } from "../utils/Toast";
import { API_URL } from '../utils/API_URL';
import * as SecureStore from "expo-secure-store";
import { User } from '@/typos';
import { useRouter } from "expo-router";
import axios from "axios";
interface UserProviderType {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => void;
  addFriend: (userId: string) => void;
  removeFriend: (userId: string) => void;
  createUser: (data: FormData) => void;
  updateUser: (data: FormData) => void;
  readAllUsers: (searchData: string) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserProviderType>({
  user: null,
  loading: false,
  loginUser: () => {},
  addFriend: () => {},
  removeFriend: () => {},
  createUser: () => {},
  updateUser: () => {},
  logoutUser: () => {},
  readAllUsers: () => {},
});

export const userHook = () => {
  const val = useContext(UserContext)
  return val
}

export default function UserSession({children}: PropsWithChildren) {
    console.log('Sessão de Usuário');

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createUser = async (formData: any) => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
    
      if (!name || !email || !password || !confirmPassword) {
        notifyToast("error", "Erro", "Preencha todos os campos.");
        return;
      }
    
      if (password !== confirmPassword) {
        notifyToast("error", "Erro", "As senhas não coincidem.");
        return;
      }
    
      setLoading(true);

      try {
        const response = await axios.post(`${API_URL}/user/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
    
        notifyToast("success", "Sucesso", response.data.message);
        router.push("/");
      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Erro ao se conectar com o servidor.");
        }
      } finally {
        setLoading(false)
      }
    };
    
    const updateUser = async (updateData: FormData) => {
      setLoading(true);
    
      try {
        const response = await axios.patch(`${API_URL}/user/update/${user?.id}`, updateData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
    
        setUser(response.data.user);
        SecureStore.setItemAsync("user_data", JSON.stringify(response.data.user));
        notifyToast("success", "Sucesso", response.data.message);
    
        setLoading(false)
        router.replace("/home");

      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Não foi possível atualizar os dados.");
        }
      } 
    };

    const readAllUsers = async (searchData: string) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/user/readall`, { 
          params: {
            id: user?.id,
            search: searchData  
          },
            withCredentials: true 
          });
        setLoading(false)
        return response.data.users
        
      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Erro ao se conectar com o servidor.");
        }
      }
    }
    
    const loginUser = async (email: string, password: string) => {
      if (!email || !password) {
        notifyToast("error", "Erro", "Preencha todos os campos.");
        return;
      }
    
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
    
      try {
        const response = await axios.post(`${API_URL}/user/login`, { email, password }, { withCredentials: true });
    
        await SecureStore.setItemAsync("token", response.data.token);
        await SecureStore.setItemAsync("user_data", JSON.stringify(response.data.user));
    
        setUser(response.data.user);
        notifyToast("success", "Sucesso", response.data.message);
    
        setLoading(false)
        router.push("/home");
      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Erro ao se conectar com o servidor.");
        }
      }
    };
    
    const logoutUser = async () => {
      try {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user_data");
        setUser(null);
        notifyToast("success", "Sucesso", "Usuário deslogado com sucesso.");
        router.push("/");
      } catch {
        notifyToast("error", "Erro", "Erro ao deslogar.");
      }
    };

    const addFriend = async (friendId: string) => {
      setLoading(true)
      try {
        const response = await axios.patch(`${API_URL}/user/follow/${user?.id}`, friendId, {
          withCredentials: true,
        });
    
        setUser(response.data.user);
        SecureStore.setItemAsync("user_data", JSON.stringify(response.data.user));
        notifyToast("success", "Sucesso", response.data.message);
    
        setLoading(false)

      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Não foi possível adcionar amigo.");
        }
      } 
    };

    const removeFriend = async (friendId: string) => {
      setLoading(true)
      try {
        const response = await axios.patch(`${API_URL}/user/unfollow/${user?.id}`, friendId, {
          withCredentials: true,
        });
    
        setUser(response.data.user);
        SecureStore.setItemAsync("user_data", JSON.stringify(response.data.user));
        notifyToast("success", "Sucesso", response.data.message);
    
        setLoading(false)

      } catch (error: any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", "Não foi possível remover amigo.");
        }
      } 
    };
    

    useEffect(() => {
      const checkUser = async() =>{
        const token = await SecureStore.getItemAsync('token');
        const user_data = await SecureStore.getItemAsync('user_data');
        if (token && user_data){
          setUser(JSON.parse(user_data))
          router.push('/home')
        }
      }
      checkUser()
    }, [])
    
    return (
        <UserContext.Provider 
          value={{ 
            user, 
            loading, 
            addFriend,
            removeFriend,
            readAllUsers,
            createUser, 
            updateUser, 
            loginUser, 
            logoutUser,
          }}>
            {children}
        </UserContext.Provider>
    )
}