import type { AppProps } from "next/app";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import Layout from "../components/layout";
import createEmotionCache from "../utils/createEmotionCache";
import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps<object> {
  emotionCache?: EmotionCache;
}

const MyApp: AppType = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(MyApp);
