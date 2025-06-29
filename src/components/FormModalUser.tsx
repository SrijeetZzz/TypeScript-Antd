// // src/components/UserFormModal.tsx
// import React, { useState } from 'react';
// import { Button, Form, Input, Modal,Space, message } from 'antd';

// const UserFormModal: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       console.log('Form Values:', values);
//       message.success('User added successfully!');
//       form.resetFields();
//       setIsModalOpen(false);
//     } catch (err) {
//       // Validation failed
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Add User
//       </Button>
//       <Modal
//         title="Create a new user"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Submit"
//         cancelText="Cancel"
//         centered
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="userFormModal"
//         >
//           <Space direction='horizontal'>
//             <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: 'Please enter name' }]}
//           >
//             <Input placeholder="Enter name" />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               { required: true, message: 'Please enter email' },
//               { type: 'email', message: 'Enter a valid email' },
//             ]}
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           </Space>

//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter password' }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default UserFormModal;



// UserFormModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, message, Space } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
  onUpdate: (values: any) => void;
}

const UserFormModal: React.FC<Props> = ({ open, onClose, user, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) form.setFieldsValue(user);
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
      message.success('User updated');
      form.resetFields();
    } catch (err) {
      // validation failed
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
    >
      <Form form={form} layout="vertical">
        <Space direction='horizontal'>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input disabled/>
        </Form.Item>
        
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
