const peerConnection = new RTCPeerConnection();

const setupWebRTC = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
};

setupWebRTC();