"use client";

import { DisplayStyle } from "@/app/projects/[project]/model";
import styles from "./display_style_toggle.module.css";
import LoggedUsersTooltip from "@/components/logged_users_tooltip";
import { useUser } from "@/app/user/UserContext";

export interface Display_style_toggle {
  selected: DisplayStyle;
  handleChange: (value: DisplayStyle) => void;
}

export const DisplayStyleToggle = ({
  selected,
  handleChange,
}: Display_style_toggle) => {
  const {user, error} = useUser();


  const disabled = user === null;
  const buttonStyles = disabled
    ? styles.button + " " + styles.disabled
    : styles.button;
  const buttonSelectedStyles = disabled
    ? styles.selected + " " + styles.button + " " + styles.disabled
    : styles.selected + " " + styles.button;

  return (
    <div className={styles.toggleGroup}>
      <button
        className={
          selected === DisplayStyle.DAILY
            ? buttonSelectedStyles + " " + styles.first
            : styles.button + " " + styles.first
        }
        onClick={() => handleChange(DisplayStyle.DAILY)}
      >
        Daily
      </button>
      <button
        disabled={disabled}
        className={
          selected === DisplayStyle.WEEKLY
            ? buttonSelectedStyles + " " + styles.second
            : buttonStyles + " " + styles.second
        }
        onClick={() => handleChange(DisplayStyle.WEEKLY)}
      >
        <LoggedUsersTooltip proOnly={false} display={disabled}>
          <span>Weekly</span>
        </LoggedUsersTooltip>
      </button>
      <button
        disabled={disabled}
        className={
          selected === DisplayStyle.MONTHLY
            ? buttonSelectedStyles + " " + styles.third
            : buttonStyles + " " + styles.third
        }
        onClick={() => handleChange(DisplayStyle.MONTHLY)}
      >
        <LoggedUsersTooltip proOnly={false} display={disabled}>
          <span>Monthly</span>
        </LoggedUsersTooltip>
      </button>
    </div>
  );
};
