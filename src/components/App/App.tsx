import React, {useEffect} from 'react';
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "../HeaderContainer/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getAccessToken} from "../../bll/auth-reducer";
import {VacanciesPage} from "../VacanciesPage/VacanciesPage";
import {getCatalogues} from "../../bll/vacancies-reducer";
import {FavoritePage} from "../FavoritePage/FavoritePage";
import {CircleLoader} from "../Loaders/CircleLoader";
import {Page404} from "../Page404/Page404";
import { Box } from '@mantine/core';

function App() {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const isAppInitialized = useSelector<StoreType, boolean>( state => state.app.isAppInitialized)

    useEffect(() => {
        dispatch(getAccessToken())
        dispatch(getCatalogues())
    }, [dispatch])

    if (!isAppInitialized) return <CircleLoader/>


    return (
        <BrowserRouter>
            <div>
                <HeaderContainer/>
                    <Box pt={40} pb={44} className={styles.wrapper}>
                        <Routes>
                            <Route path='/favorites' element={<FavoritePage/>}/>
                            <Route path='/vacancies' element={<VacanciesPage/>}/>
                            <Route path='/' element={<Navigate to='/vacancies'/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Box>
            </div>
        </BrowserRouter>
    );
}

export default App;
