import React                 from 'react';
import { useQuery }          from '@apollo/client';
import  ReactTable           from 'components/table/table'
import { GET_ALL_ORDER }     from '../../graphql/query/order.query'


const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'customer_id',
      key: 'customer_id',
      width: 100,
    },
    {
      title: 'Product',
      dataIndex: 'product_id',
      key: 'product_id',
      width: 50,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 50,
    },
    {
      title: 'Delivery Amount',
      dataIndex: 'deliveryAmount',
      key: 'deliveryAmount',
      width: 50,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 50,
      },
      {
        title: 'total',
        dataIndex: 'total',
        key: 'total',
        width: 50,
      },
      {
        title: 'Delivery Date',
        dataIndex: 'deliverydate',
        key: 'deliverydate',
        width: 150,
      },
  ];
  
  

  type TableProps = {
    columns: any;
    data: any;
    props?: any;
  };
  
  
export const ViewOrder:React.FC = () =>  
{
    const tableData = [];
    const { data, error, loading , refetch } = useQuery(GET_ALL_ORDER);

    if(typeof data !== undefined){

    for (const order in data){
       for (const cust in data[order]){
                
                const {_id,customer_id,product_id,date,deliveryDate,deliveryAmount,price,quantity,total } = data[order][cust];
                let newObject = { }
               
                let CurrentDate  = date.substring(0,10);
                let deliverydate = deliveryDate.substring(0,10);
                newObject = {customer_id,product_id,deliverydate,deliveryAmount,price,quantity,total,key:_id }
                tableData.push(newObject);



            }


        }
    }

    return (
    <ReactTable columns={columns} data={tableData} />
    )
};

