// filepath: c:\Users\swabi\projects\MERN\GoogleHackathon\health-chat-nexus\src\pages\VideoConference.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ApiService from '../services/api';

// We'll need to create proper auth context later
const userRole = localStorage.getItem('userRole') || 'patient';
const userId = localStorage.getItem('userId') || 'default-user';

const VideoConference = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const apiRef = useRef<any>(null);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appointmentId) {
      toast({
        title: "Error",
        description: "Appointment ID is required",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    const loadJitsiIframe = async () => {
      try {
        if (!jitsiContainerRef.current) return;
        
        // Use your API service instead of direct fetch
        const response = await ApiService.getVideoMeeting(appointmentId);
        const { meetingConfig } = response;
        
        // Initialize Jitsi
        const domain = 'meet.jit.si';
        const options = {
          roomName: meetingConfig.roomName || `HealthChat-${appointmentId}`,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          userInfo: {
            displayName: userRole === 'doctor' ? 'Dr. Healthcare Provider' : 'Patient',
            email: '',
          },
          configOverwrite: {
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: '#f0f2f5',
          },
        };

        // Create the Jitsi Meeting
        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        
        // Event handlers
        apiRef.current.addEventListeners({
          readyToClose: handleClose,
          participantLeft: handleParticipantLeft,
          participantJoined: handleParticipantJoined,
          videoConferenceJoined: handleVideoConferenceJoined,
          videoConferenceLeft: handleVideoConferenceLeft,
        });
        
        // Update meeting status to in-progress
        await ApiService.updateMeetingStatus(appointmentId, 'in-progress', {
          meetingStarted: new Date().toISOString()
        });
        
      } catch (error) {
        console.error("Error starting Jitsi meeting:", error);
        toast({
          title: "Connection Error",
          description: "Failed to establish video connection. Please try again.",
          variant: "destructive"
        });
      }
    };

    loadJitsiIframe();

    // Cleanup
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, [appointmentId, navigate, toast]);

  const handleClose = () => {
    navigate(userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
  };

  const handleParticipantLeft = async (participant: any) => {
    console.log("Participant left:", participant);
    // If the other participant left, consider ending the consultation
    const numParticipants = apiRef.current?.getNumberOfParticipants();
    if (numParticipants <= 1) {
      toast({
        title: "Participant Left",
        description: "The other participant has left the consultation."
      });
    }
  };

  const handleParticipantJoined = (participant: any) => {
    console.log("Participant joined:", participant);
    toast({
      title: "Participant Joined",
      description: `${participant.displayName} has joined the consultation.`
    });
  };

  const handleVideoConferenceJoined = async (participant: any) => {
    console.log("Video conference joined:", participant);
  };

  const handleVideoConferenceLeft = async () => {
    // Record meeting end in your backend
    try {
      await ApiService.updateMeetingStatus(appointmentId, 'completed', {
        meetingEnded: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
    
    // Navigate back to dashboard
    handleClose();
  };

  const endMeeting = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('hangup');
    }
    handleClose();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-health-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Health Chat Video Consultation</h1>
          <Button 
            variant="destructive" 
            onClick={endMeeting}
            className="bg-red-600 hover:bg-red-700"
          >
            End Consultation
          </Button>
        </div>
      </div>
      
      <div className="flex-1 container mx-auto p-4">
        <div 
          ref={jitsiContainerRef} 
          className="bg-white rounded-lg shadow-md w-full h-[80vh]"
        />
      </div>
    </div>
  );
};

export default VideoConference;