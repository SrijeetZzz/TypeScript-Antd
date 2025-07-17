
// import { Button, Drawer, Form, Modal, Row, Space, Table } from "antd";
// import { getProfile } from "../utils/storeProfile";
// import { useEffect, useState } from "react";
// import { gstType, type Profile } from "../interfaces/Profile";
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import ProfileForm from "../components/CapsiBillingForm";
// import ProfileDrawerWrapper from "../components/FormDrawerData";

// interface ProfileWithKey {
//   key: string;
//   data: Profile;
// }

// const ProfilesTable: React.FC = () => {
//   const [form] = Form.useForm();
//   const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
//   const [open, setOpen] = useState(false);
//   const [openD, setOpenD] = useState(false);
//   const [openAddDrawer, setOpenAddDrawer] = useState(false);
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   useEffect(() => {
//     setProfiles(getProfile());
//   }, []);

//   const tableData = profiles.map(({ key, data }) => ({ ...data, key }));

//   //opening delete button (modal)

//   const handleOpen = (key: string) => {
//     setSelectedKey(key);
//     setOpen(true);
//   };

//   // closing the modal

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedKey(null);
//   };

//   // closing the drawer

//   const onCloseDrawer = () => {
//     setOpenD(false);
//     setSelectedKey(null);
//   };

//   //deleting the data (after modal clicked ok)

//   const handleConfirmDelete = () => {
//     if (!selectedKey) return;
//     const raw = localStorage.getItem(selectedKey);
//     if (!raw) return;
//     localStorage.removeItem(selectedKey);
//     setProfiles((prev) =>
//       prev.filter((profile) => profile.key !== selectedKey)
//     );
//     const count = parseInt(localStorage.getItem("profileCount") || "0");
//     if (count > 0) {
//       const val = count - 1;
//       localStorage.setItem("profileCount", val.toString());
//     }
//     handleClose();
//   };

//   //closes the drawer on successful submission

//   const editSuccessDrawer = () => {
//     setProfiles(getProfile());
//     setSelectedKey(null);
//     setOpenD(false);
//   };

//   //opening the drawer for edit button

//   const showDrawer = (key: string) => {
//     const selectedProfile = profiles.find((p) => p.key === key);
//     if (selectedProfile) {
//       const updatedProfile = { ...selectedProfile.data };
//       if (updatedProfile.msmeNo) {
//         updatedProfile.msmeNo = updatedProfile.msmeNo.slice(6);
//       }
//       form.setFieldsValue(updatedProfile);
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
//     {
//       title: "Party Name",
//       dataIndex: "ledgerName",
//       key: "ledgerName",
//       sorter:(a:Profile,b:Profile)=>{
//         return a.ledgerName.localeCompare(b.ledgerName);
//       },
//       render: (_: any, record: Profile) => {
//         return (
//           <>
//             {record.ledgerName}
//             {record.aliasName?.length>0 ? `(${record.aliasName})` : ""}
//           </>
//         );
//       },
//     },
//     { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
//     {
//       title: "Party Type",
//       dataIndex: "gstType",
//       key: "gstType",
//       render: (gstTypeId: number) => {
//         const gst = gstType.find((item) => item.id === gstTypeId);
//         return gst?.name;
//       },
//     },
//     { title: "Contact No", dataIndex: "phone", key: "phone", render:(_:any,record:Profile)=>{
//         return record.contactInformation[0].phone;
//     } },
//     { title: "Email", dataIndex: "email", key: "email" , render:(_:any,record:Profile)=>{
//         return record.contactInformation[0].email;
//     }},
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
//     <div>

//       {/*Add Party Button */}

//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => setOpenAddDrawer(true)}
//         style={{ marginBottom: 16, display: "flex", alignItems: "left" }}
//       >
//         Add Party
//       </Button>

//       {/*Drawer for Adding Party */}

//       <ProfileDrawerWrapper
//         open={openAddDrawer}
//         onClose={() => setOpenAddDrawer(false)}
//         onSuccess={() => {
//           setProfiles(getProfile());
//           setOpenAddDrawer(false);
//         }}
//       />

//       {/* Table */}

//       <Table
//         dataSource={tableData}
//         columns={columns}
//         rowKey="key"
//         style={{ width: "100vw" }}
//       />

//       {/* Modal for deletion */}

//       <Modal
//         open={open}
//         title="Confirmation"
//         onOk={handleConfirmDelete}
//         onCancel={handleClose}
//       >
//         <p>Are you sure you want to delete Party?</p>
//       </Modal>

//       {/* Drawer for editing */}

//       <Drawer
//         width={900}
//         title={
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span>Edit Party</span>
//           </div>
//         }
//         open={openD}
//         onClose={onCloseDrawer}
//         footer={
//           <Row justify="end">
//             <Space>
//               <Button
//                 onClick={() => {
//                   form.resetFields();
//                   setOpenD(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button type="primary" onClick={() => form.submit()}>
//                 Submit
//               </Button>
//             </Space>
//           </Row>
//         }
//       >
//         {/* Profile form component for Drawer */}

//         <ProfileForm
//           onSuccess={editSuccessDrawer}
//           onClose={onCloseDrawer}
//           form={form}
//           selectedKey={selectedKey}
//         />
//       </Drawer>
//     </div>
//   );
// };

// export default ProfilesTable;

import { Button, Modal, Row, Space, Table } from "antd";
import { getProfile } from "../utils/storeProfile";
import { useEffect, useState } from "react";
import { gstType, type Profile } from "../interfaces/Profile";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProfileDrawerWrapper from "../components/FormDrawerData";

interface ProfileWithKey {
  key: string;
  data: Profile;
}

const ProfilesTable: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [initialProfile, setInitialProfile] = useState<Profile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setProfiles(getProfile());
  }, []);

  const tableData = profiles.map(({ key, data }) => ({ ...data, key }));

  const handleDelete = (key: string) => {
    setSelectedKey(key);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedKey) return;
    localStorage.removeItem(selectedKey);
    setProfiles((prev) => prev.filter((p) => p.key !== selectedKey));
    const count = parseInt(localStorage.getItem("profileCount") || "0");
    if (count > 0) {
      localStorage.setItem("profileCount", (count - 1).toString());
    }
    setDeleteModalOpen(false);
    setSelectedKey(null);
  };

  const handleEdit = (key: string) => {
    const selectedProfile = profiles.find((p) => p.key === key);
    if (selectedProfile) {
      const updatedProfile = { ...selectedProfile.data };
      if (updatedProfile.msmeNo) {
        updatedProfile.msmeNo = updatedProfile.msmeNo.slice(6);
      }
      setInitialProfile(updatedProfile);
      setSelectedKey(key);
      setDrawerMode("edit");
      setDrawerOpen(true);
    }
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
      key: "key",
      render: (_: number, __: Profile, index: number) => <>{index + 1}</>,
    },
    {
      title: "Party Name",
      dataIndex: "ledgerName",
      key: "ledgerName",
      sorter: (a: Profile, b: Profile) => a.ledgerName.localeCompare(b.ledgerName),
      render: (_: any, record: Profile) => (
        <>
          {record.ledgerName}
          {record.aliasName?.length > 0 ? `(${record.aliasName})` : ""}
        </>
      ),
    },
    { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
    {
      title: "Party Type",
      dataIndex: "gstType",
      key: "gstType",
      render: (gstTypeId: number) => gstType.find((g) => g.id === gstTypeId)?.name,
    },
    {
      title: "Contact No",
      key: "phone",
      render: (_: any, record: Profile) => record.contactInformation?.[0]?.phone,
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: Profile) => record.contactInformation?.[0]?.email,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Profile & { key: string }) => (
        <>
          <EditOutlined onClick={() => handleEdit(record.key)} />
          <DeleteOutlined style={{ color: "red", marginLeft: 12 }} onClick={() => handleDelete(record.key)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setDrawerMode("add");
          setInitialProfile(null);
          setSelectedKey(null);
          setDrawerOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Party
      </Button>

      <Table dataSource={tableData} columns={columns} rowKey="key" style={{ width: "100vw" }} />

      <Modal
        open={deleteModalOpen}
        title="Confirmation"
        onOk={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this party?</p>
      </Modal>

      <ProfileDrawerWrapper
        mode={drawerMode}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setInitialProfile(null);
          setSelectedKey(null);
        }}
        onSuccess={() => {
          setProfiles(getProfile());
          setDrawerOpen(false);
          setInitialProfile(null);
          setSelectedKey(null);
        }}
        selectedKey={selectedKey}
        initialValues={initialProfile}
      />
    </div>
  );
};

export default ProfilesTable;
