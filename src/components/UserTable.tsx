// import { Button, Modal, Table } from "antd";
// import { getProfile } from "../utils/storeProfile";
// import { useEffect, useState } from "react";
// import type { Profile } from "../interfaces/Profile";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// interface ProfileWithKey {
//   key: string;
//   data: Profile;
// }
// const ProfilesTable: React.FC = () => {
//   const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
//   const [open,setOpen] = useState<boolean>(false);

//   useEffect(() => {
//     setProfiles(getProfile());
//   }, []);

//   const handleOpen = () =>{
//     setOpen(true);
//   }
//   const handleClose= () =>{
//      setOpen(false);
//   }
//   const handleCancel = () => {
//     setOpen(false);
//   };

//   const tableData = profiles.map(({ key, data }) => ({
//     ...data,
//     key,
//   }));
//   const handleConfirmDelete = (keyToDelete:string) => {
//   if (!keyToDelete) return;
//   const raw = localStorage.getItem(keyToDelete);
//   if (!raw) return;
//   const data = JSON.parse(raw);
//   const name = data.party_name;

//   localStorage.removeItem(keyToDelete);
//   setProfiles((prev) => prev.filter((profile) => profile.key !== keyToDelete));
//   const count = parseInt(localStorage.getItem("profileCount") || "0");
//   if (count > 0) {
//     const val = count - 1;
//     localStorage.setItem("profileCount", val.toString());
//   }
//   handleClose();
// };

//   const columns = [
//     { title: "Party Name", dataIndex: "party_name", key: "party_name" },
//     { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
//     { title: "Party Type", dataIndex: "party_type", key: " party_grp" },
//     { title: "Contact No", dataIndex: "phone_no", key: "phone_no" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: Profile & ( {key: string}) ) => {
//         return (
//           <>
//             <EditOutlined />
//             <DeleteOutlined
//               style={{ color: "red", marginLeft: 12 }}
//               onClick={()=>handleOpen(record.key)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <Table dataSource={tableData} columns={columns} rowKey="party_name" />
//       <Modal
//         open={open}
//         title="Title"
//         onOk={()=>handleConfirmDelete}
//         onCancel={handleCancel}
//         footer={(_, { OkBtn, CancelBtn }) => (
//           <>
            
//             <CancelBtn />
//             <OkBtn />
//           </>
//         )}
//       >
//         <p>Are you sure you want to delete this profile?</p>
//       </Modal>
//     </>
//   );
// };

// export default ProfilesTable;

import { Button, Modal, Table } from "antd";
import { getProfile } from "../utils/storeProfile";
import { useEffect, useState } from "react";
import type { Profile } from "../interfaces/Profile";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ProfileWithKey {
  key: string;
  data: Profile;
}

const ProfilesTable: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    setProfiles(getProfile());
  }, []);

  const handleOpen = (key: string) => {
    setSelectedKey(key);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const tableData = profiles.map(({ key, data }) => ({
    ...data,
    key,
  }));

  const columns = [
    { title: "Party Name", dataIndex: "party_name", key: "party_name" },
    { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
    { title: "Party Type", dataIndex: "party_type", key: "party_type" },
    { title: "Contact No", dataIndex: "phone_no", key: "phone_no" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Profile & { key: string }) => {
        return (
          <>
            <EditOutlined style={{ marginRight: 12 }} />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => handleOpen(record.key)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={tableData} columns={columns} rowKey="key" />
      <Modal
        open={open}
        title="Delete Confirmation"
        onOk={handleConfirmDelete}
        onCancel={handleClose}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are you sure you want to delete this profile?</p>
      </Modal>
    </>
  );
};

export default ProfilesTable;

// import { Button, Drawer, Modal, Table, Form } from "antd";
// import { getProfile } from "../utils/storeProfile";
// import { useEffect, useState } from "react";
// import type { Profile } from "../interfaces/Profile";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import ProfileForm from "./CapsiBillingForm";

// interface ProfileWithKey {
//   key: string;
//   data: Profile;
// }

// const ProfilesTable: React.FC = () => {
//   const [profiles, setProfiles] = useState<ProfileWithKey[]>([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);
//   const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
//   const [form] = Form.useForm<Profile>();

//   useEffect(() => {
//     setProfiles(getProfile());
//   }, []);

//   const handleDeleteClick = (key: string) => {
//     setSelectedKey(key);
//     setDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (!selectedKey) return;
//     localStorage.removeItem(selectedKey);
//     setProfiles((prev) => prev.filter((profile) => profile.key !== selectedKey));

//     const count = parseInt(localStorage.getItem("profileCount") || "0");
//     if (count > 0) {
//       localStorage.setItem("profileCount", (count - 1).toString());
//     }
//     setDeleteModalOpen(false);
//     setSelectedKey(null);
//   };

//   const handleEditClick = (record: Profile & { key: string }) => {
//     setSelectedKey(record.key);       // Set the selected key to know which profile is editing
//     form.setFieldsValue(record);      // Load existing data into form
//     setDrawerOpen(true);
//   };

//   const handleEditSuccess = () => {
//     setDrawerOpen(false);
//     setSelectedKey(null);             // Clear selected key after edit success
//     setProfiles(getProfile());        // Reload profiles from localStorage to refresh table
//   };

//   const tableData = profiles.map(({ key, data }) => ({
//     ...data,
//     key,
//   }));

//   const columns = [
//     { title: "Party Name", dataIndex: "party_name", key: "party_name" },
//     { title: "Party Group", dataIndex: "party_grp", key: "party_grp" },
//     { title: "Party Type", dataIndex: "party_type", key: "party_type" },
//     { title: "Contact No", dataIndex: "phone_no", key: "phone_no" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: Profile & { key: string }) => (
//         <>
//           <EditOutlined
//             onClick={() => handleEditClick(record)}
//             style={{ marginRight: 12, cursor: "pointer" }}
//           />
//           <DeleteOutlined
//             onClick={() => handleDeleteClick(record.key)}
//             style={{ color: "red", cursor: "pointer" }}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table dataSource={tableData} columns={columns} rowKey="key" />

//       {/* Delete Confirmation Modal */}
//       <Modal
//         open={deleteModalOpen}
//         title="Delete Confirmation"
//         onOk={handleConfirmDelete}
//         onCancel={() => setDeleteModalOpen(false)}
//         footer={(_, { OkBtn, CancelBtn }) => (
//           <>
//             <CancelBtn />
//             <OkBtn />
//           </>
//         )}
//       >
//         <p>Are you sure you want to delete this profile?</p>
//       </Modal>

//       {/* Edit Drawer */}
//       <Drawer
//         title="Edit Profile"
//         placement="right"
//         width={800}
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         destroyOnClose
//       >
//         <ProfileForm
//           form={form}
//           onSuccess={handleEditSuccess}
//           profileKey={selectedKey}   // Pass the selected key to update correct profile
//         />
//       </Drawer>
//     </>
//   );
// };

// export default ProfilesTable;
