import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "../HeaderContainer/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getAccessToken} from "../../bll/auth-reducer";
import { Loader } from '@mantine/core';
import { VacanciesList } from '../VacanciesList/VacanciesList';

function App() {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const isAuth = useSelector<StoreType, boolean>( state => state.auth.isAuth)
    const token = useSelector<StoreType, string | null>(state => state.auth.accessToken)

    useEffect(() => {
        dispatch(getAccessToken())
    }, [])

    if (!isAuth) return <Loader/>

    return (
        <BrowserRouter>
            <div className='app'>
                <HeaderContainer/>
                {isAuth && <div>access token получен</div>}
                    <Routes>
                        {/*<Route path='/favorites' element={}/>*/}
                        <Route path='/vacancies' element={<VacanciesList/>}/>
                        <Route path='/' element={<Navigate to='/vacancies'/>}/>
                        {/*<Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                    </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;