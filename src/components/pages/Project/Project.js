import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Message from '../../forms/Message/Message';
import ProjectForm from '../../forms/ProjectForm/ProjectForm';
import Loader from '../../forms/Loader/Loader';
import Container from '../../layout/Container/Container';
import styles from './Project.module.css';

function Project(){
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState([]);
    const [type, setType] = useState([]);


    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp  => resp.json())
            .then(data => {
                setProject(data)
            })
            .catch(error => console.log(error))
        },1000)
    }, [id]);

    function editPost(project){
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo!');
            setType('error');
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data)=> {
            setProject(data);   
            setShowProjectForm(false);
            setMessage('Plano atualizado com sucesso!');
            setType('success');
        })
        .catch((error)=>console.log(error))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    return (
       <>
       {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} message={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Plano: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? `Editar Plano` : `Fechar`}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total Orçamento: </span>R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span>R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                            <ProjectForm btnText='Concluir Edição' handleSubmit={editPost} projectData={project}/>
                        </div>
                        )}
                    </div>
                </Container>
            </div>
       ) : (
       <Loader />
       )}
       </>
    )
}

export default Project;