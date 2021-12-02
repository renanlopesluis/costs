import styles from './ServiceCard.module.css';
import { BsFillTrashFill} from 'react-icons/bs';

function ServiceCard({id, name, description, cost, handleRemove}){
   
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }
    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>
                <span>Descrição: </span>{description}
            </p>
            <p>
                <span>Custo: </span> R$ {cost}
            </p>
            <div className={styles.actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;