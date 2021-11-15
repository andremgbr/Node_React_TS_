import React from "react";
import Layout from "./../layout/layoutComponent";
import MetaTags from 'react-meta-tags';
import Axios from "axios";
import { withRouter } from "react-router-dom";




class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            task: [],
            user: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        var task = { ...this.state.task };
        if (nam === "task_situation") {
            task.situation = val;
            this.setState({ task });
        }
        else if (nam === "task_info") {
            task.info = val;
            this.setState({ task });
        } else {

            this.setState({ [nam]: val });
        }
    }

    handleSubmit = async function (e) {
        e.preventDefault();
        console.log("Resultado do input task: ", this.state.task);

        Axios.put("http://localhost:3333/api/task/" + this.state.task.id, this.state.task, { withCredentials: true })
            .then(window.location.href = "/")
    };

   deleteTask = function() {
       console.log("Deletar esta task foi acionada!>.");
       fetch("http://localhost:3333/api/task/" + this.state.task.id, { credentials: 'include', method: "DELETE" })
           .then(window.location = document.referrer)
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

        const id = this.props.match.params.id;

        Axios.get("http://localhost:3333/api/task/" + id, { withCredentials: true })
            .then(res => {
                console.log("Acertou o then?...")

                this.setState({
                    task: res.data,
                    isLoaded: true,
                })
            })
            .catch(error => {
                console.log("deu error executado get taks..")
                this.setState({
                    error: "Error 404, Task não encontrado!.",
                    isLoaded: true,
                })
            });

    }



    render() {
        const { task, error, isLoaded } = this.state;
        //console.log(error, isLoaded, tasks, user)
        console.log(task);
        if (error) {
            return (<>
                <MetaTags>
                    <title>Home</title>
                </MetaTags>
                <div>Error:{error}</div>
                <div><a href="/">Home Page</a></div>
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
                        <title>Task</title>
                    </MetaTags>

                    <div>
                        <span> NOME: {task.name}</span>
                        <span> Requisitado por: {task.user.firstName}</span>
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <select name="task_situation" value={this.state.task.situation} onChange={this.myChangeHandler}>
                            <option value="stp">Pausado</option>
                            <option value="ipg">Em progresso</option>
                            <option value="inl">Em análise</option>
                            <option value="don">Finalizado</option>
                            <option value="que">Na fila</option>
                        </select>

                        <label>
                            INFO:
                        <textarea name="task_info" rows="5" cols="33" onChange={this.myChangeHandler} value={this.state.task.info}></textarea>
                        </label>
                        <input type="submit" value="Submit" />

                    </form>
                    <button value="delete_task" onClick={this.deleteTask}>DELETAR ESTA TASK</button>

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                </>
            )
        }
    }

}
export default withRouter(Task);