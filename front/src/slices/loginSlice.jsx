import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    id: '',
    email:'',
    nickname: '',
    point: '',
    nextPoint: '',
    memberType: '',
    level: '',
    accessToken: '',
    refreshToken: '',
    isKakao: false,
}

const loadMemberCookie = () => {
    
    const userInfo = getCookie("member");

    if(userInfo && userInfo.nickname) {
        userInfo.nickname = decodeURIComponent(userInfo.nickname);
    }

    return userInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {

    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,  // 쿠키가 없다면 초기값 사용
    reducers: {
        login: (state, action) => {
            console.log("login.....");
            const payload = action.payload;
            setCookie("member", JSON.stringify(payload), 1);    // 1일
            return payload;
            // return {email: payload.email};
        },
        logout: (state, action) => {
            console.log("logout.....");
            removeCookie("member");
            return {...initState};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");
            const payload = action.payload;

            // 정상적인 로그인 시에만 저장
            if(!payload.error) {
                setCookie("member", JSON.stringify(payload), 1); // 1일
            }
            return payload;
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending");
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected");
        })
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;