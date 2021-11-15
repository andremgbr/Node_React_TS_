import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateTask from "./pages/CreateTask.jsx";
import SignUp from "./pages/SignUp.jsx";
import Task from "./pages/Task.jsx";
import MyTasks from "./pages/MyTasks.jsx";



function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/task/create"><CreateTask /></Route>
                <Route path="/mytask"><MyTasks /></Route>
                <Route path="/task/:id"><Task/></Route>
                <Route path="/login"> <Login /></Route>
                <Route path="/signup"> <SignUp /></Route>

            </Switch>
        </Router>
    );
}

export default App;