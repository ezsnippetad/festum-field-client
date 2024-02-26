import { createSlice } from "@reduxjs/toolkit";
//import { createOffer, initializeListeners, updatePreference} from "../../server/peerConnection";
import * as myFns from "../../server/peerConnection";

const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
                "stun:stun.services.mozilla.com",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const generateColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const meetingSlice = createSlice({
    name: "meeting",
    initialState: {
        mainStream: null,
        participants: {},
        currentUser: null,
    },
    reducers: {
        setMainStream(state, action) {
            state.mainStream = action.payload;
        },
        addParticipant(state, action) {
            const { newUser } = action.payload;
            const currentUserId = Object.keys(state.currentUser)[0];
            const newUserId = Object.keys(newUser)[0];
            if (state.mainStream && currentUserId !== newUserId) {
                newUser[newUserId] = addConnection(
                    newUser[newUserId],
                    state.currentUser,
                    state.mainStream
                );
            }
            if (currentUserId === newUserId)
                newUser[newUserId].currentUser = true;
            newUser[newUserId].avatarColor = generateColor();
            state.participants[newUserId] = newUser[newUserId];
        },
        setUser(state, action) {
            const { currentUser } = action.payload;
            const userId = Object.keys(currentUser)[0];
            currentUser[userId].avatarColor = generateColor();
            myFns.initializeListensers(userId);
            state.currentUser = { ...currentUser };
            state.participants[userId] = { ...currentUser[userId] };
        },
        removeParticipant(state, action) {
            delete state.participants[action.payload.id];
        },
        updateUser(state, action) {
            const { currentUser } = action.payload;
            const userId = Object.keys(state.currentUser)[0];
            myFns.updatePreference(userId, currentUser);
            state.currentUser[userId] = {
                ...state.currentUser[userId],
                ...currentUser,
            };
        },
        updateParticipant(state, action) {
            const { newUser } = action.payload;
            const newUserId = Object.keys(newUser)[0];
            state.participants[newUserId] = {
                ...state.participants[newUserId],
                ...newUser[newUserId],
            };
        },
    },
});

export const {
    setMainStream,
    addParticipant,
    setUser,
    removeParticipant,
    updateUser,
    updateParticipant,
} = meetingSlice.actions;

export default meetingSlice.reducer;

const addConnection = (newUser, currentUser, stream) => {
    const peerConnection = new RTCPeerConnection(servers);
    stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
    });
    const newUserId = Object.keys(newUser)[0];
    const currentUserId = Object.keys(currentUser)[0];
    const offerIds = [newUserId, currentUserId].sort((a, b) =>
        a.localeCompare(b)
    );

    newUser.peerConnection = peerConnection;
    if (offerIds[0] !== currentUserId)
        myFns.createOffer(peerConnection, offerIds[0], offerIds[1]);
    return newUser;
};
