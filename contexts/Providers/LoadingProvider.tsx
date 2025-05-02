import { createContext, PropsWithChildren, useContext, useState } from "react";

interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    bgVisible: boolean;
    setBgVisible: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => { },
    bgVisible: true,
    setBgVisible: () => { },
});

export const loadingHook = () => {
    const val = useContext(LoadingContext);
    return val;
};

export default function LoadingSession({ children }: PropsWithChildren) {
    console.log('Sessão de Loading');

    const [loading, setLoading] = useState<boolean>(false)
    const [bgVisible, setBgVisible] = useState<boolean>(true)

    return (
        <LoadingContext.Provider value={{
            loading,
            setLoading,
            bgVisible,
            setBgVisible,
        }}>
            {children}
        </LoadingContext.Provider>
    );
}
