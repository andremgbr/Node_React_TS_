import React from "react";
import Layout from "./../layout/layoutComponent";
import MetaTags from 'react-meta-tags';
import Axios from "axios";
import AddUser from "./../component/addUser";


class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: null,
            isLoaded: false,
            childComponent: [],
            tasks: [],
            user: [],
            userDest: [],
            projects: [],
            childCount: 1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        Axios.get("http://localhost:3333/auth/user", { withCredentials: true })
            .then(res => {
                //console.log(res);
                this.setState({
                    user: res.data,
                })
            })
            .catch(error => {
                //console.log("o SEFUINTE ERROR", error.response.status);
                this.setState({
                    error: "Usuáio não logado!.",
                })
            })

        Axios.get("http://localhost:3333/api/projects")
            .then(res => {
                //console.log(res.data)
                this.setState({
                    projects: res.data
                })
            })

        Axios.get("http://localhost:3333/api/users")
            .then(res => {
                //console.log(res.data)
                this.setState({
                    userDest: res.data
                })
            })
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }


    handleSubmit = async function (e) {
        e.preventDefault();

        const requestDataTask = {
            name: e.target.name.value,
            project_id: e.target.project_id.value,
            req_user_id: this.state.user.id,
        }

        async function getPostTask(requestData) {
            const requestOption = {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Request-Method': ' POST',
                    'Access-Control-Request-Headers': ' Content-Type, Authorization',
                }),
            }

            const response = await fetch("http://localhost:3333/api/tasks", requestOption);

            return response.json();
        }

        const taskObjc = await getPostTask(requestDataTask);

        //console.log(taskObjc);

        const target = e.target;

        console.log(e.target);

        console.log("Contagem de child: " + this.state.childCount)
        for (var i = 0; i < this.state.childCount; i++) {
            for (var x = 0; x < target.length; x++) {
                //console.log("utilizando i: " + target[x].name + "  -  " + "user_id_" + i);

                if (String(target[x].name) === String("user_id_" + i)) {

                    console.log("Result: " + target[x].value);

                    const requestDataDestinationTask = {
                        task_id: taskObjc.id,
                        user_id: target[x].value,
                    };


                    async function getPostDestinationTask(requestData) {
                        const requestOption = {
                            method: "POST",
                            body: JSON.stringify(requestData),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Access-Control-Request-Method': ' POST',
                                'Access-Control-Request-Headers': ' Content-Type, Authorization',
                            }),
                        }

                        const response = await fetch("http://localhost:3333/api/destinationTasks", requestOption);

                        return response.json();
                    }

                    getPostDestinationTask(requestDataDestinationTask);
                };

            }


        }




        window.location.href = "/task/" + taskObjc.id;

    }

    addUserButton = e => {
        e.preventDefault();
        this.setState({
            childComponent: [...this.state.childComponent, <AddUser childCount={this.state.childCount} userDest={this.state.userDest} />],
            childCount: this.state.childCount + 1
        })
    }


    render() {
        const { error, projects, userDest } = this.state;
        //console.log(error, isLoaded, tasks, user)
        //console.log(projects, userDest);

        if (error) {
            return (<>
                <MetaTags>
                    <title>Home</title>
                </MetaTags>
                <div>Error:{error}</div>
                <div><a href="/login">Login Page</a></div>
            </>);
        } else {

            return (<>
                <Layout />
                <MetaTags>
                    <title>Create Task</title>
                </MetaTags>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                    <input type="text" name="name" onChange={this.myChangeHandler} />
                    </label>
                    <label>
                        Projeto:
                    <select name="project_id" onChange={this.myChangeHandler}>
                            {projects.map(project => (
                                <option value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Para Usuáio:
                            <select name={"user_id_0"} onChange={this.myChangeHandler}>
                            {userDest.map(user => (
                                <option value={user.id}>{user.firstName}</option>
                            ))}
                        </select>
                    </label>
                    {this.state.childComponent.map(item => (item))}
                    <button onClick={this.addUserButton}>Add usuário</button>



                    <input type="submit" value="Submit" />

                </form>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </>)
        }
    }
}


export default CreateTask;