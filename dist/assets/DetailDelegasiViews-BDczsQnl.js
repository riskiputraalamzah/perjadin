import{f as S,u as T,s as L,h as R,g as H,B,c,a as s,b as N,w as J,t as a,F as V,z as j,y as I,r as K,o as d,q as E,p as C,k as M}from"./index-CDSjVgLj.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const t=p=>(C("data-v-4c1fa18c"),p=p(),M(),p),X={"aria-label":"breadcrumb"},A={class:"breadcrumb"},F={class:"breadcrumb-item"},q=t(()=>s("li",{class:"breadcrumb-item","aria-current":"page"},"Detail",-1)),z=t(()=>s("h1",{class:"text-dark fw-bold mb-4"},"Detail Delegasi",-1)),O={class:"card"},G=t(()=>s("h5",{class:"card-header text-dark"},"Surat Tugas",-1)),Q={class:"card-body"},W={class:"list-group list-group-flush"},Y={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},Z=t(()=>s("span",{class:"fw-bold me-3 text-dark mb-2"},"Nomor",-1)),$={class:"mb-2"},ss={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},ts=t(()=>s("span",{class:"fw-bold me-3 text-dark mb-2"},"Tanggal",-1)),as={class:"mb-2"},es={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},os=t(()=>s("span",{class:"fw-bold me-3 text-dark mb-2"},"Uraian",-1)),ls={class:"mb-2"},is={class:"card shadow-none"},ns=t(()=>s("h5",{class:"card-header text-dark"},"Didelegasikan Kepada :",-1)),rs=["src"],cs={class:"card-body px-0"},ds={class:"text-center fw-bold mb-4"},us={class:"list-group list-group-flush"},_s={class:"list-group-item"},ps=t(()=>s("p",{class:"fw-bold text-dark me-3"},"No SPPD",-1)),ms={class:"list-group-item"},hs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Tujuan SPPD",-1)),fs={class:"list-group-item"},gs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Tgl Berangkat",-1)),bs={class:"list-group-item"},ws=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Tgl Pulang",-1)),ks={class:"list-group-item"},vs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Lama Penugasan",-1)),Ds={class:"list-group-item"},xs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Nama Hotel/Penginapan",-1)),ys={class:"list-group-item"},Ps=t(()=>s("p",{class:"fw-bold text-dark me-3"},"No Voucher/Invoice Hotel",-1)),Ss={class:"list-group-item"},Ts=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jenis Transportasi",-1)),Ls={class:"list-group-item"},Rs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Kode Booking",-1)),Hs={class:"list-group-item"},Bs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Nomor Kursi",-1)),Ns={class:"list-group-item"},Js=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Harga PP",-1)),Vs={class:"list-group-item"},js=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Harga Tiket Berangkat",-1)),Is={class:"list-group-item"},Ks=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Harga Tiket Pulang",-1)),Es={class:"list-group-item"},Cs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Uang Transport",-1)),Ms={class:"list-group-item"},Us=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Tarif Satuan Penginapan",-1)),Xs={class:"list-group-item"},As=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Hari/Malam",-1)),Fs={class:"list-group-item"},qs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Harga Penginapan",-1)),zs={class:"list-group-item"},Os=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Uang Harian",-1)),Gs={class:"list-group-item"},Qs=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Hari",-1)),Ws={class:"list-group-item"},Ys=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Total Uang Harian",-1)),Zs={class:"list-group-item"},$s=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Biaya Lainnya",-1)),st={class:"list-group-item"},tt=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Biaya Lainnya",-1)),at={class:"list-group-item"},et=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Total Dana Semuanya",-1)),ot={key:1,class:"text-center h4"},lt={key:0,class:"card"},it=t(()=>s("h5",{class:"card-header text-dark"},"Total Biaya Keseluruhan",-1)),nt={class:"card-body"},rt={class:"list-group list-group-flush"},ct={class:"list-group-item"},dt=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Pendelegasian Pegawai",-1)),ut={class:"list-group-item"},_t=t(()=>s("p",{class:"fw-bold text-dark me-3"},"Jumlah Total Dana Semuanya",-1)),pt={__name:"DetailDelegasiViews",setup(p){const k=S(),v=T(),D=L(),f=parseInt(atob(v.params.noST).split("___")[1]);console.log(f);const i=R({});H(async()=>{if(i.value=await k.findData("delegasiPegawai",f),console.log(i.value),!i.value)return D.push({name:"delegasi"})});const x=B(()=>{var o;return(o=i.value.relation)==null?void 0:o.reduce((l,n)=>l+n.totalSemuaDana,0)}),y=o=>{const l=o.currentTarget;let n=!1,u,_;l.addEventListener("mousedown",r=>{n=!0,l.classList.add("active"),u=r.pageX-l.offsetLeft,_=l.scrollLeft}),l.addEventListener("mouseleave",()=>{n=!1,l.classList.remove("active")}),l.addEventListener("mouseup",()=>{n=!1,l.classList.remove("active")}),l.addEventListener("mousemove",r=>{if(!n)return;r.preventDefault();const m=(r.pageX-l.offsetLeft-u)*3;l.scrollLeft=_-m})};return(o,l)=>{var u,_,r,h,m,g,b,w;const n=K("router-link");return d(),c("div",null,[s("nav",X,[s("ol",A,[s("li",F,[N(n,{to:{name:"delegasi"}},{default:J(()=>[E("Delegasi Pegawai")]),_:1})]),q])]),z,s("div",O,[G,s("div",Q,[s("ul",W,[s("li",Y,[Z,s("span",$,a((_=(u=i.value)==null?void 0:u.noST)==null?void 0:_.noST),1)]),s("li",ss,[ts,s("span",as,a(o.formatDate((h=(r=i.value)==null?void 0:r.noST)==null?void 0:h.tgl)),1)]),s("li",es,[os,s("span",ls,a((g=(m=i.value)==null?void 0:m.noST)==null?void 0:g.uraian),1)])])])]),s("div",is,[ns,(b=i.value.relation)!=null&&b.length?(d(),c("div",{key:0,class:"card-body px-2 py-0 container-scroll",onMousedown:y},[(d(!0),c(V,null,j(i.value.relation,(e,P)=>(d(),c("div",{class:"card",style:{width:"calc(70vmin)"},key:P},[s("img",{src:o.createAvatar(e.pegawai),class:"card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"},null,8,rs),s("div",cs,[s("h4",ds,a(e.pegawai.namaPegawai),1),s("ul",us,[s("li",_s,[ps,s("p",null,a(e.noSPPD.noSPPD),1)]),s("li",ms,[hs,s("p",null,a(e.noSPPD.tujuan),1)]),s("li",fs,[gs,s("p",null,a(o.formatDate(e.noSPPD.tglBerangkat)),1)]),s("li",bs,[ws,s("p",null,a(o.formatDate(e.noSPPD.tglPulang)),1)]),s("li",ks,[vs,s("p",null,a(e.noSPPD.lamaPenugasan)+" Hari",1)]),s("li",Ds,[xs,s("p",null,a(e.hotelName),1)]),s("li",ys,[Ps,s("p",null,a(e.hotelVoucher),1)]),s("li",Ss,[Ts,s("p",null,a(e.transportationType),1)]),s("li",Ls,[Rs,s("p",null,a(e.bookingCode),1)]),s("li",Hs,[Bs,s("p",null,a(e.seatNumber),1)]),s("li",Ns,[Js,s("p",null,a(o.formatRupiah(e.pricePP)),1)]),s("li",Vs,[js,s("p",null,a(o.formatRupiah(e.princeDeparture)),1)]),s("li",Is,[Ks,s("p",null,a(o.formatRupiah(e.princeReturn)),1)]),s("li",Es,[Cs,s("p",null,a(o.formatRupiah(e.sumTransport)),1)]),s("li",Ms,[Us,s("p",null,a(o.formatRupiah(e.rate)),1)]),s("li",Xs,[As,s("p",null,a(o.formatRupiah(e.numDays))+" Hari",1)]),s("li",Fs,[qs,s("p",null,a(o.formatRupiah(e.sumTotalAccomodation)),1)]),s("li",zs,[Os,s("p",null,a(o.formatRupiah(e.dailyRate)),1)]),s("li",Gs,[Qs,s("p",null,a(e.dailyNumDays)+" Hari",1)]),s("li",Ws,[Ys,s("p",null,a(o.formatRupiah(e.sumTotalDaily)),1)]),s("li",Zs,[$s,s("p",null,a(o.formatRupiah(e.biayaLainnyaKeterangan)),1)]),s("li",st,[tt,s("p",null,a(o.formatRupiah(e.biayaLainnyaJumlah)),1)]),s("li",at,[et,s("p",null,a(o.formatRupiah(e.totalSemuaDana)),1)])])])]))),128))],32)):(d(),c("div",ot,"Data Masih Kosong"))]),(w=i.value.relation)!=null&&w.length?(d(),c("div",lt,[it,s("div",nt,[s("ul",rt,[s("li",ct,[dt,s("p",null,a(i.value.relation.length)+" Orang",1)]),s("li",ut,[_t,s("p",null,a(o.formatRupiah(x.value)),1)])])])])):I("",!0)])}}},ft=U(pt,[["__scopeId","data-v-4c1fa18c"]]);export{ft as default};
