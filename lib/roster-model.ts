export type RosterGroup='pitcher'|'catcher'|'infielder'|'outfielder'|'coach';
export const rosterGroups=[{id:'pitcher',label:'투수',code:'투'},{id:'catcher',label:'포수',code:'포'},{id:'infielder',label:'내야수',code:'내'},{id:'outfielder',label:'외야수',code:'외'},{id:'coach',label:'코치진',code:''}] as const;
export type Person={id:string;name:string;number:string;image:string;group:RosterGroup;role:string;military:boolean};
export type StatRow=Record<string,string|number|null>;
export type Profile={name:string;number:string;image:string;role:string;birth:string;body:string;hand:string;school:string;debut:string;draft:string;career:string};
export type PlayerDetail={profile:Profile;summary:StatRow|null;history:StatRow[];splits:Record<string,StatRow[]>;year:number;checkedAt:string;kind:'pitcher'|'batter'|'coach'};
export function asObject(v:unknown):Record<string,unknown>{if(v===null||typeof v!=='object'||Array.isArray(v))throw Error('Invalid data');return v as Record<string,unknown>}
export function unwrap(v:unknown){if(typeof v==='string')v=JSON.parse(v);const r=asObject(v);if(r.status!==0)throw Error('Upstream error');return asObject(r.data)}
const text=(v:unknown)=>typeof v==='string'||typeof v==='number'?String(v):'';
export function safePhoto(v:unknown){try{const u=new URL(text(v));return u.protocol==='https:'&&u.hostname==='tigers.co.kr'&&u.pathname.startsWith('/files/')?u.href:''}catch{return ''}}
export function normalizeRoster(data:Record<string,unknown>,group:RosterGroup):Person[]{if(!Array.isArray(data.list))throw Error('Missing roster');const seen=new Set<string>();return data.list.map(v=>{const r=asObject(v);const id=text(r.pcode);if(!/^\d{4,8}$/.test(id)||!text(r.playerName))throw Error('Invalid person');return{id,name:text(r.playerName),number:text(r.backnum),image:safePhoto(r.playerImg),group,role:text(r.position2)||rosterGroups.find(g=>g.id===group)!.label,military:r.army_yn==='Y'}}).filter(p=>{if(seen.has(p.id))return false;seen.add(p.id);return true})}
export function normalizeRows(value:unknown):StatRow[]{if(value==null)return [];if(!Array.isArray(value))throw Error('Invalid rows');return value.map(row=>{const r=asObject(row);const out:StatRow={};for(const [k,v] of Object.entries(r)){if(v==null||typeof v==='string'||typeof v==='number')out[k.replace(/_/g,'').toLowerCase()]=v as string|number|null}return out})}
export function normalizeDetail(data:Record<string,unknown>,kind:PlayerDetail['kind'],year:number,id:string):PlayerDetail{
 const p=asObject(kind==='coach'?data.coachstep:data.gameplayer);if(text(p.pcode)!==id)throw Error('Player mismatch');
 const summaries=normalizeRows(Array.isArray(data.seasonsummary)?data.seasonsummary:data.seasonsummary?[data.seasonsummary]:[]);const summary=summaries.find(r=>String(r.gyear)===String(year))??null;
 const splits:Record<string,StatRow[]>={};for(const key of ['bymonth','bymatchteam','byvisit','byweek','bydaytime','seasonallgame'])splits[key]=normalizeRows(data[key]);
 // A mismatched upstream season must never appear under the selected year.
 if(summaries.length&&!summary)for(const key of Object.keys(splits))splits[key]=[];
 return {profile:{name:text(p.playerName),number:text(p.backnum),image:safePhoto(p.playerImg),role:text(p.position2)||text(p.position),birth:text(p.birth),body:text(p.heightWeight),hand:text(p.hittype),school:text(p.career),debut:text(p.indate),draft:text(p.draft_if),career:text(p.career_if)},summary,history:normalizeRows(data.yearrecordlist),splits,kind,year,checkedAt:new Date().toISOString()};
}
export const displayStat=(v:unknown)=>v===null||v===undefined||v===''?'—':String(v);
export const pitchingColumns=[['gamenum','경기'],['era','평균자책점'],['w','승'],['l','패'],['sv','세이브'],['hold','홀드'],['inndisplay','이닝'],['kk','탈삼진'],['hit','피안타'],['hr','피홈런'],['bb','볼넷'],['hp','사구'],['r','실점'],['er','자책점']] as const;
export const battingColumns=[['gamenum','경기'],['hra','타율'],['ab','타수'],['hit','안타'],['h2','2루타'],['h3','3루타'],['hr','홈런'],['rbi','타점'],['run','득점'],['sb','도루'],['bb','볼넷'],['hp','사구'],['kk','삼진'],['bra','출루율'],['slg','장타율']] as const;
export async function officialData(path:string,init?:RequestInit){const r=await fetch('https://tigers.co.kr/v1/game/'+path,{...init,cache:'no-store',signal:AbortSignal.timeout(10000),headers:{Accept:'application/json',...init?.headers}});if(!r.ok)throw Error('Upstream unavailable');return unwrap(await r.json())}
