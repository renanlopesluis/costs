import styles from './Input.module.css';

function Input({type, text, id, name, placeholder, value, handleOnChange}){
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} 
                id={id} 
                name={name} 
                placeholder={placeholder} 
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
} 

export default Input;