import { Fragment, JSX } from "react";

export default function getFormattedErrors(errors: string[] | undefined): JSX.Element {
  if (!errors || errors.length === 0) {
    return <></>;
  }

  return (
    <ul>
      {errors?.map((error, i) => (
        <li key={i}>
          {error}
          {errors && i < errors.length - 1 && <br />}
        </li>
      ))}
    </ul>
  );
}