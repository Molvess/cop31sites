import {referenceData} from './reference-data.js';

export function analyzeResource(resource,language='tr'){
  const en=language==='en';
  if(resource==='enerji'||resource==='su'||resource==='dogalgaz'){
    const points=resource==='enerji'?referenceData.home.chart['Bu hafta']:resource==='su'?referenceData.water.daily:referenceData.gas.daily;
    const peak=points.reduce((a,b)=>b.value>a.value?b:a);
    const average=points.reduce((sum,point)=>sum+point.value,0)/points.length;
    const excess=Math.round((peak.value/average-1)*100);
    const unit=resource==='enerji'?'kWh':'m³';
    const value=peak.value.toLocaleString(en?'en-US':'tr-TR',{maximumFractionDigits:1});
    const days={Pzt:'Mon',Sal:'Tue','Çar':'Wed',Per:'Thu',Cum:'Fri',Cmt:'Sat',Paz:'Sun'};
    const label=en?(days[peak.label]??`day ${peak.label}`):/^\d+$/.test(peak.label)?`${peak.label}. gün`:`${peak.label} günü`;
    if(en){
      const action=resource==='enerji'?'Check lighting and equipment schedules on that day.':resource==='su'?'Verify the meter reading and check for possible leaks.':'Compare heating hours with occupancy before changing settings.';
      return `The sample peak is ${label} at ${value} ${unit}, ${excess}% above the sample daily average. ${action}`;
    }
    const action=resource==='enerji'?'O günün aydınlatma ve cihaz çalışma çizelgesini kontrol edin.':resource==='su'?'Sayaç okumasını doğrulayın ve olası kaçakları inceleyin.':'Ayarları değiştirmeden önce ısıtma saatlerini kullanım yoğunluğuyla karşılaştırın.';
    return `Örnek seride en yüksek değer ${label} ${value} ${unit}; günlük ortalamanın %${excess} üzerinde. ${action}`;
  }
  const categories=resource==='atik'?referenceData.waste.categories:referenceData.carbon.sources;
  const total=categories.reduce((sum,item)=>sum+item.value,0);
  const lead=categories.reduce((a,b)=>b.value>a.value?b:a);
  const share=Math.round(lead.value/total*100);
  if(resource==='atik')return en?`${({Kağıt:'Paper',Plastik:'Plastic',Cam:'Glass',Metal:'Metal',Organik:'Organic',Diğer:'Other'})[lead.name]??lead.name} is the largest sample waste stream at ${share}% (${lead.value} kg). Review collection-point separation for this material first.`:`Örnek atık dağılımında en büyük pay ${lead.name}: %${share} (${lead.value} kg). Önce bu malzemenin toplama noktalarındaki ayrıştırmasını inceleyin.`;
  return en?`${({Enerji:'Energy',Su:'Water',Atık:'Waste',Ulaşım:'Transport'})[lead.name]??lead.name} accounts for ${share}% of the sample carbon breakdown (${lead.value} kg CO₂e). Prioritize checking the inputs and reduction options for this source.`:`Örnek karbon dağılımının %${share}'i ${lead.name} kaynaklı (${lead.value} kg CO₂e). Bu kaynağın ölçüm girdilerini ve azaltım seçeneklerini öncelikle inceleyin.`;
}
