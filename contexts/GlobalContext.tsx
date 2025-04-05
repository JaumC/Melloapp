import React from 'react';
import DareSession from './Providers/DareProvider';
import UserSession from './Providers/UserProvider';
import FontsSession from './Providers/FontsProvider';

export default function GlobalProvider({children}: any) {
    return (
        <FontsSession>
            <UserSession>
                <DareSession>
                    {children}
                </DareSession>
            </UserSession>
        </FontsSession>
    );
}