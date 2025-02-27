import { createContext, useState, PropsWithChildren, useEffect, useContext } from 'react';
import { notifyToast } from "../utils/Toast";
import { API_URL } from '../utils/API_URL';
import * as SecureStore from "expo-secure-store";
import { User, UserRegister } from '@/typos';
import { useRouter } from "expo-router";
import axios from "axios";
interface UserProviderType {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  createUser: (data: FormData) => void;
  readUser: () => void;
  updateUser: (data: User) => void;
  deleteUser: (id: string) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserProviderType>({
  user: null,
  loginUser: () => {},
  createUser: () => {},
  readUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  logoutUser: () => {},
});

export const useSession = () => {
  const val = useContext(UserContext)
  return val
}

export default function UserSession({children}: PropsWithChildren) {
    console.log('Sessão de Usuário');

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const createUser = async (formData: any) => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
    
      if (!name || !email || !password || !confirmPassword) {
        notifyToast("error", "Erro", 'Preencha todos os campos.');
        return;
      }
    
      if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        notifyToast("error", "Erro", 'As senhas não coincidem.');
        return;
      }
    
      await axios.post(`${API_URL}/user/create`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true})
      .then((response) => {
        notifyToast("success", "Sucesso", response.data.message);
        router.push('/');
      })
      .catch((error) => {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message);
        } else {
          notifyToast("error", "Erro", 'Erro ao se conectar com o servidor.');
        }
      });
    };
    
    

    const readUser = async () => {
      try{
        const response = await axios.get(`${API_URL}/user/read/${user?.id}`)
        return response.data

      }catch(error: any){
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message)
        } else {
          notifyToast("error", "Erro", 'Erro ao obter dados do usuário.')
        }

      }
    };

    const updateUser = async (data: User) => {
      await axios.post(`${API_URL}/user/update/${user?.id}`, data)
      .then((response) => {
        notifyToast('success', 'Sucesso', response.data.message)
        router.push('/home')
      })
      .catch((error) => {
        if(error.response){
          notifyToast('error', 'Erro', error.response.data.message)
        }else{
          notifyToast('error', 'Error', 'Não foi possível atualizar os dados.')
        }
      })
    };

    const deleteUser = async () => {

    }

    const loginUser = async (email: string, password: string) => {
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
        router.push('/home')
      }catch(error: string | any) {
        if (error.response) {
          notifyToast("error", "Erro", error.response.data.message)
        } else {
          notifyToast("error", "Erro", 'Erro ao se conectar com o servidor.')
        }
      }
    };
    
    const logoutUser = async () => {
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
          router.push('/home')
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
            logoutUser 
          }}>
            {children}
        </UserContext.Provider>
    )
}