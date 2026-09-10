'use client';
import {useEffect,useState} from 'react';
export function useUrlState<T extends Record<string,string>>(defaults:T,validate:(key:string,value:string)=>boolean,enabled=true){
 const [state,setState]=useState(defaults);const [ready,setReady]=useState(false);
 useEffect(()=>{if(!enabled){setReady(true);return;}const restore=()=>{const q=new URLSearchParams(location.search);setState(Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,q.has(k)&&validate(k,q.get(k)!)?q.get(k)!:v])) as T);setReady(true)};restore();window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore)},[]);
 useEffect(()=>{if(!ready||!enabled)return;const url=new URL(location.href);for(const [k,v] of Object.entries(state)){if(v)url.searchParams.set(k,v);else url.searchParams.delete(k)}window.history.replaceState(window.history.state,'',url)},[state,ready,enabled]);
 return [state,(patch:Partial<T>)=>setState(s=>({...s,...patch})),ready] as const;
}
