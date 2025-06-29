export interface Profile{
    bussiness_name: string;
    short_name: string;
    pan_no:number;
    gst_no:number;
    bussiness_type: 'Private Bussiness' | 'Public Bussiness' | 'LLP' |'LLC';
    bussiness_nature: 'Unspecified' | 'Manufacturer' | 'Trdaer';
    gst_type: 'Unspecified' | 'Regular' | 'Composition';
    iec_code: number;
    msme_no: number;
    gst_date: Date;
    tds_deduction:boolean;
    tcs_collection: boolean;

}