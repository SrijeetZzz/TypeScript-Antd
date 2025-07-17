// import React from "react";
// import { Form, Input, Button, Checkbox, Typography, Row, Col, Divider } from "antd";
// import { GoogleOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const LoginPage: React.FC = () => {
//   const onFinish = (values: any) => {
//     console.log("Login Success:", values);
//   };

//   return (
//     <Row style={{ minHeight: "100vh" }}>
//       {/* Left Panel */}
//       <Col
//         span={12}
//         style={{
//           background: "linear-gradient(to bottom right, #2193b0, #6dd5ed)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "#fff",
//           flexDirection: "column",
//           padding: 40,
//         }}
//       >
//         <Title style={{ color: "#fff" }}>Don't have an account yet?</Title>
//         <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
//           Let’s get you all set up so you can start using our app.
//         </Text>
//         <Button type="default" style={{ marginTop: 20 }}>
//           Sign Up
//         </Button>
//       </Col>

//       {/* Right Panel */}
//       <Col
//         span={12}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           padding: 40,
//         }}
//       >
//         <Title level={3}>Capsi Expense</Title>
//         <Text type="secondary">Good to see you again! <br /> Track more. Stress less.</Text>

//         <Form
//           name="loginForm"
//           style={{ width: "100%", maxWidth: 350, marginTop: 30 }}
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             label="Email or Phone Number"
//             name="email"
//             rules={[{ required: true, message: "Please input your email or phone!" }]}
//           >
//             <Input placeholder="Enter Email / Phone Number" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password placeholder="Enter Password" />
//           </Form.Item>

//           <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 10 }}>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>

//           <Button type="primary" htmlType="submit" block>
//             Sign In
//           </Button>

//           <div style={{ textAlign: "right", marginTop: 10 }}>
//             <a href="#">Forgot password?</a>
//           </div>

//           <Divider>or continue with</Divider>

//           <Button icon={<GoogleOutlined />} block>
//             Sign in with Google
//           </Button>
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import { Table, Input, InputNumber, Select, Form, Button, Typography } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const { Option } = Select;

// interface ItemType {
//   key: string;
//   item: string;
//   description: string;
//   qty: number;
//   unitPrice: number;
//   discountPercent: number;
//   discountAmount: number;
//   gstPercent: number;
//   gstAmount: number;
//   grossAmount: number;
// }

// const EditableInvoiceTable: React.FC = () => {
//   const [form] = Form.useForm();
//   const [dataSource, setDataSource] = useState<ItemType[]>([]);
//   const [count, setCount] = useState(0);

//   const handleAddRow = () => {
//     const newItem: ItemType = {
//       key: `${count}`,
//       item: '',
//       description: '',
//       qty: 0,
//       unitPrice: 0,
//       discountPercent: 0,
//       discountAmount: 0,
//       gstPercent: 0,
//       gstAmount: 0,
//       grossAmount: 0,
//     };
//     setDataSource([...dataSource, newItem]);
//     setCount(count + 1);
//   };

//   const handleFieldChange = (value: any, record: ItemType, field: keyof ItemType) => {
//     const newData = dataSource.map((item) => {
//       if (item.key === record.key) {
//         const updated = { ...item, [field]: value };

//         const subtotal = updated.qty * updated.unitPrice;
//         updated.discountAmount = (updated.discountPercent / 100) * subtotal;
//         const taxable = subtotal - updated.discountAmount;
//         updated.gstAmount = (updated.gstPercent / 100) * taxable;
//         updated.grossAmount = taxable + updated.gstAmount;

//         return updated;
//       }
//       return item;
//     });

//     setDataSource(newData);
//   };

