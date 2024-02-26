import React from "react";
import moment from 'moment';
import NoImage from "../../assets/images/no-image.png";


function CallHistoryItem({ profileId, index, item }) {

    const formatDateTime = (timestamp) => {
        const now = moment();
        const date = moment(timestamp);

        if (now.isSame(date, 'day')) {
            // Today
            return `Today ${date.format('hh:mm A')}`;
        } else if (now.subtract(1, 'day').isSame(date, 'day')) {
            // Yesterday
            return `Yesterday ${date.format('hh:mm A')}`;
        } else {
            // Other days
            return date.format('DD MMMM YYYY, hh:mm A');
        }
    };

    return (
        <React.Fragment key={index}>
            {item?.from?._id === profileId ?
                <div className="flex justify-between items-center pt-5">
                    <div className="flex">
                        <div className="w-10 h-10 rounded-full overflow-hidden  mr-4">
                            {item?.to !== null ?
                                <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?.to?.profileimage}`} alt="" className="w-full h-full object-cover" /> :
                                <img src={NoImage} alt="no-image" className="w-full h-full object-cover" />
                            }
                        </div>
                        <div className="">
                            <h4>{item?.to?.members !== undefined ? item?.to?.name : item?.to?.fullName}</h4>
                            <div className="pt-1">
                                <i className="icon-outgoing-call text-green-400 text-sm mr-2"></i>
                                <span>{formatDateTime(item?.callStartedAt)}</span>
                            </div>
                        </div>
                    </div>
                    {item?.isAudioCall ? <button className="icon-phone-calling text-chatlook-sky text-2xl"></button> : <button className="icon-video-on text-chatlook-sky text-2xl"></button>}
                </div> :
                <div className="flex justify-between items-center pt-5">
                    <div className="flex">
                        <div className="w-10 h-10 rounded-full overflow-hidden  mr-4">
                            {item?.from !== null ?
                                <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?.from?.profileimage}`} alt="" className="w-full h-full object-cover" /> :
                                <img src={NoImage} alt="no-image" className="w-full h-full object-cover" />
                            }
                        </div>
                        <div className="">
                            <h4>{item?.from?.members !== undefined ? item?.from?.name : item?.from?.fullName}</h4>
                            <div className="pt-1">
                                <i className="icon-incoming-call text-red-400 text-sm mr-2"></i>
                                <span>{formatDateTime(item?.callStartedAt)}</span>
                            </div>
                        </div>
                    </div>
                    {item?.isVideoCall ? <button className="icon-video-on text-chatlook-sky text-2xl"></button> : <button className="icon-phone-calling text-chatlook-sky text-2xl"></button>}
                </div>}
        </React.Fragment>
    );
}

export default CallHistoryItem;