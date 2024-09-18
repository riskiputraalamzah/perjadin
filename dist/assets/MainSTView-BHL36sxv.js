import{f as V,x as j,h as f,g as L,o as g,c as p,a,F as P,j as $,t as b,b as F,w as H,m as y,v as x,d as A,S as D}from"./index-BdjIFSqz.js";import{_ as q}from"./ModalItem-CvN5w-ip.js";import{T as n}from"./ToastAlert-B6CVaos9.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";const J=["disabled"],O={class:"table-responsive"},R={class:"table table-striped table-bordered"},G={key:0},Y=["textContent"],K=["textContent"],Q=["textContent"],W={class:"text-center"},X=["onClick"],Z=["onClick"],tt={key:1},at={colspan:"6",class:"text-center"},et={class:"mb-3"},ot={class:"mb-3"},st={class:"mb-3"},i="suratTugas",nt={__name:"MainSTView",setup(rt){const c=V(),h=j(),o=f({noST:"",tgl:"",uraian:""}),m=f([]),l=f(!0);L(async()=>{if(h.dataST){l.value=!l.value,m.value=h.dataST;return}console.log("onmounted surat tugas"),await v(),l.value=!l.value,k()});const v=async()=>{m.value=await c.fetchData(i),h.dataST=m.value},B=()=>o.value.noST?o.value.tgl?o.value.uraian.trim()?!0:(n.fire({icon:"error",title:"Uraian harus diisi"}),!1):(n.fire({icon:"error",title:"Tanggal Surat Tugas harus diisi"}),!1):(n.fire({icon:"error",title:"Nomor Surat Tugas harus diisi"}),!1),_=async({actionType:s})=>{if(B())try{const t=JSON.parse(JSON.stringify(o.value));s==="add"?(await c.addItem(i,t),n.fire({icon:"success",title:"Data Surat Tugas berhasil ditambahkan"})):s==="edit"&&(await c.updateData(i,"id",t.id,t),n.fire({icon:"success",title:"Data Surat Tugas berhasil diubah"})),await v(i),w();const e=document.getElementById("staticBackdrop"),r=window.bootstrap.Modal.getInstance(e);r&&r.hide();const d=document.querySelector(".modal-backdrop");d&&d.remove()}catch(t){console.error("Error:",t),n.fire({icon:"error",title:"Terjadi kesalahan"})}},w=()=>{o.value={noST:"",tgl:"",uraian:""}},C=async s=>{if((await D.fire({title:"Hapus Data Surat Tugas?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{const e=await E(s);if(e!=null&&e.status){D.fire({icon:"error",title:"Data gagal dihapus",text:e.message});return}await c.deleteItemById(i,s)?(n.fire({icon:"success",title:`Data ${i} berhasil dihapus`}),await v(i)):n.fire({icon:"error",title:"Gagal menghapus data"})}catch(e){console.error("Error deleting item:",e),n.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},I=()=>{w(),u.value={title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:o.value}},U=s=>{o.value={...s},u.value={title:"Edit Data Surat Tugas",confirmButtonText:"Update",actionType:"edit",data:o.value}},u=f({title:"Tambah Data Surat Tugas",confirmButtonText:"Simpan",actionType:"add",data:{}}),T=f(null),k=()=>{T.value.style.height="auto",T.value.style.height=`${T.value.scrollHeight}px`},M=s=>{if(!s)return"";const t={day:"numeric",month:"long",year:"numeric"};return new Date(s).toLocaleDateString("id-ID",t)},E=async s=>{try{const t=["delegasiPegawai","spm"];for(const e of t){const r=await c.fetchData(e);if(e==="delegasiPegawai"&&r.some(S=>S.noST.id===s))return{status:!0,message:"Data sedang digunakan pada menu Delegasi Pegawai"};if(e==="spm"&&r.some(S=>S.selectedST.some(N=>N.noST.id===s)))return{status:!0,message:"Data sedang digunakan pada menu SPM"}}return!1}catch(t){return console.error("Error checking if data is in use:",t),!1}};return(s,t)=>(g(),p("div",null,[t[7]||(t[7]=a("h1",{class:"text-dark fw-bold mb-4"},"List Surat Tugas",-1)),a("button",{type:"button",class:"btn btn-primary mb-4",onClick:I,disabled:l.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,J),a("div",O,[a("table",R,[t[3]||(t[3]=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"No ST"),a("th",{scope:"col"},"Tanggal ST"),a("th",{scope:"col"},"Uraian ST"),a("th",{scope:"col",class:"text-center"},"Action")])],-1)),m.value.length>0?(g(),p("tbody",G,[(g(!0),p(P,null,$(m.value,(e,r)=>(g(),p("tr",{key:r},[a("td",{textContent:b(e.noST)},null,8,Y),a("td",{textContent:b(M(e.tgl))},null,8,K),a("td",{textContent:b(e.uraian),style:{"text-wrap":"wrap","text-align":"left"}},null,8,Q),a("td",W,[a("button",{class:"btn-danger btn btn-sm",onClick:d=>C(e.id)},"Hapus",8,X),a("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:d=>U(e)}," Edit ",8,Z)])]))),128))])):(g(),p("tbody",tt,[a("tr",null,[a("td",at,b(l.value?"Loading Data...":"Data masih kosong"),1)])]))])]),F(q,{title:u.value.title,confirmButtonText:u.value.confirmButtonText,actionType:u.value.actionType,data:u.value.data,onConfirm:_},{body:H(()=>[a("form",{onSubmit:A(_,["prevent"])},[a("div",et,[t[4]||(t[4]=a("label",{for:"noST",class:"form-label"},"Nomor Surat Tugas",-1)),y(a("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.value.noST=e),type:"text",class:"form-control",id:"noST"},null,512),[[x,o.value.noST]])]),a("div",ot,[t[5]||(t[5]=a("label",{for:"tgl",class:"form-label"},"Tanggal Surat Tugas",-1)),y(a("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>o.value.tgl=e),type:"date",class:"form-control",id:"tgl"},null,512),[[x,o.value.tgl]])]),a("div",st,[t[6]||(t[6]=a("label",{for:"uraian",class:"form-label"},"Uraian",-1)),y(a("textarea",{id:"uraian","onUpdate:modelValue":t[2]||(t[2]=e=>o.value.uraian=e),class:"form-control",placeholder:"Isikan detail uraian penugasannya...",rows:"1",ref_key:"autoResizeTextarea",ref:T,onInput:k},null,544),[[x,o.value.uraian]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}},ct=z(nt,[["__scopeId","data-v-9b8c8c73"]]);export{ct as default};