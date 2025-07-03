// import React from "react";
// import { Button, Drawer, Row, Space, Form } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import ProfileForm from "./CapsiBillingForm";
// import type { Profile } from "../interfaces/Profile";

// interface DrawerWrapperProps {
//   onSuccess?: () => void;
//   open: boolean;
//   onClose: () => void;
// }

// const ProfileDrawerWrapper: React.FC<DrawerWrapperProps> = ({ onSuccess, open, onClose }) => {
//   const [form] = Form.useForm<Profile>();

//   return (
//     <Drawer
//       width={900}
//       onClose={onClose}
//       open={open}
//       closable={false}
//       title={
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <span>Add Party</span>
//           <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
//         </div>
//       }
//       footer={
//         <Row justify="end">
//           <Space>
//             <Button onClick={() => { form.resetFields(); onClose(); }}>
//               Cancel
//             </Button>
//             <Button type="primary" onClick={() => form.submit()}>
//               Submit
//             </Button>
//           </Space>
//         </Row>
//       }
//     >
//       <ProfileForm
//         onSuccess={() => {
//           form.resetFields();
//           onSuccess?.();
//         }}
//         onClose={onClose}
//         form={form}
//       />
//     </Drawer>
//   );
// };

// export default ProfileDrawerWrapper;
// ProfileDrawerWrapper.tsx

import React, { useState } from "react";
import { Button, Drawer, Row, Space, Form } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import ProfileForm from "./CapsiBillingForm";
import type { Profile } from "../interfaces/Profile";

interface DrawerWrapperProps {
  onSuccess?: () => void;
}

const ProfileDrawerWrapper: React.FC<DrawerWrapperProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<Profile>();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showDrawer}
        style={{ marginBottom: 16 }}
      >
        Add Party
      </Button>

      <Drawer
        width={900}
        onClose={onClose}
        open={open}
        closable={false}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Add Party</span>
            <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
          </div>
        }
        footer={
          <Row justify="end">
            <Space>
              <Button onClick={() => { form.resetFields(); onClose(); }}>
                Cancel
              </Button>
              <Button type="primary" onClick={() => form.submit()}>
                Submit
              </Button>
            </Space>
          </Row>
        }
      >
        <ProfileForm
          onSuccess={() => {
            form.resetFields();
            onSuccess?.(); // notify parent to refresh
            onClose();
          }}
          onClose={onClose}
          form={form}
        />
      </Drawer>
    </>
  );
};

export default ProfileDrawerWrapper;
