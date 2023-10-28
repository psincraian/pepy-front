import React from "react";
import { Card, CardContent, Grid, CardHeader } from "@mui/material";
import CodeBlock from "@/app/projects/[project]/components/code_block";
import Image from "next/image";

interface BadgesComponentProps {
  project: string;
}

const PEPY_BADGES_URL = "https://static.pepy.tech/badge/";

const BadgesComponent: React.FC<BadgesComponentProps> = ({ project }) => {
  const renderImageAndCode = (path: string, altText: string) => (
    <>
      <Grid item xs={6}>
        <Image height={20} width={200} unoptimized={true} alt={altText}
               style={{ width: "auto", height: "100%" }}
               src={PEPY_BADGES_URL + project + path} />
      </Grid>
      <Grid item xs={6}>
        <CodeBlock
          content={`[![Downloads](${PEPY_BADGES_URL}${project}${path})](https://pepy.tech/project/${project})`}
        />
      </Grid>
    </>
  );

  return (
    <Card data-cy="badges">
      <CardHeader title="Badges" />
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          {renderImageAndCode("", "Total downloads for the project")}
          {renderImageAndCode(
            "/month",
            "Last 30 days downloads for the project"
          )}
          {renderImageAndCode("/week", "Last 7 days downloads for the project")}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BadgesComponent;
