import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axios/axiosInstance'
import { useEffect } from 'react';
import { ZegoSuperBoardManager } from "zego-superboard-web";

const DoctorVideoCall = () => {
    const {roomID,userEmail} =useParams();
    const doctorName =useSelector((state)=>state.doctor.details.name);
    
    console.log(userEmail);

    useEffect(()=>{
      (
        async function () {
            const { data } = await axiosInstance.post("/doctor/videoinvite",{roomID,userEmail,doctorName});
        }
    )()
    },[roomID])
    
    let myMeeting =async (element)=>{
        
        const appID=2081459113;
        const serverSecret="71dce9f1739b6d0a63e9ae207543e58c";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(),`${doctorName}`);

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            whiteboardConfig: {            
              showAddImageButton: true, 
           },
           
            // sharedLinks: [
            //   {
            //     name: 'Personal link',
            //     url:
            //      window.location.protocol + '//' + 
            //      window.location.host + window.location.pathname 
                   
            //       ,
            //   },
            // ],
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
          });
          zp.addPlugins({ZegoSuperBoardManager});
    }

    
  return (
    <>
    
    <div
    className="myCallContainer"
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh' }}
    
  ></div>
  </>
  )
}

export default DoctorVideoCall