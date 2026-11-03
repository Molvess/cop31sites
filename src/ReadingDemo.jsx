import React, {useState} from 'react';
import {Activity, ArrowRight, Check, Droplets, History, Radio, RotateCw, ScanLine, ShieldCheck, Wifi} from 'lucide-react';
import './reading-demo.css';

const readings=[124.8,125.1,125.4,125.8];
const weekly=[8.4,10.2,9.1,12.6,11.4,13.2,10.8];
const words={
  tr:{eyebrow:'DİJİTAL OKUMA DENEYİMİ',title:'Sayaçtan telefon ekranına',description:'ESP32-CAM ile okunan örnek su sayacı değerinin mobil panele nasıl aktarıldığını keşfedin.',demo:'ETKİLEŞİMLİ DEMO',meter:'MEKANİK SAYAÇ',read:'OCR İLE OKUNAN DEĞER',unit:'metreküp',device:'BAYLAN 2010 · ESP32-CAM',scan:'Görüntü alındı',verified:'Okuma doğrulandı',transfer:'Şifreli veri aktarımı',newRead:'Yeni okuma simüle et',example:'Örnek gösterim verisi · gerçek sayaç bağlantısı yok',mobile:'MOBİL MODÜL',school:'Boğazlıyan MYO',water:'Su yönetimi',overview:'Anlık',past:'Geçmiş',current:'Son okuma',since:'Önceki okumaya göre',last:'Son 7 gün · örnek tüketim',connected:'Veri eşitlendi',previous:'Önceki okuma',difference:'Fark',screen:'Telefon panelinde su sayacı modülü önizlemesi'},
  en:{eyebrow:'DIGITAL READING EXPERIENCE',title:'From meter to mobile screen',description:'Explore how a sample water-meter reading captured with ESP32-CAM appears in the mobile dashboard.',demo:'INTERACTIVE DEMO',meter:'MECHANICAL METER',read:'OCR-READ VALUE',unit:'cubic metres',device:'BAYLAN 2010 · ESP32-CAM',scan:'Image captured',verified:'Reading verified',transfer:'Encrypted data transfer',newRead:'Simulate new reading',example:'Illustrative data · no real meter connection',mobile:'MOBILE MODULE',school:'Boğazlıyan Vocational School',water:'Water management',overview:'Overview',past:'History',current:'Latest reading',since:'Since previous reading',last:'Last 7 days · sample use',connected:'Data synced',previous:'Previous reading',difference:'Difference',screen:'Preview of the water-meter module on a phone'}
};

export default function ReadingDemo({language='tr'}){
  const t=words[language]||words.tr;
  const [index,setIndex]=useState(0);
  const [tab,setTab]=useState('overview');
  const value=readings[index],previous=index===0?124.5:readings[index-1];
  const format=n=>n.toLocaleString(language==='en'?'en-US':'tr-TR',{minimumFractionDigits:1,maximumFractionDigits:1});
  const digits=value.toFixed(1).padStart(7,'0');
  return <section className="reading-demo-section section-wrap" aria-labelledby="reading-demo-title">
    <div className="section-head reading-demo-heading"><div><span className="eyebrow">{t.eyebrow}</span><h2 id="reading-demo-title">{t.title}</h2></div><p>{t.description}</p></div>
    <div className="reading-demo-stage">
      <div className="reading-demo-top"><span><i/>{t.demo}</span><span><Radio size={15}/>{t.device}</span></div>
      <div className="reading-demo-layout">
        <div className="reading-meter-zone">
          <div className="reading-meter-card"><div className="reading-meter-top"><span>{t.meter}</span><Droplets size={23}/></div><div className="reading-meter-face"><span className="reading-meter-label">{t.read}</span><div className="reading-digits" aria-live="polite" aria-atomic="true">{digits.split('').map((digit,i)=><span className={digit==='.'?'reading-decimal':''} key={i}>{digit}</span>)}<small>m³</small></div><span className="reading-meter-unit">{t.unit}</span></div><div className="reading-meter-bottom"><span><ScanLine size={16}/>{t.scan}</span><span><ShieldCheck size={16}/>{t.verified}</span></div></div>
          <button className="reading-refresh" type="button" onClick={()=>setIndex(i=>(i+1)%readings.length)}><RotateCw size={17}/>{t.newRead}<ArrowRight size={17}/></button>
          <p className="reading-disclaimer">{t.example}</p>
        </div>
        <div className="reading-transfer" aria-hidden="true"><span className="reading-transfer-line"/><span className="reading-transfer-icon"><Wifi size={23}/></span><span className="reading-transfer-caption">{t.transfer}</span><ArrowRight size={19}/></div>
        <div className="reading-phone-zone"><div className="reading-phone-caption"><span className="eyebrow">{t.mobile}</span><strong>{t.water}</strong></div><div className="reading-phone" role="group" aria-label={t.screen}><div className="reading-phone-speaker"/><div className="reading-phone-screen"><div className="reading-phone-header"><span className="reading-phone-mark"><Droplets size={19}/></span><div><small>{t.school}</small><strong>{t.water}</strong></div><Wifi size={14}/></div><div className="reading-phone-tabs" role="tablist" aria-label={t.water}><button type="button" role="tab" aria-selected={tab==='overview'} className={tab==='overview'?'on':''} onClick={()=>setTab('overview')}>{t.overview}</button><button type="button" role="tab" aria-selected={tab==='past'} className={tab==='past'?'on':''} onClick={()=>setTab('past')}>{t.past}</button></div>{tab==='overview'?<><div className="reading-phone-value"><span><Activity size={15}/>{t.current}</span><strong>{format(value)} <small>m³</small></strong><small>{t.since} +{format(value-previous)} m³</small></div><div className="reading-phone-chart"><span>{t.last}</span><div className="reading-phone-bars">{weekly.map((amount,i)=><i key={i} style={{height:`${amount/14*100}%`}}/>)}</div></div><div className="reading-phone-status"><Check size={15}/><span>{t.connected}</span></div></>:<><div className="reading-phone-history"><div><span>{t.current}</span><strong>{format(value)} m³</strong></div><div><span>{t.previous}</span><strong>{format(previous)} m³</strong></div><div><span>{t.difference}</span><strong>+{format(value-previous)} m³</strong></div></div><div className="reading-phone-status"><History size={15}/><span>{t.connected}</span></div></>}</div><div className="reading-phone-home"/></div></div>
      </div>
    </div>
  </section>;
}
