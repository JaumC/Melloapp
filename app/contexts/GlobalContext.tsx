import React from 'react';
import DareSession from './DareProvider';
import UserSession from './UserProvider';

export default function GlobalProvider({children}: any) {
	return (
        <UserSession>
            <DareSession>
                {children}
            </DareSession>
        </UserSession>
	)
}