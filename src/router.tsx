import { BrowserRouter, Route, Switch } from "react-router-dom";
import Teams from "./routes/Teams";
import Team from "./routes/Team";

function Router(){
    return (
        <BrowserRouter>
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