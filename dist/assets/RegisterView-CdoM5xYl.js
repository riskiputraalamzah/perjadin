import{k as g,p as _,h as i,c as k,b as m,w as p,a as s,l as d,v as f,E as v,n as b,d as S,r as V,o as P,m as C,S as D}from"./index-Dlj3Nbua.js";import{_ as I}from"./logo-ChF0udTv.js";import{T as U}from"./ToastAlert-BCaHB16n.js";const R={class:"card-body"},E={class:"mb-3"},N={class:"mb-3"},T={class:"mb-4 parent-toggle-password"},B=["type"],M={class:"mb-4 parent-toggle-password"},A=["type"],H=["disabled"],$={class:"d-flex align-items-center justify-content-center"},L={__name:"RegisterView",setup(j){const w=g(),c=_(),o=i(!1),t=i({name:"",username:"",password:"",confirm_password:""}),x=()=>{t.value={name:"",username:"",password:"",confirm_password:""}},y=async()=>{o.value=!o.value;const n=await w.postDataRegistrasi(t.value);if(!n.success)return D.fire(n.alert),o.value=!o.value,x();o.value=!o.value,U.fire(n.alert),c.push("/login")},l=i(!1),r=i(!1);return(n,e)=>{const u=V("router-link");return P(),k("div",R,[m(u,{class:"text-nowrap logo-img text-center d-block py-3 w-100",to:"/register"},{default:p(()=>e[6]||(e[6]=[s("img",{src:I,width:"100",alt:""},null,-1)])),_:1}),e[13]||(e[13]=s("p",{class:"text-center fw-bold text-dark display-6"},"Register",-1)),s("form",{onSubmit:S(y,["prevent"])},[s("div",E,[e[7]||(e[7]=s("label",{for:"exampleInputtext1",class:"form-label"},"Nama",-1)),d(s("input",{type:"text",class:"form-control",id:"exampleInputtext1","onUpdate:modelValue":e[0]||(e[0]=a=>t.value.name=a),"aria-describedby":"textHelp"},null,512),[[f,t.value.name]])]),s("div",N,[e[8]||(e[8]=s("label",{for:"exampleInputEmail1",class:"form-label"},"Username",-1)),d(s("input",{type:"text",class:"form-control",id:"exampleInputEmail1","onUpdate:modelValue":e[1]||(e[1]=a=>t.value.username=a),"aria-describedby":"emailHelp"},null,512),[[f,t.value.username]])]),s("div",T,[e[9]||(e[9]=s("label",{for:"exampleInputPassword1",class:"form-label"},"Password",-1)),d(s("input",{type:l.value?"text":"password",class:"form-control",id:"exampleInputPassword1","onUpdate:modelValue":e[2]||(e[2]=a=>t.value.password=a)},null,8,B),[[v,t.value.password]]),s("i",{class:b(["ti icon",l.value?"ti-eye":"ti-eye-off"]),onClick:e[3]||(e[3]=a=>l.value=!l.value)},null,2)]),s("div",M,[e[10]||(e[10]=s("label",{for:"confirm_password",class:"form-label"},"Konfirmasi Password",-1)),d(s("input",{type:r.value?"text":"password","onUpdate:modelValue":e[4]||(e[4]=a=>t.value.confirm_password=a),class:"form-control",id:"confirm_password"},null,8,A),[[v,t.value.confirm_password]]),s("i",{class:b(["ti icon",r.value?"ti-eye":"ti-eye-off"]),onClick:e[5]||(e[5]=a=>r.value=!r.value)},null,2)]),s("button",{disabled:o.value,type:"submit",class:"btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"}," Sign Up ",8,H),s("div",$,[e[12]||(e[12]=s("p",{class:"fs-4 mb-0 fw-bold"},"Sudah Punya Akun?",-1)),m(u,{class:"text-primary fw-bold ms-2",to:"/login"},{default:p(()=>e[11]||(e[11]=[C("Login")])),_:1})])],32)])}}};export{L as default};
