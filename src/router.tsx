import { BrowserRouter, Route, Switch } from "react-router-dom";
import Teams from "./routes/Teams";

function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Teams />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;