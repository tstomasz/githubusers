import * as React from "react";

export interface NoResultsFoundProps {
  message: string;
}

const NoResultsFound = ({ message }: NoResultsFoundProps) => {
  return <div>{message}</div>;
};

export default NoResultsFound;
