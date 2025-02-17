import React from 'react';
import UserSession from "@/contexts/Providers/UserProvider";
import DareSession from "@/contexts/Providers/DareProvider";

export default function GlobalProvider({children}: any) {
	return (
        <UserSession>
            <DareSession>
                {children}
            </DareSession>
        </UserSession>
	)
}