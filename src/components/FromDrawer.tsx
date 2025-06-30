import React, { useRef, useState } from "react";
import { Modal, Button, message } from "antd";
import ProfileForm from "./CapsiBillingForm" // your form component import
import type { FormInstance } from "antd/es/form";

const ProfileModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const formRef = useRef<FormInstance<Profile>  | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await formRef.current?.validateFields();
      console.log("Submitted values:", values);
      message.success("Form submitted!");
      formRef.current?.resetFields();
      onClose();
    } catch (err) {
      // validation failed
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}       
      title="Profile Form"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
      destroyOnClose
      maskClosable={false}
    >
      <ProfileForm formRef={formRef} />
    </Modal>
  );
};

export default ProfileModal;
