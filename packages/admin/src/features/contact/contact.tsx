import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import CreateOrUpdateContact from 'components/contact-card/contact-card';
import { useMutation } from '@apollo/client';
// import { DELETE_CONTACT } from 'graphql/mutation/contact';
import { CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
interface Props {
  increment?: boolean;
  flexStart?: boolean;
  icon?: boolean;
  buttonProps?: any;
}

const Contact = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
}: Props) => {
  // const [deleteContactMutation] = useMutation(DELETE_CONTACT);

  // const {
  //   state: { contact },
  //   dispatch,
  // } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    // dispatch({ type: 'DELETE_CONTACT', payload: item.id });
    // return await deleteContactMutation({
    //   variables: { contactId: JSON.stringify(item.id) },
    // });
  };
  return (
    <>
      <CardHeader increment={increment}>
      Select Your Contact Number
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={['fateen',1]}
          component={(item: any) => (
            <RadioCard
              id={item.id}
              key={item.id}
              title={item.type}
              content={item.number}
              checked={item.type === 'primary'}
              name='contact'
              onEdit={() => handleModal(CreateOrUpdateContact, item)}
              onDelete={() => handleOnDelete(item)}
              onChange={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            <Button
              {...buttonProps}
              onClick={() =>
                handleModal(CreateOrUpdateContact, 'add-contact-modal')
              }
            >
              {icon && (
                <Box mr={2}>
                  <Plus width='10px' />
                </Box>
              )}
             Add Contact
            </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default Contact;
