import type { Profile } from "../interfaces/Profile";


 export const getProfile = () : {key: string , data: Profile}[] =>{
    const count = parseInt(localStorage.getItem("profileCount") || "0") 
    const profile : { key:string , data: Profile}[] = [];
    for(let i=1;i<=count;i++){
        const key = String(i);
        const item = localStorage.getItem(`${i}`)
        if(item){
            profile.push({key,data:JSON.parse(item)})
        }

    }
    console.log(profile)
    return profile;
}