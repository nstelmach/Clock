import classes from "./SettingsItem.module.css";

function SettingsItem(props) {
  return (
    <div className={classes.lengthControl}>
      <div id={props.idLabel}>{props.label}</div>
      <div>
        <button
          onClick={props.onClickDecrement}
          className={classes.btnLevel}
          id={props.idButton1}
        >
          <i className="fa-solid fa-arrow-down fa-2x"></i>
        </button>
        <div
          className={`${classes.btnLevel} ${classes.number}`}
          id={props.idLength}
        >
          {props.length}
        </div>
        <button
          onClick={props.onClickIncrement}
          className={classes.btnLevel}
          id={props.idButton2}
        >
          <i className="fa-solid fa-arrow-up fa-2x"></i>
        </button>
      </div>
    </div>
  );
}

export default SettingsItem;
