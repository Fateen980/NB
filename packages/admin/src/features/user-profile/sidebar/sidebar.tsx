import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from 'contexts/auth/auth.context';
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from './sidebar.style';

import {
  PROFILE_SIDEBAR_TOP_MENU,
  PROFILE_SIDEBAR_BOTTOM_MENU,
} from 'site-settings/site-navigation';

import  NavLink           from 'components/nav-link/nav-link'
import {Heading }         from 'components/customer/customer-style';
const SidebarCategory: React.FC<{}> = () => {
  const { authDispatch } = useContext<any>(AuthContext);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop>
        <Heading>
         <NavLink router="customer" href="/grocery"  label="Add new Customer" />
         <NavLink router="customer" href="/customer" label="View Customers" />
         <NavLink router="customer" href="/orders"   label="add New Order" />
         <NavLink router="customer" href="/order"    label="View Orders" />
         </Heading>
        </SidebarTop>

        <SidebarBottom>

          <LogoutButton type="button" onClick={handleLogout}>
           
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
