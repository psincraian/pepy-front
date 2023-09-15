'use client';

import {ApiKey} from "@/app/user/model";
import React, {useEffect, useState} from "react";
import ApiKeyForm from "@/app/user/components/api_key_form";
import {Grid} from "@mui/material";


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
        <>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={4}
            >
                <Grid item xs={9}>
                    <ApiKeyForm onSuccess={(key) => setApiKeys([...apiKeys, key])}/>
                </Grid>
                <Grid item xs={9}>

                    <table className="table">
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
                </Grid>
            </Grid>
        </>
    );
}