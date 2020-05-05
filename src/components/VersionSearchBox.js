import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import { formatDownloads } from '../shared/helpers';
import { createFilterOptions } from '@material-ui/lab';

const LISTBOX_PADDING = 8; // px
const styles = (theme) => ({});

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

function retrieveVersionDownloads(version, downloads) {
  let total = 0;
  for (const d of Object.keys(downloads)) {
    if (version in downloads[d]) {
      total += downloads[d][version];
    }
  }
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
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select versions" />
          )}
          renderOption={(option, { selected }) => this.renderOption(option)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.title ? option.title : option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(event, value) => {
            const newValues = value.map(x => typeof x === 'string' ? x : x.value);
            this.props.onChange(newValues);
          }}
          value={this.props.selectedVersions}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.value !== '') {
              filtered.push({
                value: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
        />
      </>
    );
  }

  renderOption(option) {
    if (option.title) {
      return <Typography>Search for {option.value}</Typography>;
    }

    return (
      <>
        <Box
          width={16}
          height={16}
          borderRadius={2}
          marginRight={2}
          bgcolor={retrieveColor(
            retrieveVersionDownloads(
              option.value ? option.value : option,
              this.props.downloads
            )
          )}
        />
        <Typography>{option.title ? option.title : option}</Typography>
        <Box mx={1}>
          <Typography color="textSecondary">-</Typography>
        </Box>
        <Typography color="textSecondary">
          {formatDownloads(
            retrieveVersionDownloads(
              option.value ? option.value : option,
              this.props.downloads
            ),
            0
          ) + '/month'}
        </Typography>
      </>
    );
  }
}

export default withStyles(styles)(VersionSearchBox);
