import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  id: '',
  email: '',
  nickname: '',
  point: '',
  nextPoint: '',
  memberType: 'USER',
  level: '',
  accessToken: '',
  refreshToken: '',
  isKakao: false,
  profile: [],
  isActive: true
};

const loadMemberCookie = () => {
  const userInfo = getCookie("member");

  if (userInfo) {
    userInfo.nickname = userInfo.nickname ? decodeURIComponent(userInfo.nickname) : '';
    userInfo.profile = userInfo.profile ? JSON.parse(userInfo.profile) : [];
  }

  return userInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param, { rejectWithValue }) => {
  try {
    const response = await loginPost(param);
    if (!response.isActive) {
      return rejectWithValue("탈퇴한 회원입니다.");
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      const payload = action.payload;
      // profile 배열을 JSON 문자열로 변환하여 저장
      const payloadWithProfileString = {
        ...payload,
        profile: JSON.stringify(payload.profile)
      };
      setCookie("member", JSON.stringify(payloadWithProfileString), 1);
      return payload;
    },
    logout: (state, action) => {
      console.log("logout.....");
      removeCookie("member");
      return { ...initState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginPostAsync.fulfilled, (state, action) => {
      console.log("fulfilled");
      const payload = action.payload;

      if (!payload.error) {
        const payloadWithProfileString = {
          ...payload,
          profile: JSON.stringify(payload.profile)
        };
        setCookie("member", JSON.stringify(payloadWithProfileString), 1);
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

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
