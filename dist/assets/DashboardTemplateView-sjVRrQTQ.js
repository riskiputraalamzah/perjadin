import{u as v,r as b,o as d,c,a as s,b as e,w as i,n as u,d as h,S as f,e as _,R as g}from"./index-IM4zRged.js";import{_ as k}from"./gmbr_3-DpSinBZV.js";const w={class:"left-sidebar"},x={class:"brand-logo d-flex align-items-center justify-content-between"},M={class:"sidebar-nav scroll-sidebar","data-simplebar":""},S={id:"sidebarnav"},y={class:"sidebar-item"},j={class:"sidebar-item"},P={class:"sidebar-item"},C={class:"sidebar-item"},D={class:"sidebar-item"},B={class:"sidebar-item"},$={class:"sidebar-item"},E={class:"sidebar-item"},T={class:"sidebar-item"},q={class:"sidebar-item"},R={class:"sidebar-item"},A={__name:"SidebarItem",setup(p){const o=v(),l=n=>o.path.startsWith(n);return(n,a)=>{const t=b("router-link");return d(),c("aside",w,[s("div",null,[s("div",x,[e(t,{class:"text-nowrap logo-img d-flex align-items-center g-3",to:"/"},{default:i(()=>a[0]||(a[0]=[s("img",{src:k,width:"80",alt:""},null,-1),s("span",{class:"h3 text-dark"},"Perjadin",-1)])),_:1}),a[1]||(a[1]=s("div",{class:"close-btn d-xl-none d-block sidebartoggler cursor-pointer",id:"sidebarCollapse"},[s("i",{class:"ti ti-x fs-8"})],-1))]),s("nav",M,[s("ul",S,[a[14]||(a[14]=s("li",{class:"nav-small-cap"},[s("i",{class:"ti ti-dots nav-small-cap-icon fs-4"}),s("span",{class:"hide-menu"},"Home")],-1)),s("li",y,[e(t,{to:"/",class:"sidebar-link","exact-active-class":"active","active-class":"active"},{default:i(()=>a[2]||(a[2]=[s("span",null,[s("i",{class:"ti ti-layout-dashboard"})],-1),s("span",{class:"hide-menu"},"Dashboard",-1)])),_:1}),e(t,{to:"/profile",class:u(["sidebar-link",l("/profile")?"active":""])},{default:i(()=>a[3]||(a[3]=[s("span",null,[s("i",{class:"ti ti-user"})],-1),s("span",{class:"hide-menu"},"My Profile",-1)])),_:1},8,["class"])]),a[15]||(a[15]=s("li",{class:"nav-small-cap"},[s("i",{class:"ti ti-dots nav-small-cap-icon fs-4"}),s("span",{class:"hide-menu"},"Manajemen")],-1)),s("li",j,[e(t,{to:"/pegawai",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[4]||(a[4]=[s("span",null,[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"icon icon-tabler icons-tabler-outline icon-tabler-users-group"},[s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s("path",{d:"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"}),s("path",{d:"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M17 10h2a2 2 0 0 1 2 2v1"}),s("path",{d:"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M3 13v-1a2 2 0 0 1 2 -2h2"})])],-1),s("span",{class:"hide-menu"},"Pegawai",-1)])),_:1})]),s("li",P,[e(t,{to:"/surat-tugas",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[5]||(a[5]=[s("span",null,[s("i",{class:"ti ti-file-description"})],-1),s("span",{class:"hide-menu"},"Surat Tugas",-1)])),_:1})]),s("li",C,[e(t,{to:"/spm",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[6]||(a[6]=[s("span",null,[s("i",{class:"ti ti-file-description"})],-1),s("span",{class:"hide-menu"},"SPM",-1)])),_:1})]),s("li",D,[e(t,{to:"/sp2d",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[7]||(a[7]=[s("span",null,[s("i",{class:"ti ti-file-description"})],-1),s("span",{class:"hide-menu"},"SP2D",-1)])),_:1})]),s("li",B,[e(t,{to:{name:"sppd"},class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[8]||(a[8]=[s("span",null,[s("i",{class:"ti ti-file-description"})],-1),s("span",{class:"hide-menu"},"SPPD ",-1)])),_:1})]),s("li",$,[e(t,{to:{name:"delegasi"},class:u(["sidebar-link",l("/delegasi-pegawai")?"active":""])},{default:i(()=>a[9]||(a[9]=[s("span",null,[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"icon icon-tabler icons-tabler-outline icon-tabler-calendar-user"},[s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s("path",{d:"M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4.5"}),s("path",{d:"M16 3v4"}),s("path",{d:"M8 3v4"}),s("path",{d:"M4 11h16"}),s("path",{d:"M19 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}),s("path",{d:"M22 22a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2"})])],-1),s("span",{class:"hide-menu"},"Delegasi Pegawai",-1)])),_:1},8,["class"])]),a[16]||(a[16]=s("li",{class:"nav-small-cap"},[s("i",{class:"ti ti-dots nav-small-cap-icon fs-4"}),s("span",{class:"hide-menu"},"PAPER")],-1)),s("li",E,[e(t,{to:"/laporan",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[10]||(a[10]=[s("span",null,[s("i",{class:"ti ti-file"})],-1),s("span",{class:"hide-menu"},"Laporan ST/SPPD",-1)])),_:1})]),s("li",T,[e(t,{to:{name:"cekSp"},class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[11]||(a[11]=[s("span",null,[s("i",{class:"ti ti-file-dollar"})],-1),s("span",{class:"hide-menu"},"Data SPM/SP2D",-1)])),_:1})]),s("li",q,[e(t,{to:"/kwitansi",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[12]||(a[12]=[s("span",null,[s("i",{class:"ti ti-file-invoice"})],-1),s("span",{class:"hide-menu"},"Kwitansi",-1)])),_:1})]),s("li",R,[e(t,{to:"/rekap-data",class:"sidebar-link","exact-active-class":"active"},{default:i(()=>a[13]||(a[13]=[s("span",null,[s("i",{class:"ti ti-notebook"})],-1),s("span",{class:"hide-menu"},"Rekap Data",-1)])),_:1})])])])])])}}},H={class:"app-header"},I={class:"navbar navbar-expand-lg navbar-light"},V={__name:"HeaderItem",setup(p){const o=()=>{f.fire({title:"Anda ingin Logout ",icon:"question",showCancelButton:!0,confirmButtonText:"Ya",cancelButtonText:"Tidak",cancelButtonColor:"red",backdrop:!0,allowOutsideClick:!1,allowEscapeKey:!1}).then(l=>{l.isConfirmed&&(localStorage.removeItem("login"),localStorage.removeItem("user"),window.location.reload())})};return(l,n)=>(d(),c("header",H,[s("nav",I,[n[0]||(n[0]=s("ul",{class:"navbar-nav"},[s("li",{class:"nav-item d-block d-xl-none"},[s("a",{class:"nav-link sidebartoggler nav-icon-hover",id:"headerCollapse",href:"javascript:void(0)"},[s("i",{class:"ti ti-menu-2"})])])],-1)),s("a",{onClick:h(o,["prevent"]),class:"btn btn-danger ms-auto"}," Logout ")])]))}},z={class:"page-wrapper",id:"main-wrapper","data-layout":"vertical","data-navbarbg":"skin6","data-sidebartype":"full","data-sidebar-position":"fixed","data-header-position":"fixed"},L={class:"body-wrapper"},K={class:"container-fluid"},O={__name:"DashboardTemplateView",setup(p){const o=["/assets/libs/jquery/dist/jquery.min.js","/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js","/assets/js/app.min.js","/assets/libs/apexcharts/dist/apexcharts.min.js","/assets/libs/simplebar/dist/simplebar.js"],l=a=>new Promise((t,m)=>{const r=document.createElement("script");r.src=a,r.async=!0,r.onload=()=>t(a),r.onerror=()=>m(new Error(`Failed to load script: ${a}`)),document.body.appendChild(r)});return(async()=>{try{for(const a of o)await l(a);console.log("All Dashboard scripts loaded successfully")}catch(a){console.error("Error loading scripts:",a)}})(),(a,t)=>(d(),c("div",z,[e(A),s("div",L,[e(V),s("div",K,[e(_(g))])])]))}};export{O as default};