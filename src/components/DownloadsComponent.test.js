// __tests__/fetch.test.js
import React from 'react';
import DownloadsComponent from './DownloadsComponent';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { defaultTheme } from '../shared/theme';

const { ResizeObserver } = window;

beforeEach(() => {
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

describe('<DownloadsComponent />', () => {
  it('renders component with the last 3 versions and wildcard', () => {
    const data = {
      versions: ['1.0', '2.0', '3.0', '4.0'],
      downloads: {
        '2020-01-01': { '1.0': 10, '2.0': 5 },
        '2020-01-02': { '1.0': 5, '2.0': 10, '3.0': 5 },
        '2020-01-04': { '2.0': 5, '3.0': 10, '4.0': 5 },
      },
    };
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );
    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      {
        date: '2020-01-01',
        '2.0': 5,
        '3.0': 0,
        '4.0': 0,
        '4.*': 0,
        sum: 5,
        total: 15,
      },
      {
        date: '2020-01-02',
        '2.0': 10,
        '3.0': 5,
        '4.0': 0,
        '4.*': 0,
        sum: 15,
        total: 20,
      },
      {
        date: '2020-01-04',
        '2.0': 5,
        '3.0': 10,
        '4.0': 5,
        '4.*': 5,
        sum: 25,
        total: 20,
      },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '4.0',
      '3.0',
      '2.0',
      '4.*',
    ]);
  });

  it('renders component with the last non stable versions', () => {
    const data = {
      versions: ['1.0a'],
      downloads: {
        '2020-01-01': { '1.0a': 10 },
        '2020-01-02': { '1.0a': 5 },
      },
    };
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );
    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      {
        date: '2020-01-01',
        '1.0a': 10,
        sum: 10,
        total: 10,
      },
      {
        date: '2020-01-02',
        '1.0a': 5,
        sum: 5,
        total: 5,
      },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '1.0a',
    ]);
  });

  it('renders component with the last 3 versions ignoring non production ones', () => {
    const data = {
      versions: ['1.0', '2.0', '3.0', '3.0dev1', '3.0da1', '3.0rc1', '4.0a1'],
      downloads: {
        '2020-01-01': { '1.0': 10, '2.0': 5 },
        '2020-01-02': { '1.0': 5, '2.0': 10, '3.0': 5 },
        '2020-01-04': { '2.0': 5, '3.0': 10, '4.0': 5 },
      },
    };
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );
    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      {
        date: '2020-01-01',
        '1.0': 10,
        '2.0': 5,
        '3.0': 0,
        '3.*': 0,
        sum: 15,
        total: 15,
      },
      {
        date: '2020-01-02',
        '1.0': 5,
        '2.0': 10,
        '3.0': 5,
        '3.*': 5,
        sum: 25,
        total: 20,
      },
      {
        date: '2020-01-04',
        '1.0': 0,
        '2.0': 5,
        '3.0': 10,
        '3.*': 10,
        sum: 25,
        total: 20,
      },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '3.0',
      '2.0',
      '1.0',
      '3.*',
    ]);
  });

  it('rignore', () => {
    const data = {
      versions: ['1', '2', '3', '4'],
      downloads: {
        '2020-01-01': { 1: 10, 2: 5 },
        '2020-01-02': { 1: 5, 2: 10, 3: 5 },
        '2020-01-04': { 2: 5, 3: 10, 4: 5 },
      },
    };
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );
    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2020-01-01', 2: 5, 3: 0, 4: 0, sum: 5, total: 15 },
      { date: '2020-01-02', 2: 10, 3: 5, 4: 0, sum: 15, total: 20 },
      { date: '2020-01-04', 2: 5, 3: 10, 4: 5, sum: 20, total: 20 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '4',
      '3',
      '2',
    ]);
  });

  it('takes into account regex', () => {
    const data = {
      versions: ['0.1', '1.0', '1.1', '2.0'],
      downloads: {
        '2020-01-01': { 0.1: 10, '1.0': 5 },
        '2020-01-02': { 0.1: 5, 0.2: 10, '1.0': 10, 1.1: 5 },
        '2020-01-04': { 0.2: 5, '1.0': 5, 1.1: 10, '2.0': 5 },
      },
    };
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );
    wrapper.find('DownloadsComponent').setState({ selectedVersions: ['0.*'] });

    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2020-01-01', '0.*': 10, sum: 10, total: 15 },
      { date: '2020-01-02', '0.*': 15, sum: 15, total: 30 },
      { date: '2020-01-04', '0.*': 5, sum: 5, total: 25 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '0.*',
    ]);
  });

  it('takes the first versions from url', () => {
    const data = {
      versions: ['0.1', '1.0', '1.1', '2.0'],
      downloads: {
        '2020-01-01': { 0.1: 10, '1.0': 5 },
        '2020-01-02': { 0.1: 5, 0.2: 10, '1.0': 10, 1.1: 5 },
        '2020-01-04': { 0.2: 5, '1.0': 5, 1.1: 10, '2.0': 5 },
      },
    };
    delete global.window.location;
    global.window.location = new URL(
      'http://localhost:3000/project/climoji?versions=0.1&versions=1.1&versions=2.*'
    );
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );

    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2020-01-01', 0.1: 10, 1.1: 0, '2.*': 0, sum: 10, total: 15 },
      { date: '2020-01-02', 0.1: 5, 1.1: 5, '2.*': 0, sum: 10, total: 30 },
      { date: '2020-01-04', 0.1: 0, 1.1: 10, '2.*': 5, sum: 15, total: 25 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '0.1',
      '1.1',
      '2.*',
    ]);
  });

  it('takes the display style monthly from url', () => {
    const data = {
      versions: ['0.1', '0.2', '0.3'],
      downloads: {
        '2020-01-01': { 0.1: 5 },
        '2020-01-04': { 0.1: 5 },
        '2020-02-01': { 0.1: 10, 0.2: 5 },
        '2020-02-02': { 0.1: 5, 0.2: 5, 0.3: 5 },
      },
    };
    delete global.window.location;
    global.window.location = new URL(
      'http://localhost:3000/project/climoji?display=monthly&versions=0.1&versions=0.2'
    );
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );

    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2020-01-01', 0.1: 10, 0.2: 0, sum: 10, total: 10 },
      { date: '2020-02-01', 0.1: 15, 0.2: 10, sum: 25, total: 30 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsComponent').state().displayStyle).toEqual(
      'monthly'
    );
  });
  it('takes the display style monthly from url and keeps order', () => {
    const data = {
      versions: ['0.1', '0.2', '0.3'],
      downloads: {
        '2022-11-01': { 0.1: 5 },
        '2022-12-01': { 0.1: 5 },
        '2023-01-01': { 0.1: 10, 0.2: 5 },
      },
    };
    delete global.window.location;
    global.window.location = new URL(
      'http://localhost:3000/project/climoji?display=monthly&versions=0.1&versions=0.2'
    );
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );

    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2022-11-01', 0.1: 5, 0.2: 0, sum: 5, total: 5 },
      { date: '2022-12-01', 0.1: 5, 0.2: 0, sum: 5, total: 5 },
      { date: '2023-01-01', 0.1: 10, 0.2: 5, sum: 15, total: 15 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsComponent').state().displayStyle).toEqual(
      'monthly'
    );
  });
  it('takes the display style weekly from url', () => {
    const data = {
      versions: ['0.1', '0.2', '0.3'],
      downloads: {
        '2023-01-01': { 0.1: 5 },
        '2023-01-04': { 0.1: 5 },
        '2023-01-10': { 0.1: 10, 0.2: 5 },
        '2023-02-01': { 0.1: 10, 0.2: 5, 0.3: 5 },
      },
    };
    delete global.window.location;
    global.window.location = new URL(
      'http://localhost:3000/project/climoji?display=weekly&versions=0.1&versions=0.2'
    );
    const wrapper = mount(
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <DownloadsComponent data={data} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    );

    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2023-01-01', 0.1: 10, 0.2: 0, sum: 10, total: 10 },
      { date: '2023-01-10', 0.1: 10, 0.2: 5, sum: 15, total: 15 },
      { date: '2023-02-01', 0.1: 10, 0.2: 5, sum: 15, total: 20 },
    ];
    console.log(wrapper.find('DownloadsTable').props().data);
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsComponent').state().displayStyle).toEqual(
      'weekly'
    );
  });
});
