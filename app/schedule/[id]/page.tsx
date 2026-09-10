import GameDetail from '@/components/tigers/game-detail';
export const metadata={title:'경기 상세 · 직관 플랜 | KIA TIGERS'};
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <GameDetail id={id}/>}
