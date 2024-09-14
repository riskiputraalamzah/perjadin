import{f as _,u as h,q as S,h as T,g as L,y as R,r as H,o as r,c as u,a as s,b as N,w as B,t as a,F as J,j,s as V,p as K}from"./index-D96A8p5g.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C={"aria-label":"breadcrumb"},I={class:"breadcrumb"},M={class:"breadcrumb-item"},U={class:"card"},X={class:"card-body"},A={class:"list-group list-group-flush"},F={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},q={class:"mb-2"},O={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},z={class:"mb-2"},G={class:"list-group-item px-0 flex-wrap justify-content-between d-flex"},Q={class:"mb-2"},W={class:"card shadow-none"},Y=["src"],Z={class:"card-body px-0"},$={class:"text-center fw-bold mb-4"},ss={class:"list-group list-group-flush"},ts={class:"list-group-item"},as={class:"list-group-item"},ls={class:"list-group-item"},es={class:"list-group-item"},os={class:"list-group-item"},is={class:"list-group-item"},ns={class:"list-group-item"},rs={class:"list-group-item"},us={class:"list-group-item"},ds={class:"list-group-item"},ps={class:"list-group-item"},ms={class:"list-group-item"},fs={class:"list-group-item"},gs={class:"list-group-item"},bs={class:"list-group-item"},cs={class:"list-group-item"},ws={class:"list-group-item"},ks={class:"list-group-item"},vs={class:"list-group-item"},xs={class:"list-group-item"},Ds={class:"list-group-item"},Ps={class:"list-group-item"},ys={class:"list-group-item"},_s={key:1,class:"text-center h4"},hs={key:0,class:"card"},Ss={class:"card-body"},Ts={class:"list-group list-group-flush"},Ls={class:"list-group-item"},Rs={class:"list-group-item"},Hs={__name:"DetailDelegasiViews",setup(Ns){const k=_(),v=h(),x=S(),g=parseInt(atob(v.params.noST).split("___")[1]);console.log(g);const o=T({});L(async()=>{if(o.value=await k.findData("delegasiPegawai",g),console.log(o.value),!o.value)return x.push({name:"delegasi"})});const D=R(()=>{var e;return(e=o.value.relation)==null?void 0:e.reduce((t,i)=>t+i.totalSemuaDana,0)}),P=e=>{const t=e.currentTarget;let i=!1,d,p;t.addEventListener("mousedown",n=>{i=!0,t.classList.add("active"),d=n.pageX-t.offsetLeft,p=t.scrollLeft}),t.addEventListener("mouseleave",()=>{i=!1,t.classList.remove("active")}),t.addEventListener("mouseup",()=>{i=!1,t.classList.remove("active")}),t.addEventListener("mousemove",n=>{if(!i)return;n.preventDefault();const m=(n.pageX-t.offsetLeft-d)*3;t.scrollLeft=p-m})};return(e,t)=>{var d,p,n,f,m,b,c,w;const i=H("router-link");return r(),u("div",null,[s("nav",C,[s("ol",I,[s("li",M,[N(i,{to:{name:"delegasi"}},{default:B(()=>t[0]||(t[0]=[K("Delegasi Pegawai")])),_:1})]),t[1]||(t[1]=s("li",{class:"breadcrumb-item","aria-current":"page"},"Detail",-1))])]),t[33]||(t[33]=s("h1",{class:"text-dark fw-bold mb-4"},"Detail Delegasi",-1)),s("div",U,[t[5]||(t[5]=s("h5",{class:"card-header text-dark"},"Surat Tugas",-1)),s("div",X,[s("ul",A,[s("li",F,[t[2]||(t[2]=s("span",{class:"fw-bold me-3 text-dark mb-2"},"Nomor",-1)),s("span",q,a((p=(d=o.value)==null?void 0:d.noST)==null?void 0:p.noST),1)]),s("li",O,[t[3]||(t[3]=s("span",{class:"fw-bold me-3 text-dark mb-2"},"Tanggal",-1)),s("span",z,a(e.formatDate((f=(n=o.value)==null?void 0:n.noST)==null?void 0:f.tgl)),1)]),s("li",G,[t[4]||(t[4]=s("span",{class:"fw-bold me-3 text-dark mb-2"},"Uraian",-1)),s("span",Q,a((b=(m=o.value)==null?void 0:m.noST)==null?void 0:b.uraian),1)])])])]),s("div",W,[t[29]||(t[29]=s("h5",{class:"card-header text-dark"},"Didelegasikan Kepada :",-1)),(c=o.value.relation)!=null&&c.length?(r(),u("div",{key:0,class:"card-body px-2 py-0 container-scroll",onMousedown:P},[(r(!0),u(J,null,j(o.value.relation,(l,y)=>(r(),u("div",{class:"card",style:{width:"calc(70vmin)"},key:y},[s("img",{src:e.createAvatar(l.pegawai),class:"card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"},null,8,Y),s("div",Z,[s("h4",$,a(l.pegawai.namaPegawai),1),s("ul",ss,[s("li",ts,[t[6]||(t[6]=s("p",{class:"fw-bold text-dark me-3"},"No SPPD",-1)),s("p",null,a(l.noSPPD.noSPPD),1)]),s("li",as,[t[7]||(t[7]=s("p",{class:"fw-bold text-dark me-3"},"Tujuan SPPD",-1)),s("p",null,a(l.noSPPD.tujuan),1)]),s("li",ls,[t[8]||(t[8]=s("p",{class:"fw-bold text-dark me-3"},"Tgl Berangkat",-1)),s("p",null,a(e.formatDate(l.noSPPD.tglBerangkat)),1)]),s("li",es,[t[9]||(t[9]=s("p",{class:"fw-bold text-dark me-3"},"Tgl Pulang",-1)),s("p",null,a(e.formatDate(l.noSPPD.tglPulang)),1)]),s("li",os,[t[10]||(t[10]=s("p",{class:"fw-bold text-dark me-3"},"Lama Penugasan",-1)),s("p",null,a(l.noSPPD.lamaPenugasan)+" Hari",1)]),s("li",is,[t[11]||(t[11]=s("p",{class:"fw-bold text-dark me-3"},"Nama Hotel/Penginapan",-1)),s("p",null,a(l.hotelName),1)]),s("li",ns,[t[12]||(t[12]=s("p",{class:"fw-bold text-dark me-3"},"No Voucher/Invoice Hotel",-1)),s("p",null,a(l.hotelVoucher),1)]),s("li",rs,[t[13]||(t[13]=s("p",{class:"fw-bold text-dark me-3"},"Jenis Transportasi",-1)),s("p",null,a(l.transportationType),1)]),s("li",us,[t[14]||(t[14]=s("p",{class:"fw-bold text-dark me-3"},"Kode Booking",-1)),s("p",null,a(l.bookingCode),1)]),s("li",ds,[t[15]||(t[15]=s("p",{class:"fw-bold text-dark me-3"},"Nomor Kursi",-1)),s("p",null,a(l.seatNumber),1)]),s("li",ps,[t[16]||(t[16]=s("p",{class:"fw-bold text-dark me-3"},"Harga PP",-1)),s("p",null,a(e.formatRupiah(l.pricePP)),1)]),s("li",ms,[t[17]||(t[17]=s("p",{class:"fw-bold text-dark me-3"},"Harga Tiket Berangkat",-1)),s("p",null,a(e.formatRupiah(l.priceDeparture)),1)]),s("li",fs,[t[18]||(t[18]=s("p",{class:"fw-bold text-dark me-3"},"Harga Tiket Pulang",-1)),s("p",null,a(e.formatRupiah(l.priceReturn)),1)]),s("li",gs,[t[19]||(t[19]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Uang Transport",-1)),s("p",null,a(e.formatRupiah(l.totalPrice)),1)]),s("li",bs,[t[20]||(t[20]=s("p",{class:"fw-bold text-dark me-3"},"Tarif Satuan Penginapan",-1)),s("p",null,a(e.formatRupiah(l.rate)),1)]),s("li",cs,[t[21]||(t[21]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Hari/Malam",-1)),s("p",null,a(l.numDays)+" Hari",1)]),s("li",ws,[t[22]||(t[22]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Harga Penginapan",-1)),s("p",null,a(e.formatRupiah(l.totalAccommodation)),1)]),s("li",ks,[t[23]||(t[23]=s("p",{class:"fw-bold text-dark me-3"},"Uang Harian",-1)),s("p",null,a(e.formatRupiah(l.dailyRate)),1)]),s("li",vs,[t[24]||(t[24]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Hari",-1)),s("p",null,a(l.dailyNumDays)+" Hari",1)]),s("li",xs,[t[25]||(t[25]=s("p",{class:"fw-bold text-dark me-3"},"Total Uang Harian",-1)),s("p",null,a(e.formatRupiah(l.totalDaily)),1)]),s("li",Ds,[t[26]||(t[26]=s("p",{class:"fw-bold text-dark me-3"},"Biaya Lainnya",-1)),s("p",null,a(l.biayaLainnyaKeterangan),1)]),s("li",Ps,[t[27]||(t[27]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Biaya Lainnya",-1)),s("p",null,a(e.formatRupiah(l.biayaLainnyaJumlah)),1)]),s("li",ys,[t[28]||(t[28]=s("p",{class:"fw-bold text-dark me-3"},"Total Dana Semuanya",-1)),s("p",null,a(e.formatRupiah(l.totalSemuaDana)),1)])])])]))),128))],32)):(r(),u("div",_s,"Data Masih Kosong"))]),(w=o.value.relation)!=null&&w.length?(r(),u("div",hs,[t[32]||(t[32]=s("h5",{class:"card-header text-dark"},"Total Biaya Keseluruhan",-1)),s("div",Ss,[s("ul",Ts,[s("li",Ls,[t[30]||(t[30]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Pendelegasian Pegawai",-1)),s("p",null,a(o.value.relation.length)+" Orang",1)]),s("li",Rs,[t[31]||(t[31]=s("p",{class:"fw-bold text-dark me-3"},"Jumlah Total Dana Semuanya",-1)),s("p",null,a(e.formatRupiah(D.value)),1)])])])])):V("",!0)])}}},js=E(Hs,[["__scopeId","data-v-2e25c4a8"]]);export{js as default};
