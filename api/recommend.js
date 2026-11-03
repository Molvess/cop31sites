import {generateText} from 'ai';
import {referenceData} from '../src/reference-data.js';

const sources={
  enerji:{unit:'kWh',values:referenceData.home.chart['Bu hafta'],summary:'Haftalık örnek enerji tüketimi'},
  su:{unit:'m³',values:referenceData.water.daily,summary:'Haftalık örnek su tüketimi'},
  dogalgaz:{unit:'m³',values:referenceData.gas.daily,summary:'Son yedi günlük örnek doğalgaz tüketimi'},
  atik:{unit:'kg',values:referenceData.waste.categories,summary:'Örnek atık türü dağılımı'},
  karbon:{unit:'kg CO₂e',values:referenceData.carbon.sources,summary:'Örnek karbon kaynağı dağılımı'}
};

export default async function handler(request,response){
  if(request.method!=='GET')return response.status(405).json({error:'method_not_allowed'});
  const url=new URL(request.url,'https://cop31-interaktif.vercel.app');
  const resource=url.searchParams.get('resource');
  const language=url.searchParams.get('lang');
  const keys=[...url.searchParams.keys()];
  if(keys.length!==2||!keys.includes('resource')||!keys.includes('lang')||!Object.hasOwn(sources,resource)||!['tr','en'].includes(language))return response.status(400).json({error:'invalid_parameters'});
  const selected=sources[resource];
  const values=selected.values.map(item=>`${item.label??item.name}: ${item.value} ${selected.unit}`).join('; ');
  try{
    const {text}=await generateText({
      model:'google/gemini-2.5-flash-lite',
      system:'You are an energy and resource efficiency analyst for a concept smart campus dashboard. Use only the provided illustrative measurements. Give one concrete, cautious, actionable recommendation in 1-2 short sentences. Do not invent sensors, forecasts, savings percentages, real-time status or verified outcomes. Do not claim these are live data. Avoid markdown.',
      prompt:`Language: ${language==='tr'?'Turkish':'English'}. Resource: ${resource}. ${selected.summary}. Values: ${values}. Identify a meaningful pattern and give a practical next check or action.`,
      maxOutputTokens:130,
      abortSignal:AbortSignal.timeout(12000)
    });
    const recommendation=text.trim().slice(0,500);
    if(!recommendation)throw new Error('empty_model_response');
    response.setHeader('Cache-Control','public, s-maxage=3600, stale-while-revalidate=86400');
    return response.status(200).json({recommendation,source:'ai',illustrative:true});
  }catch(error){
    console.error('AI recommendation unavailable:',error?.message);
    return response.status(503).json({error:'ai_unavailable'});
  }
}
