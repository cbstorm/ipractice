import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOneClass } from '../../apis';
import { SUCCESS } from '../../constant';

export const getClassDetailsAction = createAsyncThunk(
    'getClassDetails',
    async (classId) => {
        const response = await getOneClass(classId);
        if (response.data.status === SUCCESS) {
            const classDetailsData = response.data.data;
            const { _id } = JSON.parse(localStorage.getItem('userProfile'));
            // Check Is Admin
            if (
                classDetailsData.adminUser === _id ||
                classDetailsData.adminUser._id === _id
            ) {
                classDetailsData.isAdmin = true;
            } else {
                classDetailsData.isAdmin = false;
            }
            // Check Is Joined
            const joinedList = classDetailsData.joined.filter(
                (joinedItem) => joinedItem.role !== 'admin'
            );
            if (joinedList.length > 0) {
                const joined = joinedList.find(
                    (joinedItem) => joinedItem.userId === _id
                );
                if (joined) {
                    classDetailsData.isJoined = true;
                } else {
                    classDetailsData.isJoined = false;
                }
            }
            // Check Is Invited
            const invited = classDetailsData.invited.find(
                (invitedItem) => invitedItem.userId === _id
            );
            if (invited) {
                classDetailsData.isInvited = true;
            } else {
                classDetailsData.isInvited = false;
            }
            // Check Is Requested
            const requested = classDetailsData.joinRequest.find(
                (requestItem) => requestItem.userId === _id
            );
            if (requested) {
                classDetailsData.isRequested = true;
            } else {
                classDetailsData.isRequested = false;
            }

            return classDetailsData;
        }
    }
);

const getClassDetailsExistFromClassList = (state, action) => {
    const classDetailsData = { ...action.payload };
    const { _id } = JSON.parse(localStorage.getItem('userProfile'));
    // Check Is Admin
    if (
        classDetailsData.adminUser === _id ||
        classDetailsData.adminUser._id === _id
    ) {
        classDetailsData.isAdmin = true;
    } else {
        classDetailsData.isAdmin = false;
    }
    // Check Is Joined
    const joinedList = classDetailsData.joined.filter(
        (joinedItem) => joinedItem.role !== 'admin'
    );
    if (joinedList.length > 0) {
        const joined = joinedList.find(
            (joinedItem) => joinedItem.userId === _id
        );
        if (joined) {
            classDetailsData.isJoined = true;
        } else {
            classDetailsData.isJoined = false;
        }
    }
    // Check Is Invited
    const invited = classDetailsData.invited.find(
        (invitedItem) => invitedItem.userId === _id
    );
    if (invited) {
        classDetailsData.isInvited = true;
    } else {
        classDetailsData.isInvited = false;
    }
    // Check Is Requested
    const requested = classDetailsData.joinRequest.find(
        (requestItem) => requestItem.userId === _id
    );
    if (requested) {
        classDetailsData.isRequested = true;
    } else {
        classDetailsData.isRequested = false;
    }
    return classDetailsData;
};

// Handle Status
const setInvited = (state, action) => {
    state.isInvited = action.payload;
};
const setJoined = (state, action) => {
    state.isJoined = action.payload;
};
const setRequested = (state, action) => {
    state.isRequested = action.payload;
};

// Handle Member Actions
// INVITE
const handleInvite = (state, action) => {
    const userId = action.payload;
    state.invited = [{ userId }, ...state.invited];
};
//UNINVITE
const handleUnInvite = (state, action) => {
    const userId = action.payload;
    const newInviteList = state.invited.filter(
        (inviteItem) => inviteItem.userId !== userId
    );
    state.invited = newInviteList;
};

// Handle Accept

const handleAccept = (state, action) => {
    const newItem = action.payload;
    state.joinRequest = state.joinRequest.filter(
        (joinRequestItem) => joinRequestItem.userId !== newItem.userId
    );
    state.joined = [{ ...newItem, role: 'member' }, ...state.joined];
};

// Handle Reject
const handleReject = (state, action) => {
    const newItem = action.payload;
    state.joinRequest = state.joinRequest.filter(
        (joinRequestItem) => joinRequestItem.userId !== newItem.userId
    );
};

// DELETE MEMBER
const handleDeleteMember = (state, action) => {
    const joinedId = action.payload;
    const newJoinedList = state.joined.filter(
        (inviteItem) => inviteItem._id !== joinedId
    );
    state.joined = newJoinedList;
};

const classDetailsSlice = createSlice({
    name: 'classDetails',
    initialState: null,
    reducers: {
        getClassDetailsFromClassListAction: getClassDetailsExistFromClassList,
        setInvitedAction: setInvited,
        setJoinedAction: setJoined,
        setRequestedAction: setRequested,
        handleAcceptAction: handleAccept,
        handleRejectAction: handleReject,
        handleInviteAction: handleInvite,
        handleUnInviteAction: handleUnInvite,
        handleDeleteMemberAction: handleDeleteMember,
    },
    extraReducers: (builder) => {
        builder.addCase(getClassDetailsAction.fulfilled, (state, action) => {
            return { ...action.payload };
        });
    },
});

export const {
    getClassDetailsFromClassListAction,
    setInvitedAction,
    setJoinedAction,
    setRequestedAction,
    handleInviteAction,
    handleUnInviteAction,
    handleDeleteMemberAction,
    handleAcceptAction,
    handleRejectAction,
} = classDetailsSlice.actions;
const classDetailsReducer = classDetailsSlice.reducer;
export const classDetailsSelector = (state) => state.classDetailsReducer;

export default classDetailsReducer;
