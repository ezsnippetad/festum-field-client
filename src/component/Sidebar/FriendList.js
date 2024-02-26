import React, { useCallback, useEffect, useRef, useState } from 'react'
import { clearmYFriendList, clearmYGroupList, friendsRequestsSearch, setMyNewFriedList, setMyNewGroupList, setMySearchFriendsList, useMyFriendsList, useMySearchFriendsList } from '../../redux/Slice/requestSlice'
import { useDispatch } from 'react-redux';
import SidebarChatListItem from '../Chat/SidebarChatListItem';
import socket from '../../socket';
//import { useSocket } from '../../redux/Slice/socketSlice';
import { useProfileGets } from '../../redux/Slice/profileSlice';
import { PulseLoader } from 'react-spinners';

const FriendList = ({ searchrequest }) => {
    const dispatch = useDispatch()
    //const { socket } = useSocket()
    const profileGets = useProfileGets();
    // const [searchrequest, setSearchRequest] = useState("");
    const outerRefTwo = useRef()
    const [page, setPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const [searchGrouprequest, setSearchGroupRequest] = useState("");
    const myNewFriendsList = useMyFriendsList()
    const [loading, setLoading] = useState(false)

    const myFriendsSearchList = useMySearchFriendsList()
    const [myFriendList, setMyFriendList] = useState([])

    const [lastPage, setLastPage] = useState("");



    const infiniteDatafriendList = async (currentPage) => {
        const payload = {
            page: currentPage,
            limit: 50,
            search: searchrequest,
        };
        setLoading(true)
        const response = await dispatch(friendsRequestsSearch(payload)).unwrap();
        setLoading(false)
        if (searchrequest === "") {
            // setMyFriendsList((prevList) => [...prevList, ...response?.data?.Data]);
            setMyFriendList((pre) => [...pre, ...response?.data?.Data])
            dispatch(setMySearchFriendsList([]))
            if ([...response?.data?.Data].length < 12) {
                setLastPage("lastPage");
            } else {
                setLastPage("");
            }
            // setMyFriendsSearchList([])
        } else {

            setPage(1)
            dispatch(setMySearchFriendsList([...response?.data?.Data]))
            setMyFriendList([])
            dispatch(setMyNewFriedList([]))
        }
    }

    useEffect(() => {
        // if (lastPage == "lastPage") {
        //     return;
        // }
        infiniteDatafriendList(page);
        return () => {
            dispatch(clearmYGroupList())
        };
    }, [page, searchrequest]);

    useEffect(() => {
        dispatch(setMyNewFriedList(myFriendList));
    }, [myFriendList]);

    const handleScroll = useCallback(() => {
        const outerElement = outerRefTwo.current;
        if (outerElement) {
            const { scrollTop, clientHeight, scrollHeight } = outerElement;
            if (scrollTop + clientHeight >= scrollHeight) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [outerRefTwo]);




    return (
        <div>
            <div className="h-[calc(100vh-226px)] px-3.5 overflow-y-auto" ref={outerRefTwo} onScroll={handleScroll} id="chats-list">
                {/* {loading ? <div className='w-full flex items-center justify-center'><PulseLoader color='#5ac8d2' /></div> } */}

                {(searchrequest === "" ? (
                    myNewFriendsList?.map((val, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SidebarChatListItem key={index} val={val} />
                            </React.Fragment>
                        );
                    })
                ) : (
                    myFriendsSearchList?.map((val, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SidebarChatListItem key={index} val={val} />
                            </React.Fragment>
                        );
                    })
                ))

                }
                {/* {friends.map((val, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <SidebarChatListItem key={index} val={val} />
                                </React.Fragment>
                              );
                            })} */}
            </div>
        </div>
    )
}

export default FriendList

