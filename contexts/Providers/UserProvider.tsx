import { createContext, useState, PropsWithChildren } from 'react';
import { User } from '@/typos';

interface UserProviderType {
  user: User | null;
  login: (email: string, password: string) => void;
  createUser: (user: User) => void;
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
    
    const [user, setUser] = useState<User | null>(null);

    const createUser = async () => {

    }

    const readUser = async () => {

    };

    const updateUser = async () => {
  
    };

    const deleteUser = async () => {

    }

    const login = async (data: any) => {
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