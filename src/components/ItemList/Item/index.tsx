import { Grid, Chip, Stack } from '@mui/material';
import { ItemType } from '../../../types';

export default function Item({ item }: { item: ItemType }) {
  return (
    <article>
      {item && (
        <Grid container>
          <Grid item xs={5} alignContent="center">
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

          <Grid item xs>
            {/* 가격 */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <del style={{ color: 'grey' }}>{item.priceOriginal}</del>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                {item.priceFinal}
              </p>
            </Stack>

            {/* 상품 이름 */}
            <p style={{ fontSize: '1.25rem' }}>{item.itemName}</p>

            {/* 배지 */}
            <div>
              {item.badges.map((badge, index) => (
                <Chip
                  label={badge.text}
                  variant="outlined"
                  style={{ color: badge.color }}
                  key={index}
                />
              ))}
            </div>

            {/* 좋아요 & 리뷰 */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              marginTop={3}
            >
              <img src="./icons/notLiked.png" />
              <p>{item.favoriteCount}</p>
              <img src="./icons/review.png" />
              <p>{item.reviewCount}</p>
            </Stack>
          </Grid>
        </Grid>
      )}
    </article>
  );
}
