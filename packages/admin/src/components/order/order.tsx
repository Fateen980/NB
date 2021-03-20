import React, { useContext , useState} from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from 'graphql/mutation/order';
import { FieldWrapper, Heading } from './order-style';
//import   MySelect  from 'components/select/select';

import   DDatePicker  from 'components/date/DatePicker';
// Shape of form values
interface FormValues {
  phone?: string;
  name?: string;
  price?:number;
  total?:number;
  deliveryAmount?:number;
  quantity?:number;
  date?:Date;
  deliveryDate?:Date;
  info?: string;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      phone:  props.item.phone          ||  '',
      name:   props.item.name           ||  '',
      price:  props.item.price          ||  '',
      total:  props.item.total          ||  '',
      deliveryAmount:props.item.deliveryAmount  || '',
      quantity:props.item.quantity    ||  '',
      date:props.item.date            || new Date(),
      deliveryDate:props.item.date    || new Date(),
      info:  props.item.info          ||  '',
    };
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string().required('Phone is required').length(10,'Must be 10 digits'),
    name: Yup.string().required('Name is required').min(3,'Name Must be greater than 3'),
    price: Yup.string().required('Price is required!'),
    total: Yup.string().required('Total is required!'),
    deliveryAmount:Yup.string().required('Delivery Amount is required!'),
    quantity:Yup.string().required('Quantity Amount is required!'),
    date:Yup.string().required('Date is required!'),
    deliveryDate:Yup.string().required('Delivery Date is required!'),
    info: Yup.string().required('Address is required').min(3,'Address Must be greater than 3'),
  }),
  handleSubmit: (values) => {
    console.log(values, 'values');

    // do submitting things
  },
});

const AddOrder = (props: FormikProps<FormValues> & MyFormProps) => {
  
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    dirty,
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleReset,
    isSubmitting,
  } = props;

  const [message , setMessage] = useState('');
 
  const [addOrder, {error,data}] = useMutation(ADD_ORDER);

  const handleSubmit =  async () => {
    
  if (isValid) {

   

      const orderData = await addOrder({
        variables: {        
                      customer_id:values.phone,
                      product_id:"1",
                      price:parseFloat(values.price),
                      deliveryAmount:parseFloat(values.deliveryAmount),
                      quantity:parseFloat(values.quantity),
                      total:parseFloat(values.total),
                      date: values.deliveryDate.toISOString(),
                      deliveryDate: values.deliveryDate.toISOString(),
                      customer:[values.name,values.phone,values.info]
        }             
      });
          setMessage('Saved Successfully');
    }
  };
  return (

    <Form>

      <h1>{ message }</h1>

      <FieldWrapper>
       <div>Delivery Date</div>
         <DDatePicker 
              selected={values.deliveryDate}
              className="form-control"
              name="startDate"
              onChange={date => setFieldValue('deliveryDate', date)}
              />
       </FieldWrapper>

      <FieldWrapper>
       <TextField
          name="phone"
          id="phone"
          type="text"
          placeholder="Enter Phone"
          error={touched.phone && errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

      </FieldWrapper>

      <FieldWrapper>
       <TextField
          name="name"
          id="name"
          type="text"
          placeholder="Enter name"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

      </FieldWrapper>


      <FieldWrapper>
        <TextField
          name="quantity"
          id="quantity"
          type="text"
          placeholder="Enter Quantity"
          error={touched.quantity && errors.quantity}
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>




      <FieldWrapper>
        <TextField
          name="price"
          id="price"
          type="text"
          placeholder="Enter Price"
          error={touched.price && errors.price}
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>


      <FieldWrapper>
       <TextField
          name="deliveryAmount"
          id="deliveryAmount"
          type="text"
          placeholder="Enter deliveryAmount"
          error={touched.deliveryAmount && errors.deliveryAmount}
          value={values.deliveryAmount}
          onChange={handleChange}
          onBlur={handleBlur}
        />

      </FieldWrapper>





      <FieldWrapper>
       <TextField
          name="total"
          id="total"
          type="text"
          placeholder="Enter Total"
          error={touched.total && errors.total}
          value={values.total}
          onChange={handleChange}
          onBlur={handleBlur}
        />

      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="info"
          as="textarea"
          placeholder="Enter Address"
          error={touched.info && errors.info}
          value={values.info}
          onChange={handleChange}
          onBlur={handleBlur}
        />
    </FieldWrapper>


    <FieldWrapper>
      <Button
        onClick={handleSubmit}
        type="submit"
        name="save"
        style={{ width: '100%', height: '44px' }}
        disabled={!isValid}
      >
        Save
      </Button>

      </FieldWrapper>
      <FieldWrapper>
      <Button  type='submit'  onClick={handleReset}>
          Reset My Password
      </Button>
      </FieldWrapper>
    </Form>
  );
};

export default FormEnhancer(AddOrder);
