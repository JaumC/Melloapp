import React from 'react';
import DareSession from './Providers/DareProvider';
import UserSession from './Providers/UserProvider';
import FontsSession from './Providers/FontsProvider';
import LoadingSession from './Providers/LoadingProvider';

export default function GlobalProvider({ children }: any) {
    return (
        <FontsSession>
            <LoadingSession>
                <UserSession>
                    <DareSession>
                        {children}
                    </DareSession>
                </UserSession>
            </LoadingSession>
        </FontsSession>
    );
}