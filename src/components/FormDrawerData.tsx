
// import React from "react";
// import { Button, Drawer, Row, Space, Form } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import ProfileForm from "./CapsiBillingForm";
// import type { Profile } from "../interfaces/Profile";

// interface DrawerWrapperProps {
//   onSuccess?: () => void; // storing the data on submiison and showing the data //
//   open: boolean;  // passing parent prop for opening the form //
//   onClose: () => void;  // passing parent prop for closing the form //
// }

// const ProfileDrawerWrapper: React.FC<DrawerWrapperProps> = ({
//   onSuccess,
//   open,
//   onClose,
// }) => {
//   const [form] = Form.useForm<Profile>();

//   return (
//     <Drawer
//       width={900}
//       onClose={onClose}
//       open={open}
//       closable={false}
//       title={
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>Add Party</span>
//           <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
//         </div>
//       }
//       footer={
//         <Row justify="end">
//           <Space>
//             <Button
//               onClick={() => {
//                 form.resetFields();
//                 onClose();
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="primary"
//               onClick={() => {
//                 form.submit();
//               }}
//             >
//               Submit
//             </Button>
//           </Space>
//         </Row>
//       }
//     >
//       <ProfileForm
//         form={form}
//         onClose={onClose}
//         onSuccess={() => {
//           form.resetFields();
//           onSuccess?.();
//         }}
//       />
//     </Drawer>
//   );
// };

// export default ProfileDrawerWrapper;

import React, { useEffect } from "react";
import { Button, Drawer, Row, Space, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ProfileForm from "./CapsiBillingForm";
import type { Profile } from "../interfaces/Profile";

interface DrawerWrapperProps {
  mode: "add" | "edit";
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedKey?: string | null;
  initialValues?: Profile | null;
}

const ProfileDrawerWrapper: React.FC<DrawerWrapperProps> = ({
  mode,
  open,
  onClose,
  onSuccess,
  selectedKey,
  initialValues,
}) => {
  const [form] = Form.useForm<Profile>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form, open]);

  return (
    <Drawer
      width={900}
      onClose={onClose}
      open={open}
      closable={false}
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{mode === "edit" ? "Edit Party" : "Add Party"}</span>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      footer={
        <Row justify="end">
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                onClose();
              }}
            >
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
        form={form}
        onClose={onClose}
        onSuccess={() => {
          form.resetFields();
          onSuccess?.();
        }}
        selectedKey={selectedKey}
      />
    </Drawer>
  );
};

export default ProfileDrawerWrapper;
