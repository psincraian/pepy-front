'use client';
import React, { useContext, useMemo, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import { Typography, Chip, Box } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { formatDownloads } from "@/app/components/helpers";
import {OptionType} from "@/app/components/model";
import {DownloadsResponse} from "@/app/helper/compute_downloads";

const LISTBOX_PADDING = 8;
const OuterElementContext = React.createContext({});

const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = forwardRef((props, ref) => {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (React.isValidElement(child) && child.type === ListSubheader) {
            return 48;
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    key={itemCount}
                    outerElementType={OuterElementType}
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {({ data, index, style }) => React.cloneElement(data[index], {
                        style: {
                            ...style,
                            top: style.top + LISTBOX_PADDING,
                        },
                    })}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});



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

    // @ts-ignore
    return (
        <>
            <Autocomplete
                id="version-search-box"
                freeSolo
                multiple
                filterSelectedOptions
                ListboxComponent={ListboxComponent}
                options={versions}
                getOptionLabel={(option: OptionType) => option.title || option.value}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select versions" />
                )}
                renderOption={(props, option) => {
                    const totalDownloads = versionDownloadsCache[option.value];
                    return (
                        <li {...props} key={option.title}>
                            <Box width={16} height={16} borderRadius="2px" marginRight={2} bgcolor={retrieveColor(totalDownloads)} />
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
                            {...getTagProps({ index })}
                            key={option.title || option.value}
                        />
                    ))
                }
                onChange={(event, value: OptionType[]) => onChange(value.map((x) => x.value))}
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
