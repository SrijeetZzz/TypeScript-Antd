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

// -------------Address Type---------------

export const addressType=[
    {
        "name": 'Registered Address',
        "id" : 0
    },
    {
        "name": 'Bussiness Address',
        "id" : 1
    },
    {
        "name": 'Branch Address',
        "id" : 2
    },
    {
        "name":'Unit Address',
        "id": 3
    },
    {
        "name":'Godown Address',
        "id": 4
    }
] as const ;

export type BussinessAddress = (typeof addressType)[number];

// -------------Bussiness Type---------------

export const bussinessType = [
    {
        "name": 'Private Limited',
        "id" : 0
    },
    {
        "name":'Public Limited',
        "id":1
    },
    {
        "name":'Sole Propprietorship',
        "id":2
    },
    {
        "name":'Partnership',
        "id":3
    },
    {
        "name":'LLP',
        "id":4
    },
    {
        "name":'LLC',
        "id":5
    },
    {
        "name":'Ventures',
        "id":6
    },
    {
        "name":'Hindu Undivided Family',
        "id":7
    },
    {
        "name":'NGO',
        "id":8
    }
]  as const ;

export type BussinessType = (typeof bussinessType)[number];

// -------------Bussiness Nature---------------

export const bussinessNature = [
    {
        "name":'Unspecified',
        "id":1
    },
    {
        "name":'Manufacturer',
        "id":2
    },
    {
        "name":'Service Provider',
        "id":3
    },
    
    {
        "name":'Trader',
        "id":4
    },
] as const ;

export type BussinessNature = (typeof bussinessNature)[number];

// -------------Gst Type---------------

export const gstType = [
    {
        "name":'Unregistered',
        "id":1
    },
    {
        "name":'Regular',
        "id":2
    },
    {
        "name":'Composition',
        "id":3
    },
    {
        "name":'Export/Import',
        "id":4
    },
    {
        "name":'SEZ',
        "id":5
    },
    {
        "name":'Deemed Import/Export',
        "id":6
    }
] as const ;

export type GstType = (typeof gstType)[number];

// -------------Payload Profile---------------

export interface Profile {
  ledgerName: string;
  aliasName: string;
  party_grp: 'Trade Payables - Sunday Creditors' | 'Trade Receiveable - Sunday Debitors';//tree
  gstType: number;
  gstin: string;
  pan: string;
  state: IndianState; 
  bussinessType: BussinessType;
  businessNature: BussinessNature;
  website: string|null;
  iec: number|null;
  msmeNo: string;
  istransporter: boolean;
  contactInformation: ContactDetail[];
  addresses: AddressesDetail[];
}

export interface ContactDetail {
  name: string;
  designation: string;
  phone: number;
  email: string;
  ccTo: string|null;
}
export interface address{
  building: string;
  street: string;
  landmark: string|null;
  city: string;
  district: string;
  pincode: string;
  address_state: IndianState;
  country: 'INDIA';
  state: number; 
}
export interface AddressesDetail {
  type: BussinessAddress;
  addressName: string;
  address: address[];
}