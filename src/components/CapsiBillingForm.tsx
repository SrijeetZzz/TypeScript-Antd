import React, { useState } from "react";
import type { Profile } from "../interfaces/Profile";
import { indianStates } from "../interfaces/Profile";
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
import type { FormInstance } from "antd";

interface ProfileFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  form: FormInstance<Profile>;
  profileKey?: string | null;   // <-- Add this prop
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSuccess,

  form,
}) => {
  const { Option } = Select;
  const display: string = Form.useWatch("party_grp", form);
  const display_two: string = Form.useWatch("gst_type", form);
  const [selectedType, setSelectedType] = useState("");
  const [ggst, setGgst] = useState("");
  const [gpan, setGpan] = useState("");

  const handlePanAndStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value.length > 2) {
      const code = value.slice(0, 2);
      const state = indianStates.find((e) => e.id === parseInt(code));
      const stateName = state?.name;
      form.setFieldValue("state", stateName);
    }
    if (value.length > 12) {
      const val = value.slice(2, 12);
      form.setFieldValue("pan_no", val);
    } else {
      setGpan("");
    }
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const onFinish = (values: Profile) => {
    console.log("Submitted: ", values);
    const count = parseInt(localStorage.getItem("profileCount") || "0");
    localStorage.setItem(`${count + 1}`, JSON.stringify(values));
    localStorage.setItem("profileCount", (count + 1).toString());
    form.resetFields();
    onSuccess?.();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        gst_no: "",
        pan_no: "",
        alias: "",
        website: "",
        iec: "",
        msme_no: "",
        bussiness_type: "",
        bussiness_nature: null,
        istransporter: false,
        contact_details: [
          {
            contact_name: "",
            designation: "",
            phone_no: null,
            email: "",
            cc: "",
          },
        ],
        address_details:[
          {
            building:"",
            street:"",
            landmark:"",
            city:"",
            district:"",
            pincode:null,
            address_state:"",
            
          }
        ]
      }}
    >
      {/* Add party */}

      <Row gutter={[16, 4]}>
        <Col span={8}>
          <Form.Item
            label="Party Name"
            name="party_name"
            rules={[
              {
                required: true,
                message: "Party name is required",
              },
              {
                whitespace: true,
                message: "Party Name cant be empty",
              },
            ]}
          >
            <Input placeholder="Party name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Alias/Short Name"
            name="alias"
            rules={[
              {
                whitespace: true,
                message: "Party Name cant be empty",
              },
              {
                min: 3,
                max: 80,
                message:
                  "Length must be Minimum 3 or Maximum 80 characters long",
              },
              {
                pattern: /^[a-zA-Z\d][a-zA-Z\d\s.,()_&-]{3,80}$/,
                message:
                  "Only alphanumeric with space and some special characters i.e. '_', '(', ')', '&', '-', '.' and ',' are allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Party Group"
            name="party_grp"
            rules={[
              {
                required: true,
                message: "Party Group is required",
              },
            ]}
          >
            <Select
              showSearch
              onChange={() => {
                form.setFieldValue("gst_type", "Unregistered");
                setSelectedType("Unregistered");
                form.setFieldValue("address_details", [
                  {
                    address_type: "Registered Address",
                    name: "Billing Address",
                  },
                ]);
              }}
            >
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

      {/* Bussiness Details */}
      {[
        "Trade Payables - Sunday Creditors",
        "Trade Receiveable - Sunday Debitors",
      ].includes(display) ? (
        <>
          <Divider orientation="left" orientationMargin="0">
            Bussiness Details
          </Divider>
          <Row gutter={[16, 4]}>
            <Col span={6}>
              <Form.Item
                label="GST Type"
                name="gst_type"
                rules={[
                  {
                    required: true,
                    message: "GST Type is required",
                  },
                ]}
              >
                <Select
                  placeholder="GST TYPE"
                  onChange={handleTypeChange}
                  value={selectedType}
                >
                  <Option value="Unregistered">Unregistered</Option>
                  <Option value="Regular">Regular</Option>
                  <Option value="Composition">Composition</Option>
                  <Option value="Import/Export">Import/Export</Option>
                  <Option value="SEZ">SEZ</Option>
                  <Option value="Deemed Export/ Import">
                    Deemed Export/ Import
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            {display_two != "Import/Export" ? (
              <>
                <Col span={6}>
                  <Form.Item
                    label="GSTIN"
                    name="gst_no"
                    rules={[
                      {
                        pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z][1][Z][\dA-Z]$/,
                        message: "Please enter a valid GSTIN",
                      },
                    ]}
                  >
                    <Input
                      placeholder="00AABCC1234D1ZZ"
                      allowClear
                      disabled={selectedType === "Unregistered"}
                      onChange={handlePanAndStateChange}
                      value={ggst}
                    />
                  </Form.Item>
                </Col>
              </>
            ) : null}
            {/*  */}
            <Col span={6}>
              <Form.Item
                label="PAN Card "
                name="pan_no"
                rules={[
                  {
                    pattern: /^[A-Z]{5}[\d]{4}[A-Z]$/,
                    message: "Enter valid 10 alphanumeric PAN number",
                  },
                  {
                    min: 10,
                    max: 10,
                    message: "PAN No. must be 10 characters long",
                  },
                ]}
              >
                <Input
                  placeholder="AABCC1234D"
                  disabled={
                    selectedType === "Regular" ||
                    selectedType === "Composition" ||
                    selectedType === "SEZ" ||
                    selectedType === "Deemed Export/ Import"
                  }
                />
              </Form.Item>
            </Col>
            {display_two != "Import/Export" ? (
              <>
                <Col span={6}>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "State is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select State"
                      disabled={
                        selectedType === "Regular" ||
                        selectedType === "Composition" ||
                        selectedType === "SEZ" ||
                        selectedType === "Deemed Export/ Import"
                      }
                    >
                      {indianStates.map((state) => (
                        <Option key={state.id} value={state.name}>
                          {state.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : null}
            {/*  */}
            <Col span={6}>
              <Form.Item label="Bussiness Type" name="bussiness_type">
                <Select placeholder="Select Type" showSearch>
                  <Option value="Private Limited">Private Limited</Option>
                  <Option value="Public Limited">Public Limited</Option>
                  <Option value="Sole Propprietorship">
                    Sole Propprietorship
                  </Option>
                  <Option value="Partnership">Partnership</Option>
                  <Option value="LLP">LLP</Option>
                  <Option value="LLC">LLC</Option>
                  <Option value="Joint Ventures">Joint Ventures</Option>
                  <Option value="Hindu Undivided Family">
                    Hindu Undivided Family
                  </Option>
                  <Option value="NGO">NGO</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Bussiness Nature" name="bussiness_nature">
                <Select placeholder="Select Nature" mode="multiple">
                  <Option value="Unspecified">Unspecified</Option>
                  <Option value="Manufacturer">Manufacturer</Option>
                  <Option value="Service Provider">Service Provider</Option>
                  <Option value="Trader">Trader</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                  {
                    min: 10,
                    max: 50,
                    message:
                      "Please enter a valid URL having minimum 10 or maximum 50 length",
                  },
                ]}
              >
                <Input placeholder="https://www.example.com" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="IEC"
                name="iec"
                rules={[
                  {
                    pattern: /^[A-Z\d]{10}$/,
                    message: "Enter valid 10 alphanumeric IEC number",
                  },
                  {
                    max: 10,
                    min: 10,
                    message: "Length must be 10 characters long",
                  },
                ]}
              >
                <Input placeholder="IEC Code" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="MSME Number"
                name="msme_no"
                rules={[
                  {
                    pattern: /^[A-Z]{2}-[\d]{2}-[\d]{7}$/,
                    message: "Enter valid 19 digit MSME No. including '-'",
                  },
                ]}
              >
                <Input placeholder="XX-00-0123456" addonBefore="UDYAM-" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="istransporter" valuePropName="checked">
                <div>Is Transporter</div>
                <Checkbox style={{ paddingTop: 10 }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Contact Details */}

          <Divider orientation="left" orientationMargin="0">
            Contact Details
          </Divider>
          <Form.List
            name="contact_details"
            rules={[
              {
                validator: async (_, value) => {
                  if (value && value.length > 5) {
                    return Promise.reject(
                      new Error("Not more than 5 Contact Details")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Row gutter={[16, 4]}>
                      <Col span={4}>
                        <Form.Item
                          label="Name"
                          {...restField}
                          name={[name, "contact_name"]}
                          rules={[
                            {
                              min: 3,
                              max: 30,
                              message:
                                "Length must be Minimum 3 or Maximum 30 characters",
                            },
                          ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Designation"
                          {...restField}
                          name={[name, "designation"]}
                          rules={[
                            {
                              min: 3,
                              max: 30,
                              message:
                                "Length must be Minimum 3 or Maximum 30 characters",
                            },
                          ]}
                        >
                          <Input placeholder="Designation" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Phone No."
                          {...restField}
                          name={[name, "phone_no"]}
                          rules={[
                            {
                              min: 0,
                              max: 10,
                              message: "Length must be of 10 digits long",
                            },
                            {
                              pattern: /^[6-9][\d]{9}$/,
                              message: "Enter a valid phone number",
                            },
                          ]}
                        >
                          <Input placeholder="9876543210" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Email"
                          {...restField}
                          name={[name, "email"]}
                          rules={[
                            {
                              min: 10,
                              max: 80,
                              message:
                                "Length must be Minimum 10 or Maximum 80 characters",
                            },
                            {
                              type: "email",
                              message: "Enter valid email address",
                            },
                          ]}
                        >
                          <Input placeholder="user@exam.com" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="CC"
                          {...restField}
                          name={[name, "cc"]}
                          rules={[
                            {
                              min: 10,
                              max: 250,
                              message:
                                "Length must be Minimum 10 or Maximum 250 characters",
                            },
                            {
                              type: "email",
                              message: "Enter valid email address",
                            },
                          ]}
                        >
                          <Input placeholder="user@exam.com" />
                        </Form.Item>
                      </Col>
                      {fields.length > 1 && (
                        <DeleteOutlined
                          style={{ paddingLeft: 10, paddingTop: 30 }}
                          onClick={() => remove(name)}
                        />
                      )}
                    </Row>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    disabled={fields.length >= 5}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Address Details */}

          <Divider orientation="left" orientationMargin="0">
            Address Details
          </Divider>
          <Form.List name="address_details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Row gutter={[16, 4]}>
                      <Col span={8}>
                        <Form.Item
                          label="Address Type"
                          {...restField}
                          name={[name, "address_type"]}
                        >
                          <Select
                            placeholder="Select Type"
                            style={{ marginBottom: 5 }}
                          >
                            <Option value="Registered Address">
                              Registered Address
                            </Option>
                            <Option value="Bussiness Address">
                              Bussiness Address
                            </Option>
                            <Option value="Branch Address">
                              Branch Address
                            </Option>
                            <Option value="Unit Address">Unit Address</Option>
                            <Option value="Godown Address">
                              Godown Address
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Address Name"
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Name is required",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Row gutter={[0, 1]}>
                          <Col span={24} style={{ paddingBottom: 7 }}>
                            Address Details
                          </Col>
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
                            <Form.Item
                              {...restField}
                              name={[name, "pincode"]}
                              rules={[
                                {
                                  min: 6,
                                  max: 6,
                                  message:
                                    "Pincode Length must be 6 digits long",
                                },
                              ]}
                            >
                              <Input placeholder="Pincode" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "address_state"]}
                            >
                              <Select placeholder="Select State" showSearch>
                                {indianStates.map((state) => (
                                  <Option key={state.id} value={state.name}>
                                    {state.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "country"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Country is required",
                                },
                              ]}
                            >
                              <Select placeholder="Country" showSearch>
                                <Option value="India">India</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <DeleteOutlined
                            style={{ paddingLeft: 30 }}
                            onClick={() => remove(name)}
                          />
                        </Row>
                      </Col>
                      <Divider />
                    </Row>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      ) : null}
    </Form>
  );
};

export default ProfileForm;