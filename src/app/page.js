'use client'
import CustomButton from "@/components/common/Button/Button";
import { getUserDetailsFromToken, userLogout } from "@/services/user.services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const[userData,setUserData] = useState()
  const router = useRouter();
  useEffect(()=>{
    handleUserData();
  },[]);


  const handleUserData = async()=>{
    try {
      const response = await getUserDetailsFromToken();
      setUserData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async()=>{
    try {
      const response = await userLogout();
      if(response){
        router.push('/login');
      }
    } catch (error) {
      console.log('Error with logout from client',error)
    }
  }
  return (
    <>
     <p> Home </p>
    <p>User:</p><strong>{userData?.username} </strong>
   <p>email:</p> <strong> {userData?.email} </strong>
   <br/>
    <CustomButton onClick={handleLogout}>Logout</CustomButton>
    </>
  );
}
