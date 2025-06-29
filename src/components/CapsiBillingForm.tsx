

// import React from 'react';
// import { Form, Input, Button, Select, DatePicker, Checkbox, Row, Col } from 'antd';
// import type { Profile } from '../interfaces/Profile';

// const { Option } = Select;

// const ProfileForm: React.FC = () => {
//   const [form] = Form.useForm<Profile>();

//   const onFinish = (values: Profile) => {
//     console.log('Submitted:', values);
//   };

//   return (
//     <div
//       style={{
//         width: '800px',
//         maxWidth: 900,
//         margin: '40px auto',
//         padding: 24,
        
//         background: '#fff',
//         boxShadow: '0 0 8px rgba(0,0,0,0.1)',
//         borderRadius: 8,
//       }}
//     >
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Row gutter={[16,4]}>
//           <Col span={8}>
//             <Form.Item name="bussiness_name" label="Business Name" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={4}>
//             <Form.Item name="short_name" label="Short Name" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//           </Col>
      
//           <Col span={6}>
//             <Form.Item name="bussiness_type" label="Business Type" rules={[{ required: true }]}>
//               <Select>
//                 <Option value="Private Bussiness">Private Business</Option>
//                 <Option value="Public Bussiness">Public Business</Option>
//                 <Option value="LLP">LLP</Option>
//                 <Option value="LLC">LLC</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={6}>
//             <Form.Item name="bussiness_nature" label="Business Nature" rules={[{ required: true }]}>
//               <Select>
//                 <Option value="Unspecified">Unspecified</Option>
//                 <Option value="Manufacturer">Manufacturer</Option>
//                 <Option value="Trdaer">Trader</Option>
//               </Select>
//             </Form.Item>
//           </Col>
        
//         <Col span={6}>
//         <Form.Item name="pan_no" label="PAN Number" rules={[{ required: true }]}>
//           <Input type="number" />
//         </Form.Item>
//         </Col>
//         <Col span={6}>
//         <Form.Item name="gst_no" label="GST Number" rules={[{ required: true }]}>
//           <Input type="number" />
//         </Form.Item>
//         </Col>
//         <Col span={6}>
//         <Form.Item name="gst_type" label="GST Type" rules={[{ required: true }]}>
//           <Select>
//             <Option value="Unspecified">Unspecified</Option>
//             <Option value="Regular">Regular</Option>
//             <Option value="Composition">Composition</Option>
//           </Select>
//         </Form.Item>
//         </Col>
//         <Col span={6}>
//         <Form.Item name="iec_code" label="IEC Code" rules={[{ required: true }]}>
//           <Input type="number" />
//         </Form.Item>
//         </Col>
//         <Col span={6}>
//         <Form.Item name="msme_no" label="MSME Number" rules={[{ required: true }]}>
//           <Input type="number" />
//         </Form.Item>
//         </Col>
//         <Col span={6}>
//         <Form.Item name="gst_date" label="GST Date" rules={[{ required: true }]}>
//           <DatePicker style={{ width: '100%' }} />
//         </Form.Item>
//         </Col>
//         </Row>
//   <Row gutter={[0, 12]} style={{ marginTop: 8 , justifyContent: 'flex-start' }} >
//   <Col span={24} style={{ textAlign: 'left' }}>
//     <Form.Item name="tds_deduction" valuePropName="checked" style={{ marginBottom: 0 }}>
//       <Checkbox />
//     </Form.Item>
//     <div style={{ fontSize: 12 }}>TDS Deduction</div>
//   </Col>

//   <Col span={24} style={{ textAlign: 'left' }}>
//     <Form.Item name="tcs_collection" valuePropName="checked" style={{ marginBottom: 0 }}>
//       <Checkbox />
//     </Form.Item>
//     <div style={{ fontSize: 12 }}>TCS Collection</div>
//   </Col>
// </Row>



//         <Form.Item>
//           <Button type="primary" htmlType="submit" >
//             Submit
//           </Button>
//         </Form.Item>
        
//       </Form>
//     </div>
//   );
// };

// export default ProfileForm;
import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Checkbox, Row, Col, Modal } from 'antd';
import type { Profile } from '../interfaces/Profile';

const { Option } = Select;

const ProfileFormModal: React.FC = () => {
  const [form] = Form.useForm<Profile>();
  const [visible, setVisible] = useState(false);
  const [gstType, setGstType] = useState<string | undefined>(undefined);

  const onFinish = (values: Profile) => {
    console.log('Submitted:', values);
    setVisible(false);
    form.resetFields();
    setGstType(undefined);
  };

  const handleGstTypeChange = (value: string) => {
    setGstType(value);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Profile Form
      </Button>

      <Modal
        title="Profile Form"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="65%"
        bodyStyle={{ padding: 24, background: '#fff', borderRadius: 8 }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 4]}>
            <Col span={8}>
              <Form.Item name="bussiness_name" label="Business Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="short_name" label="Short Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="bussiness_type" label="Business Type" rules={[{ required: true }]}>
                <Select>
                  <Option value="Private Bussiness">Private Business</Option>
                  <Option value="Public Bussiness">Public Business</Option>
                  <Option value="LLP">LLP</Option>
                  <Option value="LLC">LLC</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="bussiness_nature" label="Business Nature" rules={[{ required: true }]}>
                <Select>
                  <Option value="Unspecified">Unspecified</Option>
                  <Option value="Manufacturer">Manufacturer</Option>
                  <Option value="Trdaer">Trader</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="gst_type"
                label="GST Type"
                rules={[{ required: true }]}
              >
                <Select onChange={handleGstTypeChange} placeholder="Select GST Type">
                  <Option value="Unspecified">Unspecified</Option>
                  <Option value="Regular">Regular</Option>
                  <Option value="Composition">Composition</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Conditionally render PAN and MSME if gstType === "Unspecified" */}
            {gstType === 'Unspecified' && (
              <>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item name="pan_no" label="PAN Number" rules={[{ required: true }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item name="msme_no" label="MSME Number" rules={[{ required: true }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col span={6}>
              <Form.Item name="gst_date" label="GST Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[0, 12]} style={{ marginTop: 8, justifyContent: 'flex-start' }}>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Form.Item name="tds_deduction" valuePropName="checked" style={{ marginBottom: 0 }}>
                <Checkbox />
              </Form.Item>
              <div style={{ fontSize: 12 }}>TDS Deduction</div>
            </Col>

            <Col span={24} style={{ textAlign: 'left' }}>
              <Form.Item name="tcs_collection" valuePropName="checked" style={{ marginBottom: 0 }}>
                <Checkbox />
              </Form.Item>
              <div style={{ fontSize: 12 }}>TCS Collection</div>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProfileFormModal;
