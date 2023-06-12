import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface RatingStarsProps {
    value: number
}
export const RatingStars = ({value}:RatingStarsProps) => {
    const ratingElem = value === 0?
    <>
        <Rating name="no-value" value={null} />
        <Typography component="legend">No rating given</Typography>
    </>
    :
    <>
        <Rating name="read-only" value={value} readOnly />
        <Typography component="legend">{value}/5.0</Typography>
    </>

  return (
    <Box className='rating_stars'
        sx={{
            // '& > legend': { mt: 2 },
            '& > legend': { ms: 2 },
            display: 'flex',
            alignItems: 'center',
        }}
    >
        {ratingElem}
    </Box>
  )
}
