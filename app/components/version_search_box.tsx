"use client";
import React, { ReactNode, CSSProperties, FC, Ref, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { VariableSizeList } from 'react-window';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import {VersionDownloads} from "@/app/components/model";
import {formatDownloads} from "@/app/components/helpers";

interface RenderRowProps {
    index: number;
    style: CSSProperties;
    data: ReactNode[];
}

interface VersionSearchBoxProps {
    versions: string[];
    selectedVersions: string[];
    downloads: VersionDownloads;
    onChange: (newValues: string[]) => void;
}

const LISTBOX_PADDING = 8; // px

const renderRow = (props: RenderRowProps) => {
    const { data, index, style } = props;
    return React.cloneElement(data[index] as React.ReactElement, {
        style: {
            ...style,
            top: (style.top as number) + LISTBOX_PADDING,
        },
    });
};

const OuterElementContext = React.createContext({});

const OuterElementType: FC<any, any> = React.forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent: FC<any, any> = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: ReactNode) => {
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
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

const renderGroup = (params: any) => [
    <ListSubheader key={params.key} component="div">
        {params.key}
    </ListSubheader>,
    params.children,
];

const versionDownloadsCache: VersionDownloads = {};

function retrieveVersionDownloads(version: string, downloads: VersionDownloads) {
    if (version in versionDownloadsCache) {
        return versionDownloadsCache[version];
    }

    let total = 0;
    for (const d of Object.keys(downloads)) {
        if (version in downloads[d]) {
            total += downloads[d][version];
        }
    }

    versionDownloadsCache[version] = total;

    return total;
}

function retrieveColor(downloads: number) {
    let color = '#FFF';
    if (downloads < 1000) {
        color = '#FFF';
    } else if (downloads < 1000000) {
        color = '#f95d6a';
    } else if (downloads < 1000000000) {
        color = '#2f4b7c';
    }

    return color;
}

const filter = createFilterOptions();

const VersionSearchBox: React.FC<VersionSearchBoxProps> = (props) => {

    const renderOption = (optionProps: any, option: Version) => {
        if (option.title) {
            return (
                <li {...optionProps}>
                    <Box
                        width={16}
                        height={16}
                        borderRadius="2px"
                        marginRight={2}
                        bgcolor={retrieveColor(
                            retrieveVersionDownloads(option.value!, props.downloads)
                        )}
                    />
                    <Typography>{option.title}</Typography>
                </li>
            );
        }

        return (
            <li {...optionProps}>
                <Box
                    width={16}
                    height={16}
                    borderRadius="2px"
                    marginRight={2}
                    bgcolor={retrieveColor(
                        retrieveVersionDownloads(option, props.downloads)
                    )}
                />
                <Typography>{option.value}</Typography>
                <Box mx={1}>
                    <Typography color="textSecondary">-</Typography>
                </Box>
                <Typography color="textSecondary">
                    {formatDownloads(
                        retrieveVersionDownloads(option, props.downloads),
                        0
                    ) + '/month'}
                </Typography>
            </li>
        );
    };

    return (
        <>
            <Autocomplete
                id="version-search-box"
                freeSolo
                multiple
                filterSelectedOptions
                ListboxComponent={ListboxComponent}
                renderGroup={renderGroup}
                options={props.versions}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select versions" />
                )}
                renderOption={renderOption}
                onChange={(event, value) => {
                    const newValues = value.map((x) =>
                        typeof x === 'string' ? x : x.value
                    );
                    props.onChange(newValues as string[]);
                }}
                value={props.selectedVersions}
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
};

export default VersionSearchBox;
