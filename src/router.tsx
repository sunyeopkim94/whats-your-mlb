import { BrowserRouter, Route, Switch } from "react-router-dom";
import Teams from "./routes/Teams";
import Team from "./routes/Team";

interface IRouterProps {

}

function Router({}:IRouterProps){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/:teamId">
                    <Team />
                </Route>
                <Route path="/">
                    <Teams />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;