import { CormorantSC_400Regular } from "@expo-google-fonts/cormorant-sc";
import { Roboto_100Thin } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

const FontsContext = createContext<{ fontsLoaded: boolean }>({ fontsLoaded: false });

export const fontsHook = () => {
  const val = useContext(FontsContext);
  return val;
};

export default function FontsSession({ children }: PropsWithChildren) {
    console.log('Sessão de Fontes');

    const [fontsLoaded] = useFonts({
        CormorantSC_400Regular,
        Roboto_100Thin
    });

    console.log('fonts carregadas: ', fontsLoaded);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <FontsContext.Provider value={{ fontsLoaded }}>
            {children}
        </FontsContext.Provider>
    );
}
