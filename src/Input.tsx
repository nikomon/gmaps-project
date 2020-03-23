import { useState, useEffect } from "react"
import React from 'react';

export const Input: React.FC<{ name: string, type: string}> = ({ name, type }) => {
    const [value, setValue] = useState('');
    return (
        <>
        <input name={name} value={value} onChange={({ target: { value }}) => setValue(value)} type={type}/>
        </>
    )
}