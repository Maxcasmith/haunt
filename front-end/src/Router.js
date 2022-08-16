import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    const key = `route_${index}`;
                    return route.component
                        ? <Route key={key} path={route.path} element={<route.component />} />
                        : <Route key={key} path={route.path} element={<Navigate to={route.redirect} replace />} />
                })}
            </Routes>
        </BrowserRouter>
    );
}
