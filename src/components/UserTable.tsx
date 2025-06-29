// // UserTable.tsx
// import React, { useState , useEffect} from 'react';
// import { Button, Table, Space, Popconfirm, message } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import UserFormDrawer from "./FormDrawerData";
// import UserFormModal from "./FormModalUser"

// // interface User {
// //   key: string;
// //   name: string;
// //   email: string;
// //   password: string;
// // }

// // const UserTable: React.FC = () => {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingUser, setEditingUser] = useState<User | null>(null);

// //   // Add User Handler
// //   const handleAddUser = (user: Omit<User, 'key'>) => {
// //     const newUser: User = { key: Date.now().toString(), ...user };
// //     setUsers([...users, newUser]);
// //     setDrawerOpen(false);
// //     message.success('User added');
// //   };

// //   // Update User Handler
// //   const handleUpdateUser = (values: Omit<User, 'key'>) => {
// //     if (!editingUser) return;
// //     setUsers(users.map(u => u.key === editingUser.key ? { ...editingUser, ...values } : u));
// //     setEditingUser(null);
// //     setModalOpen(false);
// //   };

// //   // Delete User Handler
// //   const handleDeleteUser = (key: string) => {
// //     setUsers(users.filter(u => u.key !== key));
// //     message.success('User deleted');
// //   };

// //   const columns: ColumnsType<User> = [
// //     { title: 'Name', dataIndex: 'name' },
// //     { title: 'Email', dataIndex: 'email' },
// //     {
// //       title: 'Actions',
// //       render: (_, record) => (
// //         <Space>
// //           <Button type="link" onClick={() => { setEditingUser(record); setModalOpen(true); }}>Edit</Button>
// //           <Popconfirm title="Delete?" onConfirm={() => handleDeleteUser(record.key)}>
// //             <Button type="link" danger>Delete</Button>
// //           </Popconfirm>
// //         </Space>
// //       )
// //     }
// //   ];

// //   return (
// //     <div style={{ padding: 24 }}>
// //       <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
// //   <Button type="primary" onClick={() => setDrawerOpen(true)}>
// //     Add User
// //   </Button>
// // </div>

// //       <Table columns={columns} dataSource={users} pagination={{ pageSize: 5 }} />

// //       {/* Add Drawer */}
// //       <UserFormDrawer
// //         open={drawerOpen}
// //         onClose={() => setDrawerOpen(false)}
// //         onAdd={handleAddUser}
// //       />

// //       {/* Edit Modal */}
// //       {editingUser && (
// //         <UserFormModal
// //           open={modalOpen}
// //           onClose={() => setModalOpen(false)}
// //           user={editingUser}
// //           onUpdate={handleUpdateUser}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default UserTable;



// interface User {
//   key: string;
//   name: string;
//   email: string;
//   password: string;
// }

// const LOCAL_KEY = 'user-table-data';

// const UserTable: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<User | null>(null);

//   // ✅ Load users from localStorage when component mounts
// //   useEffect(() => {
// //     const stored = localStorage.getItem(LOCAL_KEY);
// //     if (stored) {
// //       setUsers(JSON.parse(stored));
// //     }
// //   }, []);
// useEffect(() => {
//   const stored = localStorage.getItem(LOCAL_KEY);
//   console.log('stored',stored)
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       setUsers(parsed);
//     } catch (error) {
//       console.error("Failed to parse users from localStorage", error);
//     }
//   }

// }, []);



//   // ✅ Sync users to localStorage when users state changes
// //   useEffect(() => {
// //     console.log(localStorage.getItem(LOCAL_KEY));
// //     if(users!==null)
// //     localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
// //   }, [users]);
  



//   const handleAddUser = (user: Omit<User, 'key'>) => {
//     const newUser: User = { key: Date.now().toString(), ...user };
//     setUsers([...users, newUser]);
//     setDrawerOpen(false);
//     // message.success('User added');
//     console.log(users)
//     let newData = [...users, newUser];
//     localStorage.setItem(LOCAL_KEY, JSON.stringify(newData));
//   };

//   const handleUpdateUser = (values: Omit<User, 'key'>) => {
//     if (!editingUser) return;
//     setUsers(users.map(u => u.key === editingUser.key ? { ...editingUser, ...values } : u));
//     setEditingUser(null);
//     setModalOpen(false);
//     message.success('User updated');
//   };

//   const handleDeleteUser = (key: string) => {
//     setUsers(users.filter(u => u.key !== key));
//     message.success('User deleted');
//   };

//   const columns: ColumnsType<User> = [
//     { title: 'Name', dataIndex: 'name' },
//     { title: 'Email', dataIndex: 'email' },
//     {
//       title: 'Actions',
//       render: (_, record) => (
//         <Space>
//           <Button type="link" onClick={() => { setEditingUser(record); setModalOpen(true); }}>
//             Edit
//           </Button>
//           <Popconfirm title="Delete user?" onConfirm={() => handleDeleteUser(record.key)}>
//             <Button type="link" danger>Delete</Button>
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
//         <Button type="primary" onClick={() => setDrawerOpen(true)}>
//           Add User
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={users} pagination={{ pageSize: 5 }} />

//       {/* Add Drawer */}
//       <UserFormDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         onAdd={handleAddUser}
//       />

//       {/* Edit Modal */}
//       {editingUser && (
//         <UserFormModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           user={editingUser}
//           onUpdate={handleUpdateUser}
//         />
//       )}
//     </div>
//   );
// };

// export default UserTable;


import React from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../interfaces/User';

interface Props {
  users: User[];
  onEdit: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit }) => {
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
        </Space>
      )
    }
  ];

  return <Table dataSource={users} columns={columns} rowKey="email" />;
};

export default UserTable;
