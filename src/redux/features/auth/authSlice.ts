import { createSlice } from '@reduxjs/toolkit';

type TUserInfo = {
  id: null | string,
  username: {
    firstName: null | string,
    lastName: null | string
  },
  email: null | string,
  phone: null | string,
  userImg: null | string,
  role: null | string,
  isActive: null | boolean,
  token: null | {
    access: string
  }
}

const initialState: TUserInfo = {
  id: null,
  username: {
    firstName: null,
    lastName: null
  },
  email: null,
  phone: null,
  userImg: null,
  role: null,
  isActive: null,
  token: null
}

export const authSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, phone, userImg, role, isActive, token } = action.payload;
      state.id = id;
      state.username = {
        firstName: username.firstName,
        lastName: username.lastName
      };
      state.email = email;
      state.phone = phone;
      state.userImg = userImg;
      state.role = role;
      state.isActive = isActive;
      state.token = token;
    },
    logOut: (state) => {
      state.id = null;
      state.username = {
        firstName: null,
        lastName: null
      };
      state.email = null;
      state.phone = null;
      state.userImg = null;
      state.role = null;
      state.isActive = null;
      state.token = null;
    }
  }
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
