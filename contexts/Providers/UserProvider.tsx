import { createContext, useState, PropsWithChildren } from 'react';
import { useRouter } from "expo-router";
import { User, UserRegister } from '@/typos';
import axios from "axios";
import { API_URL } from '../../utils/API_URL';
interface UserProviderType {
  user: User | null;
  login: (email: string, password: string) => void;
  createUser: (user: UserRegister) => void;
  readUser: (id: string) => void;
  updateUser: (id: string, user: User) => void;
  deleteUser: (id: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserProviderType>({
  user: null,
  login: () => {},
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
      if (!data.name || !data.email || !data.password || !data.password) {
        alert('Preencha todos os campos')
        return
      }
      
      if (data.password !== data.confirmPassword) {
          alert('As senhas não coincidem')
          return
      }

      await axios.post(`${API_URL}/user/cadastro`, data)
      .then(() => {
        alert('Usuário cadastrado com sucesso')
        setUser(data)
        router.push('/Home')
      })
      .catch(() => {
        alert('Erro ao cadastrar usuário')
      })
    }

    const readUser = async () => {

    };

    const updateUser = async () => {
  
    };

    const deleteUser = async () => {

    }

    const login = async (data: any) => {
      await axios.post(`${API_URL}/user/login`, data)
      .then(() => {
        alert('Usuário logado com sucesso')
        setUser(data)
        router.push('/Home')
      })
      .catch(() => {
        alert('Erro ao logar usuário')
      })
      setUser(data);
    };
    
    const logout = async () => {
    };
    
    return (
        <UserContext.Provider 
          value={{ 
            user, 
            createUser, 
            readUser, 
            updateUser, 
            deleteUser, 
            login, 
            logout 
          }}>
            {children}
        </UserContext.Provider>
    )
}