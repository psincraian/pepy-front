import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    CardHeader,
} from '@mui/material';
import CodeBlock from "@/app/components/code_block";

interface BadgesComponentProps {
    project: string;
}

const PEPY_BADGES_URL = 'https://static.pepy.tech/badge/';

const BadgesComponent: React.FC<BadgesComponentProps> = ({project}) => {

    const renderImageAndCode = (path: string, altText: string) => (
        <>
            <Grid item xs={6}>
                <img alt={altText} src={PEPY_BADGES_URL + project + path}/>
            </Grid>
            <Grid item xs={6}>
                <CodeBlock
                    content={`[![Downloads](${PEPY_BADGES_URL}${project}${path})](https://pepy.tech/project/${project})`}
                />
            </Grid>
        </>
    );

    return (
        <Card data-cy="badges">
            <CardHeader title="Badges"/>
            <CardContent>
                <Grid container spacing={1} alignItems="center">
                    {renderImageAndCode('', 'Total downloads for the project')}
                    {renderImageAndCode('/month', 'Last 30 days downloads for the project')}
                    {renderImageAndCode('/week', 'Last 7 days downloads for the project')}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default BadgesComponent;
