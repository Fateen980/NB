import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';


type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const { pathname, query } = useRouter();

  const isSticky =
    useAppState('isSticky') ||
    pathname === '/furniture-two' ||
    pathname === '/grocery-two';

  const isHomePage = isCategoryPage(query.type) || pathname === '/bakery';
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <Header
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          }`}
        />
      </Sticky>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
