import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@mui/lab";
import { CardContent } from "@mui/material";

async function deleteSubscription(project: string) {
  console.log("Start fetching subscriptions");
  const response = await fetch("/api/v3/subscriptions/" + project, {
    method: "DELETE",
    headers: {}
  });

  return response.status === 200 ? "success" : "error";
}

interface SubscriptionCardProps {
  project: string
}

export const SubscriptionCard = ({ project }: SubscriptionCardProps) => {
  const router = useRouter();
  const [deleteStatus, setDeleteStatus] = useState("none");

  if (deleteStatus === "in-progress") {
    deleteSubscription(project).then((status) => {
      if (status === "success") {
        router.refresh()
      } else {
        setDeleteStatus("error");
      }
    });
  }

  return (
    <Card variant="outlined">
      <CardHeader title={project} />
      <CardContent>
        {deleteStatus === "error" && <Alert severity="error">Error deleting the subscription</Alert>}
        {deleteStatus === "in-progress" && <Alert severity="info">Deleting...</Alert>}
      </CardContent>
      <CardActions>
        <Button onClick={() => router.push("/project/" + project.toLowerCase())}>View project</Button>
        <Button onClick={() => setDeleteStatus("in-progress")}>Delete</Button>
      </CardActions>
    </Card>
  );
}