import { useState, createContext, useEffect } from 'react';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../components/utils/firebase/firebase-utils'

export const UserContext = createContext({
    currentUsers: null,
    setcurrentUsers: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUsers, setcurrentUsers] = useState(null)
    const value = { currentUsers, setcurrentUsers }

    useEffect(() => {
        const unSubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setcurrentUsers(user)
        })
        return unSubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}