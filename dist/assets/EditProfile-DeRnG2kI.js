import{l as w,s as y,f as S,h as o,x,g as U,c as m,a as e,d as L,t as B,y as M,m as N,v as C,b as D,w as V,r as F,o as v,q as P,S as f}from"./index-CDSjVgLj.js";const j={class:"card"},E=e("h4",{class:"card-header text-dark fw-bold"},"Edit Profile",-1),R={class:"card-body"},A={class:"row g-4 align-items-center"},I={class:"col-md-3 col-4"},T=["src"],q={key:0,class:"text-danger fs-3"},z={class:"col-md-9 col-8"},O=e("label",{for:"formFile",class:"form-label"},"Pilih Foto",-1),W={class:"col-12"},G=e("label",{for:"namaLengkap",class:"form-label"},"Nama Lengkap",-1),H={class:"d-flex justify-content-end mt-4"},J=["disabled"],X={__name:"EditProfile",setup(K){const _=w(),p=y(),c=S(),i=o({}),r=o(null),l=o(null),t=o(null),u=o(!0),n=o(null),d=o(null),h=s=>{n.value=null;const a=s.target.files[0];if(a&&a.type.startsWith("image/")){if(a.size>2*1024*1024)return n.value="Ukuran file terlalu besar. Maksimal 2MB.",l.value=r.value,s.target.value=null;n.value=null,l.value=URL.createObjectURL(a),d.value=a}else l.value=r.value};x([l,t],()=>{if(l.value==r.value&&t.value==i.value.name)return u.value=!0;u.value=!1});const b=async()=>{if(t.value=="")return t.value=i.value.name,f.fire({icon:"error",title:"Nama Lengkap tidak boleh kosong"});const s={file:d.value,name:t.value},a=await c.updateData("users","username",i.value.username,s);delete a.file,c.updateUserLocalStorage(a),f.fire({icon:"success",title:"Profile Anda berhasil di ubah"}),p.push("/profile")};return U(async()=>{const{row:s,avatar:a}=await _.getUser();i.value=s,r.value=a,l.value=a,t.value=s.name}),(s,a)=>{const g=F("router-link");return v(),m("div",j,[E,e("div",R,[e("form",{onSubmit:L(b,["prevent"])},[e("div",A,[e("div",I,[e("img",{src:l.value,class:"card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"},null,8,T),n.value?(v(),m("p",q,B(n.value),1)):M("",!0)]),e("div",z,[e("div",null,[O,e("input",{onChange:h,accept:"image/*",class:"form-control",type:"file",id:"formFile"},null,32)])]),e("div",W,[e("div",null,[G,N(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=k=>t.value=k),class:"form-control",id:"namaLengkap"},null,512),[[C,t.value]])])])]),e("div",H,[D(g,{class:"btn btn-outline-primary me-3",to:"/profile"},{default:V(()=>[P("Back")]),_:1}),e("button",{type:"submit",class:"btn btn-warning",disabled:u.value},"Update",8,J)])],32)])])}}};export{X as default};
