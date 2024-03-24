"use client";
import { notFound } from "next/navigation";
import { Button } from "@mui/material";
import { useState } from "react";
import { User } from "@/app/user/helper/auth";
import { useEffect } from "react";
import LoggedUsersTooltip from "@/app/components/logged_users_tooltip";
import { useUser } from "@/app/user/UserContext";


async function subscribe(project: string): Promise<string> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/subscriptions`, {
    method: "POST",
    body: JSON.stringify({
      "project": project
    }),
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!,
      "Content-Type": "application/json"
    }
  });
  if (res.status !== 200) {
    return "error";
  }

  return "success";
}

async function unsubscribe(project: string): Promise<string> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/subscriptions/` + project, {
    method: "DELETE",
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    }
  });
  if (res.status !== 200) {
    return "error";
  }

  return "success";
}

async function isSubscribed(project: string): Promise<boolean> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/subscriptions/`, {
    method: "GET",
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    }
  });
  if (res.status !== 200) {
    return false;
  }

  const response = await res.json();
  for (const subscription of response) {
    if (subscription.project === project) {
      return true;
    }
  }
  return false;
}

export function SubscribeButton(props: { project: string }) {
  const [subscribeStatus, setSubscribeStatus] = useState("none");
  const { user, error } = useUser();

  useEffect(() => {
    if (user === null) {
      return;
    }
    isSubscribed(props.project).then((isSubscribed) => {
      if (isSubscribed) {
        setSubscribeStatus("subscribed");
      } else {
        setSubscribeStatus("unsubscribed");
      }
    });
  }, [user]);

  if (subscribeStatus === "subscribing") {
    subscribe(props.project).then((status) => {
      if (status === "success") {
        setSubscribeStatus("subscribed");
      } else {
        setSubscribeStatus("error-subscribe");
      }
    });
  }

  if (subscribeStatus === "unsubscribing") {
    unsubscribe(props.project).then((status) => {
      if (status === "success") {
        setSubscribeStatus("unsubscribed");
      } else {
        setSubscribeStatus("error-unsubscribe");
      }
    });
  }

  const disabled = user === null || subscribeStatus === "subscribing" || subscribeStatus === "unsubscribing";
  let buttonText = "";
  if (subscribeStatus === "subscribed" || subscribeStatus === "error-unsubscribe" || subscribeStatus === "unsubscribing") {
    buttonText = "Unsubscribe";
  } else if (subscribeStatus === "none" || subscribeStatus == "unsubscribed" || subscribeStatus === "subscribing" || subscribeStatus == "error-subscribe") {
    buttonText = "Subscribe";
  }

  const nextStatus = subscribeStatus === "subscribed" ? "unsubscribing" : "subscribing";

  return (
    <LoggedUsersTooltip display={disabled} proOnly={false}>
      <span style={{width: "100%"}}>
        <Button
          fullWidth
          variant="contained"
          disabled={disabled}
          className="btn btn-primary"
          onClick={() => setSubscribeStatus(nextStatus)}
        >
          {buttonText}
        </Button>
      </span>
    </LoggedUsersTooltip>
  );
}