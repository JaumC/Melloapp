import { createContext, useState, PropsWithChildren, useEffect, useContext } from 'react';
import { notifyApiToast, notifyToast } from '@/components/Toast/Toast';
import { AxiosCatchError } from '@/app/axios/AxiosCatchError';
import { AxiosInstance } from '@/app/axios/AxiosInstance';
import { ApiAxiosResponse, User } from '@/utils/Typos';
import * as SecureStore from "expo-secure-store";
import { loadingHook } from './LoadingProvider';
import { dareHook } from './DareProvider';
import { useRouter } from "expo-router";

interface UserProviderType {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  recuperarUser: (email: string, senha: string, confirmarSenha: string) => void;
  addFriend: (userId: string) => void;
  removeFriend: (userId: string) => void;
  readFriends: (searchFriends: string) => void;
  createUser: (data: FormData) => void;
  updateUser: (data: FormData) => void;
  logoutUser: () => void;
  readAllUsers: (searchData: string) => void;
};

export const UserContext = createContext<UserProviderType>({
  user: null,
  loginUser: () => { },
  addFriend: () => { },
  recuperarUser: () => { },
  removeFriend: () => { },
  readFriends: () => { },
  createUser: () => { },
  updateUser: () => { },
  logoutUser: () => { },
  readAllUsers: () => { },
});

export const userHook = () => {
  const val = useContext(UserContext);
  return val;
};

export default function UserSession({ children }: PropsWithChildren) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const { setDare, readDare } = dareHook();
  const { setLoading, setBgVisible } = loadingHook();

  const createUser = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) return notifyToast("error", "Erro", "Preencha todos os campos.");

    if (password !== confirmPassword) return notifyToast("error", "Erro", "As senhas não coincidem.");

    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.post("/user/create", { formData: formData });

      notifyApiToast(response.data);
      router.push("/");

    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  const updateUser = async (updateData: FormData) => {
    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.patch(`/user/update/${user?.id}`, { updateData: updateData });

      setUser(response.data.content ?? null);
      SecureStore.setItemAsync("user_data", JSON.stringify(response.data.content));

      notifyApiToast(response.data);

      router.replace("/home");

    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  const readAllUsers = async (searchData: string) => {
    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.get("/user/readall", {
        params: {
          id: user?.id,
          search: searchData
        },
      });

      return response.data.content
    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  const readFriends = async (searchFriends: string): Promise<User[]> => {
    try {
      setLoading(true);

      const response: ApiAxiosResponse<User[]> = await AxiosInstance.get("/user/readfriends", {
        params: {
          id: user?.id,
          search: searchFriends
        },
      });

      return response.data.content ?? []

    }
    catch (error) { AxiosCatchError(error); return [] }
    finally { setLoading(false) }
  };

  const loginUser = async (email: string, password: string) => {
    if (!email || !password) return notifyToast("error", "Erro", "Preencha todos os campos.");

    setBgVisible(false);

    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.post("/user/login", { email: email, password: password });

      await SecureStore.setItemAsync("token", response?.data?.content?.token ?? "");
      await SecureStore.setItemAsync("user_data", JSON.stringify(response.data.content));

      setUser(response.data.content ?? null);
      setDare([])

      await readDare("")

      setTimeout(() => {
        setLoading(false)
        setBgVisible(true)
      }, 3500)

      router.push("/home");

    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false); setBgVisible(true) }
  };

  const logoutUser = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user_data");
      setUser(null);
      setDare([]);

      router.push("/");
    }
    catch (error) { AxiosCatchError(error) }
  };

  const recuperarUser = async (email: string, senha: string, confirmarSenha: string) => {
    if (!email || !senha || !confirmarSenha) return notifyToast("error", "Erro", "Prencha todos os campos.")

    if (senha !== confirmarSenha) return notifyToast("error", "Erro", "As senhas não coincidem.")

    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.post("/user/recover", { email: email, senha: senha, confirmarSenha: confirmarSenha })

      setUser(response.data.content ?? null);

      notifyApiToast(response.data);

      router.push("/");
    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  const addFriend = async (friendId: string) => {
    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.patch(`/user/follow/${user?.id}`, { friendId: friendId });

      setUser(response.data.content ?? null);
      SecureStore.setItemAsync("user_data", JSON.stringify(response.data.content));

      notifyApiToast(response.data);
    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  const removeFriend = async (friendId: string) => {
    try {
      setLoading(true);

      const response: ApiAxiosResponse<User> = await AxiosInstance.patch(`/user/unfollow/${user?.id}`, { friendId: friendId });

      setUser(response.data.content ?? null);
      SecureStore.setItemAsync("user_data", JSON.stringify(response.data.content));

      notifyApiToast(response.data);

    }
    catch (error) { AxiosCatchError(error) }
    finally { setLoading(false) }
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = await SecureStore.getItemAsync('token');
      const user_data = await SecureStore.getItemAsync('user_data');

      if (token && user_data) {
        setUser(JSON.parse(user_data))
        router.push('/home')
      };
    }
    checkUser();
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        addFriend,
        removeFriend,
        recuperarUser,
        readFriends,
        createUser,
        updateUser,
        loginUser,
        logoutUser,
        readAllUsers,
      }}>
      {children}
    </UserContext.Provider>
  )
}