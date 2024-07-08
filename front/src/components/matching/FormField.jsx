import React from 'react';
import styles from '../../assets/styles/matching/FormField.module.scss';

const FormField = ({ id, label, value, onChange, type = 'text', required = false }) => {
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                id={id}
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default FormField;
