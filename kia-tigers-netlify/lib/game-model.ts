export type Game={id:string;date:string;time:string;stadium:string;home:string;away:string;isHome:boolean;opponent:string;homeScore:number|null;awayScore:number|null;state:'scheduled'|'live'|'finished'|'cancelled'|'suspended';result:string};
export const validMonth=(month:string)=>/^(20\d{2})-(0[1-9]|1[0-2])$/.test(month);
export function normalizeGames(input:unknown,month:string):Game[]{
 if(!validMonth(month)||!Array.isArray(input))throw new Error('Invalid schedule');
 return input.map((r:Record<string,unknown>)=>{const day=String(r.displayDate??'');if(!/^\d{8}$/.test(day)||day.slice(0,6)!==month.replace('-','')||typeof r.gmkey!=='string'||!(r.homeKey==='HT'||r.visitKey==='HT'))throw new Error('Invalid game');
 const state:Game['state']=r.outcome==='취'||Number(r.status)===4?'cancelled':r.outcome==='서'?'suspended':Number(r.status)===2?'live':r.endFlag==='1'||Number(r.status)===3?'finished':'scheduled';
 const score=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?n:null;
 return {id:r.gmkey,date:day.slice(0,4)+'-'+day.slice(4,6)+'-'+day.slice(6),time:/^\d{2}:\d{2}$/.test(String(r.gtime))?String(r.gtime):'시간 미정',stadium:String(r.stadium??'미정'),home:String(r.home??''),away:String(r.visit??''),isHome:r.homeKey==='HT',opponent:String(r.matchTeamName??''),homeScore:state==='live'||state==='finished'?score(r.homeScore):null,awayScore:state==='live'||state==='finished'?score(r.visitScore):null,state,result:String(r.outcome??'')};
 }).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)||a.id.localeCompare(b.id));
}
export const stateLabel={scheduled:'경기 예정',live:'경기 중',finished:'경기 종료',cancelled:'경기 취소',suspended:'서스펜디드'};
export const POLICY_URL='https://tigers.co.kr/files/resource/2026/08/260818_ticketpolicy.png';
export const TICKET_URL='https://www.ticketlink.co.kr/sports/137/58';
export const seatOptions=[
 {id:'k9',name:'K9',weekday:16000,weekend:20000,group:1,area:'1루 112·113 / 3루 116·117 블록',note:'내야에서 투구와 수비를 가까이 보는 일반석.'},
 {id:'k8',name:'K8',weekday:14000,weekend:18000,group:1,area:'1루 107–111 / 3루 118·119·123 블록',note:'내야 경기 흐름을 즐기기 좋은 일반석.'},
 {id:'k5',name:'K5',weekday:12000,weekend:16000,group:1,area:'1루 101–106 / 3루 124–127 블록',note:'내야 양쪽 끝에 자리한 일반석.'},
 {id:'ev',name:'EV석',weekday:10000,weekend:13000,group:1,area:'5층 일반석',note:'높은 곳에서 그라운드 전체를 넓게 조망하는 좌석.'},
 {id:'outfield',name:'외야석',weekday:10000,weekend:13000,group:1,area:'외야 관람 구역',note:'외야에서 경기장의 탁 트인 풍경을 즐기는 좌석.'},
 {id:'cheer',name:'응원특별석',weekday:15000,weekend:19000,group:1,area:'3루 120–122 블록',note:'응원단상 앞 3개 블록. 열정적인 응원을 즐기고 싶을 때.'},
 {id:'champion',name:'챔피언석',weekday:50000,weekend:60000,group:1,area:'홈플레이트 뒤 중앙',note:'홈플레이트를 중심으로 경기를 바라보는 특별석.'},
 {id:'table2',name:'중앙 테이블석 · 2인',weekday:45000,weekend:55000,group:2,area:'중앙 테이블 구역',note:'테이블 단위 구매. 2인석은 입장권 2매가 필요합니다.'},
 {id:'party',name:'파티석 · 4인',weekday:25000,weekend:30000,group:4,area:'4층 테이블석',note:'테이블 단위 구매. 4인석은 입장권 4매가 필요합니다.'},
];
export function estimatePrice(seatId:string,quantity:number,rate:string){const seat=seatOptions.find(s=>s.id===seatId);if(!seat||!Number.isInteger(quantity)||quantity<1||quantity>8||quantity%seat.group!==0||!['weekday','weekend'].includes(rate))throw new Error('Invalid estimate');return (rate==='weekend'?seat.weekend:seat.weekday)*quantity;}
export function ticketWindow(game:Game,now=Date.now()){if(!game.isHome)return {label:'원정 경기',canContinue:false};if(['cancelled','finished','suspended'].includes(game.state))return {label:stateLabel[game.state],canContinue:false};if(!/^\d{2}:\d{2}$/.test(game.time))return {label:'시간 확인 필요',canContinue:false};const start=Date.parse(game.date+'T'+game.time+':00+09:00');const opens=Date.parse(game.date+'T11:00:00+09:00')-7*86400000;return now<opens?{label:'예매 오픈 전',canContinue:false,opens}:now>start+90*60000?{label:'온라인 예매 시간 종료',canContinue:false,opens}:{label:'예매 가능 시간',canContinue:true,opens};}
export function calendarFile(game:Game){if(!/^\d{2}:\d{2}$/.test(game.time))throw new Error('Time not confirmed');const stamp=(n:number)=>new Date(n).toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';const start=Date.parse(game.date+'T'+game.time+':00+09:00');const esc=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Tigers Fan Concept//Game//KO','BEGIN:VEVENT','UID:'+game.id+'@tigers-fan-concept','DTSTAMP:'+stamp(Date.now()),'DTSTART:'+stamp(start),'DTEND:'+stamp(start+3*3600000),'SUMMARY:'+esc(game.away+' vs '+game.home),'LOCATION:'+esc(game.stadium),'DESCRIPTION:구단 일정 기준. 우천 및 운영 사정으로 변경될 수 있습니다. 종료 시각은 예상입니다.','END:VEVENT','END:VCALENDAR',''].join('\r\n');}
