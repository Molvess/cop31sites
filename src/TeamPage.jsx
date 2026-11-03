import React, {useEffect, useState} from 'react';
import {ArrowLeft, ArrowUpRight, Leaf, Users} from 'lucide-react';
import './team-page.css';

const people = [
  {name: 'Ece Ecemiş Elmacı', kind: 'lead'},
  {name: 'Kerem Arslan', kind: 'student'},
  {name: 'Yadezişan Üzel', kind: 'student'},
  {name: 'Barış Yavuzdiler', kind: 'student'},
];

const words = {
  tr: {
    eyebrow: 'COP31 · AKILLI KAMPÜS', title: 'Proje yürütücüleri',
    description: 'Kaynak verimliliği ve sıfır atık odaklı akıllı kampüs çalışmasının arkasındaki ekip.',
    team: 'PROJE EKİBİ', lead: 'PROJE YÜRÜTÜCÜSÜ', student: 'ÖĞRENCİ',
    back: 'Ana sayfaya dön', school: 'Yozgat Bozok Üniversitesi · Boğazlıyan MYO',
  },
  en: {
    eyebrow: 'COP31 · SMART CAMPUS', title: 'Project team',
    description: 'The team behind the smart campus project focused on resource efficiency and zero waste.',
    team: 'PROJECT TEAM', lead: 'PROJECT LEAD', student: 'STUDENT',
    back: 'Back to home', school: 'Yozgat Bozok University · Boğazlıyan Vocational School',
  },
};

export default function TeamPage() {
  const [language, setLanguage] = useState(() => new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : localStorage.getItem('cop31-language') === 'en' ? 'en' : 'tr');
  const t = words[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Project Team | COP31 Smart Campus' : 'Proje Yürütücüleri | COP31 Akıllı Kampüs';
    localStorage.setItem('cop31-language', language);
  }, [language]);

  const choose = next => {
    setLanguage(next);
    const url = new URL(location.href);
    if (next === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  };

  return <div className="team-page">
    <header className="team-header">
      <a className="team-brand" href={language === 'en' ? '/?lang=en' : '/'}>
        <img src="/bozok-logo.png" alt={language === 'en' ? 'Yozgat Bozok University logo' : 'Yozgat Bozok Üniversitesi logosu'}/>
        <span>COP31 <small>{language === 'en' ? 'Smart Campus' : 'Akıllı Kampüs'}</small></span>
      </a>
      <div className="language-switch" role="group" aria-label={language === 'en' ? 'Select language' : 'Dil seçimi'}>
        <button type="button" className={language === 'tr' ? 'active' : ''} aria-pressed={language === 'tr'} onClick={() => choose('tr')}><span aria-hidden="true">🇹🇷</span> TR</button>
        <button type="button" className={language === 'en' ? 'active' : ''} aria-pressed={language === 'en'} onClick={() => choose('en')}><span aria-hidden="true">🇬🇧</span> EN</button>
      </div>
    </header>
    <main className="team-main">
      <div className="team-hero">
        <div className="team-hero-icon"><Users size={31}/></div>
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>
      <div className="team-list">
        <div className="team-list-heading"><Leaf size={20}/><span>{t.team}</span><span>04</span></div>
        <div className="team-org">
          <article className="team-person featured">
            <span className="team-person-number">01</span>
            <div className="team-avatar" aria-hidden="true">EE</div>
            <div className="team-person-copy">
              <span className="team-person-role">{t.lead}</span>
              <h2>{people[0].name}</h2>
              <span className="team-person-line"/>
            </div>
          </article>
          <div className="team-connector" aria-hidden="true"/>
          <div className="team-students">
            {people.slice(1).map(({name}, index) => <article className="team-person student" key={name}>
              <span className="team-person-number">0{index + 2}</span>
              <div className="team-avatar" aria-hidden="true">{name.split(' ').map(part => part[0]).slice(0, 2).join('')}</div>
              <div className="team-person-copy">
                <span className="team-person-role">{t.student}</span>
                <h2>{name}</h2>
                <span className="team-person-line"/>
              </div>
            </article>)}
          </div>
        </div>
      </div>
      <a className="team-back" href={language === 'en' ? '/?lang=en' : '/'}><ArrowLeft size={19}/>{t.back}<ArrowUpRight size={16}/></a>
    </main>
    <footer className="team-footer"><span>COP31 · {t.school}</span><span>© 2026 COP31</span></footer>
  </div>;
}
