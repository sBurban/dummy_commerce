import React from 'react'
import { styled } from '@mui/material/styles';

const StyledImg = styled('img')( ({ style }) => ({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  ...style,
}) );

export default StyledImg;