//   const columns = [
//     {
//       title: 'Item(s)',
//       dataIndex: 'item',
//       render: (_: any, record: ItemType) => (
//         <>
//           <Input
//             placeholder="Search for item"
//             value={record.item}
//             onChange={(e) => handleFieldChange(e.target.value, record, 'item')}
//             style={{ marginBottom: 4 }}
//           />
//           <Input
//             placeholder="Description"
//             value={record.description}
//             onChange={(e) => handleFieldChange(e.target.value, record, 'description')}
//           />
//         </>
//       ),
//     },
//     {
//       title: 'Qty',
//       dataIndex: 'qty',
//       render: (_: any, record: ItemType) => (
//         <InputNumber
//           min={0}
//           value={record.qty}
//           onChange={(val) => handleFieldChange(val || 0, record, 'qty')}
//         />
//       ),
//     },
//     {
//       title: 'Unit Price',
//       dataIndex: 'unitPrice',
//       render: (_: any, record: ItemType) => (
//         <InputNumber
//           min={0}
//           value={record.unitPrice}
//           onChange={(val) => handleFieldChange(val || 0, record, 'unitPrice')}
//         />
//       ),
//     },
//     {
//       title: 'Discount',
//       children: [
//         {
//           title: '%',
//           dataIndex: 'discountPercent',
//           render: (_: any, record: ItemType) => (
//             <InputNumber
//               min={0}
//               value={record.discountPercent}
//               onChange={(val) => handleFieldChange(val || 0, record, 'discountPercent')}
//             />
//           ),
//         },
//         {
//           title: '₹',
//           dataIndex: 'discountAmount',
//           render: (_: any, record: ItemType) => <span>{record.discountAmount.toFixed(2)}</span>,
//         },
//       ],
//     },
//     {
//       title: 'GST',
//       children: [
//         {
//           title: '%',
//           dataIndex: 'gstPercent',
//           render: (_: any, record: ItemType) => (
//             <Select
//               value={record.gstPercent}
//               onChange={(val) => handleFieldChange(val, record, 'gstPercent')}
//               style={{ width: '100%' }}
//             >
//               <Option value={0}>0%</Option>
//               <Option value={5}>5%</Option>
//               <Option value={12}>12%</Option>
//               <Option value={18}>18%</Option>
//               <Option value={28}>28%</Option>
//             </Select>
//           ),
//         },
//         {
//           title: '₹',
//           dataIndex: 'gstAmount',
//           render: (_: any, record: ItemType) => <span>{record.gstAmount.toFixed(2)}</span>,
//         },
//       ],
//     },
//     {
//       title: 'Gross Amount',
//       dataIndex: 'grossAmount',
//       render: (_: any, record: ItemType) => <span>{record.grossAmount.toFixed(2)}</span>,
//     },
//   ];

//   const total = dataSource.reduce((sum, item) => sum + item.grossAmount, 0);

//   return (
//     <Form form={form} layout="vertical">
//       <Table
//         bordered
//         dataSource={dataSource}
//         columns={columns}
//         pagination={false}
//         summary={() => (
//           <Table.Summary.Row>
//             <Table.Summary.Cell index={0} colSpan={columns.length - 1}>
//               <Typography.Text strong>Sub Total</Typography.Text>
//             </Table.Summary.Cell>
//             <Table.Summary.Cell index={columns.length - 1}>
//               <Typography.Text strong>{total.toFixed(2)}</Typography.Text>
//             </Table.Summary.Cell>
//           </Table.Summary.Row>
//         )}
//       />
//       <Button
//         type="dashed"
//         onClick={handleAddRow}
//         icon={<PlusOutlined />}
//         style={{ marginTop: 16 }}
//       >
//         Add Item / Other Expenses
//       </Button>
//     </Form>
//   );
// };

// export default EditableInvoiceTable;
import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Select, Form, Button, Typography, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ItemType {
  key: string;
  item: string;
  description: string;
  qty: number;
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  gstPercent: number;
  gstAmount: number;
  grossAmount: number;
}

