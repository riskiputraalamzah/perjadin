import{B as H,C as dt,D as ut,f as ct,h as B,x as gt,g as ft,o as A,c as L,a,F as vt,j as bt,t as y,b as mt,w as pt,E as Y,m as I,G as Pt,e as ht,v as O,d as yt,S as z}from"./index-BdjIFSqz.js";import{_ as St}from"./ModalItem-CvN5w-ip.js";import{T as v}from"./ToastAlert-B6CVaos9.js";import{h as Dt,E as Tt}from"./html2canvas.esm-BywRGkS8.js";import{_ as xt}from"./_plugin-vue_export-helper-DlAUqK2U.js";function kt(e){var o=typeof e;return e!=null&&(o=="object"||o=="function")}var nt=kt,jt=typeof H=="object"&&H&&H.Object===Object&&H,wt=jt,_t=wt,Bt=typeof self=="object"&&self&&self.Object===Object&&self,It=_t||Bt||Function("return this")(),it=It,Ct=it,Et=function(){return Ct.Date.now()},Ot=Et,$t=/\s/;function Nt(e){for(var o=e.length;o--&&$t.test(e.charAt(o)););return o}var Mt=Nt,At=Mt,Lt=/^\s+/;function Ut(e){return e&&e.slice(0,At(e)+1).replace(Lt,"")}var Vt=Ut,Ft=it,Gt=Ft.Symbol,lt=Gt,X=lt,rt=Object.prototype,Rt=rt.hasOwnProperty,Wt=rt.toString,U=X?X.toStringTag:void 0;function Ht(e){var o=Rt.call(e,U),c=e[U];try{e[U]=void 0;var n=!0}catch{}var p=Wt.call(e);return n&&(o?e[U]=c:delete e[U]),p}var Kt=Ht,Jt=Object.prototype,qt=Jt.toString;function Yt(e){return qt.call(e)}var zt=Yt,Q=lt,Xt=Kt,Qt=zt,Zt="[object Null]",ta="[object Undefined]",Z=Q?Q.toStringTag:void 0;function aa(e){return e==null?e===void 0?ta:Zt:Z&&Z in Object(e)?Xt(e):Qt(e)}var ea=aa;function na(e){return e!=null&&typeof e=="object"}var ia=na,la=ea,ra=ia,oa="[object Symbol]";function sa(e){return typeof e=="symbol"||ra(e)&&la(e)==oa}var da=sa,ua=Vt,tt=nt,ca=da,at=NaN,ga=/^[-+]0x[0-9a-f]+$/i,fa=/^0b[01]+$/i,va=/^0o[0-7]+$/i,ba=parseInt;function ma(e){if(typeof e=="number")return e;if(ca(e))return at;if(tt(e)){var o=typeof e.valueOf=="function"?e.valueOf():e;e=tt(o)?o+"":o}if(typeof e!="string")return e===0?e:+e;e=ua(e);var c=fa.test(e);return c||va.test(e)?ba(e.slice(2),c?2:8):ga.test(e)?at:+e}var pa=ma,Pa=nt,J=Ot,et=pa,ha="Expected a function",ya=Math.max,Sa=Math.min;function Da(e,o,c){var n,p,k,S,u,f,b=0,j=!1,m=!1,w=!0;if(typeof e!="function")throw new TypeError(ha);o=et(o)||0,Pa(c)&&(j=!!c.leading,m="maxWait"in c,k=m?ya(et(c.maxWait)||0,o):k,w="trailing"in c?!!c.trailing:w);function N(s){var P=n,_=p;return n=p=void 0,b=s,S=e.apply(_,P),S}function V(s){return b=s,u=setTimeout(C,o),j?N(s):S}function K(s){var P=s-f,_=s-b,R=o-P;return m?Sa(R,k-_):R}function F(s){var P=s-f,_=s-b;return f===void 0||P>=o||P<0||m&&_>=k}function C(){var s=J();if(F(s))return G(s);u=setTimeout(C,K(s))}function G(s){return u=void 0,w&&n?N(s):(n=p=void 0,S)}function M(){u!==void 0&&clearTimeout(u),b=0,n=f=p=u=void 0}function D(){return u===void 0?S:G(J())}function T(){var s=J(),P=F(s);if(n=arguments,p=this,f=s,P){if(u===void 0)return V(f);if(m)return clearTimeout(u),u=setTimeout(C,o),N(f)}return u===void 0&&(u=setTimeout(C,o)),S}return T.cancel=M,T.flush=D,T}var Ta=Da;const xa=dt(Ta),ka=["disabled"],ja={class:"table-responsive"},wa={class:"table table-striped table-bordered"},_a={key:0},Ba=["textContent"],Ia=["textContent"],Ca=["textContent"],Ea=["textContent"],Oa=["textContent"],$a=["textContent"],Na={class:"text-center"},Ma=["onClick"],Aa=["onClick"],La=["onClick","disabled"],Ua={key:1},Va={colspan:"7",class:"text-center"},Fa={class:"mb-3"},Ga={class:"mb-3"},Ra={class:"mb-3"},Wa={class:"mb-3"},Ha={class:"mb-3"},Ka=["min","disabled"],Ja={class:"mb-3"},qa={class:"table-responsive"},Ya={id:"kuitansiTemplate",style:{position:"absolute",left:"-9999px",top:"-9999px"}},za={id:"invoice"},Xa={class:"parent-content"},Qa={class:"content"},Za={class:"row justify-content-between mb-4"},te={class:"col-5"},ae={class:"text-start"},$="sppd",ee={__name:"MainSPPDView",setup(e){const{proxy:o}=ut(),c=ct(),n=B({noSPPD:"",tgl:"",tujuan:"",tglBerangkat:"",tglPulang:"",lamaPenugasan:""}),p=()=>{n.value={noSPPD:"",tgl:"",tujuan:"",tglBerangkat:"",tglPulang:"",lamaPenugasan:""}},k=()=>{p(),u.value={title:"Tambah Data SPPD",confirmButtonText:"Simpan",actionType:"add",data:n.value}},S=l=>{n.value={...l},u.value={title:"Edit Data SPPD",confirmButtonText:"Update",actionType:"edit",data:n.value}},u=B({title:"Tambah Data SPPD",confirmButtonText:"Simpan",actionType:"add",data:{}}),f=B([]),b=B(!0),j=B([]),m=gt(),w=async()=>{f.value=await c.fetchData($);const l=await c.fetchData("delegasiPegawai");j.value=f.value.filter(t=>l.some(i=>{var r;return(r=i.relation)==null?void 0:r.some(g=>{var h;return((h=g.noSPPD)==null?void 0:h.id)===t.id})})).map(t=>t.id),m.dataDelegasiPegawai=l,m.dataSPPD=f.value};ft(async()=>{if(m.dataSPPD){b.value=!b.value,f.value=m.dataSPPD,j.value=f.value.filter(l=>m.dataDelegasiPegawai.some(t=>{var i;return(i=t.relation)==null?void 0:i.some(r=>{var g;return((g=r.noSPPD)==null?void 0:g.id)===l.id})})).map(l=>l.id),console.log(j.value);return}await w(),b.value=!b.value});const N=()=>n.value.noSPPD?n.value.tgl?n.value.tujuan.trim()?n.value.tglBerangkat?n.value.tglPulang?new Date(n.value.tglPulang)<=new Date(n.value.tglBerangkat)?(v.fire({icon:"error",title:"Tanggal pulang harus lebih besar dari tanggal keberangkatan"}),!1):n.value.lamaPenugasan?!0:(v.fire({icon:"error",title:"Lama penugasan harus diisi"}),!1):(v.fire({icon:"error",title:"Tanggal pulang harus diisi"}),!1):(v.fire({icon:"error",title:"Tanggal keberangkatan harus diisi"}),!1):(v.fire({icon:"error",title:"Tujuan harus diisi"}),!1):(v.fire({icon:"error",title:"Tanggal SPPD harus diisi"}),!1):(v.fire({icon:"error",title:"Nomor SPPD harus diisi"}),!1),V=async({actionType:l})=>{if(N())try{const t=JSON.parse(JSON.stringify(n.value));l==="add"?(await c.addItem($,t),v.fire({icon:"success",title:"Data SPPD berhasil ditambahkan"})):l==="edit"&&(await c.updateData($,"id",t.id,t),v.fire({icon:"success",title:"Data SPPD berhasil diubah"})),await w($),p();const i=document.getElementById("staticBackdrop"),r=window.bootstrap.Modal.getInstance(i);r&&r.hide();const g=document.querySelector(".modal-backdrop");g&&g.remove()}catch(t){console.error("Error:",t),v.fire({icon:"error",title:"Terjadi kesalahan"})}},K=async l=>{if((await z.fire({title:"Hapus Data SPPD?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red"})).isConfirmed)try{const i=await F(l);if(i!=null&&i.status){z.fire({icon:"error",title:"Data gagal dihapus",text:i.message});return}await c.deleteItemById($,l)?(v.fire({icon:"success",title:"Data SPPD berhasil dihapus"}),await w($)):v.fire({icon:"error",title:"Gagal menghapus data"})}catch(i){console.error("Error deleting item:",i),v.fire({icon:"error",title:"Terjadi kesalahan saat menghapus data"})}},F=async l=>{try{const t=["delegasiPegawai"];for(const i of t){const r=await c.fetchData(i);if(console.log({dataarray:r,id:l}),r.some(h=>{var E;return(E=h.relation)==null?void 0:E.some(d=>{var x;return((x=d.noSPPD)==null?void 0:x.id)===l})}))return{status:!0,message:"Data sedang digunakan pada menu Delegasi Pegawai"}}return!1}catch(t){return console.error("Error checking if data is in use:",t),!1}},C=()=>{n.value.tglBerangkat?(D.value=new Date(n.value.tglBerangkat),D.value.setDate(D.value.getDate()+1),D.value=D.value.toISOString().split("T")[0],n.value.tglPulang&&new Date(n.value.tglPulang)<=new Date(n.value.tglBerangkat)&&(n.value.tglPulang="",n.value.lamaPenugasan="")):(n.value.tglPulang="",n.value.lamaPenugasan="")},G=()=>{if(n.value.tglBerangkat&&n.value.tglPulang){const l=new Date(n.value.tglBerangkat),t=new Date(n.value.tglPulang),i=Math.abs(t-l),r=Math.ceil(i/(1e3*60*60*24));n.value.lamaPenugasan=r}else n.value.lamaPenugasan=""},M=l=>{if(!l)return"";const t={day:"numeric",month:"long",year:"numeric"};return new Date(l).toLocaleDateString("id-ID",t)},D=B(""),T=B(!1),s=l=>{if(l===0)return"nol rupiah";const t=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan"],i=["","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","delapan belas","sembilan belas"],r=["","sepuluh","dua puluh","tiga puluh","empat puluh","lima puluh","enam puluh","tujuh puluh","delapan puluh","sembilan puluh"],g=["","ribu","juta","miliar","triliun"],h=d=>d<10?t[d]:d<20?i[d-10]:d<100?r[Math.floor(d/10)]+(d%10!==0?" "+t[d%10]:""):t[Math.floor(d/100)]+" ratus "+(d%100!==0?h(d%100):"");return(d=>{if(d===0)return"";let x="",W=0;for(;d>0;){let q=d%1e3;q!==0&&(x=h(q)+" "+g[W]+(x?" "+x:"")),d=Math.floor(d/1e3),W++}return x.trim()})(l)+" rupiah"},P=async l=>{const t=st(l.id),i=document.getElementById("invoice");document.getElementById("jumlahUang").innerText=`${o.formatRupiah(t.relation.filter(r=>r.noSPPD.id===l.id)[0].totalSemuaDana)}`,document.getElementById("metaAnggaran").innerText="",document.getElementById("terbilang").innerText=s(t.relation.filter(r=>r.noSPPD.id===l.id)[0].totalSemuaDana),document.getElementById("deskripsiPembayaran").innerText=t.noST.uraian,await new Promise(r=>setTimeout(r,100));try{const r=await Dt(i,{scale:2,useCORS:!0}),g=r.toDataURL("image/png"),h=new Tt("p","mm","a4"),E=210,d=r.height*E/r.width;h.addImage(g,"PNG",0,0,E,d);const W=h.output("bloburl");window.open(W,"_blank")}catch(r){console.error("Error generating PDF:",r),alert("Gagal membuat PDF, coba lagi.")}finally{T.value=!1}},_=xa(l=>{T.value=!0,P(l)},1e3),R=()=>new Date().getFullYear(),ot=l=>j.value.includes(l),st=l=>(console.log({id:l}),m.dataDelegasiPegawai.filter(t=>{var i;return(i=t.relation)==null?void 0:i.some(r=>{var g;return((g=r.noSPPD)==null?void 0:g.id)===l})})[0]);return(l,t)=>(A(),L("div",null,[t[20]||(t[20]=a("h1",{class:"text-dark fw-bold mb-4"},"List Surat Perintah Perjalanan Dinas",-1)),a("button",{class:"btn btn-primary mb-4",onClick:k,disabled:b.value,"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}," Tambah Data ",8,ka),a("div",ja,[a("table",wa,[t[6]||(t[6]=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"No SPPD"),a("th",{scope:"col"},"Tanggal SPPD"),a("th",{scope:"col"},"Tujuan"),a("th",{scope:"col"},"Tgl Berangkat"),a("th",{scope:"col"},"Tgl Pulang"),a("th",{scope:"col"},"Lama Penugasan"),a("th",{scope:"col",class:"text-center"},"Action")])],-1)),f.value.length>0?(A(),L("tbody",_a,[(A(!0),L(vt,null,bt(f.value,(i,r)=>(A(),L("tr",{key:r},[a("td",{textContent:y(i.noSPPD)},null,8,Ba),a("td",{textContent:y(M(i.tgl))},null,8,Ia),a("td",{textContent:y(i.tujuan)},null,8,Ca),a("td",{textContent:y(M(i.tglBerangkat))},null,8,Ea),a("td",{textContent:y(M(i.tglPulang))},null,8,Oa),a("td",{textContent:y(i.lamaPenugasan+" Hari")},null,8,$a),a("td",Na,[a("button",{class:"btn-danger btn btn-sm",onClick:g=>K(i.id)},"Hapus",8,Ma),a("button",{"data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",class:"btn-sm btn-warning btn",onClick:g=>S(i)}," Edit ",8,Aa),I(a("button",{class:"btn btn-dark btn-sm",onClick:g=>ht(_)(i),disabled:T.value},y(T.value?"Proses...":"Cetak"),9,La),[[Pt,ot(i.id)]])])]))),128))])):(A(),L("tbody",Ua,[a("tr",null,[a("td",Va,y(b.value?"Loading Data...":"Data masih kosong"),1)])]))])]),mt(St,{title:u.value.title,confirmButtonText:u.value.confirmButtonText,actionType:u.value.actionType,data:u.value.data,onConfirm:V},{body:pt(()=>[a("form",{onSubmit:yt(V,["prevent"])},[a("div",Fa,[t[7]||(t[7]=a("label",{for:"noSPPD",class:"form-label"},"Nomor SPPD",-1)),I(a("input",{"onUpdate:modelValue":t[0]||(t[0]=i=>n.value.noSPPD=i),type:"text",class:"form-control",id:"noSPPD"},null,512),[[O,n.value.noSPPD]])]),a("div",Ga,[t[8]||(t[8]=a("label",{for:"tgl",class:"form-label"},"Tanggal SPPD",-1)),I(a("input",{"onUpdate:modelValue":t[1]||(t[1]=i=>n.value.tgl=i),type:"date",class:"form-control",id:"tgl"},null,512),[[O,n.value.tgl]])]),a("div",Ra,[t[9]||(t[9]=a("label",{for:"uraian",class:"form-label"},"Tujuan",-1)),I(a("input",{id:"uraian","onUpdate:modelValue":t[2]||(t[2]=i=>n.value.tujuan=i),class:"form-control",type:"text"},null,512),[[O,n.value.tujuan]])]),a("div",Wa,[t[10]||(t[10]=a("label",{for:"tglBerangkat",class:"form-label"},"Tanggal Keberangkatan",-1)),I(a("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>n.value.tglBerangkat=i),type:"date",class:"form-control",id:"tglBerangkat",onChange:C},null,544),[[O,n.value.tglBerangkat]])]),a("div",Ha,[t[11]||(t[11]=a("label",{for:"tglPulang",class:"form-label"},"Tanggal Pulang",-1)),I(a("input",{"onUpdate:modelValue":t[4]||(t[4]=i=>n.value.tglPulang=i),type:"date",min:D.value,class:"form-control",id:"tglPulang",disabled:!n.value.tglBerangkat,onChange:G},null,40,Ka),[[O,n.value.tglPulang]])]),a("div",Ja,[t[12]||(t[12]=a("label",{for:"lamaPenugasan",class:"form-label"},"Lama Penugasan (Hari)",-1)),I(a("input",{"onUpdate:modelValue":t[5]||(t[5]=i=>n.value.lamaPenugasan=i),type:"text",class:"form-control",id:"lamaPenugasan",readonly:""},null,512),[[O,n.value.lamaPenugasan]])])],32)]),_:1},8,["title","confirmButtonText","actionType","data"]),a("div",qa,[a("div",Ya,[a("div",za,[a("div",Xa,[a("div",Qa,[a("div",Za,[t[17]||(t[17]=a("div",{class:"col-5"},"LEMBAR 1",-1)),a("div",te,[a("table",null,[a("tbody",null,[a("tr",null,[t[13]||(t[13]=a("td",{class:"text-start"},"TA",-1)),t[14]||(t[14]=a("td",{class:"px-2"},":",-1)),a("td",ae,y(R()),1)]),t[15]||(t[15]=a("tr",null,[a("td",{class:"text-start"},"Nomor Bukti"),a("td",{class:"px-2"},":"),a("td")],-1)),t[16]||(t[16]=a("tr",null,[a("td",{class:"text-start"},"Meta Anggaran"),a("td",{class:"px-2"},":"),a("td",{class:"text-start",id:"metaAnggaran"})],-1))])])])]),t[18]||(t[18]=Y('<h2 class="mb-3" style="text-align:center;color:black;font-weight:bold;letter-spacing:5px;" data-v-1b53fed8> KUITANSI </h2><table class="table-sm" data-v-1b53fed8><tbody data-v-1b53fed8><tr data-v-1b53fed8><td class="text-start" data-v-1b53fed8>Sudah diterima dari</td><td class="px-2" data-v-1b53fed8>:</td><td class="text-start" data-v-1b53fed8>Kuasa Pengguna Anggaran BPVP Sidoarjo</td></tr><tr data-v-1b53fed8><td class="text-start" data-v-1b53fed8>Jumlah Uang</td><td class="px-2" data-v-1b53fed8>:</td><td class="text-start" id="jumlahUang" data-v-1b53fed8></td></tr><tr data-v-1b53fed8><td class="text-start" data-v-1b53fed8>Terbilang</td><td class="px-2" data-v-1b53fed8>:</td><td class="text-start" id="terbilang" data-v-1b53fed8></td></tr><tr data-v-1b53fed8><td class="align-top text-start" data-v-1b53fed8>Untuk Pembayaran</td><td class="align-top px-2" data-v-1b53fed8>:</td><td style="text-wrap:wrap;text-align:justify;" id="deskripsiPembayaran" data-v-1b53fed8></td></tr></tbody></table><div class="d-inline-block text-center float-end mt-5" data-v-1b53fed8><div data-v-1b53fed8>Sidoarjo, <span style="margin-left:150px;" data-v-1b53fed8>2024</span></div><div style="height:80px;" data-v-1b53fed8></div><div data-v-1b53fed8>Muhammad Aiza Akbar</div><div data-v-1b53fed8>NIP 3293289328</div></div><div style="clear:both;" data-v-1b53fed8></div>',4))]),t[19]||(t[19]=Y('<div class="content" data-v-1b53fed8><div class="row justify-content-between" data-v-1b53fed8><div class="col-6 lh-md" data-v-1b53fed8><div data-v-1b53fed8><strong data-v-1b53fed8> Setuju dibebankan pada mata anggaran berkenaan </strong></div><div data-v-1b53fed8>An. Kuasa Pengguna Anggaran</div><div data-v-1b53fed8>Pejabat Pembuat Komitmen</div><div data-v-1b53fed8>BPVP Sidoarjo</div><div class="py-5" data-v-1b53fed8></div><div data-v-1b53fed8>Ny. Nama Orang</div><div data-v-1b53fed8>NIP nya</div></div><div class="col-4 lh-md" data-v-1b53fed8><div data-v-1b53fed8><strong data-v-1b53fed8>lunas dibayar tanggal</strong></div><div data-v-1b53fed8> </div><div data-v-1b53fed8>Bendahara Pengeluaran</div><div data-v-1b53fed8>BPVP Sidoarjo</div><div class="py-5" data-v-1b53fed8></div><div data-v-1b53fed8>Ny. Nama Orang</div><div data-v-1b53fed8>NIP nya</div></div></div></div>',1))])])])])]))}},se=xt(ee,[["__scopeId","data-v-1b53fed8"]]);export{se as default};