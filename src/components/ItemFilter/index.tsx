import React from 'react';
import { Tab, Tabs } from '@mui/material';

export default function ItemFilter(props: ItemFilterType) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setCategoryId(newValue);
    console.log('ref before', props.categoryRef.current);
    props.categoryRef.current = newValue;
    console.log('ref after', props.categoryRef.current);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="전체" />
        <Tab label="인기 상품" />
        <Tab label="오직 이마트에서만!" />
        <Tab label="벌써 가을" />
        <Tab label="바람 부는 날엔" />
        <Tab label="건강하게" />
        <Tab label="재미있게" />
      </Tabs>
    </>
  );
}

interface ItemFilterType {
  setCategoryId: (id: number) => void;
  categoryRef: React.MutableRefObject<number>;
}
