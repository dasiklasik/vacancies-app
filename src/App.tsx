import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "./HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "./bll/store";
import {AnyAction} from "redux";
import {getAccessToken} from "./bll/auth-reducer";

function App() {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const isAuth = useSelector<StoreType, boolean>( state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getAccessToken())
    }, [])

    return (
        <BrowserRouter>
            <div className='app'>
                <HeaderContainer/>
                {isAuth && <div>access token получен</div>}
                    <Routes>
                        {/*<Route path='/favorites' element={}/>*/}
                        {/*<Route path='/favorites' element={}/>*/}
                        <Route path='/' element={<Navigate to='/vacancies'/>}/>
                        {/*<Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                    </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
