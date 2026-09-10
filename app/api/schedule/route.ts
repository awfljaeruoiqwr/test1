import { normalizeGames,validMonth } from '@/lib/game-model';
import snapshot from '@/lib/data/schedule-202609.json';
export async function GET(request:Request){
 const month=new URL(request.url).searchParams.get('month')??'';
 if(!validMonth(month))return Response.json({error:'올바른 연월을 선택해 주세요.'},{status:400});
 const source='https://tigers.co.kr/v1/game/monthschedule?gameSearch.yearMonth='+month.replace('-','');
 try{const response=await fetch(source,{signal:AbortSignal.timeout(8000),headers:{Accept:'application/json'}});if(!response.ok)throw new Error('upstream');const raw=await response.json() as {status:number;data?:{list?:unknown}};if(raw.status!==0)throw new Error('upstream');return Response.json({games:normalizeGames(raw.data?.list,month),month,source,checkedAt:new Date().toISOString(),stale:false},{headers:{'Cache-Control':'public, max-age=60, s-maxage=300'}})}
 catch{if(month==='2026-09')return Response.json({games:normalizeGames(snapshot.data.list,month),month,source,checkedAt:'2026-09-05T10:11:00Z',stale:true,message:'공식 일정 연결이 지연되어 9월 5일 확인한 저장본을 표시합니다. 경기 상태와 예매 가능 여부는 최신 정보와 다를 수 있습니다.'},{headers:{'Cache-Control':'no-store'}});return Response.json({error:'공식 경기 일정을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:502,headers:{'Cache-Control':'no-store'}})}
}
