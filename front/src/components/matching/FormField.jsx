import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/FormField.module.scss';

const FormField = ({ id, label, type = 'text', value, onChange, options = [], required = false, readOnly = false }) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={id}>{label}</label>
            {type === 'select' ? (
                <select id={id} value={value} onChange={onChange} required={required} disabled={readOnly}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input id={id} type={type} value={value} onChange={onChange} required={required} readOnly={readOnly} />
            )}
        </div>
    );
};

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    required: PropTypes.bool,
    readOnly: PropTypes.bool
};

export default FormField;
