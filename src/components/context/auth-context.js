import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
})

export const AuthContextProvider = (props) => {
    useEffect(() => {
        if (localStorage.getItem('isLogin') === 'true') {
            setIsLoggedIn(true);
        }
    }, [])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoutHandler = () => {
        localStorage.setItem('isLogin', 'false')
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLogin', 'true')
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;