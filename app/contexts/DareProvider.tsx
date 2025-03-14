import { createContext, useState, PropsWithChildren, useContext } from 'react';
import { notifyToast } from '@/app/utils/Toast';
import { API_URL } from '@/app/utils/API_URL';
import { useRouter } from "expo-router";
import { Dare } from '@/typos';
import axios from 'axios';


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
    createDare: () => {},
    readDare: () => {},
    updateDare: () => {},
    deleteDare: () => {},
});

export const dareHook = () => {
  const val = useContext(DareContext)
  return val
}

export default function DareSession({children}: PropsWithChildren) {
    console.log('Sessão de Desafio');
    
    const [dare, setDare] = useState<Dare | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const createDare = async (dateDare: Dare) => {
        if (!dateDare.name || !dateDare.startDate || !dateDare.endDate || !dateDare.streak || !dateDare.sequencyDay || !dateDare.sequencyMounth) {
        notifyToast("error", "Erro", 'Preencha todos os campos.');
        return;
        }
        setLoading(true)
        await axios.post(`${API_URL}/dare/create`, dateDare)
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
          })
          .finally(() => {
            setLoading(false)
          })
        // setDare(dateDare)
    }

    const readDare = async () => {

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