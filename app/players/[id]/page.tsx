import PlayerDetailPage from '@/components/tigers/player-detail';
export const metadata={title:'선수 프로필 · 기록 | KIA TIGERS'};
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <PlayerDetailPage id={id}/>}
