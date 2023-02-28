import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import { formatDownloads } from "../shared/helpers";
import { createFilterOptions } from "@mui/material/Autocomplete";

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
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
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
  let color = "#FFF";
  if (downloads < 1000) {
    color = "#FFF";
  } else if (downloads < 1000000) {
    color = "#f95d6a";
  } else if (downloads < 1000000000) {
    color = "#2f4b7c";
  }

  return color;
}

const filter = createFilterOptions();

const VersionSearchBox = ({
  classes,
  versions,
  onChange,
  selectedVersions,
}) => {
  const renderOption = (props, option) => {
    return (
      <li {...props}>
        <Box
          width={16}
          height={16}
          borderRadius="2px"
          marginRight={2}
          bgcolor={retrieveColor(
            retrieveVersionDownloads(
              option.value ? option.value : option,
              props.downloads
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
              props.downloads
            ),
            0
          ) + "/month"}
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
        classes={classes}
        ListboxComponent={ListboxComponent}
        renderGroup={renderGroup}
        options={versions}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select versions" />
        )}
        renderOption={(props, option, { selected }) =>
          renderOption(props, option)
        }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.title ? option.title : option}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(event, value) => {
          const newValues = value.map((x) =>
            typeof x === "string" ? x : x.value
          );
          onChange(newValues);
        }}
        value={selectedVersions}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          return filtered;
        }}
      />
    </>
  );
};

export default withStyles(styles)(VersionSearchBox);
