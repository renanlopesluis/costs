import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Message from '../../forms/Message/Message';
import ProjectForm from '../../forms/ProjectForm/ProjectForm';
import ServiceForm from '../../forms/ServiceForm/ServiceForm';
import ServiceCard from '../../forms/ServiceCard/ServiceCard';
import Loader from '../../forms/Loader/Loader';
import Container from '../../layout/Container/Container';
import styles from './Project.module.css';

function Project(){

    const { id } = useParams();
    const [project, setProject] = useState({});
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState([]);
    const [type, setType] = useState({});

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

    function patch(project){
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

    function editPost(project){
        setMessage('');

        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo!');
            setType('error');
            return false;
        }
        patch(project);
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function removeService(id, cost){
        project.services = project.services.filter(
            (service) => service.id !== id
        );
        project.cost = parseFloat(project.cost) - cost;

        patch(project);
    }

    function createService(project){
        setMessage('');
        const lastService = project.services[project.services.length -1];
        lastService.id = uuidv4();
        console.log(project.services)
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado! Verifique o valor do produto!');
            setType('error');
            project.services.pop();
            return false;
        }

        project.cost = newCost;
        patch(project);
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
                    <div className={styles.detailsContainer}>
                        <h2>Adicione um Produto</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? `Editar Produto` : `Fechar`}
                        </button>
                        <div className={styles.projectInfo}>
                            { showServiceForm && 
                                <ServiceForm 
                                    handleSubmit={createService} 
                                    btnText='Adicionar Produto' 
                                    projectData={project}
                                />
                            }
                        </div>
                    </div>
                    <h2>Produtos</h2>
                    <Container customClass="start">
                        {project.services.length > 0 &&
                            project.services.map((service)=>(
                                <ServiceCard  
                                    id={service.id}
                                    key={service.id}
                                    name={service.name}
                                    description={service.description}
                                    cost={service.cost}
                                    handleRemove={removeService}
                                />
                            ))
                        }

                        {project.services.length === 0 && <p>Não há produtos cadastrados</p>}
                    </Container>
                </Container>
            </div>
       ) : (
       <Loader />
       )}
       </>
    )
}

export default Project;