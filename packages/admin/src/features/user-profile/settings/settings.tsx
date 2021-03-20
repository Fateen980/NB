import React, { useContext } from 'react';
import { useMutation , useQuery } from '@apollo/client';
import { ProfileContext } from 'contexts/profile/profile.context';

import { GET_ORDER_DETAILS } from 'graphql/query/order.query';
import { FIND_CUSTOMER_BY_PHONE } from 'graphql/query/customer.query';

import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Col,
  Row,
} from './settings.style';

import { Button } from 'components/button/button';
import { Input }  from 'components/forms/input';


import { Label } from 'components/forms/label';
import Contact from 'features/contact/contact';
import Address from 'features/address/address';
import Payment from 'features/payment/payment';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  },
  slug?:any
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType , slug }) => {
  // const { state, dispatch } = useContext(ProfileContext);
  // const [updateMeMutation] = useMutation(UPDATE_ME);
  
  const { data , error } =  useQuery(GET_ORDER_DETAILS , {
    variables:{ slug:slug }
  });

  console.log(data);


    // const customer  = useQuery(FIND_CUSTOMER_BY_PHONE,{
    //   variables:{ phone:data.getOrderDetails.customer_id },skip: !data.getOrderDetails.customer_id 
    // })
    // console.log(customer)



  // console.log(customer.data.findCustomer.name);
 
  // console.log(customer);

  const handleChange = (e) => {
    // const { value, name } = e.target;
    // dispatch({
    //   type: 'HANDLE_ON_INPUT_CHANGE',
    //   payload: { value, field: name },
    // });
  };

  const handleSave = async () => {
    // const { name, email } = state;
    // await updateMeMutation({
    //   variables: { meInput: JSON.stringify({ name, email }) },
    // });
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
             # { data && data.getOrderDetails._id 
              ?  data.getOrderDetails._id : null}
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Customer Name
            </Label>
            <Input
              type="text"
              label="Name"
              name="name"
              value={ data && data.getOrderDetails.customer[0]
                ?  data.getOrderDetails.customer[0] : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
              height="48px"
              // intlInputLabelId="profileNameField"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Phone Number
            </Label>
            <Input
              type="phone"
              name="phone"
              label="Phone Number"
              value={ data && data.getOrderDetails.customer[1]
                ?  data.getOrderDetails.customer[1] : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>


          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Quantity
            </Label>
            <Input
              type="quantity"
              name="quantity"
              label="Quantity"
              value={ data && data.getOrderDetails.quantity
                ?  data.getOrderDetails.quantity : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Price
            </Label>
            <Input
              type="price"
              name="price"
              label="Price"
              value={ data && data.getOrderDetails.price
                ?  data.getOrderDetails.price : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Delivery Amount
            </Label>
            <Input
              type="deliveryAmount"
              name="deliveryAmount"
              label="deliveryAmount"
              value={ data && data.getOrderDetails.deliveryAmount
                ?  data.getOrderDetails.deliveryAmount : 0}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Total Amount
            </Label>
            <Input
              type="total"
              name="total"
              label="total"
              value={ data && data.getOrderDetails.total
                ?  data.getOrderDetails.total : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>


          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              Address
            </Label>
            <Input
              type="address"
              name="address"
              label="address"
              value={ data && data.getOrderDetails.customer[2]
                ?  data.getOrderDetails.customer[2] : ''}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>

          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size="big" style={{ width: '100%' }} onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
             
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              {/* <Address /> */}
            </SettingsFormContent>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
             
            </SettingsFormContent>
          </Col>
        </Row>
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
