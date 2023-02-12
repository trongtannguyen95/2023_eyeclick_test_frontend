import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { selectAuthState, setAuthState, setUserProfile, logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMe } from '../utility/request';
import { wrapper } from "../store/store";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()
  useEffect(() => {
    checkLogin()
  }, [])
  const checkLogin = async () => {
    if (authState) return false
    try {
      const resGetMe = await getMe()
      if (resGetMe.statusCode == 200 && resGetMe.data) {
        dispatch(setAuthState(true));
        dispatch(setUserProfile(resGetMe.data));
      }
    } catch (err) {
      dispatch(logout())
    }

  }
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(MyApp);
