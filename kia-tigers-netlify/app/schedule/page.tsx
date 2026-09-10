import Schedule from '@/components/tigers/schedule';
export const metadata={title:'경기일정 | KIA TIGERS'};
export default function Page(){return <main id="main-content" className="destination-page"><nav className="breadcrumbs" aria-label="현재 위치"><a href="/">홈</a><span>/</span><span>경기일정</span></nav><h1 className="sr-only">경기일정</h1><Schedule/></main>}
