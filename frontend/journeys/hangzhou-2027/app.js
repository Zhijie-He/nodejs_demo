const content=window.tripContent;
const labels={technology:'Technology',innovation:'Co-create',culture:'Explore & unwind'};
const days=document.getElementById('days');
content.days.forEach(d=>{
 const item=document.createElement('details');item.className='day';item.open=d.day===1;
 const summary=document.createElement('summary');
 const number=document.createElement('span');number.className='dayno';number.textContent=String(d.day).padStart(2,'0');
 const title=document.createElement('span');title.className='daytitle';
 for(const [tag,cls,value] of [['small','',d.date],['strong','',d.theme],['span','zh',d.zh]]){const el=document.createElement(tag);el.className=cls;el.textContent=value;title.append(el)}
 const badge=document.createElement('span');badge.className='tag '+d.type;badge.textContent=labels[d.type];
 const plus=document.createElement('span');plus.className='plus';plus.textContent='+';plus.setAttribute('aria-hidden','true');
 summary.append(number,title,badge,plus);
 const body=document.createElement('div');body.className='daybody';
 for(const [tag,cls,value] of [['p','',d.programme],['p','zh',d.cn],['small','','LOCATION / '+d.location]]){const el=document.createElement(tag);el.className=cls;el.textContent=value;body.append(el)}
 item.append(summary,body);days.append(item);
});
for(const id of ['included','excluded','conditions'])document.getElementById(id).textContent=content[id];
const lang=document.getElementById('language');
lang.addEventListener('click',()=>{const english=document.body.classList.toggle('english');lang.setAttribute('aria-pressed',String(english));lang.textContent=english?'中英双语 ↔':'English only ↔';document.querySelectorAll('.pills span').forEach(el=>{if(!el.dataset.bilingual)el.dataset.bilingual=el.textContent;el.textContent=english?el.dataset.bilingual.split(' / ')[0]:el.dataset.bilingual})});

if(localStorage.getItem("trip-language")==="en") lang.click();
lang.addEventListener("click",()=>localStorage.setItem("trip-language",document.body.classList.contains("english")?"en":"zh"));
