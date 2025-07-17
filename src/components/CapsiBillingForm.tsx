import React, { useState } from "react";
import type { Profile } from "../interfaces/Profile";
import {
  indianStates,
  addressType,
  gstType,
  bussinessType,
  bussinessNature,
} from "../interfaces/Profile";
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
  onSuccess?: () => void;  // storing the data on submiison and showing the data //
  onClose?: () => void; // passing parent prop for closing the form //
  form: FormInstance<Profile>;  // passing instance of a form for submission //
  selectedKey?: string | null;  // for editing data //
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSuccess,
  form,
  selectedKey,

}) => {
  const { Option } = Select;
  const display: string = Form.useWatch("party_grp", form);
  const display_two: number = Form.useWatch("gstType", form);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [ggst, setGgst] = useState("");
  const [udyam,setUdyam]=useState<string>("");

// fn for changing pan and state

  const handlePanAndStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value.length > 2) {
      const code = value.slice(0, 2);
      const state = indianStates.find((e) => e.id === parseInt(code));
      const stateId = state?.id;
      form.setFieldValue("state", stateId);
    }
    if (value.length > 12) {
      const val = value.slice(2, 12);
      form.setFieldValue("pan", val);
    }
    setGgst("")
  };

// fn for storing for udyam value (as its an event)

  const handleChangeUdyam=(event: React.ChangeEvent<HTMLInputElement>)=>{
    const value = event.target.value;
    setUdyam(value);
  }

//fn for setting the gst value

  const handleTypeChange = (value: number) => {
    setSelectedType(value);
  };

// fn for form submission

  const onFinish = (values: Profile) => {
    const udyamId = 'UDYAM-' + udyam;
    console.log(udyamId)
    form.setFieldValue("msmeNo",udyamId);
    values.msmeNo = udyamId;
    if (selectedKey) {
      localStorage.setItem(selectedKey, JSON.stringify(values));
    } else {
      const count = parseInt(localStorage.getItem("profileCount") || "0");
      localStorage.setItem(`${count + 1}`, JSON.stringify(values));
      localStorage.setItem("profileCount", (count + 1).toString());
    }
    form.resetFields();
    onSuccess?.();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        iec: null,
        website: null,
        aliasName:"",
        istransporter: false,
        contactInformation: [
          {
            phone: null,
            ccTo: null,
          },
        ],
        addresses: [
          {
            address: {
              landmark: null,
              state: 0,
            },
          },
        ],
      }}
    >
      {/* Add party */}

      <Row gutter={[16, 4]}>
        <Col span={8}>
          <Form.Item
            label="Party Name"
            name="ledgerName"
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
            name="aliasName"
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
                pattern: /^[a-zA-Z\d][a-zA-Z\d\s.,()_&-]{2,80}$/,
                message:
                  "Only alphanumeric with space and some special characters i.e. '_', '(', ')', '&', '-', '.' and ',' are allowed",
              },
            ]}
          >
            <Input  />
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
              placeholder="Please select A Party Group"
              showSearch
              onChange={() => {
                form.setFieldValue("gstType", 1);
                setSelectedType(1);
                form.setFieldValue("addresses", [
                  {
                    type: 0,
                    addressName: "Billing Address",
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
                name="gstType"
                rules={[
                  {
                    required: true,
                    message: "GST Type is required",
                  },
                ]}
              >
                <Select
                  placeholder="Select GST Type"
                  onChange={handleTypeChange}
                  value={selectedType}
                >
                  {gstType.map((gsttype) => (
                    <Option key={gsttype.id} value={gsttype.id}>
                      {gsttype.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {display_two != 4 ? (
              <>
                <Col span={6}>
                  <Form.Item
                    label="GSTIN"
                    name="gstin"
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
                      disabled={selectedType === 1}
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
                name="pan"
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
                    selectedType === 2 ||
                    selectedType === 3 ||
                    selectedType === 5 ||
                    selectedType === 6
                  }
                />
              </Form.Item>
            </Col>
            {display_two != 4 ? (
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
                        selectedType === 2 ||
                        selectedType === 3 ||
                        selectedType === 5 ||
                        selectedType === 6
                      }
                    >
                      {indianStates.map((states) => (
                        <Option key={states.id} value={states.id}>
                          {states.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : null}
            <Col span={6}>
              <Form.Item label="Bussiness Type" name="bussinessType">
                <Select placeholder="Select Type" showSearch>
                  {bussinessType.map((bt) => (
                    <Option key={bt.id} value={bt.id}>
                      {bt.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Bussiness Nature" name="businessNature">
                <Select placeholder="Select Type" mode="multiple" showSearch>
                  {bussinessNature.map((bn) => (
                    <Option key={bn.id} value={bn.id}>
                      {bn.name}
                    </Option>
                  ))}
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
                name="msmeNo"
                rules={[
                  {
                    pattern: /^[A-Z]{2}-[\d]{2}-[\d]{7}$/,
                    message: "Enter valid 19 digit MSME No. including '-'",
                  },
                ]}
              >
                <Input placeholder="XX-00-0123456" addonBefore="UDYAM-" value={udyam} onChange={handleChangeUdyam}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="istransporter" valuePropName="checked">
               <Checkbox style={{ paddingTop: 10 }}>Is Transporter</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          {/* Contact Details */}

          <Divider orientation="left" orientationMargin="0">
            Contact Details
          </Divider>
          <Form.List
            name="contactInformation"
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
                {fields.map(({ key, name, }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Row gutter={[16, 4]}>
                      <Col span={4}>
                        <Form.Item
                          label="Name"
                        
                          name={[name, "name"]}
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
                          
                          name={[name, "phone"]}
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
                          
                          name={[name, "ccTo"]}
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
                    onClick={() => add({ phone: null, ccTo: null })}
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
          <Form.List name="addresses">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Row gutter={[16, 4]}>
                      <Col span={8}>
                        <Form.Item
                          label="Address Type"
                          name={[name, "type"]}
                        >
                          <Select
                            placeholder="Select Type"
                            style={{ marginBottom: 5 }}
                          >
                            {addressType.map((at) => (
                              <Option key={at.id} value={at.id}>
                                {at.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Address Name"
                          name={[name, "addressName"]}
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
                            <Form.Item name={[name, "building"]}>
                              <Input placeholder="Building" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name={[name, "street"]}>
                              <Input placeholder="Street" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name={[name, "landmark"]}>
                              <Input placeholder="Landmark" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name={[name, "city"]}>
                              <Input placeholder="City" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name={[name, "district"]}>
                              <Input placeholder="District" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
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
                            <Form.Item name={[name, "state"]}>
                              <Select placeholder="Select State" showSearch>
                                {indianStates.map((state) => (
                                  <Option key={state.id} value={state.id}>
                                    {state.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name={[name, "country"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Country is required",
                                },
                              ]}
                            >
                              <Select placeholder="Country" showSearch>
                                <Option value="INDIA">India</Option>
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