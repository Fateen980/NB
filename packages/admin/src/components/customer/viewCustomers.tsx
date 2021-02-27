import React                 from 'react';
import { useQuery }          from '@apollo/client';
import  ReactTable           from 'components/table/table'
import { ALL_CUSTOMER }      from '../../graphql/query/customer.query'


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: () => <a href="#">Edit</a>
    },
  ];
  
  

  type TableProps = {
    columns: any;
    data: any;
    props?: any;
  };
  
  
export const ViewCustomer:React.FC = () =>  
{
    const tableData = [];
    const { data, error, loading } = useQuery(ALL_CUSTOMER);

    if(typeof data !== undefined){

    for (const customer in data){
       for (const cust in data[customer]){
                
                const {_id, name , phone , city , address } = data[customer][cust];
                let newObject = { }
                newObject = { name,phone,city,address,key:_id }
                tableData.push(newObject);

            }


        }
    }

    return (
    <ReactTable columns={columns} data={tableData} />
    )
};

