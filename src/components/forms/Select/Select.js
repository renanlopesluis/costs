import styles from './Select.module.css';

function Select({text, id, name, value, options, handleOnChange}){
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <select 
                id={id} 
                name={name} 
                onChange={handleOnChange} 
                value={value || ''}
            >
                <option>Selecione uma opção</option>
                {options.map((option)=> (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
} 

export default Select;