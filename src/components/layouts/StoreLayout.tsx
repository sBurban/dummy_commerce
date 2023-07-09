import React, { useState } from 'react';
import NavBar from '../menus/NavBar';
import Router from 'next/router';
import { ROUTE_PRODUCTS } from '@/lib/common/Constants';

export const StoreLayout = ({children}:any) => {

  const handleSearchInput = (searchText:string) => {
    console.log(searchText);
    Router.push(ROUTE_PRODUCTS);
  }

  return (<>
    <NavBar onSearchSubmit={handleSearchInput} />
    {children}
    {/* {React.cloneElement(children, { existingSession })} */}
  </>)
}
