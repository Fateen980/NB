import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const PageLayout = dynamic(() => import('layouts/PageLayout'));

export default function Home() {
  const [phone, setPhone] = useState('');

  function findByPhone() {
    console.log(phone);
  }

  return (
    <>
      <PageLayout>
        <FieldWrapper>
          <TextField
            name="phone"
            id="phone"
            type="text"
            placeholder="Search By Phone Number"
            onChange={(e) => {
              setPhone(e.currentTarget.value);
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Button
            onClick={findByPhone}
            type="submit"
            name="save"
            style={{ width: '100%', height: '44px' }}
          >
            Search
          </Button>
        </FieldWrapper>
      </PageLayout>
    </>
  );
}
