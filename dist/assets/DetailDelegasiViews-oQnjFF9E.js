import{f as p,u as b,h,g as f,r as g,c as x,a as e,b as w,w as S,t as a,o as D,m as T}from"./index-Z_fhCoxB.js";const k={"aria-label":"breadcrumb"},v={class:"breadcrumb"},y={class:"breadcrumb-item"},B=e("li",{class:"breadcrumb-item","aria-current":"page"},"Detail",-1),N=e("h1",{class:"text-dark fw-bold mb-4"},"Detail Delegasi",-1),V={class:"card"},j=e("h5",{class:"card-header text-dark"},"Surat Tugas",-1),C={class:"card-body"},P={class:"list-group list-group-flush"},E={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},I=e("span",{class:"fw-bold me-3 text-dark mb-2"},"Nomor",-1),M={class:"mb-2"},R={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},U=e("span",{class:"fw-bold me-3 text-dark mb-2"},"Tanggal",-1),q={class:"mb-2"},z={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},A=e("span",{class:"fw-bold me-3 text-dark mb-2"},"Uraian",-1),F={class:"mb-2"},K={__name:"DetailDelegasiViews",setup(G){const _=p(),u=b().params.noST,s=h({});return f(async()=>{const t=await _.fetchData("delegasiPegawai");s.value=t.find(o=>o.noST.noST==u)}),(t,o)=>{var n,l,i,c,r,d;const m=g("router-link");return D(),x("div",null,[e("nav",k,[e("ol",v,[e("li",y,[w(m,{to:{name:"delegasi"}},{default:S(()=>[T("Delegasi Pegawai")]),_:1})]),B])]),N,e("div",V,[j,e("div",C,[e("ul",P,[e("li",E,[I,e("span",M,a((l=(n=s.value)==null?void 0:n.noST)==null?void 0:l.noST),1)]),e("li",R,[U,e("span",q,a(t.formatDate((c=(i=s.value)==null?void 0:i.noST)==null?void 0:c.tgl)),1)]),e("li",z,[A,e("span",F,a((d=(r=s.value)==null?void 0:r.noST)==null?void 0:d.uraian),1)])])])])])}}};export{K as default};
