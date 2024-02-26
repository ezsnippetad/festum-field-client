import React, { useEffect, useRef } from 'react';
const VideoCard = (props) => {
    const ref = useRef();
    const peer = props.peer;

    useEffect(() => {
        peer.on('stream', (stream) => {
            ref.current.srcObject = stream;
        });
        // peer.on('track', (track, stream) => {
        // });
    }, [peer]);

    return (
        <>
        <div className={`w-1/2 px-2 mb-4 ${!props.isVideoCall ? 'border' : ''}`}>
            <div className="relative bg-gray">
                <video className="w-full h-full object-cover" playsInline autoPlay ref={ref}/>
                <div className="absolute top-2 left-2 text-white">
                    {peer.userName}
                    <i className="icon-mic-off mx-2 hidden "></i>
                    <i className="icon-video-off mx-2 hidden"></i>

                </div>
            </div>
        </div>
        </>
    );
};


export default VideoCard;