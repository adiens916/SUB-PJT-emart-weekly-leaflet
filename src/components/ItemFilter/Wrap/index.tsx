import React from 'react';
import { Chip, Paper } from '@mui/material';
import { NoWrapType } from '../NoWrap';

export default function Wrap(props: WrapType) {
  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          position: 'absolute',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {props.labels.map((label, index) => (
          <Chip
            label={label}
            onClick={(e) => {
              props.handleChange(e, index);
              props.setIsOpen((isOpen) => !isOpen);
            }}
            style={{ margin: 2, marginBottom: 5 }}
            variant={index === props.value ? 'filled' : 'outlined'}
            color={index === props.value ? 'primary' : 'default'}
            key={index}
          />
        ))}
      </Paper>
    </>
  );
}

interface WrapType extends NoWrapType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
