
// import React from 'react';
// import { Drawer, Form, Input, Button, Space } from 'antd';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onAdd: (values: any) => void;
// }

// const UserFormDrawer: React.FC<Props> = ({ open, onClose, onAdd }) => {
//   const [form] = Form.useForm();

//   const onFinish = (values: any) => {
//     onAdd(values);
//     form.resetFields();
//   };

//   return (
//     <Drawer title="Add New User" width={360} onClose={onClose} open={open}>
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//           <Input placeholder="Enter name" />
//         </Form.Item>
//         <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
//           <Input placeholder="Enter email" />
//         </Form.Item>
//         <Form.Item name="password" label="Password" rules={[{ required: true }]}>
//           <Input.Password placeholder="Enter password" />
//         </Form.Item>
//         <Form.Item>
//           <Space>
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="primary" htmlType="submit">Add</Button>
//           </Space>
//         </Form.Item>
//       </Form>
//     </Drawer>
//   );
// };

// export default UserFormDrawer;


import React from 'react';
import { Drawer, Form, Input, Button, Space } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (values: any) => void;
}

const UserFormDrawer: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...existingUsers, values];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    onAdd(values);
    form.resetFields();
  };

  return (
    <Drawer title="Add New User" width={360} onClose={onClose} open={open}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">Add</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserFormDrawer;
