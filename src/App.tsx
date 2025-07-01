import React from 'react';
import ProfileDrawerWrapper from './components/FormDrawerData';
import './App.css';

const App: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProfileDrawerWrapper />
    </div>
  );
};

export default App;



// const profiles: Profile[] = [];

// const count = parseInt(localStorage.getItem("profileCount") || "0");

// for (let i = 1; i <= count; i++) {
//   const profileStr = localStorage.getItem(`Profile_${i}`);
//   if (profileStr) {
//     profiles.push(JSON.parse(profileStr));
//   }
// }


// import React, { useEffect, useState } from "react";
// import { Table } from "antd";

// interface Profile {
//   party_name: string;
//   alias?: string;
//   party_grp: string;
//   gst_type: string;
//   gst_no?: string;
//   pan_no?: string;
// }

// const ProfilesTable = () => {
//   const [profiles, setProfiles] = useState<Profile[]>([]);

//   useEffect(() => {
//     // Get profileCount from localStorage
//     const count = parseInt(localStorage.getItem("profileCount") || "0");

//     const loadedProfiles: Profile[] = [];

//     for (let i = 1; i <= count; i++) {
//       const profileStr = localStorage.getItem(`Profile_${i}`);
//       if (profileStr) {
//         loadedProfiles.push(JSON.parse(profileStr));
//       }
//     }

//     setProfiles(loadedProfiles);
//   }, []);

//   const columns = [
//     {
//       title: "Party Name",
//       dataIndex: "party_name",
//       key: "party_name",
//     },
//     {
//       title: "Alias",
//       dataIndex: "alias",
//       key: "alias",
//     },
//     {
//       title: "Party Group",
//       dataIndex: "party_grp",
//       key: "party_grp",
//     },
//     {
//       title: "GST Type",
//       dataIndex: "gst_type",
//       key: "gst_type",
//     },
//     {
//       title: "GST No",
//       dataIndex: "gst_no",
//       key: "gst_no",
//     },
//     {
//       title: "PAN No",
//       dataIndex: "pan_no",
//       key: "pan_no",
//     },
//   ];

//   return <Table dataSource={profiles} columns={columns} rowKey="party_name" />;
// };

// export default ProfilesTable;
