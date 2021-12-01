import styles from './Loader.module.css';
import loading from '../../../img/loading.svg';

function Loader(){
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={loading} alt="Carregando" />
        </div>
    )
}

export default Loader;