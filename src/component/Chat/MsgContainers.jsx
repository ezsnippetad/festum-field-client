import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useProfileGets } from "../../redux/Slice/profileSlice";
import { useQuery } from "../../utils";

export function MsgOptionsMenu({ chatVal, setReplyMsg, ref }) {
  console.log('chatVal', chatVal)
  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-5 z-10 p-[24px] duration-300 cursor-pointer w-44 bg-white shadow-xl rounded-lg hover:inline"
    >
      <ul className="w-full flex flex-col space-y-4">
        <li className="flex items-center space-x-2.5">
          <span className="icon-note text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Edit</span>
        </li>
        <li className="flex items-center space-x-2.5">
          <span className="icon-copy text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Copy</span>
        </li>
        <li
          onClick={() => {
            setReplyMsg(chatVal);
          }}
          className="flex items-center space-x-2.5"
        >
          <span className="icon-replay text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Replay</span>
        </li>
        <li className="flex items-center space-x-2.5">
          <span className="icon-forward text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Forward</span>
        </li>
        <li className="flex items-center space-x-2.5">
          <span className="icon-delete text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Delete</span>
        </li>
        <li className="flex items-center space-x-2.5">
          <span className="icon-description text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">Info</span>
        </li>
        <li className="flex items-center space-x-2.5">
          <span className="icon-description text-base text-chatlook-dark font-medium"></span>{" "}
          <span className="text-base text-chatlook-dark">about</span>
        </li>
      </ul>
    </div>
  );
}

