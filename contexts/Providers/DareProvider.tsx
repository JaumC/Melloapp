import { createContext, useState, PropsWithChildren, useContext, useEffect } from 'react';
import { notifyToast } from '@/utils/Toast';
import { API_URL } from '@/utils/API_URL';
import { Dare, DareWithDayPoints, User } from '@/utils/Typos';
import axios from 'axios';
import { userHook } from './UserProvider';
import { loadingHook } from './LoadingProvider';
import { useRouter } from 'expo-router';


interface DareProviderType {
  dare: DareWithDayPoints[];
  setDare: (d: DareWithDayPoints[]) => void;
  createDare: (dareData: Dare) => void;
  addDay: (daraeId: string, data: string) => void;
  removeDay: (daraeId: string, data: string) => void;
  readDare: (dare_id: string) => Promise<DareWithDayPoints[]>;
  updateDare: (dareEditData: Dare, dare_id: any) => void;
  deleteDare: () => void;
  readChallengers: (challengers: Array<string>) => void;
}

export const DareContext = createContext<DareProviderType>({
  dare: [],
  setDare: () => { },
  createDare: () => { },
  addDay: () => { },
  removeDay: () => { },
  readDare: async () => [],
  updateDare: () => { },
  deleteDare: () => { },
  readChallengers: () => { },
});

export const dareHook = () => {
  const val = useContext(DareContext)
  return val
}

export default function DareSession({ children }: PropsWithChildren) {
  const [dare, setDare] = useState<DareWithDayPoints[]>([]);

  const { setLoading } = loadingHook()
  
  const { user } = userHook()
  const router = useRouter()

  const createDare = async (dataDare: Dare) => {
    if (!dataDare.name || !dataDare.start_date || !dataDare.end_date || !dataDare.days || !dataDare.challengers || !dataDare.host || !dataDare.streak || !dataDare.day_sequency || !dataDare.mounth_sequency) {
      notifyToast("error", "Erro", 'Preencha todos os campos.');
      return;
    }

    setLoading(true)
    await axios.post(`${API_URL}/dare/create`, dataDare)
      .then((response) => {
        readDare("")
        notifyToast("success", "Sucesso", response.data.message);
      })
      .catch((error) => {
        notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const readDare = async (dare_id: string): Promise<DareWithDayPoints[]> => {
    try {
      const response = await axios.get(`${API_URL}/dare/read/${user?.id}?dareId=${dare_id}`, {
        withCredentials: true,
      })
      const formated: DareWithDayPoints[] = response.data.dare.map((d: Dare, index: number) => ({
        dare: d,
        dayPoints: response.data.dayPoint[index],
      }))

      setDare(formated || [])
      return formated

    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
      return []
    }
  };

  const addDay = async (dareId: string, data: string) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${API_URL}/dare/addDay`, { userId: user?.id, dareId: dareId, data: data }, {
        withCredentials: true,
      });

      await readDare("")
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

      await readDare("")
      notifyToast("success", "Sucesso", response.data.message);

    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || "Não foi possível desmarcar o dia.");
    } finally {
      setLoading(false)
    }
  };

  const updateDare = async (dareEditData: Dare, dare_id: any) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${API_URL}/dare/update?dareId=${dare_id}`, dareEditData)
      notifyToast("success", "Sucesso", response.data.message);

      await readDare("")
      router.push('/home')
    } catch (error: any) {
      notifyToast("error", "Erro", error.response.data.message || 'Erro ao se conectar com o servidor.');
    } finally {
      setLoading(false)
    }
  };

  const deleteDare = async () => {

  }

  const readChallengers = async (challengers: Array<string>): Promise<User[]> => {
    setLoading(true);
    console.log(challengers)
    try {
      const response = await axios.get(`${API_URL}/dare/challengers?ids=${challengers}`, {
        withCredentials: true
      });
      return response.data.users

    } catch (error: any) {
      if (error.response) {
        notifyToast("error", "Erro", error.response.data.message);
      } else {
        notifyToast("error", "Erro", "Erro ao se conectar com o servidor.");
      }
      return []
    } finally {
      setLoading(false)
    }
  }

  return (
    <DareContext.Provider
      value={{
        dare,
        setDare,
        createDare,
        addDay,
        removeDay,
        readDare,
        updateDare,
        deleteDare,
        readChallengers,
      }}>
      {children}
    </DareContext.Provider>
  )
}