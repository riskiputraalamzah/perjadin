import{p as K,x as q,f as F,h,z as H,g as U,c as n,a as e,F as y,y as D,t as p,b as M,w as E,S as x,A as Y,o as s,n as G,m as C,l as J,v as Q,s as W,r as X}from"./index-BP707cef.js";import{_ as Z}from"./ModalItem-BBUyxeE7.js";import{T as S}from"./ToastAlert-CPvPKDZG.js";const tt=["disabled"],et={class:"table-responsive"},at={class:"table table-striped table-bordered"},ot={key:0},nt=["textContent"],st={style:{"text-wrap":"wrap"}},lt={key:0},it={key:1},rt={key:0},ct={class:"me-2"},dt={key:1},ut={class:"text-center"},mt={key:0,class:"btn btn-primary"},ht={key:1,class:"btn btn-danger"},pt={class:"text-center"},gt=["onClick"],bt=["onClick"],Tt=["onClick"],ft={key:1},vt={colspan:"5",class:"text-center"},_t={key:0,class:"list-group"},St=["onClick"],kt={key:0},wt={key:1,class:"text-center"},T="delegasiPegawai",Bt={__name:"MainDelegasiViews",setup(yt){const B=K(),i=q(),g=F(),b=h([]),r=h(!0),k=h(""),f=h([]),P=H(()=>f.value.length?f.value.filter(o=>!b.value.some(a=>a.noST.noST===o.noST)).filter(o=>o.noST.toLowerCase().includes(k.value.toLowerCase())):[]),l=h(null),v=async()=>{const[o,a]=await Promise.all([g.fetchData("suratTugas"),g.fetchData(T)]);f.value=o,b.value=a,i.dataST=o,i.dataDelegasiPegawai=a};U(async()=>{if(i.dataST&&i.dataDelegasiPegawai){r.value=!r.value,f.value=i.dataST,b.value=i.dataDelegasiPegawai;return}await v(),r.value=!r.value});const I=async(o,a)=>{if((await x.fire({title:"Apakah Anda Yakin?",icon:"question",html:`No ST <strong>${a}</strong> akan di hapus`,showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await g.deleteItemById(T,o)?(S.fire({icon:"success",title:"Data Delegasi Pegawai berhasil dihapus"}),await v(T)):S.fire({icon:"error",title:"Gagal menghapus data"})}catch(t){console.error("Error deleting item:",t),S.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},$=o=>{console.log({st:o}),l.value=o,console.log(l.value)},L=async({actionType:o,data:a})=>{try{if(!l.value)return x.fire({icon:"error",title:"Silahkan Pilih NO ST terlebih dahulu"});const c={noST:Y(l.value)};if(o==="add"){const m=await g.addItem("delegasiPegawai",c);i.manageIdDelegasi=m,(await x.fire({title:"NO ST berhasil dipilih",icon:"success",text:"Lanjutkan Penginputan Data",showCancelButton:!0,confirmButtonText:"Oke",cancelButtonText:"Nanti Aja",cancelButtonColor:"red",backdrop:!0,allowOutsideClick:!1,allowEscapeKey:!1})).isConfirmed?await B.push({name:"manageDelegasi",params:{noST:l.value.noST}}):await v(T),setTimeout(()=>document.body.removeAttribute("style"),2e3)}else o==="edit"&&(await g.updateData("delegasiPegawai","id",a.id,c),await v(T),S.fire({icon:"success",title:"NO ST berhasil diubah"}));const t=document.getElementById("staticBackdrop"),u=window.bootstrap.Modal.getInstance(t);u==null||u.hide(),document.querySelectorAll(".modal-backdrop").forEach(m=>m.remove())}catch(c){console.error("Terjadi kesalahan:",c)}},O=(o,a)=>{i.manageIdDelegasi=o,B.push({name:"manageDelegasi",params:{noST:a}})},j=()=>{l.value=null,d.value={title:"Pilih Nomor ST",confirmButtonText:"Simpan",actionType:"add",data:{}}},V=(o,a)=>{l.value=a,console.log(l.value),console.log(o),d.value={title:"Edit Data Pegawai",confirmButtonText:"Update",actionType:"edit",data:{id:o}}},d=h({title:"Tambah Data Pegawai",confirmButtonText:"Simpan",actionType:"add",data:{}}),z=o=>btoa(o);return(o,a)=>{const c=X("router-link");return s(),n("div",null,[a[5]||(a[5]=e("h1",{class:"text-dark fw-bold mb-4"},"List Delegasi Pegawai",-1)),e("button",{onClick:j,disabled:r.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn btn-primary mb-4"}," Tambah Data ",8,tt),e("div",et,[e("table",at,[a[3]||(a[3]=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"NO ST"),e("th",{scope:"col"},"NO SPPD"),e("th",{scope:"col"},"Jumlah Pegawai"),e("th",{scope:"col",class:"text-center"},"Status"),e("th",{scope:"col",class:"text-center"},"Action")])],-1)),b.value.length>0?(s(),n("tbody",ot,[(s(!0),n(y,null,D(b.value,(t,u)=>{var m,w,N,A;return s(),n("tr",{key:u},[e("td",{textContent:p(t.noST.noST)},null,8,nt),e("td",st,[(m=t.relation)!=null&&m.length?(s(),n("div",lt,[(s(!0),n(y,null,D(t.relation,(_,R)=>(s(),n("span",{class:G(["text-bg-dark py-2","badge fs-1 "]),key:R},p(_.noSPPD.noSPPD),1))),128))])):(s(),n("div",it,"Kosong"))]),e("td",null,[(w=t.relation)!=null&&w.length?(s(),n("span",rt,[e("span",ct,p((N=t.relation)==null?void 0:N.length),1),a[1]||(a[1]=C(" orang "))])):(s(),n("span",dt,"Kosong"))]),e("td",ut,[(A=t.relation)!=null&&A.length?(s(),n("button",mt,"Aktif")):(s(),n("button",ht,"Non Aktif"))]),e("td",pt,[e("button",{onClick:_=>O(t.id,t.noST.noST),class:"btn-success btn btn-sm"}," Manage Data ",8,gt),e("button",{class:"btn-danger btn btn-sm",onClick:_=>I(t.id,t.noST.noST)}," Hapus ",8,bt),e("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",onClick:_=>V(t.id,t.noST),class:"btn-sm btn-warning btn"}," Edit ",8,Tt),M(c,{to:{name:"detailDelegasi",params:{noST:z(`${t.noST.noST}___${t.id}`)}},class:"btn-sm btn-info btn"},{default:E(()=>a[2]||(a[2]=[C("Detail")])),_:2},1032,["to"])])])}),128))])):(s(),n("tbody",ft,[e("tr",null,[e("td",vt,p(r.value?"Loading Data...":"Data masih kosong"),1)])]))])]),M(Z,{title:d.value.title,confirmButtonText:d.value.confirmButtonText,actionType:d.value.actionType,data:d.value.data,onConfirm:L},{body:E(()=>[J(e("input",{"onUpdate:modelValue":a[0]||(a[0]=t=>k.value=t),class:"form-control mb-3",type:"text",placeholder:"Cari ST..."},null,512),[[Q,k.value]]),P.value.length?(s(),n("ul",_t,[(s(!0),n(y,null,D(P.value,t=>(s(),n("li",{key:t.id,class:"list-group-item d-flex justify-content-between align-items-center",onClick:u=>$(t),style:{cursor:"pointer"}},[C(p(t.noST)+" ",1),l.value===t?(s(),n("span",kt,a[4]||(a[4]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",class:"icon icon-tabler icons-tabler-filled icon-tabler-circle-check text-success"},[e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"})],-1)]))):W("",!0)],8,St))),128))])):(s(),n("div",wt,p(r.value?"Loading":"Data ST masih kosong"),1))]),_:1},8,["title","confirmButtonText","actionType","data"])])}}};export{Bt as default};
