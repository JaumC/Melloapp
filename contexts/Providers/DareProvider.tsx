import { createContext, useState, PropsWithChildren, useContext } from 'react';
import { notifyToast } from '@/utils/Toast';
import { API_URL } from '@/utils/API_URL';
import { Dare, DareWithDayPoints } from '@/utils/Typos';
import axios from 'axios';
import { userHook } from './UserProvider';


interface DareProviderType {
  dare: DareWithDayPoints[];
  setDare: (d: DareWithDayPoints[]) => void;
  loading: boolean;
  createDare: (data: any) => void;
  addDay: (daraeId: string, data: string) => void;
  removeDay: (daraeId: string, data: string) => void;
  readDare: () => void;
  updateDare: () => void;
  deleteDare: () => void;
}

export const DareContext = createContext<DareProviderType>({
  dare: [],
  setDare: () => { },
  loading: false,
  createDare: () => { },
  addDay: () => { },
  removeDay: () => { },
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

  const [dare, setDare] = useState<DareWithDayPoints[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = userHook()

  const createDare = async (dataDare: Dare) => {
    if (!dataDare.name || !dataDare.start_date || !dataDare.end_date || !dataDare.days || !dataDare.friends || !dataDare.host || !dataDare.streak || !dataDare.sequencyDay || !dataDare.sequencyMounth) {
      notifyToast("error", "Erro", 'Preencha todos os campos.');
      return;
    }

    setLoading(true)
    await axios.post(`${API_URL}/dare/create`, dataDare)
      .then((response) => {
        readDare()
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
    try {
      const response = await axios.get(`${API_URL}/dare/read/${user?.id}`, {
        withCredentials: true,
      })
      const formated = response.data.dare.map((d: any, index: number) => ({
        dare: d,
        dayPoints: response.data.dayPoint[index],
      }))

      setDare(formated || [])
      return formated

    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
    } finally {
      setLoading(false)
    }
  };

  const addDay = async (dareId: string, data: string) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${API_URL}/dare/addDay`, { userId: user?.id, dareId: dareId, data: data }, {
        withCredentials: true,
      });

      await readDare()
      notifyToast("success", "Sucesso", response.data.message);

    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || "Não foi possível marcar o dia.");
    } finally {
      setLoading(false)
    }
  };

  const removeDay = async (dareId: string, data: string) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${API_URL}/dare/removeDay`, { userId: user?.id, dareId: dareId, data: data }, {
        withCredentials: true,
      });

      await readDare()
      notifyToast("success", "Sucesso", response.data.message);

    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || "Não foi possível desmarcar o dia.");
    } finally {
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
        setDare,
        loading,
        createDare,
        addDay,
        removeDay,
        readDare,
        updateDare,
        deleteDare
      }}>
      {children}
    </DareContext.Provider>
  )
}