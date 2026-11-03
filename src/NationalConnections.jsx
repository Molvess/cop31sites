import React from 'react';
import {ArrowUpRight, Building2, Factory, Leaf, Zap} from 'lucide-react';
import './national-connections.css';

const initiatives=[
  {Icon:Building2,url:'https://www.sbb.gov.tr/kalkinma_planlari/',tr:{tag:'KALKINMA PLANI',title:'On İkinci Kalkınma Planı',detail:'Kaynak verimliliği, yeşil ve dijital dönüşüm.'},en:{tag:'DEVELOPMENT PLAN',title:'Twelfth Development Plan',detail:'Resource efficiency, green and digital transformation.'}},
  {Icon:Leaf,url:'https://destek.csb.gov.tr/sifir-atik-projesi-99122',tr:{tag:'ULUSAL GİRİŞİM',title:'Sıfır Atık Projesi',detail:'Atığı azaltma, ayrıştırma ve geri kazanım.'},en:{tag:'NATIONAL INITIATIVE',title:'Zero Waste Project',detail:'Waste reduction, separation and recovery.'}},
  {Icon:Zap,url:'https://www.enerji.gov.tr/evced-enerji-verimliligi-uevep',tr:{tag:'EYLEM PLANI',title:'II. Ulusal Enerji Verimliliği Eylem Planı',detail:'Ölçüm, izleme ve enerji tasarrufu.'},en:{tag:'ACTION PLAN',title:'Second National Energy Efficiency Action Plan',detail:'Measurement, monitoring and energy savings.'}},
  {Icon:Factory,url:'https://tubitak.gov.tr/tr/turkiye-yesil-sanayi-projesi',tr:{tag:'AR-GE PROGRAMI',title:'Türkiye Yeşil Sanayi Projesi',detail:'Yeşil teknoloji ve kaynak verimliliği odaklı yenilik.'},en:{tag:'R&D PROGRAMME',title:'Türkiye Green Industry Project',detail:'Innovation in green technology and resource efficiency.'}}
];

export default function NationalConnections({language='tr'}){
  const tr=language!=='en';
  return <section className="national-section section-wrap" aria-labelledby="national-title">
    <div className="section-head"><div><span className="eyebrow">{tr?'TÜRKİYE İLE ORTAK HEDEFLER':'SHARED GOALS IN TÜRKİYE'}</span><h2 id="national-title">{tr?'Kalkınma gündemiyle buluşan kampüs':'A campus aligned with Türkiye’s development agenda'}</h2></div><p>{tr?'Projenin yaklaşımı, Türkiye’deki bu resmî plan ve girişimlerin öncelikleriyle kesişiyor.':'The project’s approach intersects with the priorities of these official plans and initiatives in Türkiye.'}</p></div>
    <div className="national-grid">{initiatives.map(item=>{const data=item[tr?'tr':'en'];return <a className="national-card" key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"><span className="national-card-top"><span className="national-icon"><item.Icon size={23}/></span><ArrowUpRight size={19}/></span><small>{data.tag}</small><strong>{data.title}</strong><p>{data.detail}</p><span className="national-source">{tr?'Resmî kaynağı incele':'View official source'} <ArrowUpRight size={15}/></span></a>})}</div>
    <p className="national-disclaimer">{tr?'Bu bağlantılar konu benzerliğini gösterir; resmî ortaklık veya destek beyanı değildir.':'These links show thematic relevance; they do not imply official partnership or funding.'}</p>
  </section>;
}
