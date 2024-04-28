import { BrowserRouter, Route, Switch } from "react-router-dom";
import Teams from "./routes/Teams";
import Team from "./routes/Team";

interface IRouterProps {
    toggleTheme: () => void;
    isDark: boolean;
}

function Router({toggleTheme, isDark}:IRouterProps){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:teamId">
                    <Team />
                </Route>
                <Route path="/">
                    <Teams toggleTheme={toggleTheme} isDark={isDark} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;