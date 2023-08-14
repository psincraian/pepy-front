'use client';
import React, {useMemo} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Typography, Chip, Box} from '@mui/material';
import {createFilterOptions} from '@mui/material/Autocomplete';
import {formatDownloads} from "@/app/components/helpers";
import {OptionType} from "@/app/components/model";
import {DownloadsResponse} from "@/app/helper/compute_downloads";


interface VersionSearchBoxProps {
    versions: OptionType[];
    selectedVersions: OptionType[];
    downloads: DownloadsResponse[];
    onChange: (values: string[]) => void;
}

function VersionSearchBox({downloads, onChange, selectedVersions, versions}: VersionSearchBoxProps) {
    const versionDownloadsCache = useMemo(() => {
        return versions.reduce((cache: Record<string, number>, version: OptionType) => {
            cache[version.value] = Object.values(downloads).reduce((total: number, curr: Record<string, number>) => total + (curr[version.value] || 0), 0);
            return cache;
        }, {});
    }, [versions, downloads]);

    const retrieveColor = (downloads: number) => {
        const colors = ['#FFF', '#f95d6a', '#2f4b7c'];
        if (downloads < 1000) return colors[0];
        if (downloads < 1000000) return colors[1];
        return colors[2];
    }

    const filter = createFilterOptions<OptionType>();

    return (
        <>
            <Autocomplete
                id="version-search-box"
                freeSolo
                multiple
                filterSelectedOptions
                options={versions}
                getOptionLabel={(option: OptionType | string) => typeof option === "string" ? option : option.title || option.value}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select versions. Use * to perform queries"/>
                )}
                renderOption={(props, option : OptionType) => {
                    const totalDownloads = versionDownloadsCache[option.value];
                    return (
                        <li {...props} key={option.value}>
                            <Box width={16} height={16} borderRadius="2px" marginRight={2}
                                 bgcolor={retrieveColor(totalDownloads)}/>
                            <Typography>{option.title || option.value}</Typography>
                            {option.title ? null : (
                                <>
                                    <Box mx={1}>
                                        <Typography color="textSecondary">-</Typography>
                                    </Box>
                                    <Typography color="textSecondary">
                                        {formatDownloads(totalDownloads)}
                                    </Typography>
                                </>
                            )}
                        </li>
                    )
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.title || option.value}
                            {...getTagProps({index})}
                            key={option.title}
                        />
                    ))
                }
                onChange={(event, value: (string | OptionType)[]) => onChange(value.map((x) => typeof x === "string" ? x : x.value))}
                value={selectedVersions}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                            value: params.inputValue,
                            title: `Search for "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
            />
        </>
    );
}

export default VersionSearchBox;
