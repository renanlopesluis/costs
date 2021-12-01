import styles from './Home.module.css';
import savings from '../../../img/savings.svg';
import LinkButton from '../../forms/LinkButton/LinkButton';

function Home(){
    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo à <span>Gráfica</span>!</h1>
            <p>Comece seus orçamentos conosco!</p>
            <LinkButton to="/newproject" text="Novo Plano"/>
            <img src={savings} alt="Orçamento"/>
        </section>
    )
}
export default Home;