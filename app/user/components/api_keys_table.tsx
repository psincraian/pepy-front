'use client';

import {ApiKey} from "@/app/user/model";
import React, {useEffect, useState} from "react";
import ApiKeyForm from "@/app/user/components/api_key_form";
import styles from './api_keys_table.module.css';
import {Typography} from "@mui/material";

async function getApiKeys() {
    console.log("Start fetching api keys")
    const response = await fetch('/api/v3/user/api-keys', {
        method: 'GET',
        headers: {}
    });
    const body = await response.json();
    console.log("Api keys fetched", body)
    return body.map((key: any) => key as ApiKey);
}

export default function ApiKeyTable() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

    useEffect(() => {
        getApiKeys().then(keys => setApiKeys(keys));
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.header_container}>
                <h3>API Keys</h3>
                <Typography variant="body2" gutterBottom>
                    You can use these API keys to access the API. Simply set the <code>X-Api-Key</code> header to the value of the
                    API key.
                </Typography>
            </div>
            <ApiKeyForm onSuccess={(key) => setApiKeys([...apiKeys, key])}/>
            <div className={styles.table_container}>
                <table className={styles.table_form}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Key</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    {apiKeys.map((key) => (
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.apiKey}</td>
                            <td>{key.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}