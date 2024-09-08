import{f as C,h as P,g as j,c as v,a as t,F as I,x as M,t as s,b as V,w as L,o as p,l as g,v as c,d as E,S as N}from"./index-IM4zRged.js";import{_ as U}from"./ModalItem-8FsWucZU.js";import{T as l}from"./ToastAlert-BNG8R7JE.js";import{_ as F}from"./_plugin-vue_export-helper-DlAUqK2U.js";const H=["disabled"],O={class:"table-responsive"},$={class:"table table-striped table-bordered"},q={key:0},A=["textContent"],J=["textContent"],G=["textContent"],K=["textContent"],Y=["textContent"],z=["textContent"],Q={class:"text-center"},R=["onClick"],W=["onClick"],X={key:1},Z={colspan:"7",class:"text-center"},tt={class:"mb-3"},at={class:"mb-3"},et={class:"mb-3"},nt={class:"mb-3"},lt={class:"mb-3"},ot=["min","disabled"],st={class:"mb-3"},m="sppd",rt={__name:"MainSPPDView",setup(it){const r=C(),a=P({noSPPD:"",tgl:"",tujuan:"",tglBerangkat:"",tglPulang:"",lamaPenugasan:""}),k=()=>{a.value={noSPPD:"",tgl:"",tujuan:"",tglBerangkat:"",tglPulang:"",lamaPenugasan:""}},T=()=>{k(),i.value={title:"Tambah Data SPPD",confirmButtonText:"Simpan",actionType:"add",data:a.value}},B=o=>{a.value={...o},i.value={title:"Edit Data SPPD",confirmButtonText:"Update",actionType:"edit",data:a.value}},i=P({title:"Tambah Data SPPD",confirmButtonText:"Simpan",actionType:"add",data:{}}),f=P([]),b=P(!0);j(async()=>{f.value=await r.fetchData(m),b.value=!b.value});const x=()=>a.value.noSPPD?a.value.tgl?a.value.tujuan.trim()?a.value.tglBerangkat?a.value.tglPulang?new Date(a.value.tglPulang)<=new Date(a.value.tglBerangkat)?(l.fire({icon:"error",title:"Tanggal pulang harus lebih besar dari tanggal keberangkatan"}),!1):a.value.lamaPenugasan?!0:(l.fire({icon:"error",title:"Lama penugasan harus diisi"}),!1):(l.fire({icon:"error",title:"Tanggal pulang harus diisi"}),!1):(l.fire({icon:"error",title:"Tanggal keberangkatan harus diisi"}),!1):(l.fire({icon:"error",title:"Tujuan harus diisi"}),!1):(l.fire({icon:"error",title:"Tanggal SPPD harus diisi"}),!1):(l.fire({icon:"error",title:"Nomor SPPD harus diisi"}),!1),S=async({actionType:o})=>{if(x())try{const e=JSON.parse(JSON.stringify(a.value));o==="add"?(await r.addItem(m,e),l.fire({icon:"success",title:"Data SPPD berhasil ditambahkan"})):o==="edit"&&(await r.updateData(m,"id",e.id,e),l.fire({icon:"success",title:"Data SPPD berhasil diubah"})),f.value=await r.fetchData(m),k();const n=document.getElementById("staticBackdrop"),d=window.bootstrap.Modal.getInstance(n);d&&d.hide();const D=document.querySelector(".modal-backdrop");D&&D.remove()}catch(e){console.error("Error:",e),l.fire({icon:"error",title:"Terjadi kesalahan"})}},_=async o=>{if((await N.fire({title:"Hapus Data SPPD?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await r.deleteItemById(m,o)?(l.fire({icon:"success",title:"Data SPPD berhasil dihapus"}),f.value=await r.fetchData(m)):l.fire({icon:"error",title:"Gagal menghapus data"})}catch(n){console.error("Error deleting item:",n),l.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},y=()=>{a.value.tglBerangkat?(u.value=new Date(a.value.tglBerangkat),u.value.setDate(u.value.getDate()+1),u.value=u.value.toISOString().split("T")[0],a.value.tglPulang&&new Date(a.value.tglPulang)<=new Date(a.value.tglBerangkat)&&(a.value.tglPulang="",a.value.lamaPenugasan="")):(a.value.tglPulang="",a.value.lamaPenugasan="")},w=()=>{if(a.value.tglBerangkat&&a.value.tglPulang){const o=new Date(a.value.tglBerangkat),e=new Date(a.value.tglPulang),n=Math.abs(e-o),d=Math.ceil(n/(1e3*60*60*24));a.value.lamaPenugasan=d}else a.value.lamaPenugasan=""},h=o=>{if(!o)return"";const e={day:"numeric",month:"long",year:"numeric"};return new Date(o).toLocaleDateString("id-ID",e)},u=P("");return(o,e)=>(p(),v("div",null,[e[13]||(e[13]=t("h1",{class:"text-dark fw-bold mb-4"},"List Surat Perintah Perjalanan Dinas",-1)),t("button",{class:"btn btn-primary mb-4",onClick:T,disabled:b.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,H),t("div",O,[t("table",$,[e[6]||(e[6]=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No SPPD"),t("th",{scope:"col"},"Tanggal SPPD"),t("th",{scope:"col"},"Tujuan"),t("th",{scope:"col"},"Tgl Berangkat"),t("th",{scope:"col"},"Tgl Pulang"),t("th",{scope:"col"},"Lama Penugasan"),t("th",{scope:"col",class:"text-center"},"Action")])],-1)),f.value.length>0?(p(),v("tbody",q,[(p(!0),v(I,null,M(f.value,(n,d)=>(p(),v("tr",{key:d},[t("td",{textContent:s(n.noSPPD)},null,8,A),t("td",{textContent:s(h(n.tgl))},null,8,J),t("td",{textContent:s(n.tujuan)},null,8,G),t("td",{textContent:s(h(n.tglBerangkat))},null,8,K),t("td",{textContent:s(h(n.tglPulang))},null,8,Y),t("td",{textContent:s(n.lamaPenugasan+" Hari")},null,8,z),t("td",Q,[t("button",{class:"btn-danger btn btn-sm",onClick:D=>_(n.id)},"Hapus",8,R),t("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:D=>B(n)}," Edit ",8,W)])]))),128))])):(p(),v("tbody",X,[t("tr",null,[t("td",Z,s(b.value?"Loading Data...":"Data masih kosong"),1)])]))])]),V(U,{title:i.value.title,confirmButtonText:i.value.confirmButtonText,actionType:i.value.actionType,data:i.value.data,onConfirm:S},{body:L(()=>[t("form",{onSubmit:E(S,["prevent"])},[t("div",tt,[e[7]||(e[7]=t("label",{for:"noSPPD",class:"form-label"},"Nomor SPPD",-1)),g(t("input",{"onUpdate:modelValue":e[0]||(e[0]=n=>a.value.noSPPD=n),type:"text",class:"form-control",id:"noSPPD"},null,512),[[c,a.value.noSPPD]])]),t("div",at,[e[8]||(e[8]=t("label",{for:"tgl",class:"form-label"},"Tanggal SPPD",-1)),g(t("input",{"onUpdate:modelValue":e[1]||(e[1]=n=>a.value.tgl=n),type:"date",class:"form-control",id:"tgl"},null,512),[[c,a.value.tgl]])]),t("div",et,[e[9]||(e[9]=t("label",{for:"uraian",class:"form-label"},"Tujuan",-1)),g(t("input",{id:"uraian","onUpdate:modelValue":e[2]||(e[2]=n=>a.value.tujuan=n),class:"form-control",type:"text"},null,512),[[c,a.value.tujuan]])]),t("div",nt,[e[10]||(e[10]=t("label",{for:"tglBerangkat",class:"form-label"},"Tanggal Keberangkatan",-1)),g(t("input",{"onUpdate:modelValue":e[3]||(e[3]=n=>a.value.tglBerangkat=n),type:"date",class:"form-control",id:"tglBerangkat",onChange:y},null,544),[[c,a.value.tglBerangkat]])]),t("div",lt,[e[11]||(e[11]=t("label",{for:"tglPulang",class:"form-label"},"Tanggal Pulang",-1)),g(t("input",{"onUpdate:modelValue":e[4]||(e[4]=n=>a.value.tglPulang=n),type:"date",min:u.value,class:"form-control",id:"tglPulang",disabled:!a.value.tglBerangkat,onChange:w},null,40,ot),[[c,a.value.tglPulang]])]),t("div",st,[e[12]||(e[12]=t("label",{for:"lamaPenugasan",class:"form-label"},"Lama Penugasan (Hari)",-1)),g(t("input",{"onUpdate:modelValue":e[5]||(e[5]=n=>a.value.lamaPenugasan=n),type:"text",class:"form-control",id:"lamaPenugasan",readonly:""},null,512),[[c,a.value.lamaPenugasan]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"])]))}},mt=F(rt,[["__scopeId","data-v-f0d01174"]]);export{mt as default};
