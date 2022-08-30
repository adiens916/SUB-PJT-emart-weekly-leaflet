import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import NoWrap from './NoWrap';
import Wrap from './Wrap';

const labels = [
  '전체',
  '인기 상품',
  '오직 이마트에서만!',
  '벌써 가을',
  '바람 부는 날엔',
  '건강하게',
  '재미있게',
];

export default function ItemFilter(props: ItemFilterType) {
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setCategoryId(newValue);
    console.log('ref before', props.categoryRef.current);
    props.categoryRef.current = newValue;
    console.log('ref after', props.categoryRef.current);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {!isOpen ? (
          <NoWrap
            labels={labels}
            value={value}
            setValue={setValue}
            handleChange={handleChange}
          />
        ) : (
          <Typography> 전체메뉴</Typography>
        )}
        <IconButton
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          {!isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
        </IconButton>
      </Stack>
      {isOpen && (
        <Wrap
          labels={labels}
          value={value}
          setValue={setValue}
          handleChange={handleChange}
          setIsOpen={setIsOpen}
        />
      )}
    </Box>
  );
}

interface ItemFilterType {
  setCategoryId: (id: number) => void;
  categoryRef: React.MutableRefObject<number>;
}
