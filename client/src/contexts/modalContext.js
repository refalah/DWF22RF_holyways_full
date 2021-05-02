import { createContext, useReducer } from 'react'

export const ModalContext = createContext();

const initialState = {
    isLogin: false,
    isVisibleLogin: false,
    isVisibleRegister: false
}

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "OPENLOGIN":
            return {
                ...state,
                isVisibleLogin: true
            };
        case "CLOSELOGIN":
            return {
                ...state,
                isVisibleLogin: false
            };
        case "OPENREGISTER":
            return {
                ...state,
                isVisibleRegister: true
            };
        case "CLOSEREGISTER":
            return {
                ...state,
                isVisibleRegister: false
            };
        case "LOGIN":
            return {
                ...state,
                isLogin: true
            };
        case "LOGOUT":
            return {
                ...state,
                isLogin: false
            };
        default:
            throw new Error();
    }
}

export const ModalContextProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState)
    return (
        <ModalContext.Provider value={[ state, dispatch ]}>
            {children}
        </ModalContext.Provider>
    )
}