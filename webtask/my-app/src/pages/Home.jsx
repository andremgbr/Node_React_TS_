import React from 'react';
import Layout from "./../layout/layoutComponent";
import MetaTags from 'react-meta-tags';
import Axios from "axios";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tasks: [],
            user: []
        };
    }

    componentDidMount() {


        Axios.get("http://localhost:3333/auth/user", { withCredentials: true })
            .then(res => {
                //console.log(res);
                this.setState({ user: res.data })
            })
            .catch(error => {
                //console.log("o SEFUINTE ERROR", error.response.status);
                this.setState({
                    error: "Usuáio não logado!.",
                    isLoaded: true,

                })
            })

        Axios.get("http://localhost:3333/api/destinationTasks", { withCredentials: true })
            .catch((error) => {
                //console.log("o SEFUINTE ERROR", error.response);
                if (error.response.status === 404) {
                    this.setState({
                        isLoaded: true,
                        error: "Usuáio outro erro não  logado!."
                    })
                }
            })
            .then((res) => {
                //console.log(res);
                this.setState({
                    isLoaded: true,
                    tasks: res.data
                });
            });

        /**
        fetch("http://localhost:3333/api/tasks")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tasks: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
                **/
    }

    render() {
        const { error, isLoaded, tasks } = this.state;
        //console.log(error, isLoaded, tasks, user)
        //console.log(tasks);
        if (error) {
            return (<>
                <MetaTags>
                    <title>Home</title>
                </MetaTags>
                <div>Error:{error}</div>
                <div><a href="/login">Login Page</a></div>
                <div><a href="/signup">Criar Conta</a></div>
            </>);
        } else if (!isLoaded) {
            return (<>
                <MetaTags>
                    <title>Home</title>
                </MetaTags>
                <div>Loading...</div>
            </>);
        } else {
            return (
                <>
                    <Layout />
                    <MetaTags>
                        <title>Home</title>
                    </MetaTags>
                    <div className="accordion" id="accordion">
                        <h1>Minhas Tarefas</h1>
                        {tasks ?
                            tasks.map((task, index) => (
                                <>
                                    <div className="card" id={"Card_" + index}>
                                        <div className="card-header" id={"heading" + task.id}>
                                            <h2 className="mb-0" >
                                                {task.task.situation === "stp" ? <span className="badge badge-warning">Pausado</span> : ""}
                                                {task.task.situation === "ipg" ? <span className="badge badge-warning">Em progresso</span> : ""}
                                                {task.task.situation === "inl" ? <span className="badge badge-warning">Em análise</span> : ""}
                                                {task.task.situation === "don" ? <span className="badge badge-warning">Completo</span> : ""}
                                                {task.task.situation === "que" ? <span className="badge badge-warning">Na fila</span> : ""}
                                                <a href={"/task/" + task.task.id}>{task.task.name} </a>------------ Criado por: {task.task.req_user.firstName}

                                            </h2>
                                        </div>
                                    </div>
                                    </>
                            )) : <div><h2>Sem Tarefas!...</h2></div>}


                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                </>);

        }
    }
}


export default Home;