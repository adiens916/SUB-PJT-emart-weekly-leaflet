import React from 'react';
import { Tab, Tabs } from '@mui/material';

export default function NoWrap(props: NoWrapType) {
  return (
    <Tabs
      value={props.value}
      onChange={props.handleChange}
      variant="scrollable"
      scrollButtons={false}
      aria-label="scrollable prevent tabs example"
    >
      {props.labels.map((label, index) => (
        <Tab label={label} key={index} />
      ))}
    </Tabs>
  );
}

export interface NoWrapType {
  labels: string[];
  value: number;
  setValue: (value: number) => void;
  handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: number,
  ) => void;
}
