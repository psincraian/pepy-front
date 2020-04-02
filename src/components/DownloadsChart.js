import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

class DownloadsChart extends Component {

    state = {
        selectedVersions: ["2.20.1", "2.20.0", "2.19.1"],
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedVersions: this.defaultSelectedVersions(),
        };
    }

    retrieveDownloads(downloads, selectedVersions) {
        var data = []
        Object.keys(downloads).forEach(date => {
            var row = { "name": date }
            selectedVersions.forEach(version => {
                if (version in downloads[date]) {
                    row[version] = downloads[date][version];
                }
            });
            data.push(row);
        });
        return data;
    }

    updateSelectedVersions = (event, value, reason) => {
        this.setState({selectedVersions: value})
    }

    defaultSelectedVersions() {
        const versionsSize = this.props.data.versions.length;
        return this.props.data.versions.slice(versionsSize - 5, versionsSize);
    }

    render() {
        const data = this.retrieveDownloads(this.props.data.downloads, this.state.selectedVersions);
        var colors = [
            "#a8e6cf",
            "#639a67",
            "#4d4c7d",
            "#00bdaa"
        ]

        const lines = this.state.selectedVersions.map(version => {
            return <Line key={version} type="monotone" dataKey={version} stroke={colors.pop()} activeDot={{ r: 8 }} />
        })

        return (
            <>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={this.props.data.versions}
                    getOptionLabel={(option) => option}
                    defaultValue={this.state.selectedVersions}
                    filterSelectedOptions
                    onChange={this.updateSelectedVersions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Select versions"
                            placeholder="Versions"
                        />
                    )}
                />
                <ResponsiveContainer width="100%" aspect={2} minHeight={300}>
                    <LineChart
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {lines}
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}

export default DownloadsChart;