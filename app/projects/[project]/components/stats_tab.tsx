"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DownloadsComponent from "@/app/projects/[project]/components/downloads_component";
import { Project } from "@/app/projects/[project]/model";
import CountryDownloads from "@/app/projects/[project]/components/country_downloads";
import { useDimensions } from "@/app/components/useDimension";
import { useRef } from "react";
import { useUser } from "@/app/user/UserContext";

interface StatsTabProps {
  project: Project
}

export default function StatsTab(props: StatsTabProps) {
  const {user, error} = useUser();
  const [value, setValue] = React.useState('1');


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const countryDownloadsComponent = <CountryDownloads project={props.project.name}/>;
  const countryDownloads =  user?.isPro ? countryDownloadsComponent : 'You must bre a Pro to access this feature';

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Downloads by version" value="1" />
            <Tab label="Downloads by country" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DownloadsComponent
            project={props.project.name}
            versions={props.project.versions}
            data={props.project.downloads}
          /></TabPanel>
        <TabPanel value="2">
          {countryDownloads}
        </TabPanel>
      </TabContext>
    </Box>
  );
}