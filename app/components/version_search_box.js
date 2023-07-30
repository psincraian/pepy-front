'use client';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { createFilterOptions } from '@mui/material/Autocomplete';
import {formatDownloads} from "@/app/components/helpers";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
        style: {
            ...style,
            top: style.top + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
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
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

const renderGroup = (params) => [
    <ListSubheader key={params.key} component="div">
        {params.key}
    </ListSubheader>,
    params.children,
];

const versionDownloadsCache = {};

function retrieveVersionDownloads(version, downloads) {
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

function retrieveColor(downloads) {
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

class VersionSearchBox extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <Autocomplete
                    id="version-search-box"
                    freeSolo
                    multiple
                    filterSelectedOptions
                    classes={classes}
                    ListboxComponent={ListboxComponent}
                    renderGroup={renderGroup}
                    options={this.props.versions}
                    getOptionLabel={(option) => (option.title ? option.title : option)}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Select versions" />
                    )}
                    renderOption={(props, option, { selected }) =>
                        this.renderOption(props, option)
                    }
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={option.title ? option.title : option}
                                label={option.title ? option.title : option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    onChange={(event, value) => {
                        const newValues = value.map((x) =>
                            typeof x === 'string' ? x : x.value
                        );
                        this.props.onChange(newValues);
                    }}
                    value={this.props.selectedVersions}
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

    renderOption(props, option) {
        if (option.title) {
            return (
                <li {...props}>
                    <Box
                        width={16}
                        height={16}
                        borderRadius="2px"
                        marginRight={2}
                        bgcolor={retrieveColor(
                            retrieveVersionDownloads(option.value, this.props.downloads)
                        )}
                    />
                    <Typography>{option.title}</Typography>
                </li>
            );
        }

        return (
            <li {...props}>
                <Box
                    width={16}
                    height={16}
                    borderRadius="2px"
                    marginRight={2}
                    bgcolor={retrieveColor(
                        retrieveVersionDownloads(option, this.props.downloads)
                    )}
                />
                <Typography>{option}</Typography>
                <Box mx={1}>
                    <Typography color="textSecondary">-</Typography>
                </Box>
                <Typography color="textSecondary">
                    {formatDownloads(
                        retrieveVersionDownloads(option, this.props.downloads),
                        0
                    ) + '/month'}
                </Typography>
            </li>
        );
    }
}

export default VersionSearchBox;