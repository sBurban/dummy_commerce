import React from 'react'
import { styled } from '@mui/material/styles';

// const StyledImg = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
// });

const StyledImg = styled('img')( ({ style }) => ({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  ...style,
}) );

// const asdf = styled('img')( ({ width, height }) => ({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
//   width: width || 'auto',
//   height: height || 'auto',
// }) );

export default StyledImg;