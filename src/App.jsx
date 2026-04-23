import { useState } from "react";

/* ═══════════════════════════════════════════
   실제 브랜드 데이터 (비교표 이미지 기반)
═══════════════════════════════════════════ */
const BRANDS = [
  {
    id:1, name:"레저로", nameEn:"LEZURO", color:"#065f46",
    tag:"🏆 출점율 1위", tagColor:"#d97706", rating:4.5, reviews:128,
    strength:"출점율 1위 브랜드",
    features:["Dual Vision 500fps 초고속 카메라","100개+ 무료 코스","연중무휴 A/S 전담팀","전국 네트워크 시스템"],
    spec:{
      systemName:"레저로 스크린 파크골프",
      sensor:"Dual Vision 500fps Camera (조고속 카메라 센서)",
      projector:"Epson 레이저 빔 / 5,200 ANSI / WUXGA / 4K 신호 입력",
      kiosk:"22인치 스마트 터치 스크린 모니터 (키오스크)",
      teeUp:"매립형 오토티업기 6버튼형 (방향키/그리드/멀리건)",
      swing:"티브러쉬 + 타석매트(충격완화) + 홀컵플레이트",
      contents:"100개+ 무료 코스, 월간 전국 인기파크골프장 업데이트, 분기별 그래픽 업그레이드",
      network:"전국 네트워크 시스템(앱내), 매장/전국 대결, 매장 관리 프로그램",
      as:"A/S 전담팀 운영(원격/출장), 연중 무휴 A/S",
      price:"유선문의", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:2, name:"GTR", nameEn:"GTR Park System", color:"#b91c1c",
    tag:"🎮 실제 그래픽", tagColor:"#b91c1c", rating:4.2, reviews:89,
    strength:"실제 그래픽 구현",
    features:["Smart Dual + High Speed 센서","자동 업데이트","광고 수익화 지원","자체 제작 A/S"],
    spec:{
      systemName:"GTR Park System",
      sensor:"Smart Dual Sensor + Dual High Speed Camera",
      projector:"5,000~7,000 ANSI, FHD 해상도",
      kiosk:"스크린 파크 관리(앱) / 스코어관리",
      teeUp:"7버튼형 (방향키/그리드/멀리건), A/S 용이",
      swing:"-",
      contents:"주기적 자동 업데이트, 코스/게임기록 저장·분석",
      network:"콘텐츠/유저 데이터 저장·관리, 매장 광고/수익화",
      as:"센서/하드웨어/소프트웨어 자체 제작, A/S 가능",
      price:"23,000,000원", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:3, name:"마실", nameEn:"Masil Park Golf", color:"#0369a1",
    tag:"✅ 폐점율 0%", tagColor:"#0369a1", rating:4.2, reviews:64,
    strength:"폐점율 0% 안정 운영",
    features:["4K UHD/HD 프로젝터","교육형 반복숙달 트레이닝","전용 앱 제공","스윙 관리 시스템"],
    spec:{
      systemName:"마실 스크린 파크골프",
      sensor:"센서 – 시스템 하드웨어 4종에 포함",
      projector:"프로젝터 (4K UHD / HD)",
      kiosk:"키오스크 (고성능 PC / 터치 모니터 기반)",
      teeUp:"모션티업기",
      swing:"-",
      contents:"코스 업데이트, 교육형 반복숙달·트레이닝 모드",
      network:"전용 관리 프로그램 + 전용 앱 (스윙관리·매장찾기·QR로그인)",
      as:"기술지원 / A/S",
      price:"유선문의", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:4, name:"마이파크", nameEn:"My Park Golf", color:"#7c3aed",
    tag:"🌟 맞춤형", tagColor:"#7c3aed", rating:4.1, reviews:42,
    strength:"소규모 최적화",
    features:["고정밀 센서 시스템","맞춤형 코스 구성","온라인 예약 관리","소규모 창업 특화"],
    spec:{
      systemName:"마이파크 스크린 파크골프",
      sensor:"고정밀 센서 시스템",
      projector:"고해상도 레이저 프로젝터",
      kiosk:"터치스크린 키오스크",
      teeUp:"오토티업기",
      swing:"-",
      contents:"다양한 파크골프 코스, 정기 업데이트",
      network:"온라인 예약·관리 시스템, 매장 관리 프로그램",
      as:"기술지원 / A/S 가능",
      price:"유선문의", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:5, name:"임팩트", nameEn:"Impact Screen Golf", color:"#b45309",
    tag:"📱 앱 특화", tagColor:"#b45309", rating:4.3, reviews:97,
    strength:"모바일 앱 서비스",
    features:["스윙 1mm 단위 정밀 분석","회원 전용 모바일앱","실시간 타석 관리","멀티플레이 지원"],
    spec:{
      systemName:"임팩트 스크린 파크골프",
      sensor:"조정밀 골프 센서 (스윙 1mm 단위 분석 표기)",
      projector:"고성능 빔프로젝터",
      kiosk:"스마트 콘솔 (터치스크린 기반)",
      teeUp:"오토 티업기",
      swing:"-",
      contents:"-",
      network:"회원전용 모바일앱(예약/기록/멀티플레이), 관리프로그램(실시간 타석 관리)",
      as:"-",
      price:"8,900,000원", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:6, name:"플레이파크(GTS)", nameEn:"Play Park Golf GTS", color:"#1d4ed8",
    tag:"⚙️ 고급사양", tagColor:"#1d4ed8", rating:4.4, reviews:118,
    strength:"고급 하드웨어",
    features:["듀얼 카메라 조고속 센서","KG-650UL 레이저 프로젝터","무빙퍼팅플레이트(옵션)","미러형 키오스크"],
    spec:{
      systemName:"플레이 파크골프",
      sensor:"듀얼 카메라 센서(조고속), IR LAMP, Control board",
      projector:"KG-650UL 레이저",
      kiosk:"미러형 키오스크(정전식 터치 모니터), PC: i5-12400F",
      teeUp:"오토 티업기(옵션) – 키패드 적용",
      swing:"무빙퍼팅플레이트(옵션): 리니어 액추레이터 모터 9개 / 볼감지 포토센서 / RS-232",
      contents:"-",
      network:"-",
      as:"-",
      price:"유선문의", franchise:"없음", monthly:"없음",
    },
  },
  {
    id:7, name:"파크야", nameEn:"Park Ya", color:"#047857",
    tag:"🆕 신규진입", tagColor:"#047857", rating:4.0, reviews:28,
    strength:"진입 장벽 낮음",
    features:["고정밀 센서","다양한 코스 콘텐츠","관리앱 제공","합리적 초기비용"],
    spec:{
      systemName:"파크야 스크린 파크골프",
      sensor:"고정밀 스윙 센서",
      projector:"Full HD 빔프로젝터",
      kiosk:"터치 키오스크",
      teeUp:"오토티업기",
      swing:"-",
      contents:"다양한 파크골프 코스, 업데이트 제공",
      network:"매장 관리 프로그램, 예약 시스템",
      as:"기술지원 / A/S 지원",
      price:"유선문의", franchise:"없음", monthly:"없음",
    },
  },
];

/* ═══════════════════════════════════════════
   창업비용 계산 (이미지 1 데이터 기반)
   기기: 2,300만/타석, 인테리어: 110만/평
   간판: 400만, 냉난방: 350만/대(30평당)
   파크용품: 200만/타석
═══════════════════════════════════════════ */
const calcCost = (n) => {
  const pyung = n * 12;               // ~12평/타석
  const 기기비 = 2300 * n;
  const 파크용품 = 200 * n;
  const 인테리어 = 110 * pyung;
  const 간판 = 400;
  const 냉난방기 = Math.ceil(pyung / 30) * 350;
  const 합계 = 기기비 + 파크용품 + 인테리어 + 간판 + 냉난방기;
  return { 기기비, 파크용품, 인테리어, 간판, 냉난방기, 합계, pyung };
};

const fmt = (n) => n.toLocaleString("ko-KR");
const Stars = ({ r }) => [1,2,3,4,5].map(i=>(
  <span key={i} style={{color:i<=Math.round(r)?"#f59e0b":"#d1d5db",fontSize:12}}>★</span>
));
const ACCENT = "#064e3b";
const LIGHT  = "#d1fae5";

const SPEC_ROWS = [
  { key:"sensor",   label:"센서 / 카메라" },
  { key:"projector",label:"프로젝터" },
  { key:"kiosk",    label:"키오스크 / 컨트롤러" },
  { key:"teeUp",    label:"오토티업기 / 키패드" },
  { key:"swing",    label:"스윙 / 퍼팅플레이트" },
  { key:"contents", label:"코스 / 콘텐츠" },
  { key:"network",  label:"네트워크 / 앱 / 관리" },
  { key:"as",       label:"A/S / 보증" },
  { key:"price",    label:"초기 패키지 가격" },
  { key:"franchise",label:"가맹비" },
  { key:"monthly",  label:"월 이용료 / 게임비" },
];

export default function App() {
  const [tab,   setTab]   = useState("compare");
  const [sel,   setSel]   = useState([1,2,3,5,6]);
  const [calcN, setCalcN] = useState(5);
  const [teeN,  setTeeN]  = useState(5);
  const [rate,  setRate]  = useState(10000);   // 30분당 요금
  const [hrs,   setHrs]   = useState(8);
  const [view,  setView]  = useState("basic");  // basic | spec
  const [form,    setForm]    = useState({name:"",phone:"",region:"",budget:"",brand:""});
  const [done,    setDone]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // ▼ 구글 Apps Script 웹앱 URL — 아래 가이드 보고 교체하세요
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1JcwffjacZTSgfnHWO9q5ESl_z-uQ27chrTGf2lxt7GaQlbtWO5KhhgjW8LK6CmPR/exec";

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.region) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        ...form,
        timestamp: new Date().toLocaleString("ko-KR", {timeZone:"Asia/Seoul"}),
        source: "파인드(Parkgolf Inside)",
      });
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: "GET",
        mode:   "no-cors",
      });
      setDone(true);
    } catch(e) {
      setError("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = BRANDS.filter(b=>sel.includes(b.id));
  const toggleB  = id => setSel(p=>p.includes(id)?p.filter(i=>i!==id):[...p,id]);

  // 수익 계산: 30분당 rate
  const monthly  = teeN * rate * (hrs * 2) * 30;
  const opCost   = Math.round(monthly * 0.38);
  const profit   = monthly - opCost;
  const costData = calcCost(calcN);
  const breakEven= Math.ceil(costData.합계 / (profit / 10000));

  const TABS = [
    {id:"compare", label:"🔍 브랜드 비교"},
    {id:"cost",    label:"💰 창업비용 계산"},
    {id:"revenue", label:"📈 수익 시뮬레이션"},
    {id:"consult", label:"📞 무료 상담"},
  ];

  const css = {
    root:{fontFamily:"'Apple SD Gothic Neo','Malgun Gothic',sans-serif",background:"#f0fdf4",minHeight:"100vh",color:"#111827"},
    hdr:{background:"#052e16",padding:"0 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,height:54,boxShadow:"0 2px 16px rgba(0,0,0,0.3)"},
    cta:{background:"linear-gradient(90deg,#d97706,#f59e0b)",color:"#052e16",border:"none",borderRadius:6,padding:"7px 14px",fontWeight:800,fontSize:12,cursor:"pointer"},
    hero:{background:"linear-gradient(135deg,#052e16 0%,#064e3b 55%,#065f46 100%)",padding:"28px 18px 0"},
    heroT:{fontSize:26,fontWeight:900,color:"#fff",textAlign:"center",lineHeight:1.35,marginBottom:8,letterSpacing:-0.8},
    heroD:{fontSize:12,color:"rgba(255,255,255,0.7)",textAlign:"center",lineHeight:1.7,marginBottom:18},
    stats:{display:"flex",justifyContent:"center",gap:24,paddingBottom:22,flexWrap:"wrap"},
    tabBar:{background:"#fff",borderBottom:"2px solid #bbf7d0",display:"flex",overflowX:"auto",padding:"0 10px",position:"sticky",top:54,zIndex:90},
    tabBtn:a=>({padding:"12px 14px",border:"none",background:"transparent",borderBottom:a?`3px solid ${ACCENT}`:"3px solid transparent",color:a?ACCENT:"#6b7280",fontWeight:a?800:500,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.18s"}),
    sec:{padding:"18px 13px",maxWidth:960,margin:"0 auto"},
    card:{background:"#fff",borderRadius:13,padding:17,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",marginBottom:13,border:"1px solid #d1fae5"},
    secT:{fontSize:16,fontWeight:900,color:"#052e16",marginBottom:3},
    secS:{fontSize:12,color:"#64748b",marginBottom:14},
    chip:(a,c)=>({padding:"7px 12px",borderRadius:20,border:`2px solid ${a?c:"#e2e8f0"}`,background:a?c+"18":"#f8fafc",color:a?c:"#64748b",fontWeight:a?700:400,fontSize:12,cursor:"pointer",transition:"all 0.18s"}),
    th:c=>({background:c||ACCENT,color:"#fff",padding:"10px 7px",fontWeight:700,fontSize:11,textAlign:"center"}),
    td:{padding:"10px 7px",textAlign:"center",borderBottom:"1px solid #f0fdf4",fontSize:11,verticalAlign:"top"},
    tdL:{padding:"10px 9px",fontWeight:700,fontSize:11,color:"#374151",background:"#f8fafc",borderBottom:"1px solid #f0fdf4",whiteSpace:"nowrap"},
    slider:{width:"100%",accentColor:ACCENT,cursor:"pointer"},
    pBox:bg=>({background:bg,borderRadius:11,padding:"14px 10px",textAlign:"center"}),
    bar:(pct,c)=>({height:10,borderRadius:5,background:c,width:`${Math.min(pct,100)}%`,transition:"width 0.5s"}),
    inp:{width:"100%",border:"2px solid #d1fae5",borderRadius:8,padding:"11px 13px",fontSize:14,color:"#111827",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:9},
    sub:{width:"100%",background:`linear-gradient(90deg,${ACCENT},#065f46)`,color:"#fff",border:"none",borderRadius:10,padding:"15px",fontSize:14,fontWeight:900,cursor:"pointer"},
    badge:c=>({display:"inline-block",background:c+"20",color:c,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10,border:`1px solid ${c}35`}),
    viewBtn:a=>({padding:"8px 16px",border:`2px solid ${a?ACCENT:"#d1fae5"}`,borderRadius:8,background:a?ACCENT:"#fff",color:a?"#fff":ACCENT,fontWeight:700,fontSize:12,cursor:"pointer",transition:"all 0.2s"}),
  };

  return (
    <div style={css.root}>

      {/* HEADER */}
      <header style={css.hdr}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,background:"linear-gradient(135deg,#d97706,#f59e0b)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:"#052e16"}}>F</div>
          <span style={{fontSize:17,fontWeight:900,color:"#fff",letterSpacing:-0.5}}>파인드</span>
          <span style={{fontSize:10,color:"#6ee7b7",marginLeft:2}}>Parkgolf Inside</span>
        </div>
        <button style={css.cta} onClick={()=>setTab("consult")}>무료 상담 →</button>
      </header>

      {/* HERO */}
      <div style={css.hero}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(217,119,6,0.2)",border:"1px solid rgba(217,119,6,0.4)",borderRadius:20,padding:"4px 12px",fontSize:12,color:"#fcd34d",marginBottom:14,display:"block",textAlign:"center"}}>
          🏌️ 파인드 (Parkgolf Inside) — 스크린파크골프 창업 비교 플랫폼
        </div>
        <h1 style={css.heroT}>스크린파크골프 창업<br/><span style={{color:"#fde68a"}}>브랜드별 스펙·비용·수익 완전 비교</span></h1>
        <p style={css.heroD}>레저로·GTR·마실·마이파크·임팩트·플레이파크(GTS)·파크야<br/>실제 데이터 기반, 전문가 무료 상담 연결</p>
        <div style={css.stats}>
          {[["7개","비교 브랜드"],["실제데이터","스펙 비교"],["무료","전문가 상담"],["10분","비교 완료"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <span style={{fontSize:20,fontWeight:900,color:"#f59e0b",display:"block"}}>{n}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TAB BAR */}
      <div style={css.tabBar}>
        {TABS.map(t=>(
          <button key={t.id} style={css.tabBtn(tab===t.id)} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ══ COMPARE ══ */}
      {tab==="compare" && (
        <div style={css.sec}>
          {/* Info */}
          <div style={{...css.card,background:"#ecfdf5",border:`1px solid ${ACCENT}25`}}>
            <div style={{fontSize:13,fontWeight:800,color:ACCENT,marginBottom:5}}>🏌️ 스크린파크골프 창업이란?</div>
            <div style={{fontSize:12,color:"#374151",lineHeight:1.75}}>
              파크골프채·공으로 코스를 즐기는 시니어 스포츠의 실내 버전입니다. <strong>65세 이상 인구 증가</strong>와 함께 수요가 폭발적으로 성장 중이며,
              가맹비·월 이용료 <strong>없음</strong>이 대부분 브랜드의 공통 조건입니다. 설치 규격은 브랜드 공통으로 <strong>가로 3.5m × 세로 7m × 높이 2.6~2.8m</strong> 기준입니다.
            </div>
          </div>

          {/* Filter */}
          <div style={css.card}>
            <div style={css.secT}>비교할 브랜드 선택</div>
            <div style={css.secS}>원하는 브랜드를 선택해 비교하세요 (복수 선택 가능)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {BRANDS.map(b=>(
                <button key={b.id} style={css.chip(sel.includes(b.id),b.color)} onClick={()=>toggleB(b.id)}>
                  {b.name}{sel.includes(b.id)?" ✓":""}
                </button>
              ))}
            </div>
          </div>

          {filtered.length===0
            ? <div style={{...css.card,textAlign:"center",color:"#9ca3af",padding:36}}>브랜드를 1개 이상 선택해주세요</div>
            : <>
              {/* View toggle */}
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <button style={css.viewBtn(view==="basic")}  onClick={()=>setView("basic")}>📊 기본 비교</button>
                <button style={css.viewBtn(view==="spec")}   onClick={()=>setView("spec")}>⚙️ 상세 스펙 비교</button>
              </div>

              {/* ── BASIC VIEW ── */}
              {view==="basic" && <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:12}}>
                  {filtered.map(b=>(
                    <div key={b.id} style={{...css.card,borderTop:`4px solid ${b.color}`,margin:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                        <div>
                          <div style={{fontSize:14,fontWeight:900}}>{b.name}</div>
                          <div style={{fontSize:10,color:"#9ca3af"}}>{b.nameEn}</div>
                        </div>
                        <span style={css.badge(b.tagColor)}>{b.tag}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:9}}>
                        <Stars r={b.rating}/>
                        <span style={{fontSize:11,fontWeight:700}}>{b.rating}</span>
                        <span style={{fontSize:10,color:"#9ca3af"}}>({b.reviews}명)</span>
                      </div>
                      <div style={{background:"#f0fdf4",borderRadius:8,padding:"8px 10px",marginBottom:9}}>
                        <div style={{fontSize:10,color:ACCENT,marginBottom:2}}>초기 패키지 가격</div>
                        <div style={{fontSize:14,fontWeight:900,color:ACCENT}}>{b.spec.price}</div>
                      </div>
                      <div style={{fontSize:10,color:"#64748b",marginBottom:5}}>핵심 특징</div>
                      {b.features.map(f=>(
                        <div key={f} style={{fontSize:11,color:"#374151",padding:"2px 0",borderBottom:"1px solid #f3f4f6"}}>· {f}</div>
                      ))}
                      <div style={{marginTop:9,display:"flex",gap:6}}>
                        {["가맹비 없음","월이용료 없음"].map(t=>(
                          <span key={t} style={{background:"#ecfdf5",color:ACCENT,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:8}}>✓ {t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Basic comparison table */}
                <div style={{...css.card,overflowX:"auto"}}>
                  <div style={css.secT}>📊 기본 조건 비교</div>
                  <div style={{overflowX:"auto",marginTop:12}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead>
                        <tr>
                          <th style={{...css.th(),textAlign:"left",minWidth:90}}>항목</th>
                          {filtered.map(b=><th key={b.id} style={{...css.th(b.color),minWidth:100}}>{b.name}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["시스템명",      b=>b.spec.systemName],
                          ["초기 패키지",   b=>b.spec.price],
                          ["가맹비",        b=>b.spec.franchise],
                          ["월 이용료",     b=>b.spec.monthly],
                          ["핵심 강점",     b=>b.strength],
                          ["평점",          b=>`${b.rating}★ (${b.reviews}명)`],
                        ].map(([lbl,fn])=>(
                          <tr key={lbl}>
                            <td style={css.tdL}>{lbl}</td>
                            {filtered.map(b=>(
                              <td key={b.id} style={{...css.td,fontWeight:lbl==="초기 패키지"?700:400,color:lbl==="초기 패키지"?ACCENT:"inherit"}}>
                                {fn(b)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>}

              {/* ── SPEC VIEW ── */}
              {view==="spec" && (
                <div style={{...css.card,overflowX:"auto"}}>
                  <div style={css.secT}>⚙️ 상세 스펙 비교표</div>
                  <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>
                    📐 설치 규격 공통: 가로 3.5m × 세로 7m (갤러리석 포함) × 높이 2.6~2.8m
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead>
                        <tr>
                          <th style={{...css.th(),textAlign:"left",minWidth:110}}>구분</th>
                          {filtered.map(b=><th key={b.id} style={{...css.th(b.color),minWidth:130}}>{b.name}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {SPEC_ROWS.map(row=>(
                          <tr key={row.key}>
                            <td style={css.tdL}>{row.label}</td>
                            {filtered.map(b=>(
                              <td key={b.id} style={{...css.td,textAlign:"left",lineHeight:1.6,padding:"9px 8px",color:b.spec[row.key]==="-"?"#d1d5db":"#374151"}}>
                                {b.spec[row.key]==="-"?"—":b.spec[row.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <button style={css.sub} onClick={()=>setTab("consult")}>📞 전문가에게 무료 상담받기</button>
            </>
          }
        </div>
      )}

      {/* ══ COST ══ */}
      {tab==="cost" && (
        <div style={css.sec}>
          {/* 이미지1 기반 실제 단가 안내 */}
          <div style={{...css.card,background:"#ecfdf5",border:`1px solid ${ACCENT}25`}}>
            <div style={{fontSize:13,fontWeight:800,color:ACCENT,marginBottom:8}}>📋 창업비용 항목 기준 (실제 데이터)</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
              {[
                {no:"❶",label:"기기",desc:"H/W + S/W + 설치비",price:"2,300만원/타석"},
                {no:"❷",label:"인테리어",desc:"본사 지침에 따라 제작",price:"110만원/평"},
                {no:"❸",label:"간판",desc:"본사 지침에 따라 제작",price:"400만원"},
                {no:"❹",label:"냉·난방기",desc:"천정형 40평형",price:"350만원/대"},
                {no:"❺",label:"파크용품",desc:"클럽, 장갑, 가방 등",price:"200만원/타석"},
              ].map(item=>(
                <div key={item.no} style={{background:"#fff",borderRadius:9,padding:"10px 12px",border:"1px solid #bbf7d0"}}>
                  <div style={{fontSize:10,color:"#9ca3af",marginBottom:2}}>{item.no} {item.label}</div>
                  <div style={{fontSize:11,fontWeight:900,color:ACCENT}}>{item.price}</div>
                  <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={css.card}>
            <div style={css.secT}>🏌️ 창업비용 계산기</div>
            <div style={css.secS}>타석 수를 조정하면 예상 창업비용을 자동 계산합니다</div>

            <div style={{marginBottom:22}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:700}}>타석 수</span>
                <span style={{fontSize:16,fontWeight:900,color:ACCENT}}>{calcN}타석</span>
              </div>
              <input type="range" min={1} max={15} value={calcN}
                onChange={e=>setCalcN(+e.target.value)} style={css.slider}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9ca3af",marginTop:3}}>
                <span>1타석 (소규모)</span><span>8타석 (중규모)</span><span>15타석 (대형)</span>
              </div>
            </div>

            {/* 결과 요약 */}
            <div style={{background:"linear-gradient(135deg,#052e16,#064e3b)",borderRadius:12,padding:"16px 18px",marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:12,color:"#6ee7b7",marginBottom:4}}>예상 총 창업비용 ({calcN}타석 · 약 {costData.pyung}평 기준)</div>
              <div style={{fontSize:28,fontWeight:900,color:"#fde68a"}}>{fmt(costData.합계)}<span style={{fontSize:14,fontWeight:400,color:"#a7f3d0"}}>만원</span></div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:4}}>* 임대보증금·월세 별도</div>
            </div>

            {/* 항목별 바 */}
            {[
              {label:"❶ 기기비 (H/W + S/W + 설치)",val:costData.기기비,pct:Math.round(costData.기기비/costData.합계*100),c:ACCENT},
              {label:"❷ 인테리어 ("+fmt(costData.pyung)+"평 × 110만)",val:costData.인테리어,pct:Math.round(costData.인테리어/costData.합계*100),c:"#059669"},
              {label:"❸ 간판",val:costData.간판,pct:Math.round(costData.간판/costData.합계*100),c:"#d97706"},
              {label:"❹ 냉·난방기 ("+Math.ceil(costData.pyung/30)+"대)",val:costData.냉난방기,pct:Math.round(costData.냉난방기/costData.합계*100),c:"#0891b2"},
              {label:"❺ 파크용품 (클럽·장갑·가방)",val:costData.파크용품,pct:Math.round(costData.파크용품/costData.합계*100),c:"#7c3aed"},
            ].map(item=>(
              <div key={item.label} style={{marginBottom:13}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:"#374151"}}>{item.label}</span>
                  <span style={{fontSize:12,fontWeight:700,color:item.c}}>{fmt(item.val)}만원 ({item.pct}%)</span>
                </div>
                <div style={{background:"#f3f4f6",borderRadius:5,height:10,overflow:"hidden"}}>
                  <div style={css.bar(item.pct,item.c)}/>
                </div>
              </div>
            ))}

            <div style={{background:"#fef3c7",borderRadius:9,padding:"11px 13px",marginTop:4,fontSize:12,color:"#92400e",lineHeight:1.7}}>
              ⚠️ 상기 금액은 창업 예시이며, 각 매장 여건에 따라 견적은 상이할 수 있습니다.<br/>
              임대보증금 및 월세는 지역·상권에 따라 별도 발생합니다.
            </div>
          </div>

          <button style={css.sub} onClick={()=>setTab("consult")}>📞 내 예산에 맞는 브랜드 무료 추천받기</button>
        </div>
      )}

      {/* ══ REVENUE ══ */}
      {tab==="revenue" && (
        <div style={css.sec}>
          <div style={css.card}>
            <div style={css.secT}>📈 수익 시뮬레이터</div>
            <div style={css.secS}>운영 조건을 조정해 예상 월 수익을 확인하세요</div>

            {/* 슬라이더 3개 */}
            {[
              {label:"타석 수",val:teeN,set:setTeeN,min:1,max:15,step:1,unit:"타석",marks:["1","8","15"]},
              {label:"30분당 요금",val:rate,set:setRate,min:7000,max:15000,step:500,unit:"원",marks:["7,000원","11,000원","15,000원"]},
              {label:"일평균 운영시간",val:hrs,set:setHrs,min:4,max:16,step:1,unit:"시간",marks:["4h","10h","16h"]},
            ].map(({label,val,set,min,max,step,unit,marks})=>(
              <div key={label} style={{marginBottom:22}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:700}}>{label}</span>
                  <span style={{fontSize:16,fontWeight:900,color:ACCENT}}>{val.toLocaleString()}{unit}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={val}
                  onChange={e=>set(+e.target.value)} style={css.slider}/>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9ca3af",marginTop:3}}>
                  {marks.map(m=><span key={m}>{m}</span>)}
                </div>
              </div>
            ))}

            {/* 30분당 설명 */}
            <div style={{background:"#f0fdf4",borderRadius:8,padding:"10px 12px",fontSize:11,color:"#065f46",marginBottom:14}}>
              💡 <strong>{teeN}타석 × {rate.toLocaleString()}원/30분 × 일{hrs*2}회 × 30일</strong> = 월 매출 {fmt(monthly)}원
            </div>
          </div>

          {/* 수익 카드 3개 */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
            {[
              {label:"월 예상 매출",val:fmt(monthly)+"원",bg:"#ecfdf5",c:"#065f46"},
              {label:"월 운영비(38%)",val:fmt(opCost)+"원",bg:"#fef2f2",c:"#991b1b"},
              {label:"월 순이익",val:fmt(profit)+"원",bg:"#fef3c7",c:"#b45309"},
            ].map(({label,val,bg,c})=>(
              <div key={label} style={css.pBox(bg)}>
                <span style={{fontSize:10,color:c,display:"block",marginBottom:4}}>{label}</span>
                <span style={{fontSize:13,fontWeight:900,color:c}}>{val}</span>
              </div>
            ))}
          </div>

          <div style={css.card}>
            <div style={{fontWeight:800,fontSize:13,color:"#052e16",marginBottom:12}}>📊 수익 구성 비율</div>
            {[
              {label:"순이익 (62%)",pct:62,c:ACCENT},
              {label:"운영비 — 인건비·전기·소모품 등 (38%)",pct:38,c:"#dc2626"},
            ].map(item=>(
              <div key={item.label} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:"#374151"}}>{item.label}</span>
                </div>
                <div style={{background:"#f3f4f6",borderRadius:5,height:10,overflow:"hidden"}}>
                  <div style={css.bar(item.pct,item.c)}/>
                </div>
              </div>
            ))}

            <div style={{marginTop:14,padding:"13px 15px",background:"#ecfdf5",borderRadius:9,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:ACCENT}}>💡 창업비용 기준 손익분기점</div>
                <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{calcN}타석 기준 창업비용 {fmt(costData.합계)}만원</div>
              </div>
              <span style={{fontSize:22,fontWeight:900,color:ACCENT}}>{breakEven}개월</span>
            </div>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:8,lineHeight:1.6}}>
              * 운영비 38%는 업종 평균 추정치입니다. 인건비·전기요금·소모품 등 실제 비용은 매장 상황에 따라 다를 수 있습니다.
            </div>
          </div>

          <button style={css.sub} onClick={()=>setTab("consult")}>📞 정밀 수익 분석 무료 상담받기</button>
        </div>
      )}

      {/* ══ CONSULT ══ */}
      {tab==="consult" && (
        <div style={css.sec}>
          {done ? (
            <div style={{...css.card,textAlign:"center",padding:"44px 20px"}}>
              <div style={{fontSize:46,marginBottom:12}}>✅</div>
              <div style={{fontSize:19,fontWeight:900,color:ACCENT,marginBottom:8}}>상담 신청 완료!</div>
              <div style={{fontSize:13,color:"#6b7280",lineHeight:1.9}}>
                <strong style={{color:"#374151"}}>{form.name}</strong>님,<br/>24시간 내 전문 컨설턴트가 연락드립니다.<br/><br/>
                📍 희망 지역: {form.region}<br/>
                💰 예산: {form.budget}<br/>
                🏷️ 관심 브랜드: {form.brand||"미정"}
              </div>
              <button style={{...css.sub,maxWidth:180,margin:"22px auto 0",display:"block"}}
                onClick={()=>{setDone(false);setTab("compare");}}>비교 계속보기</button>
            </div>
          ) : (
            <>
              <div style={{...css.card,background:"linear-gradient(135deg,#052e16,#064e3b)",border:"none"}}>
                <div style={{fontSize:16,fontWeight:900,color:"#fff",marginBottom:6}}>📞 전문가 무료 상담 신청</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",lineHeight:1.8}}>
                  스크린파크골프 업계 전문 컨설턴트가<br/>브랜드 선정 · 상권 분석 · 창업비용 최적화까지 도와드립니다.
                </div>
                <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
                  {["100% 무료","비밀 보장","24시간 내 연락","상권 분석 제공"].map(t=>(
                    <span key={t} style={{background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)",fontSize:11,padding:"3px 9px",borderRadius:20}}>✓ {t}</span>
                  ))}
                </div>
              </div>

              <div style={css.card}>
                {[{k:"name",ph:"이름 (필수)"},{k:"phone",ph:"연락처 010-0000-0000 (필수)"}].map(({k,ph})=>(
                  <input key={k} style={css.inp} placeholder={ph} value={form[k]}
                    onChange={e=>setForm({...form,[k]:e.target.value})}/>
                ))}
                <select style={css.inp} value={form.region} onChange={e=>setForm({...form,region:e.target.value})}>
                  <option value="">창업 희망 지역 (필수)</option>
                  {["서울","경기","인천","부산","대구","광주","대전","울산","강원","충북","충남","전북","전남","경북","경남","제주"].map(r=>(
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select style={css.inp} value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})}>
                  <option value="">관심 브랜드 (선택)</option>
                  {BRANDS.map(b=><option key={b.id} value={b.name}>{b.name}</option>)}
                  <option value="아직 미정">아직 미정</option>
                </select>
                <select style={css.inp} value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}>
                  <option value="">예산 범위</option>
                  {["5천만원 미만","5천~1억원","1억~1억5천만원","1억5천~2억원","2억원 이상"].map(b=>(
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {error && (
                  <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:8,padding:"10px 13px",fontSize:12,color:"#dc2626",marginBottom:9}}>
                    ⚠️ {error}
                  </div>
                )}
                <button
                  style={{...css.sub, opacity: (form.name&&form.phone&&form.region&&!loading) ? 1 : 0.45, display:"flex", alignItems:"center", justifyContent:"center", gap:8}}
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.phone || !form.region}
                >
                  {loading
                    ? <><span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/> 전송 중...</>
                    : "무료 상담 신청하기 →"
                  }
                </button>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <div style={{fontSize:11,color:"#9ca3af",textAlign:"center",marginTop:8}}>개인정보는 상담 목적으로만 사용됩니다.</div>
              </div>

              <div style={css.card}>
                <div style={{fontSize:14,fontWeight:900,color:"#052e16",marginBottom:11}}>💬 상담 후기</div>
                {[
                  {name:"김○○님 (경기)", text:"여러 브랜드를 혼자 비교하기 너무 힘들었는데, 스펙 차이를 한눈에 설명해주셔서 결정이 쉬웠어요.", ago:"2주 전"},
                  {name:"이○○님 (부산)", text:"임팩트 vs 레저로 고민했는데 내 상권과 예산에 맞게 분석해주셔서 큰 도움이 됐습니다.", ago:"1달 전"},
                  {name:"박○○님 (서울)", text:"가맹비·월이용료 없는 브랜드만 보고 싶었는데, 딱 맞게 정리해주셨어요.", ago:"2달 전"},
                ].map(r=>(
                  <div key={r.name} style={{padding:"11px 0",borderBottom:"1px solid #f0fdf4"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:12,fontWeight:700}}>{r.name}</span>
                      <span style={{fontSize:11,color:"#9ca3af"}}>{r.ago}</span>
                    </div>
                    <div style={{fontSize:12,color:"#4b5563",lineHeight:1.6}}>"{r.text}"</div>
                    <div style={{marginTop:3}}><Stars r={5}/></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer style={{background:"#052e16",padding:"26px 18px",textAlign:"center",marginTop:20}}>
        <div style={{fontSize:15,fontWeight:900,color:"#fff",marginBottom:3}}>파인드 PARKGOLF INSIDE</div>
        <div style={{fontSize:11,color:"#6ee7b7",marginBottom:8}}>🏌️ 스크린파크골프 전문 창업 비교 플랫폼</div>
        <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:10}}>
          {BRANDS.map(b=><span key={b.id} style={{fontSize:10,color:"#34d399"}}>{b.name}</span>)}
        </div>
        <div style={{fontSize:11,color:"#475569",lineHeight:1.8}}>
          경기도 화성시 동탄구 동탄순환대로 823 비155호<br/>
          스크린파크골프 시뮬레이터 공식 인증 판매사
        </div>
        <div style={{fontSize:10,color:"#374151",marginTop:10}}>
          본 플랫폼의 창업비용·수익 정보는 참고용이며 실제와 다를 수 있습니다.
        </div>
      </footer>
    </div>
  );
}
