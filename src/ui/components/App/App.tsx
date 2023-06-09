import React, {useEffect} from 'react';
import styles from './App.module.css';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {initApp} from '../../../bll/app/app-reducer';
import {CircleLoader} from '../common/Loaders/CircleLoader';
import {ErrorAlert} from '../common/ErrorAlert/ErrorAlert';
import {HeaderContainer} from '../HeaderContainer/HeaderContainer';
import {Box, Container} from '@mantine/core';
import {FavoritePage} from '../../Pages/FavoritePage/FavoritePage';
import {VacanciesPage} from '../../Pages/VacanciesPage/VacanciesPage';
import {VacancyPage} from '../../Pages/VacancyPage/VacancyPage';
import {Page404} from '../../Pages/Page404/Page404';
import { useAppDispatch, useAppSelector } from '../../../bll/store';


function App() {

    const dispatch = useAppDispatch()
    const isAppInitialized = useAppSelector<boolean>(state => state.app.isAppInitialized)
    const error = useAppSelector<string | null>(state => state.app.error)

    useEffect(() => {
        dispatch(initApp())
    }, [])

    if (!isAppInitialized) return <CircleLoader/>

    return (
        <HashRouter>
            <div>
                {error && <ErrorAlert error={error}/>}
                <HeaderContainer/>
                <Box pt={40} pb={44} className={styles.back} mih="100vh">
                    <Container p={0} className={styles.wrapper}>
                        <Routes>
                            <Route path="/favorites" element={<FavoritePage/>}/>
                            <Route path="/vacancies" element={<VacanciesPage/>}/>
                            <Route path="/vacancies/:id" element={<VacancyPage/>}/>
                            <Route path="/" element={<Navigate to="/vacancies"/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Container>
                </Box>
            </div>
        </HashRouter>
    );
}

export default App;
