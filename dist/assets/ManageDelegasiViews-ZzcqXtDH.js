import{C as sa,p as na,u as ia,y as ra,f as ua,h as b,g as da,z as P,c as r,a,b as ca,w as ma,m as f,t as d,l as s,v as i,F as I,x as J,s as R,D as V,n as pa,S as w,A as B,r as va,o as u}from"./index-DEUtZzSI.js";import{T as ba}from"./ToastAlert-Dxzzr5V7.js";const ga={"aria-label":"breadcrumb"},fa={class:"breadcrumb"},ya={class:"breadcrumb-item"},ha={class:"mb-4"},ka={key:0,class:"badge text-bg-primary fs-1"},Pa={key:1,class:"badge text-bg-danger fs-1"},wa={key:0,class:"card"},Da={class:"card-body"},xa={class:"accordion accordion-flush",id:"accordionFlushExample"},Ta={class:"accordion-item"},Sa={id:"flush-collapseTwo",class:"accordion-collapse collapse","data-bs-parent":"#accordionFlushExample"},Ca={class:"accordion-body px-0"},Na={key:0,class:"list-group"},Ra=["onClick"],Va={key:0},Ba={key:1,class:"text-center"},Ua={class:"accordion-item"},Ma={id:"flush-collapseThree",class:"accordion-collapse collapse","data-bs-parent":"#accordionFlushExample"},_a={class:"accordion-body px-0"},Aa={key:0,class:"list-group"},La=["onClick"],Ea={key:0},Ha={key:1,class:"text-center"},Ia={key:1,class:"card mt-4",ref:"reviewSection"},Ja={class:"card-body"},ja={class:"mt-4"},Ka={class:"card mb-3"},Oa={class:"card-body"},za={class:"mb-3"},$a={class:"mb-3"},Fa={class:"card mb-3"},Ya={class:"card-body"},qa={class:"mb-3"},Ga={class:"mb-3"},Qa={class:"mb-3"},Wa={class:"mb-3"},Xa={class:"mb-3"},Za={class:"mb-3"},ae={class:"mb-3"},ee={class:"card mb-3"},te={class:"card-body"},le={class:"mb-3"},oe={class:"mb-3"},se={class:"mb-3"},ne={class:"card mb-3"},ie={class:"card-body"},re={class:"mb-3"},ue={class:"mb-3"},de={class:"mb-3"},ce={class:"card mb-3"},me={class:"card-body"},pe={class:"mb-3"},ve={class:"mb-3"},be={class:"card mb-3"},ge={class:"card-body"},fe={class:"row align-items-center g-0 py-3 border-bottom"},ye={class:"col-sm-1"},he={class:"col-sm-5 text-sm-end"},ke={class:"row align-items-center g-0 py-3 border-bottom"},Pe={class:"col-sm-1"},we={class:"col-sm-5 text-sm-end"},De={class:"row align-items-center g-0 py-3 border-bottom"},xe={class:"col-sm-1"},Te={class:"col-sm-5 text-sm-end"},Se={class:"row align-items-center g-0 py-3 border-bottom"},Ce={class:"col-sm-1"},Ne={class:"col-sm-5 text-sm-end"},Re={class:"row align-items-center g-0 py-3 border-bottom"},Ve={class:"col-sm-1"},Be={class:"col-sm-5 text-sm-end"},Ue={class:"row align-items-center fw-bold text-dark g-0 py-3 border-top"},Me={class:"col-sm-6 text-sm-end"},_e={key:2,class:"card"},Ae={class:"card-header d-flex flex-wrap justify-content-between"},Le={class:"card-body"},Ee={class:"table-responsive"},He={class:"table table-striped table-bordered"},Ie=["textContent"],Je=["textContent"],je={class:"text-center"},Ke=["onClick"],Ye={__name:"ManageDelegasiViews",setup(Oe){const{proxy:v}=sa(),q=na(),j=ia(),G=ra(),D=ua(),M=b([]),_=b([]),A=b([]),c=b({}),x=b(!0),K=G.manageIdDelegasi,L=async()=>{const o=await D.findData("delegasiPegawai",K);if(!o)return q.push({name:"delegasi"});M.value=await D.fetchData("sppd"),_.value=await D.fetchData("pegawai"),A.value=await D.fetchData("delegasiPegawai"),c.value=o};da(async()=>{try{await L(),x.value=!x.value,setTimeout(()=>{document.body.removeAttribute("style")},2e3)}catch(o){console.error("Error fetching data from IDB:",o),x.value=!x.value}});const E=b(""),H=b(""),T=b(null),h=b(null),Q=()=>{T.value=null,h.value=null,l.value={hotelName:"",hotelVoucher:"",transportationType:"",bookingCode:"",seatNumber:"",pricePP:0,priceDeparture:0,priceReturn:0,totalPrice:0,rate:0,numDays:0,totalAccommodation:0,dailyRate:0,dailyNumDays:0,totalDaily:0,biayaLainnyaKeterangan:"",biayaLainnyaJumlah:0}},O=P(()=>M.value.length?M.value.filter(o=>!A.value.some(e=>{var n;return(n=e.relation)==null?void 0:n.some(p=>{var g;return((g=p.noSPPD)==null?void 0:g.noSPPD)===o.noSPPD})})).filter(o=>o.noSPPD.toLowerCase().includes(E.value.toLowerCase())):[]),z=P(()=>!_.value.length||!c.value?[]:_.value.filter(o=>!A.value.some(n=>{var p;return n.noST.noST===c.value.noST.noST&&((p=n.relation)==null?void 0:p.some(g=>g.pegawai.namaPegawai===o.namaPegawai))})).filter(o=>o.namaPegawai.toLowerCase().includes(H.value.toLowerCase()))),W=o=>{T.value=o},X=o=>{h.value=o},l=b({hotelName:"",hotelVoucher:"",transportationType:"",bookingCode:"",seatNumber:"",pricePP:0,priceDeparture:0,priceReturn:0,totalPrice:0,rate:0,numDays:0,totalAccommodation:0,dailyRate:0,dailyNumDays:0,totalDaily:0,biayaLainnyaKeterangan:"",biayaLainnyaJumlah:0}),U=b(null),Z=()=>{U.value.style.height="auto",U.value.style.height=`${U.value.scrollHeight}px`},aa=async()=>{var o;try{if(!(await w.fire({title:"Apakah data sudah betul?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red",backdrop:!0,allowOutsideClick:!1,allowEscapeKey:!1})).isConfirmed)return;const n=v.unformatRupiah(F.value);ta();let g={...{totalSemuaDana:n,...l.value},noSPPD:B(T.value)??{noSPPD:""},pegawai:B(h.value)};const t=await ea();t&&(g={...g,...t});let y={};c.value&&c.value.relation?y={...B(c.value),relation:[...B(c.value.relation),g]}:y={relation:[g]},console.log({storeRawData:y}),await D.updateData("delegasiPegawai","id",K,y),Q(),((o=c.value.relation)==null?void 0:o.length)>0?(w.fire({icon:"success",title:"Data Berhasil Ditambahkan",html:`NO ST <b>${j.params.noST}</b> telah berhasil ditambahkan Data Delegasinya`}),k.value=!k.value):w.fire({icon:"success",title:"Delegasi Tugas telah Aktif",html:`NO ST <b>${j.params.noST}</b> telah berhasil di Aktifkan`}),await L()}catch(e){console.error("Terjadi kesalahan:",e)}},ea=async()=>{const{value:o}=await w.fire({title:"Informasi Lanjuttan!",html:`
      <input id="input1" class="swal2-input" type="text" placeholder="Jumlah Pengembalian">
      <input id="input2" class="swal2-input" type="text" placeholder="Nomor Billing">
      <input id="input3" class="swal2-input" type="text" placeholder="NTPN">
    `,focusConfirm:!1,preConfirm:()=>{const e=document.getElementById("input1").value,n=document.getElementById("input2").value,p=document.getElementById("input3").value;return!e||!n||!p?(w.showValidationMessage("Semua bidang harus diisi!"),!1):isNaN(v.unformatRupiah(e))?(w.showValidationMessage("Jumlah Kembalian harus berisikan angka !"),!1):{jumlahPengembalian:e,nomorBilling:n,ntpn:p}},showCancelButton:!0,confirmButtonText:"Simpan",cancelButtonText:"Lewati Saja",backdrop:!0,allowOutsideClick:!1,allowEscapeKey:!1,didOpen:()=>{document.getElementById("input1").addEventListener("input",n=>{const p=n.target.value.replace(/[^0-9,]/g,"");n.target.value=v.formatRupiah(v.unformatRupiah(p))})}});return o};function $(o,e,n){const p=e*n;return v.formatRupiah(p)}const S=P(()=>{const o=l.value.priceDeparture+l.value.priceReturn;return v.formatRupiah(o)}),C=P(()=>$(l.value.totalAccommodation,l.value.rate,l.value.numDays)),N=P(()=>$(l.value.totalDaily,l.value.dailyRate,l.value.dailyNumDays));function ta(){l.value.totalPrice=v.unformatRupiah(S.value),l.value.totalAccommodation=v.unformatRupiah(C.value),l.value.totalDaily=v.unformatRupiah(N.value)}const k=b(!1),la=P(()=>{var o;return(o=c.value.relation)!=null&&o.length?!!k.value:!0}),oa=async o=>{try{if(c.value.relation){if(!(await w.fire({title:"Apakah Anda Yakin",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red",backdrop:!0,allowOutsideClick:!1,allowEscapeKey:!1})).isConfirmed)return;c.value.relation.splice(o,1);const n=await D.updateData("delegasiPegawai","id",c.value.id,B(c.value));await L(),console.log("Data yang diupdate di IndexedDB:",n),ba.fire({icon:"success",title:"Data berhasil dihapus"})}else console.error("Index tidak valid atau data tidak ditemukan")}catch(e){console.error("Terjadi kesalahan saat menghapus data:",e)}},m=b({PP:!1,transport:!0,accommodation:!0,daily:!0,otherExpenses:!1}),F=P(()=>{let o=0;return m.value.PP&&(o+=l.value.pricePP),m.value.transport&&(o+=v.unformatRupiah(S.value)),m.value.accommodation&&(o+=v.unformatRupiah(C.value)),m.value.daily&&(o+=v.unformatRupiah(N.value)),m.value.otherExpenses&&(o+=l.value.biayaLainnyaJumlah),v.formatRupiah(o)});return(o,e)=>{var p,g;const n=va("router-link");return u(),r("div",null,[a("nav",ga,[a("ol",fa,[a("li",ya,[ca(n,{to:{name:"delegasi"}},{default:ma(()=>e[25]||(e[25]=[f("Delegasi Pegawai")])),_:1})]),e[26]||(e[26]=a("li",{class:"breadcrumb-item","aria-current":"page"},"Manage",-1))])]),e[70]||(e[70]=a("h1",{class:"text-dark fw-bold mb-2"},"Manage Delegasi",-1)),a("h5",null,[e[27]||(e[27]=a("b",null,"No ST ",-1)),f(" "+d(o.$route.params.noST),1)]),a("div",ha,[e[28]||(e[28]=f(" Status : ")),(p=c.value.relation)!=null&&p.length?(u(),r("span",ka,"Aktif")):(u(),r("span",Pa,"Non Aktif"))]),la.value?(u(),r("div",wa,[e[33]||(e[33]=a("h5",{class:"card-header text-dark"},"Pilih SPPD dan Pegawai",-1)),a("div",Da,[a("div",xa,[a("div",Ta,[e[30]||(e[30]=a("h2",{class:"accordion-header"},[a("button",{class:"accordion-button px-0 bg-transparent text-dark fw-bold collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseTwo","aria-expanded":"false","aria-controls":"flush-collapseTwo"},[a("span",{class:"rounded-circle fs-1 text-bg-primary me-2 d-flex justify-content-center align-items-center",style:{width:"25px",height:"25px"}},"1"),f(" Pilih Nomor SPPD "),a("sup",{class:"text-info ms-1"},"*Opsional")])],-1)),a("div",Sa,[a("div",Ca,[s(a("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>E.value=t),class:"form-control mb-3",type:"text",placeholder:"Cari SPPD..."},null,512),[[i,E.value]]),O.value.length?(u(),r("ul",Na,[(u(!0),r(I,null,J(O.value,t=>(u(),r("li",{key:t.id,class:"list-group-item d-flex justify-content-between align-items-center",onClick:y=>W(t),style:{cursor:"pointer"}},[f(d(t.noSPPD)+" ",1),T.value===t?(u(),r("span",Va,e[29]||(e[29]=[a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",class:"icon icon-tabler icons-tabler-filled icon-tabler-circle-check text-success"},[a("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a("path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"})],-1)]))):R("",!0)],8,Ra))),128))])):(u(),r("div",Ba,d(x.value?"Loading":"Data SPPD masih kosong"),1))])])]),a("div",Ua,[e[32]||(e[32]=a("h2",{class:"accordion-header"},[a("button",{class:"accordion-button px-0 bg-transparent text-dark fw-bold collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseThree","aria-expanded":"false","aria-controls":"flush-collapseThree"},[a("span",{class:"rounded-circle fs-1 text-bg-primary me-2 d-flex justify-content-center align-items-center",style:{width:"25px",height:"25px"}},"2"),f(" Pilih Pegawai ")])],-1)),a("div",Ma,[a("div",_a,[s(a("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>H.value=t),class:"form-control mb-3",type:"text",placeholder:"Cari Pegawai..."},null,512),[[i,H.value]]),z.value.length?(u(),r("ul",Aa,[(u(!0),r(I,null,J(z.value,t=>(u(),r("li",{key:t.id,class:"list-group-item d-flex justify-content-between align-items-center",onClick:y=>X(t),style:{cursor:"pointer"}},[f(d(t.namaPegawai)+" ",1),h.value===t?(u(),r("span",Ea,e[31]||(e[31]=[a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",class:"icon icon-tabler icons-tabler-filled icon-tabler-circle-check text-success"},[a("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a("path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"})],-1)]))):R("",!0)],8,La))),128))])):(u(),r("div",Ha,d(x.value?"Loading":"Data Pegawai masih kosong"),1))])])])])])])):R("",!0),h.value?(u(),r("div",Ia,[e[67]||(e[67]=a("h5",{class:"card-header text-dark"},"Review Pilihan",-1)),a("div",Ja,[a("p",null,[e[34]||(e[34]=a("strong",null,"NO ST",-1)),f(" : "+d(o.$route.params.noST),1)]),a("p",null,[e[35]||(e[35]=a("strong",null,"NO SPPD",-1)),f(" : "+d(T.value?T.value.noSPPD:"Belum Ada"),1)]),a("p",null,[e[36]||(e[36]=a("strong",null,"Nama Pegawai",-1)),f(" : "+d(h.value?h.value.namaPegawai:"Belum Ada"),1)]),a("div",ja,[e[66]||(e[66]=a("h5",{class:"mb-3"},"Input Biaya Sarana dan Prasarana",-1)),a("div",Ka,[e[39]||(e[39]=a("div",{class:"card-header"},"Hotel/Penginapan",-1)),a("div",Oa,[a("div",za,[e[37]||(e[37]=a("label",{for:"hotelName",class:"form-label"},"Nama Hotel/Penginapan",-1)),s(a("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.value.hotelName=t),type:"text",class:"form-control",id:"hotelName",placeholder:"Masukkan nama hotel/penginapan"},null,512),[[i,l.value.hotelName]])]),a("div",$a,[e[38]||(e[38]=a("label",{for:"hotelVoucher",class:"form-label"},"No Voucher/Invoice Hotel",-1)),s(a("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>l.value.hotelVoucher=t),type:"text",class:"form-control",id:"hotelVoucher",placeholder:"Masukkan no voucher/invoice hotel"},null,512),[[i,l.value.hotelVoucher]])])])]),a("div",Fa,[e[47]||(e[47]=a("div",{class:"card-header"},"Transportasi",-1)),a("div",Ya,[a("div",qa,[e[40]||(e[40]=a("label",{for:"transportationType",class:"form-label"},"Jenis Transportasi",-1)),s(a("input",{"onUpdate:modelValue":e[4]||(e[4]=t=>l.value.transportationType=t),type:"text",class:"form-control",id:"transportationType",placeholder:"Masukkan jenis transportasi"},null,512),[[i,l.value.transportationType]])]),a("div",Ga,[e[41]||(e[41]=a("label",{for:"bookingCode",class:"form-label"},"Kode Booking",-1)),s(a("input",{"onUpdate:modelValue":e[5]||(e[5]=t=>l.value.bookingCode=t),type:"text",class:"form-control",id:"bookingCode",placeholder:"Masukkan kode booking"},null,512),[[i,l.value.bookingCode]])]),a("div",Qa,[e[42]||(e[42]=a("label",{for:"seatNumber",class:"form-label"},"Nomor Kursi",-1)),s(a("input",{"onUpdate:modelValue":e[6]||(e[6]=t=>l.value.seatNumber=t),type:"text",class:"form-control",id:"seatNumber",placeholder:"Masukkan nomor kursi"},null,512),[[i,l.value.seatNumber]])]),a("div",Wa,[e[43]||(e[43]=a("label",{for:"pricePP",class:"form-label"},"Harga PP",-1)),s(a("input",{"onUpdate:modelValue":e[7]||(e[7]=t=>l.value.pricePP=t),type:"number",class:"form-control",id:"pricePP",placeholder:"Masukkan harga PP"},null,512),[[i,l.value.pricePP]])]),a("div",Xa,[e[44]||(e[44]=a("label",{for:"priceDeparture",class:"form-label"},"Harga Tiket Berangkat",-1)),s(a("input",{"onUpdate:modelValue":e[8]||(e[8]=t=>l.value.priceDeparture=t),type:"number",class:"form-control",id:"priceDeparture",placeholder:"Masukkan harga tiket berangkat"},null,512),[[i,l.value.priceDeparture]])]),a("div",Za,[e[45]||(e[45]=a("label",{for:"priceReturn",class:"form-label"},"Harga Tiket Pulang",-1)),s(a("input",{"onUpdate:modelValue":e[9]||(e[9]=t=>l.value.priceReturn=t),type:"number",class:"form-control",id:"priceReturn",placeholder:"Masukkan harga tiket pulang"},null,512),[[i,l.value.priceReturn]])]),a("div",ae,[e[46]||(e[46]=a("label",{for:"sumTransport",class:"form-label"},"Jumlah Uang Transport",-1)),s(a("input",{"onUpdate:modelValue":e[10]||(e[10]=t=>S.value=t),type:"text",class:"form-control",id:"sumTransport",readonly:""},null,512),[[i,S.value]])])])]),a("div",ee,[e[51]||(e[51]=a("div",{class:"card-header"},"Penginapan",-1)),a("div",te,[a("div",le,[e[48]||(e[48]=a("label",{for:"rate",class:"form-label"},"Tarif Satuan Penginapan",-1)),s(a("input",{"onUpdate:modelValue":e[11]||(e[11]=t=>l.value.rate=t),type:"number",class:"form-control",id:"rate",placeholder:"Masukkan tarif satuan penginapan"},null,512),[[i,l.value.rate]])]),a("div",oe,[e[49]||(e[49]=a("label",{for:"numDays",class:"form-label"},"Jumlah Hari/Malam",-1)),s(a("input",{"onUpdate:modelValue":e[12]||(e[12]=t=>l.value.numDays=t),type:"number",class:"form-control",id:"numDays",placeholder:"Masukkan jumlah hari/malam"},null,512),[[i,l.value.numDays]])]),a("div",se,[e[50]||(e[50]=a("label",{for:"totalAccommodation",class:"form-label"},"Jumlah Harga Penginapan",-1)),s(a("input",{"onUpdate:modelValue":e[13]||(e[13]=t=>C.value=t),type:"text",class:"form-control",id:"totalAccommodation",readonly:"",placeholder:"Masukkan jumlah harga penginapan"},null,512),[[i,C.value]])])])]),a("div",ne,[e[55]||(e[55]=a("div",{class:"card-header"},"Uang Harian",-1)),a("div",ie,[a("div",re,[e[52]||(e[52]=a("label",{for:"dailyRate",class:"form-label"},"Satuan Uang Harian (Rp)",-1)),s(a("input",{"onUpdate:modelValue":e[14]||(e[14]=t=>l.value.dailyRate=t),type:"number",class:"form-control",id:"dailyRate",placeholder:"Masukkan satuan uang harian"},null,512),[[i,l.value.dailyRate]])]),a("div",ue,[e[53]||(e[53]=a("label",{for:"dailyNumDays",class:"form-label"},"Jumlah Hari",-1)),s(a("input",{"onUpdate:modelValue":e[15]||(e[15]=t=>l.value.dailyNumDays=t),type:"number",class:"form-control",id:"dailyNumDays",placeholder:"Masukkan jumlah hari"},null,512),[[i,l.value.dailyNumDays]])]),a("div",de,[e[54]||(e[54]=a("label",{for:"totalDaily",class:"form-label"},"Total Uang Harian",-1)),s(a("input",{"onUpdate:modelValue":e[16]||(e[16]=t=>N.value=t),type:"text",class:"form-control",id:"totalDaily",readonly:"",placeholder:"Masukkan total uang harian"},null,512),[[i,N.value]])])])]),a("div",ce,[e[58]||(e[58]=a("div",{class:"card-header"},"Biaya Lainnya (bila ada)",-1)),a("div",me,[a("div",pe,[e[56]||(e[56]=a("label",{for:"uraian",class:"form-label"},"Keterangan",-1)),s(a("textarea",{id:"uraian","onUpdate:modelValue":e[17]||(e[17]=t=>l.value.biayaLainnyaKeterangan=t),class:"form-control",placeholder:"Isikan Keterangan Biaya Lainnya disini...",rows:"1",ref_key:"autoResizeTextarea",ref:U,onInput:Z},null,544),[[i,l.value.biayaLainnyaKeterangan]])]),a("div",ve,[e[57]||(e[57]=a("label",{for:"dailyNumDays",class:"form-label"},"Jumlah",-1)),s(a("input",{"onUpdate:modelValue":e[18]||(e[18]=t=>l.value.biayaLainnyaJumlah=t),type:"number",class:"form-control",id:"dailyNumDays",placeholder:"Masukkan jumlah hari"},null,512),[[i,l.value.biayaLainnyaJumlah]])])])]),a("div",be,[e[65]||(e[65]=a("h4",{class:"card-header text-dark"},"Total Biaya Seluruhnya",-1)),a("div",ge,[a("div",fe,[a("div",ye,[s(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[19]||(e[19]=t=>m.value.PP=t),id:"includePP"},null,512),[[V,m.value.PP]])]),e[59]||(e[59]=a("div",{class:"col-sm-6"},[a("label",{for:"includePP"},[a("strong",{class:"mb-2"},"Harga PP")])],-1)),a("div",he,d(o.formatRupiah(l.value.pricePP)),1)]),a("div",ke,[a("div",Pe,[s(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[20]||(e[20]=t=>m.value.transport=t),id:"includeTransport",checked:""},null,512),[[V,m.value.transport]])]),e[60]||(e[60]=a("div",{class:"col-sm-6"},[a("label",{for:"includeTransport"},[a("strong",{class:"mb-2"},"Jumlah Uang Transport")])],-1)),a("div",we,d(S.value),1)]),a("div",De,[a("div",xe,[s(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[21]||(e[21]=t=>m.value.accommodation=t),id:"includeAccommodation",checked:""},null,512),[[V,m.value.accommodation]])]),e[61]||(e[61]=a("div",{class:"col-sm-6"},[a("label",{for:"includeAccommodation"},[a("strong",{class:"mb-2"},"Jumlah Harga Penginapan")])],-1)),a("div",Te,d(C.value),1)]),a("div",Se,[a("div",Ce,[s(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[22]||(e[22]=t=>m.value.daily=t),id:"includeDaily",checked:""},null,512),[[V,m.value.daily]])]),e[62]||(e[62]=a("div",{class:"col-sm-6"},[a("label",{for:"includeDaily"},[a("strong",{class:"mb-2"},"Total Uang Harian")])],-1)),a("div",Ne,d(N.value),1)]),a("div",Re,[a("div",Ve,[s(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[23]||(e[23]=t=>m.value.otherExpenses=t),id:"includeOtherExpenses"},null,512),[[V,m.value.otherExpenses]])]),e[63]||(e[63]=a("div",{class:"col-sm-6"},[a("label",{for:"includeOtherExpenses"},[a("strong",{class:"mb-2"},"Jumlah Biaya Lainnya")])],-1)),a("div",Be,d(o.formatRupiah(l.value.biayaLainnyaJumlah)),1)]),a("div",Ue,[e[64]||(e[64]=a("div",{class:"col-sm-6"},[a("strong",{class:"mb-2"},"Total Biaya Seluruhnya")],-1)),a("div",Me,d(F.value),1)])])]),a("button",{type:"button",onClick:aa,class:"btn-save mt-3"},"Save")])])],512)):R("",!0),(g=c.value.relation)!=null&&g.length?(u(),r("div",_e,[a("h5",Ae,[e[68]||(e[68]=a("span",{class:"text-dark"}," Rincian Delegasi ",-1)),a("button",{class:pa([`btn-${k.value?"danger":"primary"} btn`]),onClick:e[24]||(e[24]=t=>k.value=!k.value)},d(k.value?"Batal":"Tambah Data"),3)]),a("div",Le,[a("div",Ee,[a("table",He,[e[69]||(e[69]=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"NO SPPD"),a("th",{scope:"col"},"Nama Pegawai"),a("th",{scope:"col",class:"text-center"},"Action")])],-1)),a("tbody",null,[(u(!0),r(I,null,J(c.value.relation,(t,y)=>{var Y;return u(),r("tr",{key:y},[a("td",{textContent:d((Y=t.noSPPD)==null?void 0:Y.noSPPD)},null,8,Ie),a("td",{textContent:d(t.pegawai.namaPegawai)},null,8,Je),a("td",je,[a("button",{onClick:ze=>oa(y),class:"btn-danger btn me-2 btn-sm"}," Hapus ",8,Ke)])])}),128))])])])])])):R("",!0)])}}};export{Ye as default};
