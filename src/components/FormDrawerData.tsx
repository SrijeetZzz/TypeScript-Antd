import React, { useState } from "react";
import { Button, Drawer, Row, Space, Form } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import ProfileForm from "./CapsiBillingForm";
import type { Profile } from "../interfaces/Profile";


const ProfileDrawerWrapper: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const [form] = Form.useForm<Profile>();



  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Party
      </Button>
      <Drawer
        width={900}
        onClose={onClose}
        open={open}
        closable={false}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Add Party</span>
            <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
          </div>
        }
        footer={
          <Row justify="end" >
            <Space>
              <Button
                onClick={() => {
                  console.log("Cancel clicked");
                  form.resetFields();
                  onClose?.();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.submit();
                 
                }}
              >
                Submit
              </Button>
            </Space>
          </Row>
        }
      >
        
        <ProfileForm onSuccess={onClose} onClose={onClose} form={form} />
        
      </Drawer>
     
    </>
  );
};

export default ProfileDrawerWrapper;
