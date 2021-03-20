import React                 from 'react';
import { useQuery }          from '@apollo/client';
import  ReactTable           from 'components/table/table'
import { GET_ALL_ORDER }     from '../../graphql/query/order.query'

{/* <Link href={`/posts/${id}`}></Link> */}


interface RecordType {
  customer_id?: string;
  key?: string;
}


const columns = [
    {
      title: 'Phone',
      dataIndex: 'customer_id',
      key: 'customer_id',
      width: 200,
    },
      {
        title: 'Customer',
        dataIndex: 'customer_name',
        key: 'customer_name',
        width: 200,
      },
      {
        title: 'Delivery Date',
        dataIndex: 'deliverydate',
        key: 'deliverydate',
        width: 200,
      },
      {
        title: 'View',
        dataIndex: '',
        key: 'View',
        render(_: any, record: RecordType) {
          return (
            <a href={`orderDetail/${record.key}`} >
              View
            </a>
          );
        },
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
               
        
                const {_id,customer,date,deliveryDate } = data[order][cust];
                let newObject = { }
               
               let  customer_id   = (customer)?customer[1]:'';
               let  customer_name = (customer)?customer[0]:'';

                let CurrentDate  = date.substring(0,10);
                let deliverydate = deliveryDate.substring(0,10);
                newObject = {customer_id,customer_name,deliverydate,key:_id }
                tableData.push(newObject);



            }


        }
    }

    return (
    <ReactTable columns={columns} data={tableData} />
    )
};

