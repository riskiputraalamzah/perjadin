import{f as $,h as u,g as N,c,a as t,F as U,x as V,t as T,b as j,w as F,o as m,l as v,v as S,d as L,S as H}from"./index-DEUtZzSI.js";import{_ as q}from"./ModalItem-DcjAU-FT.js";import{T as s}from"./ToastAlert-Dxzzr5V7.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";const A=["disabled"],J={class:"table-responsive"},O={class:"table table-striped table-bordered"},R={key:0},Y=["textContent"],G=["textContent"],P=["textContent"],K={class:"text-center"},Q=["onClick"],W=["onClick"],X={key:1},Z={colspan:"6",class:"text-center"},tt={class:"mb-3"},at={class:"mb-3"},et={class:"mb-3"},r="suratTugas",ot={__name:"MainSTView",setup(nt){const l=$(),o=u({noST:"",tgl:"",uraian:""}),d=u([]),f=u(!0);N(async()=>{console.log("onmounted surat tugas"),d.value=await l.fetchData(r),f.value=!f.value,x()});const D=()=>o.value.noST?o.value.tgl?o.value.uraian.trim()?!0:(s.fire({icon:"error",title:"Uraian harus diisi"}),!1):(s.fire({icon:"error",title:"Tanggal Surat Tugas harus diisi"}),!1):(s.fire({icon:"error",title:"Nomor Surat Tugas harus diisi"}),!1),y=async({actionType:n})=>{if(D())try{const a=JSON.parse(JSON.stringify(o.value));n==="add"?(await l.addItem(r,a),s.fire({icon:"success",title:"Data Surat Tugas berhasil ditambahkan"})):n==="edit"&&(await l.updateData(r,"id",a.id,a),s.fire({icon:"success",title:"Data Surat Tugas berhasil diubah"})),d.value=await l.fetchData(r),_();const e=document.getElementById("staticBackdrop"),p=window.bootstrap.Modal.getInstance(e);p&&p.hide();const b=document.querySelector(".modal-backdrop");b&&b.remove()}catch(a){console.error("Error:",a),s.fire({icon:"error",title:"Terjadi kesalahan"})}},_=()=>{o.value={noST:"",tgl:"",uraian:""}},w=async n=>{if((await H.fire({title:"Hapus Data Surat Tugas?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await l.deleteItemById(r,n)?(s.fire({icon:"success",title:`Data ${r} berhasil dihapus`}),d.value=await l.fetchData(r)):s.fire({icon:"error",title:"Gagal menghapus data"})}catch(e){console.error("Error deleting item:",e),s.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},k=()=>{_(),i.value={title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:o.value}},B=n=>{o.value={...n},i.value={title:"Edit Data Surat Tugas",confirmButtonText:"Update",actionType:"edit",data:o.value}},i=u({title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:{}}),g=u(null),x=()=>{g.value.style.height="auto",g.value.style.height=`${g.value.scrollHeight}px`},h=new Date,C=h.getFullYear(),I=String(h.getMonth()+1).padStart(2,"0"),M=String(h.getDate()).padStart(2,"0");u(`${C}-${I}-${M}`);const E=n=>{if(!n)return"";const a={day:"numeric",month:"long",year:"numeric"};return new Date(n).toLocaleDateString("id-ID",a)};return(n,a)=>(m(),c("div",null,[a[7]||(a[7]=t("h1",{class:"text-dark fw-bold mb-4"},"List Surat Tugas",-1)),t("button",{type:"button",class:"btn btn-primary mb-4",onClick:k,disabled:f.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,A),t("div",J,[t("table",O,[a[3]||(a[3]=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No ST"),t("th",{scope:"col"},"Tanggal ST"),t("th",{scope:"col"},"Uraian ST"),t("th",{scope:"col",class:"text-center"},"Action")])],-1)),d.value.length>0?(m(),c("tbody",R,[(m(!0),c(U,null,V(d.value,(e,p)=>(m(),c("tr",{key:p},[t("td",{textContent:T(e.noST)},null,8,Y),t("td",{textContent:T(E(e.tgl))},null,8,G),t("td",{textContent:T(e.uraian),style:{"text-wrap":"wrap","text-align":"left"}},null,8,P),t("td",K,[t("button",{class:"btn-danger btn btn-sm",onClick:b=>w(e.id)},"Hapus",8,Q),t("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:b=>B(e)}," Edit ",8,W)])]))),128))])):(m(),c("tbody",X,[t("tr",null,[t("td",Z,T(f.value?"Loading Data...":"Data masih kosong"),1)])]))])]),j(q,{title:i.value.title,confirmButtonText:i.value.confirmButtonText,actionType:i.value.actionType,data:i.value.data,onConfirm:y},{body:F(()=>[t("form",{onSubmit:L(y,["prevent"])},[t("div",tt,[a[4]||(a[4]=t("label",{for:"noST",class:"form-label"},"Nomor Surat Tugas",-1)),v(t("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>o.value.noST=e),type:"text",class:"form-control",id:"noST"},null,512),[[S,o.value.noST]])]),t("div",at,[a[5]||(a[5]=t("label",{for:"tgl",class:"form-label"},"Tanggal Surat Tugas",-1)),v(t("input",{"onUpdate:modelValue":a[1]||(a[1]=e=>o.value.tgl=e),type:"date",class:"form-control",id:"tgl"},null,512),[[S,o.value.tgl]])]),t("div",et,[a[6]||(a[6]=t("label",{for:"uraian",class:"form-label"},"Uraian",-1)),v(t("textarea",{id:"uraian","onUpdate:modelValue":a[2]||(a[2]=e=>o.value.uraian=e),class:"form-control",placeholder:"Isikan detail uraian penugasannya...",rows:"1",ref_key:"autoResizeTextarea",ref:g,onInput:x},null,544),[[S,o.value.uraian]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}},ut=z(ot,[["__scopeId","data-v-2b1b7186"]]);export{ut as default};