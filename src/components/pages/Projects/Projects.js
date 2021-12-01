import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Message from '../../forms/Message/Message';
import Container from '../../layout/Container/Container';
import LinkButton from '../../forms/LinkButton/LinkButton';
import Card from '../../forms/Card/Card';
import Loader from '../../forms/Loader/Loader';
import styles from './Projects.module.css';

function Projects(){
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [removeLoader, setRemoveLoader] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    let message = '';       
    
    if(location.state){
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() =>{
            fetch("http://localhost:5000/projects",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp  => resp.json())
            .then(data => {
                setProjects(data);
                setRemoveLoader(true);
            })
            .catch(error => console.log(error));
        },1000)
    }, []);

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json)
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Plano removido com sucesso!");
        })
        .catch(error => console.log (error))
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Planos</h1>
                <LinkButton to="/newproject" text="Novo Plano"/>
            </div>
            {message && <Message type="success" message={message}/>}
            {projectMessage && <Message type="success" message={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) =>(
                        <Card 
                        key={project.id}
                        id={project.id} 
                        name={project.name} 
                        category={project.category.name} 
                        budget={project.budget}  
                        handleRemove={removeProject}/>
                    )
                )}
                {!removeLoader && <Loader />}
                {removeLoader && projects.length === 0 && (
                    <p>Não há planos cadastrados</p>
                )}
            </Container>
        </div>
    )
}
export default Projects;