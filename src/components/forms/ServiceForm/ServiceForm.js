import { useState } from 'react';

import styles from '../ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';

function ServiceForm({btnText, handleSubmit, projectData}){
    const [service, setService] = useState({});
  
    function submit(e){
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleOnChange(e){
        setService({ ...service, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" placeholder="Insira a nome do produto" id="name" 
                name="name" text="Nome do produto" handleOnChange={handleOnChange}
            />
            <Input type="number" placeholder="Insira o nome do produto" id="cost" name="cost" 
                text="Valor do produto" handleOnChange={handleOnChange}
            />
             <Input type="text" placeholder="Insira a descrição do produto" id="description" 
                name="description" text="Descrição do produto" handleOnChange={handleOnChange}
            />
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default ServiceForm;