const EditableInvoiceTable: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<ItemType[]>([{
    key: '0',
    item: '',
    description: '',
    qty: 0,
    unitPrice: 0,
    discountPercent: 0,
    discountAmount: 0,
    gstPercent: 0,
    gstAmount: 0,
    grossAmount: 0,
  }]);
  const [count, setCount] = useState(1);

  const handleAddRow = () => {
    const newItem: ItemType = {
      key: `${count}`,
      item: '',
      description: '',
      qty: 0,
      unitPrice: 0,
      discountPercent: 0,
      discountAmount: 0,
      gstPercent: 0,
      gstAmount: 0,
      grossAmount: 0,
    };
    setDataSource([...dataSource, newItem]);
    setCount(count + 1);
  };

  const handleDeleteRow = (key: string) => {
    setDataSource(prev => prev.filter(item => item.key !== key));
  };

  const handleFieldChange = (value: any, record: ItemType, field: keyof ItemType) => {
    let shouldAddRow = false;
    const newData = dataSource.map((item, index) => {
      if (item.key === record.key) {
        const updated = { ...item, [field]: value };

        const subtotal = updated.qty * updated.unitPrice;
        updated.discountAmount = (updated.discountPercent / 100) * subtotal;
        const taxable = subtotal - updated.discountAmount;
        updated.gstAmount = (updated.gstPercent / 100) * taxable;
        updated.grossAmount = taxable + updated.gstAmount;

        if (field === 'item' && index === dataSource.length - 1 && value.trim() !== '') {
          shouldAddRow = true;
        }

        return updated;
      }
      return item;
    });

    setDataSource(newData);
    if (shouldAddRow) handleAddRow();
  };

  const columns = [
    {
      title: 'Item(s)',
      dataIndex: 'item',
      render: (_: any, record: ItemType) => (
        <>
          <Input
            placeholder="Search for item"
            value={record.item}
            onChange={(e) => handleFieldChange(e.target.value, record, 'item')}
            style={{ marginBottom: 4 }}
          />
          <Input
            placeholder="Description"
            value={record.description}
            onChange={(e) => handleFieldChange(e.target.value, record, 'description')}
          />
        </>
      ),
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      render: (_: any, record: ItemType) => (
        <InputNumber
          min={0}
          value={record.qty}
          onChange={(val) => handleFieldChange(val || 0, record, 'qty')}
        />
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (_: any, record: ItemType) => (
        <InputNumber
          min={0}
          value={record.unitPrice}
          onChange={(val) => handleFieldChange(val || 0, record, 'unitPrice')}
        />
      ),
    },
    {
      title: 'Discount',
      children: [
        {
          title: '%',
          dataIndex: 'discountPercent',
          render: (_: any, record: ItemType) => (
            <InputNumber
              min={0}
              value={record.discountPercent}
              onChange={(val) => handleFieldChange(val || 0, record, 'discountPercent')}
            />
          ),
        },
        {
          title: '₹',
          dataIndex: 'discountAmount',
          render: (_: any, record: ItemType) => (
            <InputNumber
              min={0}
              value={record.discountAmount}
              onChange={(val) => handleFieldChange(val || 0, record, 'discountAmount')}
            />
          ),
        },
      ],
    },
    {
      title: 'GST',
      children: [
        {
          title: '%',
          dataIndex: 'gstPercent',
          render: (_: any, record: ItemType) => (
            <Select
              value={record.gstPercent}
              onChange={(val) => handleFieldChange(val, record, 'gstPercent')}
              style={{ width: '100%' }}
            >
              <Option value={0}>0%</Option>
              <Option value={5}>5%</Option>
              <Option value={12}>12%</Option>
              <Option value={18}>18%</Option>
              <Option value={28}>28%</Option>
            </Select>
          ),
        },
        {
          title: '₹',
          dataIndex: 'gstAmount',
          render: (_: any, record: ItemType) => (
            <InputNumber
              min={0}
              value={record.gstAmount}
              onChange={(val) => handleFieldChange(val || 0, record, 'gstAmount')}
            />
          ),
        },
      ],
    },
    {
      title: 'Gross Amount',
      dataIndex: 'grossAmount',
      render: (_: any, record: ItemType) => (
        <InputNumber
          min={0}
          value={record.grossAmount}
          onChange={(val) => handleFieldChange(val || 0, record, 'grossAmount')}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: ItemType, index: number) => (
        index < dataSource.length - 1 ? (
          <Popconfirm title="Delete this row?" onConfirm={() => handleDeleteRow(record.key)}>
            <Button icon={<DeleteOutlined />} danger type="text" />
          </Popconfirm>
        ) : null
      ),
    },
  ];

  const summaryTotals = dataSource.reduce((acc, item) => {
    acc.qty += item.qty;
    acc.unitPrice += item.unitPrice;
    acc.discountPercent += item.discountPercent;
    acc.discountAmount += item.discountAmount;
    acc.gstAmount += item.gstAmount;
    acc.grossAmount += item.grossAmount;
    return acc;
  }, {
    qty: 0,
    unitPrice: 0,
    discountPercent: 0,
    discountAmount: 0,
    gstAmount: 0,
    grossAmount: 0,
  });

  return (
    <Form form={form} layout="vertical">
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Sub Total</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>{summaryTotals.qty}</Table.Summary.Cell>
            <Table.Summary.Cell index={2}>{summaryTotals.unitPrice.toFixed(2)}</Table.Summary.Cell>
            <Table.Summary.Cell index={3}>{summaryTotals.discountPercent.toFixed(2)}</Table.Summary.Cell>
            <Table.Summary.Cell index={4}>{summaryTotals.discountAmount.toFixed(2)}</Table.Summary.Cell>
            <Table.Summary.Cell index={5}>{/* GST % column left blank */}</Table.Summary.Cell>
            <Table.Summary.Cell index={6}>{summaryTotals.gstAmount.toFixed(2)}</Table.Summary.Cell>
            <Table.Summary.Cell index={7}>{summaryTotals.grossAmount.toFixed(2)}</Table.Summary.Cell>
            <Table.Summary.Cell index={8} />
          </Table.Summary.Row>
        )}
      />
    </Form>
  );
};

export default EditableInvoiceTable;
