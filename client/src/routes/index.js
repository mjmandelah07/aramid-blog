import { useRoutes } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Category from '../pages/Category';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Single from '../pages/Single';

export default function Router() {
    let element = useRoutes([
        {
            element: <AuthLayout />,
            children: [
               { path: "login", element: <Login /> },
            ],
        },
        {
            element: <MainLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "home", element: <Home /> },
                { path: "category", element: <Category /> },
                { path: "tech", element: <Category /> },
                { path: "politics", element: <Category /> },
                { path: "sports", element: <Category /> },
                { path: "travel", element: <Category /> },
                { path: "entertainment", element: <Category /> },
                { path: "home/nature", element: <Category /> },
                { path: "home/travel", element: <Category /> },
                { path: "home/lifestyle", element: <Category /> },
                { path: "home/sports", element: <Category /> },
                { path: "home/post", element: <Single /> },
            ],
        },
    ]);
    return element;
    }