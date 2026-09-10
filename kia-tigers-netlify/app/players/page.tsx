import Roster from '@/components/tigers/roster';
export const metadata={title:'선수단 | KIA TIGERS'};
export default function Page(){return <main id="main-content" className="destination-page"><nav className="breadcrumbs" aria-label="현재 위치"><a href="/">홈</a><span>/</span><span>선수단</span></nav><h1 className="sr-only">선수단</h1><Roster/></main>}
