import React from 'react';
import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import { PostPurchase } from '@/components/pageComponentsCheckout/PostPurchase';

export default function PostPurchasePage() {
  return (
    <>
      <CenteredWrapper>
        <PostPurchase />
      </CenteredWrapper>
    </>
  );
}
