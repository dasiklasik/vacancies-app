import React, {useEffect} from 'react';
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "../HeaderContainer/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getAccessToken} from "../../bll/auth-reducer";
import {VacanciesPage} from "../../Pages/VacanciesPage/VacanciesPage";
import {getCatalogues} from "../../bll/vacancies-reducer";
import {FavoritePage} from "../../Pages/FavoritePage/FavoritePage";
import {CircleLoader} from "../../common/Loaders/CircleLoader";
import {Page404} from "../../Pages/Page404/Page404";
import {Box, Container} from '@mantine/core';
import {VacancyPage} from "../../Pages/VacancyPage/VacancyPage";
import {ErrorAlert} from "../../common/ErrorAlert/ErrorAlert";
import {setError} from "../../bll/app-reducer";

function App() {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const isAppInitialized = useSelector<StoreType, boolean>( state => state.app.isAppInitialized)
    const error = useSelector<StoreType, string | null>(state => state.app.error)

    useEffect(() => {
        dispatch(getAccessToken())
        dispatch(getCatalogues())
    }, [dispatch])

    if (!isAppInitialized) return <CircleLoader/>


    const closeErrorAlert = () => {
        dispatch(setError(null))
    }

    return (
        <BrowserRouter>
            <div>
                {error && <ErrorAlert closeCallback={closeErrorAlert} error={error}/>}
                <HeaderContainer/>
                    <Box pt={40} pb={44} className={styles.back} mih={"100vh"}>
                        <Container p={0} className={styles.wrapper}>
                            <Routes>
                                <Route path='/favorites' element={<FavoritePage/>}/>
                                <Route path='/vacancies' element={<VacanciesPage/>}/>
                                <Route path='/vacancies/:id' element={<VacancyPage/>}/>
                                <Route path='/' element={<Navigate to='/vacancies'/>}/>
                                <Route path='*' element={<Page404/>}/>
                            </Routes>
                        </Container>
                    </Box>
            </div>
        </BrowserRouter>
    );
}

export default App;
