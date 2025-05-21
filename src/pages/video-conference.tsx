import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ZegoUIKitPrebuilt: any;
  }
}

function getUrlParams(url: string): Record<string, string> {
  const urlStr = url.split("?")[1];
  const urlSearchParams = new URLSearchParams(urlStr);
  return Object.fromEntries(urlSearchParams.entries());
}

const ZegoVideoConference: React.FC = () => {
  // Force reload once on navigation to this page
  useEffect(() => {
    if (!sessionStorage.getItem("videoConferenceReloaded")) {
      sessionStorage.setItem("videoConferenceReloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("videoConferenceReloaded");
    }
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      Math.floor(Math.random() * 10000).toString();

    // Construct the final meeting link
    const meetingLink =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID;

    // Save the meeting id and final link in localStorage
    localStorage.setItem("meeting_id", roomID);
    localStorage.setItem("meeting_link", meetingLink);

    const userID = Math.floor(Math.random() * 10000).toString();
    const userName = "userName" + userID;
    const appID = 2003699826;
    const serverSecret = "ff662413bc1ddfb6b354e744571f7297";
    const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = window.ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: rootRef.current,
      onLeaveRoom: () => {
        navigate("/patient-dashboard");
      },
      sharedLinks: [
        {
          name: "Personal link",
          url: meetingLink,
        },
      ],
      scenario: {
        mode: window.ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }, [navigate]);

  return (
    <div
      id="root"
      ref={rootRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default ZegoVideoConference;