// import { Button, Drawer, Form, Modal, Row, Space, Table } from "antd";
// import { getProfile } from "../utils/storeProfile";
// import { useEffect, useState } from "react";
// import { gstType, type Profile } from "../interfaces/Profile";
// import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import ProfileForm from "./CapsiBillingForm";
// import ProfileDrawerWrapper from "./FormDrawerData";

// interface ProfileWithKey {
//   key: string;
//   data: Profile;
// }

// const ProfilesTable: React.FC = () => {
//   const [form] = Form.useForm();
//   const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
//   const [open, setOpen] = useState(false);
//   const [openD, setOpenD] = useState(false);
//   const [openAddDrawer, setOpenAddDrawer] = useState(false); // ✅ for add
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   useEffect(() => {
//     setProfiles(getProfile());
//   }, []);

//   const tableData = profiles.map(({ key, data }) => ({ ...data, key }));

//   const handleOpen = (key: string) => {
//     setSelectedKey(key);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedKey(null);
//   };

//   const onCloseDrawer = () => {
//     setOpenD(false);
//     setSelectedKey(null);
//   };

//   const handleConfirmDelete = () => {
//     if (!selectedKey) return;
//     const raw = localStorage.getItem(selectedKey);
//     if (!raw) return;
//     localStorage.removeItem(selectedKey);
//     setProfiles((prev) => prev.filter((profile) => profile.key !== selectedKey));
//     const count = parseInt(localStorage.getItem("profileCount") || "0");
//     if (count > 0) {
//       const val = count - 1;
//       localStorage.setItem("profileCount", val.toString());
//     }
//     handleClose();
//   };

//   const editSuccessDrawer = () => {
//     setProfiles(getProfile());
//     setSelectedKey(null);
//     setOpenD(false);
//   };

//   const showDrawer = (key: string) => {
//     const selectedProfile = profiles.find((p) => p.key === key);
//     if (selectedProfile) {
//       form.setFieldsValue(selectedProfile.data);
//       setSelectedKey(key);
//       setOpenD(true);
//     }
//   };

//   const columns = [
//     {
//       title: "S.No.",
//       dataIndex: "key",
//       key: "key",
//       render: (_: number, __: Profile, index: number) => <>{index + 1}</>,
//     },
//     { title: "Party Name", dataIndex: "ledgerName", key: "ledgerName" },
//     { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
//     {
//       title: "Party Type",
//       dataIndex: "gstType",
//       key: "gstType",
//       render: (gstTypeId: number) => {
//         const gst = gstType.find((item) => item.id === gstTypeId);
//         return <>{gst?.name}</>;
//       },
//     },
//     { title: "Contact No", dataIndex: "phone", key: "phone" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: Profile & { key: string }) => (
//         <>
//           <EditOutlined onClick={() => showDrawer(record.key)} />
//           <DeleteOutlined
//             style={{ color: "red", marginLeft: 12 }}
//             onClick={() => handleOpen(record.key)}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       {/* ✅ Add Party Button */}
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => setOpenAddDrawer(true)}
//         style={{ marginBottom: 16 }}
//       >
//         Add Party
//       </Button>

//       {/* ✅ Drawer for Adding Party */}
//       <ProfileDrawerWrapper
//         open={openAddDrawer}
//         onClose={() => setOpenAddDrawer(false)}
//         onSuccess={() => {
//           setProfiles(getProfile());
//           setOpenAddDrawer(false);
//         }}
//       />

//       <Table dataSource={tableData} columns={columns} rowKey="ledgerName" />

//       <Modal
//         open={open}
//         title="Confirmation"
//         onOk={handleConfirmDelete}
//         onCancel={handleClose}
//       >
//         <p>Are you sure you want to delete Party?</p>
//       </Modal>

//       <Drawer
//         width={900}
//         title={
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <span>Edit Party</span>
//             {/* <Button type="text" icon={<CloseOutlined />} onClick={onCloseDrawer} /> */}
//           </div>
//         }
//         open={openD}
//         onClose={onCloseDrawer}
//         footer={
//           <Row justify="end">
//             <Space>
//               <Button onClick={() => { form.resetFields(); setOpenD(false); }}>
//                 Cancel
//               </Button>
//               <Button type="primary" onClick={() => form.submit()}>
//                 Submit
//               </Button>
//             </Space>
//           </Row>
//         }
//       >
//         <ProfileForm
//           onSuccess={editSuccessDrawer}
//           onClose={onCloseDrawer}
//           form={form}
//           selectedKey={selectedKey}
//         />
//       </Drawer>
//     </>
//   );
// };

// export default ProfilesTable;


// ProfilesTable.tsx

import {
  Button,
  Drawer,
  Form,
  Modal,
  Row,
  Space,
  Table
} from "antd";
import { getProfile } from "../utils/storeProfile";
import { useEffect, useState } from "react";
import { gstType, type Profile } from "../interfaces/Profile";
import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProfileForm from "./CapsiBillingForm";

interface ProfileWithKey {
  key: string;
  data: Profile;
}

const ProfilesTable: React.FC = () => {
  const [form] = Form.useForm();
  const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    setProfiles(getProfile());
  }, [refreshToggle]);

  const refreshProfiles = () => {
    // setProfiles(getProfile());
    setRefreshToggle((prev) => !prev);
  };

  const handleOpen = (key: string) => {
    setSelectedKey(key);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedKey(null);
  };

  const onCloseDrawer = () => {
    setOpenD(false);
    setSelectedKey(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedKey) return;
    const raw = localStorage.getItem(selectedKey);
    if (!raw) return;
    localStorage.removeItem(selectedKey);
    setProfiles((prev) => prev.filter((profile) => profile.key !== selectedKey));
    const count = parseInt(localStorage.getItem("profileCount") || "0");
    if (count > 0) {
      const val = count - 1;
      localStorage.setItem("profileCount", val.toString());
    }
    handleClose();
  };

  const editSuccessDrawer = () => {
    refreshProfiles();
    setSelectedKey(null);
    setOpenD(false);
  };

  const showDrawer = (key: string) => {
    const selectedProfile = profiles.find((p) => p.key === key);
    if (selectedProfile) {
      form.setFieldsValue(selectedProfile.data);
      setSelectedKey(key);
      setOpenD(true);
    }
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
      key: "key",
      render: (_: number, __: Profile, index: number) => <>{index + 1}</>,
    },
    { title: "Party Name", dataIndex: "ledgerName", key: "ledgerName" },
    { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
    {
      title: "Party Type",
      dataIndex: "gstType",
      key: "gstType",
      render: (gstTypeId: number) => {
        const gst = gstType.find((item) => item.id === gstTypeId);
        return <>{gst?.name}</>;
      },
    },
    { title: "Contact No", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Profile & { key: string }) => (
        <>
          <EditOutlined onClick={() => showDrawer(record.key)} />
          <DeleteOutlined
            style={{ color: "red", marginLeft: 12 }}
            onClick={() => handleOpen(record.key)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        title="Confirmation"
        onOk={handleConfirmDelete}
        onCancel={handleClose}
      >
        <p>Are you sure you want to delete Party?</p>
      </Modal>

      <Drawer
        width={900}
        open={openD}
        onClose={onCloseDrawer}
        closable={false}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Edit Party</span>
            <Button type="text" icon={<CloseOutlined />} onClick={onCloseDrawer} />
          </div>
        }
        footer={
          <Row justify="end">
            <Space>
              <Button onClick={() => { form.resetFields(); onCloseDrawer(); }}>
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
          onSuccess={editSuccessDrawer}
          onClose={onCloseDrawer}
          form={form}
          selectedKey={selectedKey}
        />
      </Drawer>
      <Table dataSource={profiles.map(({ key, data }) => ({ ...data, key }))} columns={columns} rowKey="key" />
    </>
  );
};

export default ProfilesTable;
