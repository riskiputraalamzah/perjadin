import{f as C,h,g as k,c as m,a as t,F as B,y as D,t as c,b as I,w as N,o as b,l as g,v as _,d as j,S}from"./index-Z_fhCoxB.js";import{_ as E}from"./ModalItem-E2e41U9R.js";import{T as n}from"./ToastAlert-Cfpk1Tx4.js";const M=t("h1",{class:"text-dark fw-bold mb-4"},"List Pegawai",-1),V=["disabled"],G={class:"table-responsive"},J={class:"table table-striped table-bordered"},U=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"},"NIP"),t("th",{scope:"col"},"Golongan"),t("th",{scope:"col"},"Jabatan"),t("th",{scope:"col",class:"text-center"},"Action")])],-1),$={key:0},F=["textContent"],L=["textContent"],q=["textContent"],A=["textContent"],H=["textContent"],O={class:"text-center"},Y=["onClick"],z=["onClick"],K={key:1},Q={colspan:"6",class:"text-center"},R={class:"mb-3"},W=t("label",{for:"namaPegawai",class:"form-label"},"Nama Pegawai",-1),X={class:"mb-3"},Z=t("label",{for:"NIP",class:"form-label"},"NIP",-1),tt={class:"mb-3"},at=t("label",{for:"Golongan",class:"form-label"},"Golongan",-1),et={class:"mb-3"},ot=t("label",{for:"jabatan",class:"form-label"},"Jabatan",-1),s="pegawai",rt={__name:"MainPegawaiView",setup(nt){const l=C(),e=h({namaPegawai:"",nip:"",golongan:"",jabatan:""}),d=h([]),f=h(!0);k(async()=>{console.log("onmounted pegawai"),d.value=await l.fetchData(s),f.value=!f.value});const x=()=>e.value.namaPegawai?e.value.nip?e.value.golongan?e.value.jabatan?!0:(n.fire({icon:"error",title:"Jabatan harus diisi"}),!1):(n.fire({icon:"error",title:"Golongan harus diisi"}),!1):(n.fire({icon:"error",title:"NIP harus diisi"}),!1):(n.fire({icon:"error",title:"Nama Pegawai harus diisi"}),!1),v=async({actionType:i})=>{if(x())try{const o=JSON.parse(JSON.stringify(e.value));i==="add"?(await l.addItem(s,o),n.fire({icon:"success",title:"Data Pegawai berhasil ditambahkan"})):i==="edit"&&(await l.updateData(s,"id",o.id,o),n.fire({icon:"success",title:"Data Pegawai berhasil diubah"})),d.value=await l.fetchData(s),w();const a=document.getElementById("staticBackdrop"),u=window.bootstrap.Modal.getInstance(a);u&&u.hide();const p=document.querySelector(".modal-backdrop");p&&p.remove()}catch(o){console.error("Error:",o),n.fire({icon:"error",title:"Terjadi kesalahan"})}},w=()=>{e.value={namaPegawai:"",nip:"",golongan:"",jabatan:""}},y=async i=>{if((await S.fire({title:`Hapus Data ${s}?`,icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await l.deleteItemById(s,i)?(n.fire({icon:"success",title:`Data ${s} berhasil dihapus`}),d.value=await l.fetchData(s)):n.fire({icon:"error",title:"Gagal menghapus data"})}catch(a){console.error("Error deleting item:",a),n.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},P=()=>{w(),r.value={title:"Tambah Data Pegawai",confirmButtonText:"Simpan",actionType:"add",data:e.value}},T=i=>{e.value={...i},r.value={title:"Edit Data Pegawai",confirmButtonText:"Update",actionType:"edit",data:e.value}},r=h({title:"Tambah Data Pegawai",confirmButtonText:"Simpan",actionType:"add",data:{}});return(i,o)=>(b(),m("div",null,[M,t("button",{type:"button",class:"btn btn-primary mb-4",onClick:P,disabled:f.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,V),t("div",G,[t("table",J,[U,d.value.length>0?(b(),m("tbody",$,[(b(!0),m(B,null,D(d.value,(a,u)=>(b(),m("tr",{key:u},[t("td",{textContent:c(u+1)},null,8,F),t("td",{textContent:c(a.namaPegawai)},null,8,L),t("td",{textContent:c(a.nip)},null,8,q),t("td",{textContent:c(a.golongan)},null,8,A),t("td",{textContent:c(a.jabatan)},null,8,H),t("td",O,[t("button",{class:"btn-danger btn me-2 btn-sm",onClick:p=>y(a.id)}," Hapus ",8,Y),t("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:p=>T(a)}," Edit ",8,z)])]))),128))])):(b(),m("tbody",K,[t("tr",null,[t("td",Q,c(f.value?"Loading Data...":"Data masih kosong"),1)])]))])]),I(E,{title:r.value.title,confirmButtonText:r.value.confirmButtonText,actionType:r.value.actionType,data:r.value.data,onConfirm:v},{body:N(()=>[t("form",{onSubmit:j(v,["prevent"])},[t("div",R,[W,g(t("input",{"onUpdate:modelValue":o[0]||(o[0]=a=>e.value.namaPegawai=a),type:"text",class:"form-control",id:"namaPegawai"},null,512),[[_,e.value.namaPegawai]])]),t("div",X,[Z,g(t("input",{"onUpdate:modelValue":o[1]||(o[1]=a=>e.value.nip=a),type:"text",class:"form-control",id:"NIP"},null,512),[[_,e.value.nip]])]),t("div",tt,[at,g(t("input",{"onUpdate:modelValue":o[2]||(o[2]=a=>e.value.golongan=a),type:"text",class:"form-control",id:"Golongan"},null,512),[[_,e.value.golongan]])]),t("div",et,[ot,g(t("input",{"onUpdate:modelValue":o[3]||(o[3]=a=>e.value.jabatan=a),type:"text",class:"form-control",id:"jabatan"},null,512),[[_,e.value.jabatan]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}};export{rt as default};
