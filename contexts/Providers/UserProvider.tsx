import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { notifyToast } from "../../app/utils/Toast";
import { API_URL } from '../../app/utils/API_URL';
import * as SecureStore from "expo-secure-store";
import { User, UserRegister } from '@/typos';
import { useRouter } from "expo-router";
import axios from "axios";
interface UserProviderType {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  createUser: (data: UserRegister) => void;
  readUser: (id: string) => void;
  updateUser: (id: string, user: User) => void;
  deleteUser: (id: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserProviderType>({
  user: null,
  loginUser: () => {},
  createUser: () => {},
  readUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  logout: () => {},
});

export default function UserSession({children}: PropsWithChildren) {
    console.log('Sessão de Usuário');

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const createUser = async (data: UserRegister) => {
      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        notifyToast("error", "Erro", 'Preencha todos os campos.')
        return
      }
      
      if (data.password !== data.confirmPassword) {
          alert('As senhas não coincidem')
          notifyToast("error", "Erro", 'As senhas não coincidem.')
          return
      }

      await axios.post(`${API_URL}/user/cadastro`, data)
      .then((response) => {
        notifyToast("success", "Sucesso", response.data.message)
        router.push('./index')
      })
      .catch((error) => {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message)
        } else {
          notifyToast("error", "Erro", 'Erro ao se conectar com o servidor.')
        }
      })
    }

    const readUser = async () => {

    };

    const updateUser = async () => {
  
    };

    const deleteUser = async () => {

    }

    const loginUser = async (email: string, password: string) => {
      console.log('sa')
      if (!email || !password) {
        notifyToast("error", "Erro", 'Preencha todos os campos.')
        return
      }

      try{
        const response = await axios.post(`${API_URL}/user/login`, {email, password}, {withCredentials: true})
        await SecureStore.setItemAsync('token', response.data.token)
        await SecureStore.setItemAsync('user_data', JSON.stringify(response.data.user))
      
        notifyToast("success", "Sucesso", response.data.message)
        setUser(response.data.user)
        router.push('/(pages)/Home')
      }catch(error: string | any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message)
        } else {
          notifyToast("error", "Erro", 'Erro ao se conectar com o servidor.')
        }
      }
    };
    
    const logout = async () => {
      try {
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('user_data')
        setUser(null)
        router.push('/')
        notifyToast("success", "Sucesso", 'Usuário deslogado com sucesso.')

      }catch{
        notifyToast("error", "Erro", 'Erro ao deslogar.')
      }
    };

    useEffect(() => {
      const checkUser = async() =>{
        const token = await SecureStore.getItemAsync('token');
        const user_data = await SecureStore.getItemAsync('user_data');
        if (token && user_data){
          setUser(JSON.parse(user_data))
          router.push('/(pages)/Home')
        }
      }
      checkUser()
    }, [])
    
    return (
        <UserContext.Provider 
          value={{ 
            user, 
            createUser, 
            readUser, 
            updateUser, 
            deleteUser, 
            loginUser, 
            logout 
          }}>
            {children}
        </UserContext.Provider>
    )
}