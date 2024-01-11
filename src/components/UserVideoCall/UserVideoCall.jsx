import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'



const UserVideoCall = () => {
    const {roomID} =useParams();
    const user = useSelector((state) => state.user.details.name);
    
    
    let myMeeting =async (element)=>{
        
        const appID=1239434208;
        const serverSecret="224cca2ba9efb664a5810567f4a1477c";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(),`${user}`);

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
           
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
         
    }

    
  return (
    <div
    className="myCallContainer"
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh' }}
  ></div>
  )
}

export default UserVideoCall