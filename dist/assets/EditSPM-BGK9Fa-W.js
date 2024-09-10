import{f as B,p as R,u as j,h as r,g as E,y as h,c as u,a as l,b as U,w as $,t as M,l as T,v as _,n as P,s as c,F as I,x as O,z as k,r as z,o as d,m as J}from"./index-Dlj3Nbua.js";import{T as K}from"./ToastAlert-BCaHB16n.js";const L={"aria-label":"breadcrumb"},q={class:"breadcrumb"},A={class:"breadcrumb-item"},G={class:"text-dark fw-bold mb-4"},H={class:"row"},Q={class:"col-md-6 col-lg-4"},W={key:0,class:"invalid-feedback"},X={class:"col-md-6 col-lg-4"},Y={key:0,class:"invalid-feedback"},Z={class:"col-md-6 col-lg-4"},ee=["value"],le={key:0,class:"invalid-feedback"},ae={class:"col-12"},te={class:"card"},se={class:"card-body"},ne={class:"table-striped table table-bordered"},oe={key:0,class:"text-center"},ie=["onChange","checked"],ue=["disabled"],Se={__name:"EditSPM",setup(de){const v=B(),y=R(),w=j(),p=parseInt(w.params.id),S=r([]),t=r({noSPM:"",tglSPM:"",nilaiSPM:0}),b=r({noSPM:"",tglSPM:"",nilaiSPM:0}),n=r({noSPM:!1,tglSPM:!1,nilaiSPM:!1}),o=r([]);E(async()=>{const a=await v.findData("spm",p);a&&(t.value=a,b.value={...a},o.value=a.selectedST||[]),S.value=await v.fetchData("delegasiPegawai")});const N=async()=>{if(!g.value)return;m.value=!0;const a={...k(t.value),selectedST:k(o.value)};await v.updateData("spm","id",p,a),m.value=!1,K.fire({icon:"success",title:"Data Berhasil diupdate"}),y.push("/spm")},x=a=>o.value.some(e=>e.noST.noST===a.noST.noST),f=a=>{var e;return(e=a.relation)==null?void 0:e.reduce((i,s)=>i+s.totalSemuaDana,0)},D=()=>{const a=o.value.reduce((e,i)=>e+f(i),0);t.value.nilaiSPM=a},F=a=>{const e=o.value.findIndex(i=>i.noST.noST===a.noST.noST);e===-1?o.value.push(a):o.value.splice(e,1),D()},C=h(()=>JSON.stringify(t.value)!==JSON.stringify(b.value)),m=r(!1),g=h({get(){return C.value&&t.value.noSPM!==""&&t.value.tglSPM!==""&&t.value.nilaiSPM>0},set(a){m.value=a}});return(a,e)=>{const i=z("router-link");return d(),u("div",null,[l("nav",L,[l("ol",q,[l("li",A,[U(i,{to:{name:"spm"}},{default:$(()=>e[5]||(e[5]=[J("SPM")])),_:1})]),e[6]||(e[6]=l("li",{class:"breadcrumb-item","aria-current":"page"},"Edit Data",-1))])]),l("h1",G,"Edit Data SPM "+M(),1),l("div",H,[l("div",Q,[l("div",null,[e[7]||(e[7]=l("label",{for:"noSPM",class:"form-label"},"No SPM",-1)),T(l("input",{type:"text",class:P(["form-control",{"is-invalid":n.value.noSPM&&t.value.noSPM===""}]),"onUpdate:modelValue":e[0]||(e[0]=s=>t.value.noSPM=s),id:"noSPM",onFocus:e[1]||(e[1]=s=>n.value.noSPM=!0)},null,34),[[_,t.value.noSPM]]),n.value.noSPM&&t.value.noSPM===""?(d(),u("div",W," No SPM wajib diisi. ")):c("",!0)])]),l("div",X,[l("div",null,[e[8]||(e[8]=l("label",{for:"tglSPM",class:"form-label"},"Tanggal SPM",-1)),T(l("input",{type:"date",class:P(["form-control",{"is-invalid":n.value.tglSPM&&t.value.tglSPM===""}]),"onUpdate:modelValue":e[2]||(e[2]=s=>t.value.tglSPM=s),id:"tglSPM",onFocus:e[3]||(e[3]=s=>n.value.tglSPM=!0)},null,34),[[_,t.value.tglSPM]]),n.value.tglSPM&&t.value.tglSPM===""?(d(),u("div",Y," Tanggal SPM wajib diisi. ")):c("",!0)])]),l("div",Z,[l("div",null,[e[9]||(e[9]=l("label",{for:"nilai",class:"form-label"},"Nilai SPM",-1)),l("input",{type:"text",class:P(["form-control",{"is-invalid":n.value.nilaiSPM&&t.value.nilaiSPM<=0}]),value:a.formatRupiah(t.value.nilaiSPM),readonly:"",id:"nilai",onFocus:e[4]||(e[4]=s=>n.value.nilaiSPM=!0)},null,42,ee),n.value.nilaiSPM&&t.value.nilaiSPM<=0?(d(),u("div",le," Nilai SPM wajib diisi. ")):c("",!0),e[10]||(e[10]=l("span",{class:"fs-1 text-info"}," Untuk mengisi Nilai SPM, Silahkan pilih ST dari tabel di bawah ",-1))])]),l("div",ae,[l("div",te,[e[12]||(e[12]=l("div",{class:"card-header"},"Pilih NO ST",-1)),l("div",se,[l("table",ne,[e[11]||(e[11]=l("thead",null,[l("tr",null,[l("th",null,"Pilih"),l("th",null,"No ST"),l("th",null,"Total Dana Seluruhnya")])],-1)),l("tbody",null,[S.value.length<0?(d(),u("div",oe,"Data Masih Kosong")):c("",!0),(d(!0),u(I,null,O(S.value,(s,V)=>(d(),u("tr",{key:V},[l("td",null,[l("input",{class:"form-check-input",type:"checkbox",style:{width:"20px",height:"20px"},onChange:re=>F(s),checked:x(s)},null,40,ie)]),l("td",null,M(s.noST.noST),1),l("td",null,M(a.formatRupiah(f(s))),1)]))),128))])])])])])]),l("button",{onClick:N,class:"btn btn-warning mt-4",disabled:!g.value}," Update ",8,ue)])}}};export{Se as default};
