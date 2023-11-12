import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
      return  <RecoilRoot>
            <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
      </SessionProvider>
      </RecoilRoot>
      
       


  
}
