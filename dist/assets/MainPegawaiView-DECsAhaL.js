import{e as C,g as f,f as D,c as u,a as t,F as B,s as k,t as c,b as j,w as N,o as m,j as h,v as p,d as I,S}from"./index-Zf5tl8Hn.js";import{_ as V}from"./ModalItem-CsntKK8A.js";import{T as n}from"./ToastAlert-DwSx-M0G.js";const E={class:"card"},G={class:"card-body"},M=t("h4",{class:"card-title mb-4"},"List Pegawai",-1),J=["disabled"],U={class:"table-responsive"},$={class:"table table-striped table-bordered"},F=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"Nama"),t("th",{scope:"col"},"NIP"),t("th",{scope:"col"},"Golongan"),t("th",{scope:"col"},"Jabatan"),t("th",{scope:"col",class:"text-center"},"Action")])],-1),L={key:0},A=["textContent"],H=["textContent"],O=["textContent"],q=["textContent"],Y=["textContent"],z={class:"text-center"},K=["onClick"],Q=["onClick"],R={key:1},W={colspan:"6",class:"text-center"},X={class:"mb-3"},Z=t("label",{for:"namaPegawai",class:"form-label"},"Nama Pegawai",-1),tt={class:"mb-3"},at=t("label",{for:"NIP",class:"form-label"},"NIP",-1),et={class:"mb-3"},ot=t("label",{for:"Golongan",class:"form-label"},"Golongan",-1),nt={class:"mb-3"},st=t("label",{for:"jabatan",class:"form-label"},"Jabatan",-1),s="pegawai",dt={__name:"MainPegawaiView",setup(it){const l=C(),a=f({namaPegawai:"",nip:"",golongan:"",jabatan:""}),d=f([]),b=f(!0);D(async()=>{console.log("onmounted pegawai"),d.value=await l.fetchData(s),b.value=!b.value});const w=()=>a.value.namaPegawai?a.value.nip?a.value.golongan?a.value.jabatan?!0:(n.fire({icon:"error",title:"Jabatan harus diisi"}),!1):(n.fire({icon:"error",title:"Golongan harus diisi"}),!1):(n.fire({icon:"error",title:"NIP harus diisi"}),!1):(n.fire({icon:"error",title:"Nama Pegawai harus diisi"}),!1),_=async({actionType:i})=>{if(w())try{const o=JSON.parse(JSON.stringify(a.value));i==="add"?(await l.addItem(s,o),n.fire({icon:"success",title:"Data Pegawai berhasil ditambahkan"})):i==="edit"&&(await l.updateData(s,"id",o.id,o),n.fire({icon:"success",title:"Data Pegawai berhasil diubah"})),d.value=await l.fetchData(s),g()}catch(o){console.error("Error:",o),n.fire({icon:"error",title:"Terjadi kesalahan"})}},g=()=>{a.value={namaPegawai:"",nip:"",golongan:"",jabatan:""}},x=async i=>{if((await S.fire({title:`Hapus Data ${s}?`,icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await l.deleteItemById(s,i)?(n.fire({icon:"success",title:`Data ${s} berhasil dihapus`}),d.value=await l.fetchData(s)):n.fire({icon:"error",title:"Gagal menghapus data"})}catch(e){console.error("Error deleting item:",e),n.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},y=()=>{g(),r.value={title:"Tambah Data Pegawai",confirmButtonText:"Simpan",actionType:"add",data:a.value}},P=i=>{a.value={...i},r.value={title:"Edit Data Pegawai",confirmButtonText:"Update",actionType:"edit",data:a.value}},r=f({title:"Tambah Data Pegawai",confirmButtonText:"Simpan",actionType:"add",data:{}});return(i,o)=>(m(),u("div",E,[t("div",G,[M,t("button",{type:"button",class:"btn btn-primary mb-4",onClick:y,disabled:b.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,J),t("div",U,[t("table",$,[F,d.value.length>0?(m(),u("tbody",L,[(m(!0),u(B,null,k(d.value,(e,v)=>(m(),u("tr",{key:v},[t("td",{textContent:c(v+1)},null,8,A),t("td",{textContent:c(e.namaPegawai)},null,8,H),t("td",{textContent:c(e.nip)},null,8,O),t("td",{textContent:c(e.golongan)},null,8,q),t("td",{textContent:c(e.jabatan)},null,8,Y),t("td",z,[t("button",{class:"btn-danger btn me-2 btn-sm",onClick:T=>x(e.id)}," Hapus ",8,K),t("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:T=>P(e)}," Edit ",8,Q)])]))),128))])):(m(),u("tbody",R,[t("tr",null,[t("td",W,c(b.value?"Loading Data...":"Data masih kosong"),1)])]))])])]),j(V,{title:r.value.title,confirmButtonText:r.value.confirmButtonText,actionType:r.value.actionType,data:r.value.data,onConfirm:_},{body:N(()=>[t("form",{onSubmit:I(_,["prevent"])},[t("div",X,[Z,h(t("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>a.value.namaPegawai=e),type:"text",class:"form-control",id:"namaPegawai"},null,512),[[p,a.value.namaPegawai]])]),t("div",tt,[at,h(t("input",{"onUpdate:modelValue":o[1]||(o[1]=e=>a.value.nip=e),type:"text",class:"form-control",id:"NIP"},null,512),[[p,a.value.nip]])]),t("div",et,[ot,h(t("input",{"onUpdate:modelValue":o[2]||(o[2]=e=>a.value.golongan=e),type:"text",class:"form-control",id:"Golongan"},null,512),[[p,a.value.golongan]])]),t("div",nt,[st,h(t("input",{"onUpdate:modelValue":o[3]||(o[3]=e=>a.value.jabatan=e),type:"text",class:"form-control",id:"jabatan"},null,512),[[p,a.value.jabatan]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}};export{dt as default};
