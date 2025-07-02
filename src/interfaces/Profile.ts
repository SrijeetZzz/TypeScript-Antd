export const indianStates = [
    {
        "name": "Andaman and Nicobar Islands",
        "id": 35
    },
    {
        "name": "Andhra Pradesh",
        "id": 37
    },
    {
        "name": "Arunachal Pradesh",
        "id": 12
    },
    {
        "name": "Assam",
        "id": 18
    },
    {
        "name": "Bihar",
        "id": 10
    },
    {
        "name": "Centre Jurisdiction",
        "id": 99
    },
    {
        "name": "Chandigarh",
        "id": 4
    },
    {
        "name": "Chhattisgarh",
        "id": 22
    },
    {
        "name": "Dadra and Nagar Haveli and Daman and Diu",
        "id": 26
    },
    {
        "name": "Delhi",
        "id": 7
    },
    {
        "name": "Foreign Country",
        "id": 96
    },
    {
        "name": "Goa",
        "id": 30
    },
    {
        "name": "Gujarat",
        "id": 24
    },
    {
        "name": "Haryana",
        "id": 6
    },
    {
        "name": "Himachal Pradesh",
        "id": 2
    },
    {
        "name": "Jammu and Kashmir",
        "id": 1
    },
    {
        "name": "Jharkhand",
        "id": 20
    },
    {
        "name": "Karnataka",
        "id": 29
    },
    {
        "name": "Kerala",
        "id": 32
    },
    {
        "name": "Ladakh",
        "id": 38
    },
    {
        "name": "Lakshadweep",
        "id": 31
    },
    {
        "name": "Madhya Pradesh",
        "id": 23
    },
    {
        "name": "Maharashtra",
        "id": 27
    },
    {
        "name": "Manipur",
        "id": 14
    },
    {
        "name": "Meghalaya",
        "id": 17
    },
    {
        "name": "Mizoram",
        "id": 15
    },
    {
        "name": "Nagaland",
        "id": 13
    },
    {
        "name": "Orissa",
        "id": 21
    },
    {
        "name": "Other Territory",
        "id": 97
    },
    {
        "name": "Puducherry",
        "id": 34
    },
    {
        "name": "Punjab",
        "id": 3
    },
    {
        "name": "Rajasthan",
        "id": 8
    },
    {
        "name": "Sikkim",
        "id": 11
    },
    {
        "name": "Tamil Nadu",
        "id": 33
    },
    {
        "name": "Telangana",
        "id": 36
    },
    {
        "name": "Tripura",
        "id": 16
    },
    {
        "name": "Uttar Pradesh",
        "id": 9
    },
    {
        "name": "Uttarakhand",
        "id": 5
    },
    {
        "name": "West Bengal",
        "id": 19
    }
] as const;


export type IndianState = (typeof indianStates)[number];

export interface ContactDetail {
  contact_name: string;
  designation: string;
  phone_no: number;
  email: string;
  cc: string;
}

export interface AddressDetail {
  address_type: 'Registered Address' | 'Bussiness Address' | 'Branch Address' | 'Unit Address' | 'Godown Address';
  name: string;
  building: string;
  street: string;
  landmark: string;
  city: string;
  district: string;
  pincode: number;
  address_state: IndianState;
  country: 'India';
}

export interface Profile {
  party_name: string;
  alias: string;
  party_grp: 'Trade Payables - Sunday Creditors' | 'Trade Receiveable - Sunday Debitors';
  gst_type: 'Unregistered' | 'Regular' | 'Composition' | 'Export/Import' | 'SEZ' | 'Deemed Export/ Import';
  gst_no: string;
  pan_no: string;
  state: IndianState; 
  bussiness_type: 'Private Limited' | 'Public Limited' | 'Sole Propprietorship' | 'Partnership' | 'LLP' | 'LLC' | 'Joint Ventures' | 'Hindu Undivided Family' | 'NGO';
  bussiness_nature: 'Unspecified' | 'Manufacturer' | 'Service Provider' | 'Trader';
  website: string;
  iec: number;
  msme_no: string;
  istransporter: boolean;
  contact_details: ContactDetail[];
  address_details: AddressDetail[];
}