// __tests__/fetch.test.js
import React from 'react';
import DownloadsComponent from './DownloadsComponent';
import { mount } from 'enzyme';
import DownloadsTable from './DownloadsTable';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<DownloadsComponent />', () => {
  it('renders component with the last 3 versions', () => {
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
        <DownloadsComponent data={data} />
      </Router>
    );
    expect(wrapper.find('DownloadsTable')).toHaveLength(1);
    const expectedData = [
      { date: '2020-01-01', '2.0': 5, '3.0': 0, '4.0': 0, sum: 5, total: 15 },
      { date: '2020-01-02', '2.0': 10, '3.0': 5, '4.0': 0, sum: 15, total: 20 },
      { date: '2020-01-04', '2.0': 5, '3.0': 10, '4.0': 5, sum: 20, total: 20 },
    ];
    expect(wrapper.find('DownloadsTable').props().data).toEqual(expectedData);
    expect(wrapper.find('DownloadsTable').props().selectedVersions).toEqual([
      '2.0',
      '3.0',
      '4.0',
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
        <DownloadsComponent data={data} />
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
        <DownloadsComponent data={data} />
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
});
