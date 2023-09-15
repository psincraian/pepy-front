import {ApiKey} from "@/app/user/model";
import React from "react";


interface ApiKeyTableProps {
    apiKeys: ApiKey[];
}

export default function ApiKeyTable({apiKeys}: ApiKeyTableProps) {
    return (
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
    );
}