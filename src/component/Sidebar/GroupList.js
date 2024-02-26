import React, { useCallback, useEffect, useRef, useState } from 'react'
import SidebarChatListItem from '../Chat/SidebarChatListItem';
import { useDispatch } from 'react-redux';
import { clearmYFriendList, clearmYGroupList, gropusRequestsSearch, setMyNewFriedList, setMyNewGroupList, setMySearchGroupsList, useMyGroupList, useMySearchGroupsList } from '../../redux/Slice/requestSlice';
import { PulseLoader } from 'react-spinners';

const GroupList = ({ searchGrouprequest, csc }) => {
    const dispatch = useDispatch()
    const myNewGroupList = useMyGroupList()
    const [loading, setLoading] = useState(false)
    const [pageGroup, setPageGroup] = useState(1);
    const outerGroupRefTwo = useRef()
    const [myGroupList, setMyGroupFriendList] = useState([])
    const myFriendsSearchList = useMySearchGroupsList()
    const [lastPage, setLastPage] = useState("");
    const infiniteDataForgroup = useCallback(async (currentPage) => {
        const payload = {
            page: currentPage,
            limit: 12,
            search: searchGrouprequest,
        };
        setLoading(true)
        const response = await dispatch(gropusRequestsSearch(payload)).unwrap();
        setLoading(false)
        if (searchGrouprequest === "") {
            setMyGroupFriendList((pre) => [...pre, ...response?.data?.Data])
            dispatch(setMySearchGroupsList([]))
            if ([...response?.data?.Data].length < 12) {
                setLastPage("lastPage");
            } else {
                setLastPage("");
            }
        } else {
            setPageGroup(1)
            dispatch(setMySearchGroupsList([...response?.data?.Data]))
            setMyGroupFriendList([])

        }
    }, [searchGrouprequest]);
    useEffect(() => {
        dispatch(setMyNewGroupList(myGroupList));
    }, [myGroupList]);
    useEffect(() => {
        // if (lastPage == "lastPage") {
        //     return;
        // }
        infiniteDataForgroup(pageGroup);
        return () => {
            dispatch(clearmYFriendList())
        }
    }, [infiniteDataForgroup, pageGroup, searchGrouprequest]);


    const handleScrollGroup = useCallback(() => {
        const outerElement = outerGroupRefTwo.current;
        if (outerElement) {
            const { scrollTop, clientHeight, scrollHeight } = outerElement;
            if (scrollTop + clientHeight >= scrollHeight) {
                setPageGroup((prevgrpPage) => prevgrpPage + 1);
            }
        }
    }, [outerGroupRefTwo]);


    return (
        <div>
            <div className=" h-[calc(100vh-226px)] px-3.5 overflow-y-auto" id="chats-list" ref={outerGroupRefTwo} onScroll={handleScrollGroup} >
                {/* {loading ? <div className='w-full flex items-center justify-center'><PulseLoader color='#5ac8d2' /></div>} */}
                {(searchGrouprequest === "" ? (
                    myNewGroupList?.map((val, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SidebarChatListItem csc={csc} key={index} val={val} />
                            </React.Fragment>
                        );
                    })
                ) : (
                    myFriendsSearchList?.map((val, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SidebarChatListItem csc={csc} key={index} val={val} />
                            </React.Fragment>
                        );
                    })
                ))

                }
            </div>
        </div>
    )
}

export default GroupList
