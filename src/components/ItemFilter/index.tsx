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
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.changeCategory(newValue);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {!isOpen ? (
          <NoWrap
            labels={labels}
            value={props.categoryId}
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
          value={props.categoryId}
          handleChange={handleChange}
          setIsOpen={setIsOpen}
        />
      )}
    </Box>
  );
}

interface ItemFilterType {
  categoryId: number;
  changeCategory: (newCategoryId: number) => void;
}
