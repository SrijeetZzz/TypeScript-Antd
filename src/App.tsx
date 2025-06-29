// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import UserFormDrawer from './components/FormDrawerData'
// // import UserFormDrawer from './components/FormDrawerData'
// // import UserTable from "./components/UserTable"

// function App() {


//   return (
//     <>
//       <UserFormDrawer />

        
//     </>
//   )
// }

// export default App


// import React, { useState } from 'react';
// import './App.css';
// import UserFormDrawer from './components/FormDrawerData';

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleAddUser = (newUser: any) => {
//     console.log('New user added:', newUser);
//     setDrawerOpen(false); // Close drawer after adding
//   };

//   return (
//     <>
//       <button onClick={() => setDrawerOpen(true)}>Open Drawer</button>

//       <UserFormDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         onAdd={handleAddUser}
//       />
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import UserFormDrawer from './components/FormDrawerData';
// import UserTable from './components/UserTable';
// import type { User } from "./interfaces/User"

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [users, setUsers] = useState<User[]>([]);

//   // Load users from localStorage on initial mount
//   useEffect(() => {
//     const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//     setUsers(savedUsers);
//   }, []);

//   const handleAddUser = (newUser: User) => {
//     const updatedUsers = [...users, newUser];
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     setUsers(updatedUsers); // Update UI without refresh
//     setDrawerOpen(false);
//   };

//   return (
//     <>
//       <button onClick={() => setDrawerOpen(true)}>Add User</button>

//       <UserFormDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         onAdd={handleAddUser}
//       />

//       <UserTable users={users} />
//     </>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import UserFormDrawer from './components/FormDrawerData';
import UserTable from './components/UserTable';
import UserFormModal from "./components/FormModalUser";
import type { User } from './interfaces/User';
import DynamicFieldsForm from './components/SearchDynamic';
import ProfileForm from './components/CapsiBillingForm';

const App: React.FC = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [users, setUsers] = useState<User[]>([]);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   useEffect(() => {
//     const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
//     setUsers(savedUsers);
//   }, []);

//   const handleAddUser = (newUser: User) => {
//     const updatedUsers = [...users, newUser];
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     setUsers(updatedUsers);
//     setDrawerOpen(false);
//   };

//   const handleEdit = (user: User) => {
//     setEditingUser(user);
//     setEditModalOpen(true);
//   };

//   const handleUpdateUser = (updatedUser: User) => {
//     const updatedList = users.map((user) =>
//       user.email === updatedUser.email ? updatedUser : user
//     );
//     localStorage.setItem('users', JSON.stringify(updatedList));
//     setUsers(updatedList);
//     setEditModalOpen(false);
//     setEditingUser(null);
//   };

//   return (
//     <>
//       <button onClick={() => setDrawerOpen(true)}>Add User</button>

//       <UserFormDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         onAdd={handleAddUser}
//       />

//       <UserTable users={users} onEdit={handleEdit} />

//       <UserFormModal
//         open={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         user={editingUser}
//         onUpdate={handleUpdateUser}
//       />
//     </>
//   );
  // 
  return (
    <div>
      <ProfileForm />
      {/* <DynamicFieldsForm/> */}
    </div>
  );

}

export default App;
