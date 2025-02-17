import { createContext, useState, PropsWithChildren } from 'react';
import { Dare } from '@/typos';

interface DareProviderType {
    dare: Dare | null;
    createDare: (data: any) => void;
    readDare: () => void;
    updateDare: () => void;
    deleteDare: () => void;
}

export const DareContext = createContext<DareProviderType>({
    dare: null,
    createDare: () => {},
    readDare: () => {},
    updateDare: () => {},
    deleteDare: () => {},
});

export default function DareSession({children}: PropsWithChildren) {
    console.log('Sessão de Desafio');
    
    const [dare, setDare] = useState<Dare | null>(null);

    const createDare = async (data: any) => {
        setDare(data)
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
                createDare, 
                readDare, 
                updateDare, 
                deleteDare 
            }}>
            {children}
        </DareContext.Provider>
    )
}