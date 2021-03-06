import React                 from 'react';
import { useQuery }          from '@apollo/client';
import  ReactTable           from 'components/table/table'
import { ALL_CUSTOMER }      from '../../graphql/query/customer.query'
import { GET_ALL_CITY }      from '../../graphql/query/city.query'

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
      dataIndex: 'cityName',
      key: 'cityName',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
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

    const ALL_CITY = useQuery(GET_ALL_CITY);


    const filterArry = (arr, id) => {
      if(arr.allCity !== undefined){

        return arr.allCity.filter(el => el._id == id)
      }
        return id
    }


    if(typeof data !== undefined){

    for (const customer in data){
       for (const cust in data[customer]){
                
                const {_id, name , phone , city , address } = data[customer][cust];

                if(ALL_CITY !== undefined && ALL_CITY.data !== undefined){
               
                   const cityMatch = filterArry(ALL_CITY.data,city);

                      var  cityName = city;
                   if(cityMatch.length != 0){
                           cityName = cityMatch[0].name;
                   }
                   
                }
               
               
                console.log(cityName,'cityName');

                let newObject = { }
                newObject = { name,phone,cityName,address,key:_id }
                tableData.push(newObject);

            }


        }
    }

    return (
    <ReactTable columns={columns} data={tableData} />
    )
};

