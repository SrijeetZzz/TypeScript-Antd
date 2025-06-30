import React ,{useRef , useState}from "react";
import type { Profile } from "../interfaces/Profile";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  Divider,
  Space,

} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import type { FormInstance } from "antd/es/form";

interface ProfileFormProps {
  formRef: React.RefObject<FormInstance<Profile>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formRef }) => {
  const [form] = Form.useForm<Profile>();
  const {Option} = Select;
  const contactAddRef = useRef<() => void>();
  const addressAddRef = useRef<() => void>();
  
  const [contactFields, setContactFields] = useState<number>(0);
  const [addressFields, setAddressFields] = useState<number>(0);

  React.useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [form, formRef]);
  return (
    <Form form={form} layout="vertical" >
      {/* Add party */}
      <Row gutter={[16, 4]}>
        <Col span={8}>
          <Form.Item
            label="Party Name"
            name="party_name"
            rules={[{ required: true, message: "Party name is required" }]}
          >
            <Input placeholder="Party name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Alias/Short Name" name="alias">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Party Group" name="party_grp">
            <Select showSearch>
              <Option value="Trade Payables - Sunday Creditors">
                Trade Payables - Sunday Creditors
              </Option>
              <Option value="Trade Receiveable - Sunday Debitors">
                Trade Receiveable - Sunday Debitors
              </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Business Details */}
      <Divider orientation="left">Business Details</Divider>
      <Row gutter={[16, 4]}>
        <Col span={6}>
          <Form.Item
            label="GST Type"
            name="gst_type"
            rules={[{ required: true, message: "GST Type is required" }]}
          >
            <Select placeholder="GST TYPE">
              <Option value="Unregistered">Unregistered</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Composition">Composition</Option>
              <Option value="Import">Import</Option>
              <Option value="SEZ">SEZ</Option>
              <Option value="Deemed Export/ Import">Deemed Export/ Import</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="GSTIN" name="gst_no">
            <Input placeholder="00AABCC1234D1ZZ" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="PAN Card" name="pan_no">
            <Input placeholder="AABCC1234D" disabled />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "State is required" }]}
          >
            <Select placeholder="State" showSearch>
              <Option value="West Bengal">West Bengal</Option>
              <Option value="Maharashtra">Maharashtra</Option>
              <Option value="Punjab">Punjab</Option>
              <Option value="Rajasthan">Rajasthan</Option>
              <Option value="Delhi">Delhi</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Business Type" name="bussiness_type">
            <Select placeholder="Select Type" showSearch>
              <Option value="Private Limited">Private Limited</Option>
              <Option value="Public Limited">Public Limited</Option>
              <Option value="Sole Propprietorship">Sole Propprietorship</Option>
              <Option value="Partnership">Partnership</Option>
              <Option value="LLP">LLP</Option>
              <Option value="LLC">LLC</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Business Nature" name="bussiness_nature">
            <Select placeholder="Select Nature">
              <Option value="Unspecified">Unspecified</Option>
              <Option value="Manufacturer">Manufacturer</Option>
              <Option value="Service Provider">Service Provider</Option>
              <Option value="Trader">Trader</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Website" name="website">
            <Input placeholder="https://www.example.com" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="IEC" name="iec">
            <Input placeholder="IEC Code" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="MSME Number" name="msme_no">
            <Input placeholder="XX-00-0123456" addonBefore="UDYAM" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="istransporter">
            <div>Is Transporter</div>
            <Checkbox style={{ paddingTop: 10 }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Contact Details */}
      <Divider orientation="left">Contact Details</Divider>
      <Form.List name="contact_details">
        {(fields, { add, remove }) => {
          contactAddRef.current = () => {
            if (fields.length === 0 && contactFields === 0) {
              add();
              setContactFields(1);
            }
          };
          return (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Row gutter={[16, 4]}>
                    <Col span={4}>
                      <Form.Item label="Name" {...restField} name={[name, "contact_name"]}>
                        <Input placeholder="Name" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Designation" {...restField} name={[name, "designation"]}>
                        <Input placeholder="Designation" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Phone No." {...restField} name={[name, "phone_no"]}>
                        <Input placeholder="9876543210" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Email" {...restField} name={[name, "email"]}>
                        <Input placeholder="user@exam.com" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="CC" {...restField} name={[name, "cc"]}>
                        <Input placeholder="user@exam.com" />
                      </Form.Item>
                    </Col>
                    <DeleteOutlined
                      style={{ paddingLeft: 10, paddingTop: 30 }}
                      onClick={() => {
                        remove(name);
                        setContactFields(prev => prev - 1);
                      }}
                    />
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (contactFields < 5) {
                      add();
                      setContactFields(prev => prev + 1);
                    }
                  }}
                  disabled={contactFields >= 5}
                >
                  Add Contact
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>

      {/* Address Details */}
      <Divider orientation="left">Address Details</Divider>
      <Form.List name="address_details">
        {(fields, { add, remove }) => {
          addressAddRef.current = () => {
            if (fields.length === 0 && addressFields === 0) {
              add();
              setAddressFields(1);
            }
          };
          return (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Row gutter={[16, 4]}>
                    <Col span={6}>
                      <Form.Item
                        label="Address Type"
                        {...restField}
                        name={[name, "address_type"]}
                      >
                        <Select placeholder="Select Type">
                          <Option value="Registered Address">Registered Address</Option>
                          <Option value="Bussiness Address">Bussiness Address</Option>
                          <Option value="Branch Address">Branch Address</Option>
                          <Option value="Unit Address">Unit Address</Option>
                          <Option value="Godown Address">Godown Address</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Name"
                        {...restField}
                        name={[name, "name"]}
                        rules={[{ required: true, message: "Name is required" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={18}>
                      <Row gutter={[8, 4]}>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "building"]}>
                            <Input placeholder="Building" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "street"]}>
                            <Input placeholder="Street" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "landmark"]}>
                            <Input placeholder="Landmark" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "city"]}>
                            <Input placeholder="City" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "district"]}>
                            <Input placeholder="District" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "pincode"]}>
                            <Input placeholder="Pincode" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item {...restField} name={[name, "address_state"]}>
                            <Select placeholder="State">
                              <Option value="West Bengal">West Bengal</Option>
                              <Option value="Maharashtra">Maharashtra</Option>
                              <Option value="Punjab">Punjab</Option>
                              <Option value="Rajasthan">Rajasthan</Option>
                              <Option value="Delhi">Delhi</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "country"]}
                            rules={[{ required: true, message: "Country is required" }]}
                          >
                            <Select placeholder="Country">
                              <Option value="India">India</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <DeleteOutlined
                          style={{ paddingLeft: 10 }}
                          onClick={() => {
                            remove(name);
                            setAddressFields(prev => prev - 1);
                          }}
                        />
                      </Row>
                    </Col>
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (addressFields < 5) {
                      add();
                      setAddressFields(prev => prev + 1);
                    }
                  }}
                  disabled={addressFields >= 5}
                >
                  Add Address
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>

      
    </Form>
  );
};

export default ProfileForm;
