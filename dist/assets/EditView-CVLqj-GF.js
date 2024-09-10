import{f as h,p as F,u as N,h as r,g as T,y as k,c as n,a as t,b as C,w as j,t as v,e as S,l as m,v as D,n as P,s as g,A as B,F as U,x as E,z as w,r as R,o as i,m as $}from"./index-CQcpGnB-.js";import{T as z}from"./ToastAlert-DHQ-cLHn.js";const I={"aria-label":"breadcrumb"},O={class:"breadcrumb"},L={class:"breadcrumb-item"},q={class:"breadcrumb-item","aria-current":"page"},G={class:"text-dark fw-bold mb-4"},H={class:"row"},J={class:"col-md-6 col-lg-4"},K={key:0,class:"invalid-feedback"},Q={class:"col-md-6 col-lg-4"},W={key:0,class:"invalid-feedback"},X={class:"col-md-6 col-lg-4"},Y={key:0,class:"invalid-feedback"},Z={class:"col-md-6 col-lg-4"},aa=["textContent","value"],ea={key:0,class:"invalid-feedback"},ta=["disabled"],na={__name:"EditView",setup(la){const u=h(),M=F(),d=N(),f=r([]),b=r([]),e=r({noSP2D:"",tglSP2D:"",metaAnggaran:"",spm:{}}),s=r({noSP2D:!1,tglSP2D:!1,metaAnggaran:!1,spm:!1}),c=parseInt(d.params.id);T(async()=>{if(b.value=await u.fetchData("sp2d"),f.value=await u.fetchData("spm"),c){const o=await u.findData("sp2d",c);o&&(e.value={...o})}});const A=k(()=>f.value.filter(o=>e.value.spm&&e.value.spm.noSPM===o.noSPM?!0:!b.value.some(a=>a.spm.noSPM===o.noSPM))),p=r(!1),_=k({get(){return e.value.noSP2D!==""&&e.value.tglSP2D!==""&&e.value.metaAnggaran!==""&&Object.keys(e.value.spm).length!==0},set(o){p.value=o}}),y=async()=>{if(!_.value)return;p.value=!0,e.value.spm=w(e.value.spm);const o={...w(e.value)};await u.updateData("sp2d","id",c,o),z.fire({icon:"success",title:"Data Berhasil diperbarui"}),p.value=!1,M.push("/sp2d")};return(o,a)=>{const x=R("router-link");return i(),n("div",null,[t("nav",I,[t("ol",O,[t("li",L,[C(x,{to:{name:"sp2d"}},{default:j(()=>a[7]||(a[7]=[$("SP2D")])),_:1})]),t("li",q,v(S(d).params.id?"Edit Data":"Tambah Data"),1)])]),t("h1",G,v(S(d).params.id?"Edit Data SP2D":"Tambah Data SP2D"),1),t("div",H,[t("div",J,[t("div",null,[a[8]||(a[8]=t("label",{for:"noSP2D",class:"form-label"},"No SP2D",-1)),m(t("input",{type:"text",class:P(["form-control",{"is-invalid":s.value.noSP2D&&e.value.noSP2D===""}]),"onUpdate:modelValue":a[0]||(a[0]=l=>e.value.noSP2D=l),id:"noSP2D",onFocus:a[1]||(a[1]=l=>s.value.noSP2D=!0)},null,34),[[D,e.value.noSP2D]]),s.value.noSP2D&&e.value.noSP2D===""?(i(),n("div",K," No SP2D wajib diisi. ")):g("",!0)])]),t("div",Q,[t("div",null,[a[9]||(a[9]=t("label",{for:"tglSP2D",class:"form-label"},"Tanggal SP2D",-1)),m(t("input",{type:"date",class:P(["form-control",{"is-invalid":s.value.tglSP2D&&e.value.tglSP2D===""}]),"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.tglSP2D=l),id:"tglSP2D",onFocus:a[3]||(a[3]=l=>s.value.tglSP2D=!0)},null,34),[[D,e.value.tglSP2D]]),s.value.tglSP2D&&e.value.tglSP2D===""?(i(),n("div",W," Tanggal SP2D wajib diisi. ")):g("",!0)])]),t("div",X,[t("div",null,[a[10]||(a[10]=t("label",{for:"metaAnggaran",class:"form-label"},"Meta Anggaran",-1)),m(t("input",{type:"text",class:P(["form-control",{"is-invalid":s.value.metaAnggaran&&e.value.metaAnggaran===""}]),"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.metaAnggaran=l),id:"metaAnggaran",onFocus:a[5]||(a[5]=l=>s.value.metaAnggaran=!0)},null,34),[[D,e.value.metaAnggaran]]),s.value.metaAnggaran&&e.value.metaAnggaran===""?(i(),n("div",Y," Meta Anggaran wajib diisi. ")):g("",!0)])]),t("div",Z,[t("div",null,[a[12]||(a[12]=t("label",{for:"noSPM",class:"form-label"},"No SPM",-1)),m(t("select",{class:"form-select",id:"noSPM","onUpdate:modelValue":a[6]||(a[6]=l=>e.value.spm=l)},[a[11]||(a[11]=t("option",{selected:"",disabled:""},"Pilih Salah Satu",-1)),(i(!0),n(U,null,E(A.value,(l,V)=>(i(),n("option",{key:V,textContent:v(l.noSPM),value:l},null,8,aa))),128))],512),[[B,e.value.spm]]),s.value.spm&&Object.keys(e.value.value.spm).length===0?(i(),n("div",ea," No SPM wajib dipilih. ")):g("",!0)])])]),t("button",{onClick:y,class:"btn btn-warning mt-4",disabled:!_.value},v(S(d).params.id?"Update":"Simpan"),9,ta)])}}};export{na as default};