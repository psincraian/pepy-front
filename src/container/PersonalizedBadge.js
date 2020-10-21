import React, { Component } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import CodeBlock from '../components/CodeBlock';
import {
  withStyles,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import Footer from '../components/Footer';
const styles = (theme) => ({
  layout: {
    width: 'auto',
    flexGrow: 2,
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    left: 0,
    bottom: 0,
    width: '100%',
  },
  formLayout: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlLeft: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '35%',
      minWidth: 120,
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  formControlRight: {
    [theme.breakpoints.up('sm')]: {
      marginRight: '35%',
      minWidth: 120,
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  imageCodeTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  imageTitle: {
    marginTop: theme.spacing(2),
  },
  imageCode: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
});

class PersonalizedBadge extends Component {
  state = {
    period: 'month',
    units: 'international_system',
    leftColor: 'black',
    rightColor: 'orange',
    leftText: 'Downloads',
  };

  handleChange = (event) => {
    const target = event.target.name;
    this.setState({ [target]: event.target.value });
  };

  buildUrl() {
    return (
      'https://static.pepy.tech/personalized-badge/' +
      this.props.project +
      '?period=' +
      this.state.period +
      '&units=' +
      this.state.units +
      '&left_color=' +
      this.state.leftColor +
      '&right_color=' +
      this.state.rightColor +
      '&left_text=' +
      this.state.leftText
    );
  }

  buildProjectUrl() {
    return 'https://pepy.tech/project/' + this.props.project;
  }

  getColors() {
    return [
      'black',
      'brightgreen',
      'green',
      'yellow',
      'yellowgreen',
      'orange',
      'red',
      'blue',
      'grey',
      'lightgrey',
    ];
  }

  render() {
    const { classes } = this.props;

    const colorsOptions = this.getColors().map((color) => {
      return (
        <MenuItem key={color} value={color}>
          {color}
        </MenuItem>
      );
    });

    return (
      <>
        <SearchAppBar />
        <Grid container justify="center" className={classes.layout}>
          <Grid item xs={12}>
            <Typography variant="h2">
              Personalized badge for {this.props.project}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} className={classes.formLayout}>
            <Grid container spacing={1} alignItems="center" justify="center">
              <Grid item>
                <Typography variant="body1">Period</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <RadioGroup
                    aria-label="period"
                    name="period"
                    value={this.state.period}
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="week"
                      control={<Radio />}
                      label="Week"
                    />
                    <FormControlLabel
                      value="month"
                      control={<Radio />}
                      label="Month"
                    />
                    <FormControlLabel
                      value="total"
                      control={<Radio />}
                      label="Total"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControlLeft}>
                  <Select
                    name="leftColor"
                    id="left-color"
                    value={this.state.leftColor}
                    onChange={this.handleChange}
                  >
                    {colorsOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} align="right">
                <FormControl className={classes.formControlRight}>
                  <Select
                    name="rightColor"
                    id="right-color"
                    value={this.state.rightColor}
                    onChange={this.handleChange}
                  >
                    {colorsOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} align="center">
                <img
                  width="66%"
                  alt="Personalized badge"
                  src={this.buildUrl()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControlLeft}>
                  <Input
                    name="leftText"
                    id="leftText"
                    value={this.state.leftText}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} align="right">
                <FormControl className={classes.formControlRight}>
                  <Select
                    aria-label="units"
                    name="units"
                    value={this.state.units}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="international_system">
                      System metric (default)
                    </MenuItem>
                    <MenuItem value="abbreviation">Abbreviation</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.imageCodeTitle}>
            <Typography variant="h3">Insert your image</Typography>
          </Grid>
          <Grid item xs={6} className={classes.imageTitle} align="center">
            <Typography variant="body1">Markdown</Typography>
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              className={classes.imageCode}
              content={
                '[![Downloads](' +
                this.buildUrl() +
                ')](' +
                this.buildProjectUrl() +
                ')'
              }
            />
          </Grid>
          <Grid item xs={6} className={classes.imageTitle} align="center">
            <Typography variant="body1">RST</Typography>
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              className={classes.imageCode}
              content={
                '.. image:: ' +
                this.buildUrl() +
                '\n :target:' +
                this.buildProjectUrl()
              }
            />
          </Grid>
          <Grid item xs={6} className={classes.imageTitle} align="center">
            <Typography variant="body1">Image url</Typography>
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              className={classes.imageCode}
              content={this.buildUrl()}
            />
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <Footer />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(PersonalizedBadge);
