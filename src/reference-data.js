// Public demonstration figures transcribed from the published Akıllı Kampüs dashboard.
// The source app embeds these values in its client bundle; it exposes no data API.
export const referenceData = {
  source: 'https://ruwqersia.is-a.dev/akilli-kampus/',
  sourceDate: '19 Ekim 2026',
  retrievedDate: '29 Ekim 2026',
  home: {
    metrics: [
      { id:'enerji', label:'Günlük Enerji', value:'1.245', unit:'kWh', change:'−%12,1' },
      { id:'su', label:'Günlük Su', value:'85', unit:'m³', change:'−%4,2' },
      { id:'atik', label:'Günlük Atık', value:'42', unit:'kg', change:'−%8,5' },
      { id:'karbon', label:'Karbon Ayak İzi', value:'320', unit:'kg CO₂e', change:'+%10,1' }
    ],
    finance: [
      { label:'Elektrik', amount:'₺5.415,75', quantity:'1.245 kWh', rate:'₺4,35 / birim' },
      { label:'Su', amount:'₺2.762,50', quantity:'85 m³', rate:'₺32,50 / birim' },
      { label:'Doğalgaz', amount:'₺8.192,00', quantity:'640 m³', rate:'₺12,80 / birim' }
    ],
    estimatedSavings:'₺2.480,00',
    quotas:[
      {label:'Enerji limiti',used:1345,limit:1700,unit:'kWh'},
      {label:'Su limiti',used:85,limit:130,unit:'m³'},
      {label:'Atık limiti',used:42,limit:95,unit:'kg'},
      {label:'Karbon limiti',used:320,limit:355,unit:'kg CO₂e'}
    ],
    chart: {
      'Bugün':Array.from({length:24},(_,hour)=>({label:`${String(hour).padStart(2,'0')}:00`,value:Math.round(90+Math.sin(hour/3.2)*110+(hour%5)*8)})),
      'Bu hafta':[['Pzt',720],['Sal',810],['Çar',680],['Per',845],['Cum',790],['Cmt',610],['Paz',540]].map(([label,value])=>({label,value})),
      'Bu ay':[['May',2700],['Haz',2600],['Tem',2480],['Ağu',2350],['Eyl',2260],['Eki',2140]].map(([label,value])=>({label,value}))
    },
    recommendation:'B-Blok aydınlatma ve HVAC sistemlerinde 18:00–22:00 arasında normalin %15 üzerinde tüketim tespit edildi. Zamanlayıcı optimizasyonu ile günlük 12 kWh tasarruf sağlanabilir.'
  },
  energy: {
    total:'8.420 kWh', cost:'₺36.627,00', rate:'₺4,35/kWh',
    daily:[620,710,540,780,690,810,760,880,640,720,590,680].map((value,index)=>({label:String(index+1),value})),
    blocks:[
      {name:'A Blok',value:2450,share:'%29,1',status:'Yüksek'},
      {name:'B Blok',value:1820,share:'%21,6',status:'Yüksek'},
      {name:'C Blok',value:1530,share:'%18,2',status:'Normal'},
      {name:'D Blok',value:1210,share:'%14,4',status:'Normal'},
      {name:'E Blok',value:890,share:'%10,6',status:'Normal'},
      {name:'F Blok',value:520,share:'%6,1',status:'Normal'}
    ]
  },
  gas: {
    total:'640 m³',cost:'₺8.192,00',rate:'₺12,80/m³',comparison:'%6,4 daha düşük',savings:'₺524,80',
    daily:[72,84,76,98,88,104,118].map((value,index)=>({label:String(index+1),value}))
  },
  water: {
    total:'76,4 m³',cost:'₺2.483,00',savings:'%8',rate:'₺32,50/m³',
    daily:[['Pzt',11.2],['Sal',12.8],['Çar',10.4],['Per',13.6],['Cum',12.1],['Cmt',8.4],['Paz',7.9]].map(([label,value])=>({label,value})),
    blocks:[['A Blok',16],['B Blok',22],['C Blok',18],['D Blok',15],['E Blok',9],['F Blok',5]].map(([name,value])=>({name,value}))
  },
  waste: {
    total:'120 kg',collectionPoint:'C Blok arka servis girişi',hours:'08:30–17:30 · Hafta içi',fill:'%68',
    categories:[['Kağıt',35,29.2],['Plastik',28,23.3],['Cam',22,18.3],['Metal',18,15],['Organik',12,10],['Diğer',5,4.2]].map(([name,value,share])=>({name,value,share}))
  },
  carbon: {
    total:'2.340 kg CO₂e',change:'+%10,1',
    sources:[['Enerji',1875,78],['Su',47,2],['Atık',234,10],['Ulaşım',184,10]].map(([name,value,share])=>({name,value,share}))
  },
  ai: {
    prediction:'1.320 kWh',confidence:'%87',anomalyCount:2,
    anomalies:[
      {title:'B Blok gece tüketimi',detail:'02:00–05:00 arası beklenen değerin %38 üzerinde.',level:'Uyarı'},
      {title:'C Blok su kaçağı şüphesi',detail:'Son 3 günde sürekli taban tüketim yükseliyor.',level:'Kritik'}
    ],
    recommendations:[
      'A Blok aydınlatma otomasyonu: 18:00–22:00 kapatma senaryosu → %12 elektrik tasarrufu.',
      'Kütüphane HVAC set noktası 1°C yükseltildiğinde tahmini 84 kWh/gün kazanç.',
      'Organik atık ayrıştırma oranı %10 artırılırsa karbon emisyonu ~23 kg CO₂e düşer.',
      'Su vanası bakımı (C Blok) tahmini 2,4 m³/gün kaybı önler.'
    ]
  },
  pilot: {
    phases:[
      {name:'İhtiyaç Analizi',duration:'2 hafta',progress:100},
      {name:'IoT Kurulumu',duration:'2 hafta',progress:100},
      {name:'Veri Toplama',duration:'6–8 hafta',progress:70},
      {name:'Analiz ve AI',duration:'8–12 hafta',progress:40},
      {name:'Değerlendirme',duration:'12+ hafta',progress:15}
    ],
    carbonReduction:'%25',annualGain:'250.000 ₺/yıl',transformation:'Yeşil Kampüs Dönüşümü'
  }
};
