import type { Metadata } from 'next';
import './globals.css';
import {SiteHeader,SiteFooter} from '@/components/tigers/site-shell';
import LegacyLinks from '@/components/tigers/legacy-links';
export const metadata: Metadata={title:'KIA TIGERS — ALWAYS ROARING',description:'우리의 함성은 멈추지 않는다. 타이거즈 영상과 광주-기아 챔피언스 필드를 만나는 팬 홈페이지 콘셉트.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><a className="skip-link" href="#main-content">본문으로 이동</a><SiteHeader/><LegacyLinks/>{children}<SiteFooter/></body></html>}
