import { createSlice } from "@reduxjs/toolkit";


const options = {
    name: 'userProfile',
    initialState: {
        isLoading: false,
        hasFailed: false,
        userInfo: {
            country: '',
            display_name: '',
            email: '',
            followers: null,
            product: '',
            artists: null,
            tracks: []
        },
        tokenInfo: {
            access_token: ''
        }
    },
    reducers: {

    },
    // extraReducers: (builder) => {
    //     builder
            
    //         //fill in pending and rejected
    //         .addCase(getToken.fulfilled, (state,action) => {
    //             //prevents double load error in restrict mode
    //             if(action.payload){
    //             state.tokenInfo= action.payload;
    //             }
    //         })

    //         .addCase(getUser.fulfilled, (state, action) => {
    //             state.userInfo = {
    //                 country: `Country of Origin: ${action.payload.country}`,
    //                 display_name: action.payload.display_name,
    //                 email: action.payload.email,
    //                 followers: `${action.payload.followers.total} followers`,
    //                 product: `${action.payload.product} user`,
    //                 artists: action.payload.items

    //             };
    //         })

    //         .addCase(getTopArtist.fulfilled, (state, action) => {
    //             state.userInfo.artists = action.payload.items;
    //         })

    //         .addCase(getTopTracks.fulfilled, (state,action) => {
    //             state.userInfo.tracks = action.payload.items;
    //         })
    // }
}

const userProfileSlice = createSlice(options);
export default userProfileSlice.reducer;
