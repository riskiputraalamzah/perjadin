import{f as b,k as B,h as d,g as _,c as x,a as s,t as m,b as h,w as g,d as P,l as i,v as u,r as y,o as L,m as S,S as n}from"./index-BP707cef.js";const k={class:"row g-4"},A={class:"col-lg-4"},C={class:"card"},D={class:"card-header text-dark fw-bold d-flex justify-content-between align-items-center"},V=["textContent"],M=["src"],U={class:"card-body text-center"},N=["textContent"],j={class:"col-lg-8"},E={class:"card"},T={class:"card-body"},F={class:"mb-3"},I=["value"],K={class:"mb-3"},q={class:"mb-3"},z={class:"mb-3"},J={__name:"MainProfile",setup(G){const p=b(),w=B(),o=d({}),c=d(null),t=d({passwordLama:"",passwordBaru:"",confirmPasswordBaru:""}),e=()=>{t.value={passwordBaru:"",confirmPasswordBaru:"",passwordLama:""}},f=async()=>{if(t.value.passwordLama==""||t.value.passwordBaru==""||t.value.confirmPasswordBaru=="")return e(),n.fire({title:"Lengkapi Form terlebih dahulu",icon:"error"});if(t.value.passwordLama!=o.value.password)return e(),n.fire({title:"Password Lama Anda salah",icon:"error"});if(t.value.passwordBaru!=t.value.confirmPasswordBaru)return e(),n.fire({title:"Password Baru Anda tidak sama",icon:"error"});const l={password:t.value.passwordBaru};return await p.updateData("users","id",o.value.id,l),e(),n.fire({title:"Autentikasi Anda berhasil diubah",icon:"success"})};return _(async()=>{const{row:l,avatar:a}=await w.getUser();o.value=l,c.value=a}),(l,a)=>{const v=y("router-link");return L(),x("div",k,[s("div",A,[s("div",C,[s("h4",D,[a[3]||(a[3]=s("span",null,"My Profile",-1)),s("span",{class:"badge text-bg-success text-uppercase fs-1",textContent:m(o.value.role)},null,8,V)]),s("img",{src:c.value,class:"card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"},null,8,M),s("div",U,[s("h5",{class:"card-title fw-bold mb-5",textContent:m(o.value.name)},null,8,N),h(v,{to:"/profile/edit",class:"btn btn-warning"},{default:g(()=>a[4]||(a[4]=[S("Edit")])),_:1})])])]),s("div",j,[s("div",E,[a[10]||(a[10]=s("h4",{class:"card-header text-dark fw-bold"},"Authentication",-1)),s("div",T,[s("form",{onSubmit:P(f,["prevent"])},[s("div",F,[a[5]||(a[5]=s("label",{for:"username",class:"form-label"},"Username",-1)),s("input",{type:"text",class:"form-control",id:"username",value:o.value.username,disabled:""},null,8,I)]),s("div",K,[a[6]||(a[6]=s("label",{for:"passwordLama",class:"form-label"},"Password Lama",-1)),i(s("input",{type:"password",class:"form-control",id:"passwordLama","onUpdate:modelValue":a[0]||(a[0]=r=>t.value.passwordLama=r)},null,512),[[u,t.value.passwordLama]])]),s("div",q,[a[7]||(a[7]=s("label",{for:"passwordbaru",class:"form-label"},"Password Baru",-1)),i(s("input",{type:"password",class:"form-control",id:"passwordbaru","onUpdate:modelValue":a[1]||(a[1]=r=>t.value.passwordBaru=r)},null,512),[[u,t.value.passwordBaru]])]),s("div",z,[a[8]||(a[8]=s("label",{for:"confirmPasswordBaru",class:"form-label"},"Konfirmasi Password Baru",-1)),i(s("input",{type:"password",class:"form-control",id:"confirmPasswordBaru","onUpdate:modelValue":a[2]||(a[2]=r=>t.value.confirmPasswordBaru=r)},null,512),[[u,t.value.confirmPasswordBaru]])]),a[9]||(a[9]=s("button",{type:"submit",class:"btn btn-primary float-end"},"Simpan",-1))],32)])])])])}}};export{J as default};
