import{f as D,h as m,x as S,g as C,r as v,o,c as l,a as t,b as x,w as k,F as P,j as y,t as r,p as B,S as T}from"./index-BdjIFSqz.js";import{T as u}from"./ToastAlert-B6CVaos9.js";const w={class:"table-responsive"},M={class:"table table-striped table-bordered"},I={key:0},N=["textContent"],A=["textContent"],V=["textContent"],$=["textContent"],j={class:"text-center"},E=["onClick"],L=["onClick"],F={key:1},H={colspan:"6",class:"text-center"},b="sp2d",Y={__name:"MainSP2DView",setup(q){const h=D(),s=m([]),a=m(!0),d=S(),p=async()=>{s.value=await h.fetchData(b),d.dataSP2D=s.value};C(async()=>{if(d.dataSP2D){a.value=!a.value,s.value=d.dataSP2D;return}await p(),a.value=!a.value});const _=async i=>{if((await T.fire({title:"Hapus Data?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await h.deleteItemById(b,i)?(u.fire({icon:"success",title:"Data berhasil dihapus"}),await p()):u.fire({icon:"error",title:"Gagal menghapus data"})}catch(c){console.error("Error deleting item:",c),u.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}};return(i,e)=>{const c=v("router-link");return o(),l("div",null,[e[2]||(e[2]=t("h1",{class:"text-dark fw-bold mb-4"},"List Surat Perintah Pencairan Dana",-1)),x(c,{to:"/sp2d/create",class:"btn btn-primary mb-4",disabled:a.value},{default:k(()=>e[0]||(e[0]=[B(" Tambah Data ")])),_:1},8,["disabled"]),t("div",w,[t("table",M,[e[1]||(e[1]=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No SP2D"),t("th",{scope:"col"},"Tanggal SP2D"),t("th",{scope:"col"},"Meta Anggaran"),t("th",{scope:"col"},"NO SPM"),t("th",{scope:"col",class:"text-center"},"Action")])],-1)),s.value.length>0?(o(),l("tbody",I,[(o(!0),l(P,null,y(s.value,(n,g)=>(o(),l("tr",{key:g},[t("td",{textContent:r(n.noSP2D)},null,8,N),t("td",{textContent:r(i.formatDate(n.tglSP2D))},null,8,A),t("td",{textContent:r(n.metaAnggaran)},null,8,V),t("td",{textContent:r(n.spm.noSPM)},null,8,$),t("td",j,[t("button",{class:"btn-danger btn btn-sm",onClick:f=>_(n.id)},"Hapus",8,E),t("button",{class:"btn-sm btn-warning btn",onClick:f=>i.$router.push(`/sp2d/${n.id}/edit`)}," Edit ",8,L)])]))),128))])):(o(),l("tbody",F,[t("tr",null,[t("td",H,r(a.value?"Loading Data...":"Data masih kosong"),1)])]))])])])}}};export{Y as default};