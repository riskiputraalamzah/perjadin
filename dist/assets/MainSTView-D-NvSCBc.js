import{e as U,g as c,f as V,c as u,a as t,F,s as L,t as _,b as N,w as H,o as m,j as D,v as x,d as z,p as A,h as J,S as O}from"./index-Zf5tl8Hn.js";import{_ as R}from"./ModalItem-CsntKK8A.js";import{T as s}from"./ToastAlert-DwSx-M0G.js";import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const f=h=>(A("data-v-04ae8a65"),h=h(),J(),h),q={class:"card"},G={class:"card-body"},K=f(()=>t("h4",{class:"card-title mb-4"},"List Surat Tugas",-1)),Q=["disabled"],W={class:"table-responsive"},X={class:"table table-striped table-bordered"},Z=f(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Tanggal Penugasan"),t("th",{scope:"col"},"Uraian Penugasan"),t("th",{scope:"col",class:"text-center"},"Action")])],-1)),tt={key:0},at=["textContent"],et=["textContent"],ot=["textContent"],nt={class:"text-center"},st=["onClick"],it=["onClick"],rt={key:1},lt={colspan:"6",class:"text-center"},ct={class:"mb-3"},dt=f(()=>t("label",{for:"tgl",class:"form-label"},"Tanggal Penugasan",-1)),ut=["min"],mt={class:"mb-3"},ht=f(()=>t("label",{for:"uraian",class:"form-label"},"Uraian Penugasan",-1)),i="suratTugas",gt={__name:"MainSTView",setup(h){const r=U(),o=c({tgl:"",uraian:""}),d=c([]),g=c(!0);V(async()=>{console.log("onmounted surat tugas"),d.value=await r.fetchData(i),g.value=!g.value,y()});const w=()=>o.value.tgl?o.value.uraian.trim()?!0:(s.fire({icon:"error",title:"Uraian harus diisi"}),!1):(s.fire({icon:"error",title:"Tanggal SPPD harus diisi"}),!1),v=async({actionType:n})=>{if(w())try{const a=JSON.parse(JSON.stringify(o.value));n==="add"?(await r.addItem(i,a),s.fire({icon:"success",title:"Data Surat Tugas berhasil ditambahkan"})):n==="edit"&&(await r.updateData(i,"id",a.id,a),s.fire({icon:"success",title:"Data Surat Tugas berhasil diubah"})),d.value=await r.fetchData(i),T()}catch(a){console.error("Error:",a),s.fire({icon:"error",title:"Terjadi kesalahan"})}},T=()=>{o.value={tgl:"",uraian:""}},k=async n=>{if((await O.fire({title:"Hapus Data Surat Tugas?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await r.deleteItemById(i,n)?(s.fire({icon:"success",title:`Data ${i} berhasil dihapus`}),d.value=await r.fetchData(i)):s.fire({icon:"error",title:"Gagal menghapus data"})}catch(e){console.error("Error deleting item:",e),s.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},B=()=>{T(),l.value={title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:o.value}},C=n=>{o.value={...n},l.value={title:"Edit Data Surat Tugas",confirmButtonText:"Update",actionType:"edit",data:o.value}},l=c({title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:{}}),p=c(null),y=()=>{p.value.style.height="auto",p.value.style.height=`${p.value.scrollHeight}px`},b=new Date,I=b.getFullYear(),M=String(b.getMonth()+1).padStart(2,"0"),$=String(b.getDate()).padStart(2,"0"),P=c(`${I}-${M}-${$}`),j=n=>{if(!n)return"";const a={day:"numeric",month:"long",year:"numeric"};return new Date(n).toLocaleDateString("id-ID",a)};return(n,a)=>(m(),u("div",q,[t("div",G,[K,t("button",{type:"button",class:"btn btn-primary mb-4",onClick:B,disabled:g.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,Q),t("div",W,[t("table",X,[Z,d.value.length>0?(m(),u("tbody",tt,[(m(!0),u(F,null,L(d.value,(e,S)=>(m(),u("tr",{key:S},[t("td",{textContent:_(S+1)},null,8,at),t("td",{textContent:_(j(e.tgl))},null,8,et),t("td",{textContent:_(e.uraian)},null,8,ot),t("td",nt,[t("button",{class:"btn-danger btn me-2 btn-sm",onClick:E=>k(e.id)}," Hapus ",8,st),t("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:E=>C(e)}," Edit ",8,it)])]))),128))])):(m(),u("tbody",rt,[t("tr",null,[t("td",lt,_(g.value?"Loading Data...":"Data masih kosong"),1)])]))])])]),N(R,{title:l.value.title,confirmButtonText:l.value.confirmButtonText,actionType:l.value.actionType,data:l.value.data,onConfirm:v},{body:H(()=>[t("form",{onSubmit:z(v,["prevent"])},[t("div",ct,[dt,D(t("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>o.value.tgl=e),type:"date",min:P.value,class:"form-control",id:"tgl"},null,8,ut),[[x,o.value.tgl]])]),t("div",mt,[ht,D(t("textarea",{id:"uraian","onUpdate:modelValue":a[1]||(a[1]=e=>o.value.uraian=e),class:"form-control",placeholder:"Isikan detail uraian penugasannya...",rows:"1",ref_key:"autoResizeTextarea",ref:p,onInput:y},null,544),[[x,o.value.uraian]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}},vt=Y(gt,[["__scopeId","data-v-04ae8a65"]]);export{vt as default};