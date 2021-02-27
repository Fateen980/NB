import React, { useContext } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
import { useMutation } from '@apollo/client';
import { ADD_CUSTOMER } from 'graphql/mutation/customer';
import { FieldWrapper, Heading } from './customer-style';
//import   MySelect  from 'components/select/select';

// Shape of form values
interface FormValues {
  id?: number | null;
  name?: string;
  phone?: string;
  info?: string;
  city?: string;
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
      id:    props.item.id     || null,
      name:  props.item.name   || '',
      phone: props.item.phone  || '',
      info:  props.item.phone  || '',
      city:  props.item.city   || 1,
    };
  },
  validationSchema: Yup.object().shape({
    name:  Yup.string().required('Title is required!'),
    phone: Yup.string().required('Phone is required').length(10,'Must be 10 digits'),
    info:  Yup.string().required('Address is required'),
    city:  Yup.string().required('City is required!'),
  }),
  handleSubmit: (values) => {
    console.log(values, 'values');

    // do submitting things
  },
});

const AddCustomer = (props: FormikProps<FormValues> & MyFormProps) => {
  
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

 

  const customerValue = {

    id:values.id,
    name: values.name,
    type: 1,
    phone: values.phone,
    city:  values.city,
    status:1,
    address:values.info
  };
  //const { state, dispatch } = useContext(ProfileContext);

  const [addCustomer, {error,data}] = useMutation(ADD_CUSTOMER);

  const handleSubmit =  async () => {
   
    

    if (isValid) {
      const customerData = await addCustomer({
        variables: { 
                                        name:values.name,
                                        phone:values.phone,
                                        city:parseFloat(values.city),
                                        status:1,
                                        type:1,
                                        address:values.info
                                        ,
                  }          
      });
                console.log(customerData, 'Customer data');
    }
  };
  return (

    <Form>
      <h1>Add new customer</h1>

      <select
        name="city"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'block' , width:'180px',margin:"10px",padding:"5px" }}
      >
        <option value="1" label="Amman" />
        <option value="2" label="Irbid" />
        <option value="3" label="Al-Zarqa" />
      </select>


      <FieldWrapper>
        <TextField
          name="name"
          id="name"
          type="text"
          placeholder="Enter Name"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
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
      {/* <CheckBox id="1" labelText="isActive" key="1" /> */}
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
      >
      </Button>
      </FieldWrapper>
    </Form>
  );
};

export default FormEnhancer(AddCustomer);
