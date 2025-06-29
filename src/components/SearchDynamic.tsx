import  { useState } from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const DynamicFieldsForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <Form layout="vertical" style={{ maxWidth: 400 }}>
      <Form.Item label="Choose option" name="option" rules={[{ required: true }]}>
        <Select placeholder="Select an option" onChange={handleSelectChange}>
          <Option value="a">Option A</Option>
          <Option value="b">Option B</Option>
          <Option value="c">Option C</Option>
        </Select>
      </Form.Item>

      {/* Show this field only if option A or C is selected */}
      {(selectedOption === 'a' || selectedOption === 'c') && (
        <Form.Item label="Field 1 (for A & C)" name="field1" rules={[{ required: true }]}>
          <Input placeholder="Field 1" />
        </Form.Item>
      )}

      {/* Show this field only if option B is selected */}
      {selectedOption === 'b' && (
        <Form.Item label="Field 2 (for B)" name="field2" rules={[{ required: true }]}>
          <Input placeholder="Field 2" />
        </Form.Item>
      )}

      {/* Show this field only if option C is selected */}
      {selectedOption === 'c' && (
        <Form.Item label="Field 3 (only for C)" name="field3" rules={[{ required: true }]}>
          <Input placeholder="Field 3" />
        </Form.Item>
      )}
    </Form>
  );
};

export default DynamicFieldsForm;
