// import React from 'react';
// import './App.css';
// import ProfilesTable from './components/UserTable';

// const App: React.FC = () => {

//   return (
//     <div style={{ padding: 24 }}>
      
//       <ProfilesTable/>
      
//     </div>
//   );
// };

// export default App;

import React from "react";
import "antd/dist/reset.css";
import LoginPage from "./CapsiExpense/Login";
import EditableInvoiceTable from "./CapsiExpense/Login";

const App: React.FC = () => {
  return(
    <>
      <EditableInvoiceTable/>
    </>
  )
};

export default App;