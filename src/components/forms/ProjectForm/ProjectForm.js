import {useState, useEffect} from 'react';

import styles from './ProjectForm.module.css';
import Input from '../../forms/Input/Input';
import Select from '../../forms/Select/Select';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';

function ProjectForm({btnText, handleSubmit, projectData}){
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( resp  => resp.json())
        .then( data => setCategories(data))
        .catch( error => console.log(error));
    }, []);

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project);
    }

    function handleOnChange(e){
        setProject({ ...project, [e.target.name]: e.target.value});
    }

    function handleOnSelect(e){
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }});
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" placeholder="Insira o nome do plano" value={project.name }
                id="name" name="name" text="Plano" handleOnChange={handleOnChange}
            />
            <Input type="number" placeholder="Insira o orçamento total"value={project.budget}
                id="budget" name="budget" text="Orçamento Total" handleOnChange={handleOnChange}
            />
            <Select id="category" name="category" text="Categoria" options={categories} handleOnChange={handleOnSelect}
                value={project.category ? project.category.id : ''}/>
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;