function MsgContainers({ chatVal, setReplyMsg }) {
  const profileGets = useProfileGets();

  // const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef();
  const isMyMsg = chatVal.from._id === profileGets._id || chatVal.from === profileGets._id
  const queryParams = useQuery();
  const isGroup = queryParams.type === "group";

  function checkCallStatus(callData) {
    // Find the member who accepted the call
    const acceptedMember = callData?.members.find(member => member.status === 'accepted' && member.startedAt !== 0);

    // Check if the call is accepted
    if (acceptedMember) {
      // The call was accepted
      const startedAt = acceptedMember.startedAt;
      const endAt = acceptedMember.endAt || Date.now(); // If endAt is not set, use the current time as the end time
      //const duration = endAt - startedAt;
      const duration = moment(endAt).diff(moment(startedAt), 'seconds');

      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const remainingSeconds = duration % 60;

      let result = '';

      if (hours > 0) {
        result += `${hours}${hours === 1 ? 'h' : 'h'}`;
      }

      if (minutes > 0) {
        result += `${result.length > 0 ? ' ' : ''}${minutes}${minutes === 1 ? 'm' : 'm'}`;
      }

      if (remainingSeconds > 0) {
        result += `${result.length > 0 ? ' ' : ''}${remainingSeconds}${remainingSeconds === 1 ? 's' : 's'}`;
      }

      return result;
      //return `Call Status: Accepted: ${duration / 1000} seconds`;
      //console.log('Duration:', `${duration / 1000} seconds`);
    } else {
      // The call was not accepted
      const missedCallMember = callData.members.find(member => member.status === 'ringing' && member.startedAt === 0);

      if (missedCallMember) {
        // The call was missed
        return 'Missed call';
      } else {
        // The call was not answered
        return 'No answer';
      }
    }
  }
  // function categorizedDifferences(secondsDiff) {
  //
  //     const hours = Math.floor(secondsDiff / 3600);
  //     const minutes = Math.floor((secondsDiff % 3600) / 60);
  //     const remainingSeconds = secondsDiff % 60;
  //
  //     let result = '';
  //
  //     if (hours > 0) {
  //         result += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  //     }
  //
  //     if (minutes > 0) {
  //         result += `${result.length > 0 ? ' ' : ''}${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  //     }
  //
  //     if (remainingSeconds > 0) {
  //         result += `${result.length > 0 ? ' ' : ''}${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}`;
  //     }
  //
  //     return result;
  //  };
  // useEffect(() => {
  //   const handleDocumentClick = (event) => {
  //     setShowOptions(false);
  //     window.oncontextmenu = function () {};
  //   };
  //   if (showOptions) {
  //     document.addEventListener("click", handleDocumentClick);
  //   }
  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, [showOptions]);

  return (
    <div
      className="flex flex-col items-start w-full group"
      onMouseDown={(e) => {
        if (e.button === 2) {
          window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          };
          // setShowOptions(true);
        }
      }}
    >

      <div className={`relative flex group  ${isMyMsg ? "items-endx massge-right ml-auto" : "items-startx massge-left space-x-2  mr-auto"}  w-fit`}>
        {isGroup && !isMyMsg && (
          <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
            {chatVal.from?.profileimage ? (
              <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${chatVal.from.profileimage}`} className="object-cover w-full h-full" alt="woman" />
            ) : (
              <div className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
            )}
          </div>
        )}
        {/* {showOptions && (
          <MsgOptionsMenu
            chatVal={chatVal}
            ref={menuRef}
            setShowOptions={setShowOptions}
            setReplyMsg={setReplyMsg}
          />
        )} */}
        {/* {!isMyMsg && (
          <i
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className={` invisible group-hover:visible icon-dots-reels-menu text-chatlook-gray absolutex top-0 ${
              isMyMsg ? "left-[101%]" : "right-[101%]"
            } cursor-pointer`}
          ></i>
        )} */}
        <div className={`flex flex-col ${isMyMsg ? "items-end" : "items-start"}`}>
          {chatVal?.content?.media?.path && (
            <div className={`chat p-3.5 max-w-[200px] lg:max-w-[200px] ${isMyMsg ? " bg-chatlook-skyLight" : "bg-chatlook-grayLight"} rounded-md`}>
              {chatVal?.content?.media?.type === 'IMG' && (<img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${chatVal.content.media.path}`} alt="noti-1" />)}
              {chatVal?.content?.media?.type === 'VID' && (<video controls><source src={`https://festumfield.s3.ap-south-1.amazonaws.com/${chatVal.content.media.path}`} /></video>)}
            </div>
          )}
          {chatVal?.content?.product?.productid && (
            <div className={`w-fit flex items-stretch ${isMyMsg ? " bg-chatlook-skyLight" : "bg-chatlook-grayLight"} p-2 rounded-md`}>
              <div className="w-full max-w-[75px] max-h-[75px]">
                <img src={chatVal?.content?.product?.productid?.images?.at(0)} alt={chatVal?.content?.product?.productid?.name} className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col w-full pl-3 space-y-2">
                <strong className="block mb-1">
                  {chatVal?.content?.product?.productid?.name}
                </strong>
                <span className="block text-[#888888] text-sm mt-0 mb-1">
                  {chatVal?.content?.product?.productid?.description}
                </span>
                <span className="block text-[#5AC8D2] m-0">
                  ${chatVal?.content?.product?.productid?.price}
                </span>
              </div>
            </div>
          )}
          {chatVal?.context && (
            <div className={`w-fit flex items-stretch ${isMyMsg ? " bg-chatlook-skyLight" : "bg-chatlook-grayLight"} p-2 rounded-md`}>
              {chatVal?.context?.content?.media?.path !== "" && (
                <div className="w-full max-w-[75px] max-h-[75px]">
                  <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${chatVal?.context?.content?.media?.path}`} className="object-cover w-full h-full" alt="" />
                </div>
              )}
              <div className="flex flex-col w-full pl-3 space-y-2">
                <p className="italic text-sm text-gray-700">
                  {chatVal?.context?.content?.text?.message}
                </p>
                <p className="text-xs mt-2">
                  {moment(chatVal?.context?.createdAt).format("lll")}{" "}
                </p>
              </div>
            </div>
          )}
          <div className="max-w-max">
            {chatVal?.content?.text?.message && (
              <div className={`chat min-w-[90px] p-3.5 ${isMyMsg ? " bg-chatlook-skyLight" : "bg-chatlook-grayLight"} rounded-md`}>
                {!isMyMsg && isGroup && (
                  <p className="font-bold text-chatlook-sky text-sm">
                    {chatVal?.from?.fullName}
                  </p>
                )}
                <p className="text-sm text-black">
                  {chatVal?.content?.text?.message}
                </p>
              </div>
            )}
            {chatVal?.contentType == "call" && (
              <div className={`chat min-w-[80px] p-2.5 ${isMyMsg ? " bg-chatlook-skyLight" : "bg-chatlook-grayLight"} rounded-md`}>
                {!isMyMsg && isGroup && (
                  <p className="font-bold text-chatlook-sky text-sm">
                    {chatVal?.from?.fullName}
                  </p>
                )}
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight shadow rounded-full text-[#8094ae] relative">
                    {chatVal?.callid?.isVideoCall ? (<i className="icon-video-on text-white"></i>) : <i className="icon-phone-calling text-white" aria-hidden="true"></i>}
                  </div>
                  <div>
                    <h6 className="mt-1 text-chatlook-dark font-bold capitalize">
                      {chatVal?.callid?.isVideoCall ? 'VideoCall' : 'AudioCall'}
                    </h6>
                    <span className="text-chatlook-sky text-sm block">
                      {checkCallStatus(chatVal?.callid)}
                      {/*{chatVal?.callid?.members?.map((mem) => {*/}
                      {/*return (*/}
                      {/*<>*/}
                      {/*{mem?.startedAt !== 0 && mem?.endAt !== 0 ? categorizedDifferences(moment(mem?.endAt).diff(moment(mem?.startedAt), 'seconds')) : ''}*/}
                      {/*</>*/}
                      {/*);*/}
                      {/*})}*/}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="text-right mt-1">
              <span className="flex justify-end">
                {moment(chatVal.createdAt).format("LT")}
                {profileGets?._id === chatVal?.from?._id &&
                  (chatVal.status === "sent" ? (
                    <i className="ml-1 icon-right "></i>
                  ) : chatVal.status === "delivered" ? (
                    <i className="ml-1 icon-double-tick text-lg"></i>
                  ) : chatVal.status === "seen" ? (
                    <i className="ml-1 icon-double-tick text-lg text-blue-400"></i>
                  ) : null)}
              </span>
            </div>
          </div>
        </div>
        {/* {isMyMsg && (
          <i
            onClick={(e) => {
              console.log("e", e);
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className={` invisible group-hover:visible icon-dots-reels-menu text-chatlook-gray absolutex top-0 ${
              isMyMsg ? "left-[101%]" : "right-[101%]"
            } cursor-pointer`}
          ></i>
        )} */}
      </div>
    </div>
  );
}

export default MsgContainers;
