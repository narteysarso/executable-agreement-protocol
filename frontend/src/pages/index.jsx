import { Route, Routes } from 'react-router-dom';
import Page404 from '../pages/errors/404';
import MainLayout from '../Layout/Main';
import Home from './Home';
import Dashboard from './Dashboard';
import Agreement from "./Agreement";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="/dashboard">
                    <Route index element={<Dashboard />}/>
                    <Route path="*" element={<Dashboard />}/>
                </Route>
                <Route path="/create-agreement">
                <Route index element={<Agreement />}/>
                </Route>
            </Route>
           
           
            <Route path="*" element={<Page404/>} />
        </Routes>
    )
}