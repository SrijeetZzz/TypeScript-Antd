// export interface Profile{
//     party_name: string;
//     alias:string;
//     party_grp: 'Trade Payables - Sunday Creditors' | 'Trade Receiveable - Sunday Debitors';
//     gst_type:'Unregistered' | 'Regular' | 'Composition' | 'Export/Import' | 'SEZ' | 'Deemed Export/ Import';
//     gst_no: string;
//     pan_no:string;
//     state: 'Andhra Pradesh' | 'Arunachal Pradesh' | 'Assam' | 'Bihar' | 'Chhattisgarh' | 'Goa' | 'Gujarat' | 'Haryana' | 'Himachal Pradesh' | 'Jharkhand' | 'Karnataka' | 'Kerala' | 'Madhya Pradesh' | 'Maharashtra' | 'Manipur' | 'Meghalaya' | 'Mizoram' | 'Nagaland' | 'Odisha' | 'Punjab' | 'Rajasthan' | 'Sikkim' | 'Tamil Nadu' | 'Telangana' | 'Tripura' | 'Uttar Pradesh' | 'Uttarakhand' | 'West Bengal';
//     bussiness_type: 'Private Limited' | 'Public Limited' | 'Sole Propprietorship' | 'Partnership' | 'LLP' | 'LLC' | 'Joint Ventures' | 'Hindu Undivided Family' | 'NGO'
//     bussiness_nature : 'Unspecified' | 'Manufacturer' | 'Service Provider' | 'Trader';
//     website: string;
//     iec: number;
//     msme_no: string;
//     istransporter: boolean;
//     contact_name: string;
//     designation: string;
//     phone_no: number;
//     email: string;
//     cc: string;
//     address_type: 'Registered Address' | 'Bussiness Address' | 'Branch Address'| 'Unit Address' | 'Godown Address';
//     name:string;
//     building: string;
//     street:string;
//     landmark: string;
//     city:string;
//     district: string;
//     pincode:number;
//     address_state: 'Andhra Pradesh' | 'Arunachal Pradesh' | 'Assam' | 'Bihar' | 'Chhattisgarh' | 'Goa' | 'Gujarat' | 'Haryana' | 'Himachal Pradesh' | 'Jharkhand' | 'Karnataka' | 'Kerala' | 'Madhya Pradesh' | 'Maharashtra' | 'Manipur' | 'Meghalaya' | 'Mizoram' | 'Nagaland' | 'Odisha' | 'Punjab' | 'Rajasthan' | 'Sikkim' | 'Tamil Nadu' | 'Telangana' | 'Tripura' | 'Uttar Pradesh' | 'Uttarakhand' | 'West Bengal';
//     country: 'India';
    

// }

export interface Profile {
  party_name?: string;
  alias?: string;
  party_grp?: "Trade Payables - Sunday Creditors" | "Trade Receiveable - Sunday Debitors";
  gst_type?: "Unregistered" | "Regular" | "Composition" | "Import" | "SEZ" | "Deemed Export/ Import";
  gst_no?: string;
  pan_no?: string;
  state?: string;
  bussiness_type?: string;
  bussiness_nature?: string;
  website?: string;
  iec?: string;
  msme_no?: string;
  istransporter?: boolean;

  // Add these two:
  contact_details?: {
    contact_name?: string;
    designation?: string;
    phone_no?: string;
    email?: string;
    cc?: string;
  }[];

  address_details?: {
    address_type?: string;
    name?: string;
    building?: string;
    street?: string;
    landmark?: string;
    city?: string;
    district?: string;
    pincode?: string;
    address_state?: string;
    country?: string;
  }[];
}
