import React, {useCallback} from 'react';

const BottomBar = ({isVideoCall, toggleCamera, toggleAudio, userVideoAudio, goToBack}) => {

    return (
        <div className="flex space-x-3 justify-center">
            {isVideoCall ? (<button
                className="relative text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg"
                onClick={toggleCamera}>
                {userVideoAudio.video ? ( <i className="icon-video-on" aria-hidden="true"></i> ) : ( <i className="icon-video-off" aria-hidden="true"></i> )}
            </button>) : '' }

            <button className="relative text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg"
                onClick={toggleAudio}>
                {userVideoAudio.audio ? ( <i className="icon-mic-on" aria-hidden="true"></i> ) : ( <i className="icon-mic-off" aria-hidden="true"></i>)}
            </button>
            <button onClick={goToBack}
                className="relative  text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red">
                <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
            </button>
        </div>
    );
};


export default BottomBar;