import{f as g,h as p,x as v,g as C,c as l,a as t,b as k,w as x,F as y,y as M,t as c,r as w,o as r,m as P,S as D}from"./index-BP707cef.js";import{T as u}from"./ToastAlert-CPvPKDZG.js";const T={class:"table-responsive"},B={class:"table table-striped table-bordered"},I={key:0},N=["textContent"],V=["textContent"],$=["textContent"],E={class:"text-center"},L=["onClick"],j=["onClick"],A={key:1},F={colspan:"6",class:"text-center"},m="spm",R={__name:"MainSPMView",setup(H){const h=g(),n=p([]),a=p(!0),d=v(),b=async()=>{n.value=await h.fetchData(m),d.dataSPM=n.value};C(async()=>{if(d.dataSPM){a.value=!a.value,n.value=d.dataSPM;return}await b(),a.value=!a.value});const _=async o=>{if((await D.fire({title:"Hapus Data?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{await h.deleteItemById(m,o)?(u.fire({icon:"success",title:"Data berhasil dihapus"}),await b(m)):u.fire({icon:"error",title:"Gagal menghapus data"})}catch(i){console.error("Error deleting item:",i),u.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}};return(o,e)=>{const i=w("router-link");return r(),l("div",null,[e[2]||(e[2]=t("h1",{class:"text-dark fw-bold mb-4"},"List Surat Perintah Membayar",-1)),k(i,{to:"/spm/create",class:"btn btn-primary mb-4",disabled:a.value},{default:x(()=>e[0]||(e[0]=[P(" Tambah Data ")])),_:1},8,["disabled"]),t("div",T,[t("table",B,[e[1]||(e[1]=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No SPM"),t("th",{scope:"col"},"Tanggal SPM"),t("th",{scope:"col"},"Nilai ST"),t("th",{scope:"col",class:"text-center"},"Action")])],-1)),n.value.length>0?(r(),l("tbody",I,[(r(!0),l(y,null,M(n.value,(s,f)=>(r(),l("tr",{key:f},[t("td",{textContent:c(s.noSPM)},null,8,N),t("td",{textContent:c(o.formatDate(s.tglSPM))},null,8,V),t("td",{textContent:c(o.formatRupiah(s.nilaiSPM))},null,8,$),t("td",E,[t("button",{class:"btn-danger btn btn-sm",onClick:S=>_(s.id)},"Hapus",8,L),t("button",{class:"btn-sm btn-warning btn",onClick:S=>o.$router.push(`/spm/${s.id}/edit`)}," Edit ",8,j)])]))),128))])):(r(),l("tbody",A,[t("tr",null,[t("td",F,c(a.value?"Loading Data...":"Data masih kosong"),1)])]))])])])}}};export{R as default};
