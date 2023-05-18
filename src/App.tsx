import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import {HeaderContainer} from "./HeaderContainer";

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <HeaderContainer/>
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
