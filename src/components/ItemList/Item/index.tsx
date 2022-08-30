import { Grid, Chip, Stack } from '@mui/material';
import { ItemType } from '../../../types';

export default function Item({ item }: { item: ItemType }) {
  return (
    <article>
      {item && (
        <Grid container marginBottom={5}>
          <Grid
            item
            xs={5}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <img
              src={item.itemImage}
              alt={item.itemName}
              style={{
                width: '100%',
                maxWidth: '200px',
                objectFit: 'fill',
              }}
            ></img>
          </Grid>

          <Grid item xs={7}>
            {/* 가격 */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
            >
              <del style={{ color: 'grey', marginRight: 5 }}>
                {item.priceOriginal}
              </del>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginLeft: 0,
                }}
              >
                {item.priceFinal}
              </p>
            </Stack>

            {/* 상품 이름 */}
            <p
              style={{
                fontSize: '1rem',
                wordBreak: 'keep-all',
                margin: '5px 0px 5px 0px',
              }}
            >
              {item.itemName}
            </p>

            {/* 배지 */}
            <div>
              {item.badges.map((badge, index) => (
                <Chip
                  label={badge.text}
                  variant="outlined"
                  style={{ color: badge.color, borderRadius: 5, margin: 3 }}
                  key={index}
                />
              ))}
            </div>

            {/* 좋아요 & 리뷰 */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              marginTop={1}
            >
              {item.favoriteCount && (
                <>
                  <img src="./icons/notLiked.png" width="20rem" />
                  <p style={{ marginRight: '2rem' }}>{item.favoriteCount}</p>
                </>
              )}
              {item.reviewCount && (
                <>
                  <img src="./icons/review.png" width="20rem" />
                  <p>{item.reviewCount}</p>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </article>
  );
}
