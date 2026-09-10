'use client';
import {useEffect} from 'react';
export default function LegacyLinks(){useEffect(()=>{const redirect=()=>{if(location.pathname!=='/')return;const target:Record<string,string>={'#schedule':'/schedule','#roster':'/players','#field':'/stadium'};if(target[location.hash])location.replace(target[location.hash]);};redirect();window.addEventListener('hashchange',redirect);return()=>window.removeEventListener('hashchange',redirect)},[]);return null;}
