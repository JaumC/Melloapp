import { createContext, useState, PropsWithChildren, useContext } from 'react';
import { notifyToast } from '@/utils/Toast';
import { API_URL } from '@/utils/API_URL';
import { useRouter } from "expo-router";
import { Dare } from '@/utils/Typos';
import axios from 'axios';
import { userHook } from './UserProvider';


interface DareProviderType {
  dare: Dare | null;
  loading: boolean;
  createDare: (data: any) => void;
  readDare: () => void;
  updateDare: () => void;
  deleteDare: () => void;
}

export const DareContext = createContext<DareProviderType>({
  dare: null,
  loading: false,
  createDare: () => { },
  readDare: () => { },
  updateDare: () => { },
  deleteDare: () => { },
});

export const dareHook = () => {
  const val = useContext(DareContext)
  return val
}

export default function DareSession({ children }: PropsWithChildren) {
  console.log('Sessão de Desafio');

  const [dare, setDare] = useState<Dare | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const { user } = userHook()

  const createDare = async (dataDare: Dare) => {
    if (!dataDare.name || !dataDare.startDate || !dataDare.endDate || !dataDare.days || !dataDare.friends || !dataDare.host || !dataDare.streak || !dataDare.sequencyDay || !dataDare.sequencyMounth) {
      notifyToast("error", "Erro", 'Preencha todos os campos.');
      return;
    }

    setLoading(true)
    await axios.post(`${API_URL}/dare/create`, dataDare)
      .then((response) => {
        notifyToast("success", "Sucesso", response.data.message);
      })
      .catch((error) => {
          notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const readDare = async () => {
    setLoading(true)
    try{
      const response = await axios.get(`${API_URL}/dare/read/${user?.id}`,{
        withCredentials: true,
      })
      return response.data.dare

    }catch(error: any){
      notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
    }finally{
      setLoading(false)
    }
  };

  const updateDare = async () => {

  };

  const deleteDare = async () => {

  }

  return (
    <DareContext.Provider
      value={{
        dare,
        loading,
        createDare,
        readDare,
        updateDare,
        deleteDare
      }}>
      {children}
    </DareContext.Provider>
  )
}