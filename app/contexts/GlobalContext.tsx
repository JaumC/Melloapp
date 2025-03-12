import React from 'react';
import DareSession from './DareProvider';
import UserSession from './UserProvider';
import FontsSession from './FontsProvider';

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