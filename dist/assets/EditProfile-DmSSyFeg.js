import{r as a,c as i,a as t,u as l,b as r,w as c,d as n,i as d,o as m,h as _}from"./index-DWvC1nTU.js";const f={class:"card"},p=t("h4",{class:"card-header text-dark fw-bold"},"Edit Profile",-1),u={class:"card-body"},b={class:"row g-4 align-items-center"},h={class:"col-md-3 col-4"},v=["src"],g=d('<div class="col-md-9 col-8"><div><label for="formFile" class="form-label">Pilih Foto</label><input class="form-control" type="file" id="formFile"></div></div><div class="col-12"><div><label for="namaLengkap" class="form-label">Nama Lengkap</label><input type="text" class="form-control" id="namaLengkap"></div></div>',2),k={class:"d-flex justify-content-end mt-4"},N={__name:"EditProfile",setup(x){const s=new URL("/perjadin/assets/images/user-1.jpg",import.meta.url).href;return(w,e)=>{const o=a("router-link");return m(),i("div",f,[p,t("div",u,[t("form",null,[t("div",b,[t("div",h,[t("img",{src:l(s),class:"card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"},null,8,v)]),g]),t("div",k,[r(o,{class:"btn btn-outline-primary me-3",to:"/profile"},{default:c(()=>[_("Back")]),_:1}),t("button",{onSubmit:e[0]||(e[0]=n(()=>{},["prevent"])),type:"submit",class:"btn btn-warning"},"Update",32)])])])])}}};export{N as default};