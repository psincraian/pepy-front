import styles from "./tooltip.module.css";


interface TooltipProps {
  x: number,
  y: number,
  text: string,
  showTooltip: boolean
}

export const Tooltip = ({ x, y, showTooltip, text }: TooltipProps) => {
  return (
    <div className="tooltip-container">
      {showTooltip && (
        <div className={styles.tooltip} style={{ left: x, top: y }}>
          {text}
        </div>
      )}
    </div>
  );
};