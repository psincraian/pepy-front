import React from 'react';
import {
    CardContent,
    Grid,
    CardHeader,
    Box,
    Typography, Card,
} from '@mui/material';

interface ProjectSummaryProps {
    name: string;
    totalDownloads: number;
    totalDownloads30Days: number;
    totalDownloads7Days: number;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
                                                           name,
                                                           totalDownloads,
                                                           totalDownloads30Days,
                                                           totalDownloads7Days
                                                       }) => {


    // Construct the PyPI link
    const pypiLink = `https://pypi.org/project/${name}`;

    // Render the component
    return (
        <Card data-cy="summary">
            <CardHeader title="Summary"/>
            <CardContent>
                <Grid container spacing={1}>

                    {/* PyPI Link */}
                    <Grid item xs={12}>
                        <Box fontWeight="fontWeightMedium">PyPI link</Box>
                    </Grid>
                    <Grid item xs={12} marginBottom={1}>
                        <a href={pypiLink}>
                            <Typography noWrap>{pypiLink}</Typography>
                        </a>
                    </Grid>

                    {/* Total Downloads */}
                    <Grid item xs={12}>
                        <Box fontWeight="fontWeightMedium">Total downloads</Box>
                    </Grid>
                    <Grid item xs={12} marginBottom={1}>
                        {totalDownloads.toLocaleString()}
                    </Grid>

                    {/* Total Downloads (Last 30 days) */}
                    <Grid item xs={12}>
                        <Box fontWeight="fontWeightMedium">Total downloads - 30 days</Box>
                    </Grid>
                    <Grid item xs={12} marginBottom={1}>
                        {totalDownloads30Days.toLocaleString()}
                    </Grid>

                    {/* Total Downloads (Last 7 days) */}
                    <Grid item xs={12}>
                        <Box fontWeight="fontWeightMedium">Total downloads - 7 days</Box>
                    </Grid>
                    <Grid item xs={12}>
                        {totalDownloads7Days.toLocaleString()}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ProjectSummary;