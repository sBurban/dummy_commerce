import React, { useState } from 'react';
import { NavBar } from '../menus/NavBar';
import Router from 'next/router';

export const StoreLayout = ({children}:any) => {

  const handleSearchInput = (searchText:string) => {
    console.log(searchText);
    Router.push('/products');
  }

  return (<>
    <NavBar onSearchSubmit={handleSearchInput} />
    {children}
    {/* {React.cloneElement(children, { existingSession })} */}
  </>)
}
