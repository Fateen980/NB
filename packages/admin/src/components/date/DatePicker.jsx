import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  // mydate = moment(startDate, 'DD-MM-YYYY') 
  // console.log(mydate);
  return (
    <DatePicker  {...props} />
  );
};

export default DDatePicker