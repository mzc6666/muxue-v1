import{d as T,r as B,a as D,w as R,b as N,c as f,e as s,f as m,g as b,n as _,p as U,h as z,o as y,i as $,v as E,j as r,_ as P,k as S,M as L,l as Z,m as j,u as G,q as C,t as H,s as w}from"./index.1e787b1d.js";import{p as q,g as J,M as I}from"./request.531db72e.js";const M=t=>(U("data-v-5892de90"),t=t(),z(),t),K=["type","placeholder","maxlength","value"],O={key:0,class:"authCode"},Q=M(()=>s("button",null,"\u9A8C\u8BC1\u7801",-1)),W=M(()=>s("div",{class:"bottom-bar"},null,-1)),X={key:1,class:"clear-text"},Y={key:2,class:"switch-type"},ee=T({__name:"input",props:{value:null,placeholder:null,authCode:{type:Boolean,default:!1},type:{default:"text"},maxLen:{default:25},verifyFn:{type:Function,default:()=>!0},clearable:{type:Boolean},switchable:{type:Boolean}},emits:["update:value"],setup(t,{emit:o}){const a=t,i=B(null),l=D({len:0,isFocus:!1,secondType:"",isText:!1,switchType:d=>{l.isText=d,l.secondType=d?"text":"password"}}),v=d=>{o("update:value",d.target.value),l.len=d.target.value.length},x=()=>{o("update:value",""),l.len=0,i.value.focus()},p=B(!0);return R(a,()=>{p.value=a.verifyFn(a.value)}),(d,c)=>{const h=N("svg-icon");return y(),f("div",{class:_(["input-item",[p.value?"":"error"]])},[s("input",{type:l.secondType||t.type,placeholder:t.placeholder,maxlength:t.maxLen,ref_key:"inputRef",ref:i,value:t.value,onInput:v,onFocus:c[0]||(c[0]=F=>l.isFocus=!0),onBlur:c[1]||(c[1]=F=>l.isFocus=!1)},null,40,K),t.authCode?(y(),f("div",O,[m(d.$slots,"authCode",{},()=>[Q],!0)])):b("",!0),W,t.clearable?(y(),f("div",X,[m(d.$slots,"clear-text",{},()=>[$(r(h,{className:"icon-qiangzhiqingchu",class:"svg-icon",onClick:x,"aria-hidden":"true"},null,512),[[E,l.len]])],!0)])):b("",!0),t.switchable?(y(),f("div",Y,[m(d.$slots,"show-icon",{},()=>[$(r(h,{className:"icon-xianshi_huaban",class:"svg-icon",onClick:c[2]||(c[2]=F=>l.switchType(!0))},null,512),[[E,!l.isText&&l.len]])],!0),m(d.$slots,"hide-icon",{},()=>[$(r(h,{className:"icon-yincang",class:"svg-icon",onClick:c[3]||(c[3]=F=>l.switchType(!1))},null,512),[[E,l.isText&&l.len]])],!0)])):b("",!0)],2)}}});const k=P(ee,[["__scopeId","data-v-5892de90"]]),te=(t,o={})=>J({url:"/user/login/getCheckCode",params:{telephone:t}}),ue=(t,o,a={})=>q({url:"/user/login/submitCode",data:{telephone:t,code:o}}),se=(t,o,a={})=>q({url:"/user/login",data:{telephone:t,password:o}}),A=t=>(U("data-v-bad1dc00"),t=t(),z(),t),oe={class:"login-page"},le=A(()=>s("img",null,null,-1)),ne={class:"multi-ways"},ae={class:"tabs"},de={class:"forms"},ie={class:"login-code"},ce=["disabled"],re=w("\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55"),ve=w("\u672A\u6CE8\u518C\u624B\u673A\u767B\u5F55\u65F6\u4F1A\u81EA\u52A8\u521B\u5EFA\u65B0\u8D26\u53F7\uFF0C\u6211\u5DF2\u9605\u8BFB\u5E76 \u540C\u610F\u670D\u52A1\u534F\u8BAE\u548C\u9690\u79C1\u6743\u6761\u6B3E"),pe={class:"login-password"},he=w("\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55"),Fe=A(()=>s("span",{class:"forget"},"\u5FD8\u8BB0\u5BC6\u7801",-1)),Be={class:"qr-code"},ge=A(()=>s("div",{class:"er-wei-ma"},null,-1)),Ce=A(()=>s("p",null,"\u4F7F\u7528APP\u626B\u7801\u767B\u5F55",-1)),fe=w("\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55"),_e=T({__name:"login-index",setup(t){const o=D({telephone:"",authCode:"",handleLogin:()=>{p(o.telephone)&&c(o.authCode)?ue(o.telephone,o.authCode).then(n=>{i.value&&window.localStorage.setItem("token",n.data.data),S.push({name:L})}).catch(n=>{console.log("loginByAuthCode",n)}):I("error","\u4FE1\u606F\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165")}}),a=D({telephone:"",password:"",handleLogin:()=>{p(a.telephone)&&d(a.password)?se(a.telephone,a.password).then(n=>{console.log("res",n),i.value&&window.localStorage.setItem("token",n.data.data),S.push({name:L})}).catch(n=>{console.log("LoginByPassword",n)}):I("error","\u4FE1\u606F\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165")}}),i=B(!1),l=B(!1),v=B(0),x=Z(()=>({left:-100*v.value+"%"})),p=n=>/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(n),d=n=>/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/.test(n),c=n=>/^\d{6}$/.test(n),h=B("\u53D1\u9001\u9A8C\u8BC1\u7801"),F=B(!0),V=()=>{p(o.telephone)?te(o.telephone).then(n=>{if(n.data.code==="200"){F.value=!1;let e=59;const g=setInterval(()=>{if(e===0){h.value="\u53D1\u9001\u9A8C\u8BC1\u7801",F.value=!0,clearInterval(g);return}h.value=e+"s",e--},1e3)}}):I("error","\u624B\u673A\u53F7\u7801\u4E0D\u6B63\u786E,\u8BF7\u91CD\u65B0\u8F93\u5165")};return(n,e)=>{const g=N("n-checkbox");return y(),f("div",oe,[le,s("div",ne,[s("ul",ae,[s("li",{class:_([v.value===0?"active":""]),onClick:e[0]||(e[0]=u=>v.value=0)}," \u77ED\u4FE1\u767B\u5F55 ",2),s("li",{class:_([v.value===1?"active":""]),onClick:e[1]||(e[1]=u=>v.value=1)}," \u8D26\u53F7\u767B\u5F55 ",2),s("li",{class:_([v.value===2?"active":""]),onClick:e[2]||(e[2]=u=>v.value=2)}," \u626B\u7801\u767B\u5F55 ",2)]),s("div",de,[s("div",{class:"contents",style:j(G(x))},[s("section",ie,[r(k,{placeholder:"\u8BF7\u8F93\u5165",type:"text",value:o.telephone,"onUpdate:value":e[3]||(e[3]=u=>o.telephone=u),clearable:!0,verifyFn:p},null,8,["value"]),r(k,{placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",authCode:!0,type:"text",maxLen:6,value:o.authCode,"onUpdate:value":e[4]||(e[4]=u=>o.authCode=u),verifyFn:c},{authCode:C(()=>[s("button",{class:"send-code",disabled:!F.value,onClick:V},H(h.value),9,ce)]),_:1},8,["value"]),s("button",{class:_([l.value?"":"unclickable"]),onClick:e[5]||(e[5]=(...u)=>o.handleLogin&&o.handleLogin(...u))}," \u767B\u5F55 ",2),r(g,{checked:i.value,"onUpdate:checked":e[6]||(e[6]=u=>i.value=u)},{default:C(()=>[re]),_:1},8,["checked"]),r(g,{checked:l.value,"onUpdate:checked":e[7]||(e[7]=u=>l.value=u)},{default:C(()=>[ve]),_:1},8,["checked"])]),s("section",pe,[r(k,{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",type:"text",value:a.telephone,"onUpdate:value":e[8]||(e[8]=u=>a.telephone=u),clearable:!0,verifyFn:p},null,8,["value"]),r(k,{placeholder:"\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801",type:"password",value:a.password,"onUpdate:value":e[9]||(e[9]=u=>a.password=u),verifyFn:d,switchable:!0},null,8,["value"]),s("button",{onClick:e[10]||(e[10]=(...u)=>a.handleLogin&&a.handleLogin(...u))},"\u767B\u5F55"),s("div",null,[r(g,{checked:i.value,"onUpdate:checked":e[11]||(e[11]=u=>i.value=u)},{default:C(()=>[he]),_:1},8,["checked"]),Fe])]),s("section",Be,[ge,Ce,r(g,{checked:i.value,"onUpdate:checked":e[12]||(e[12]=u=>i.value=u)},{default:C(()=>[fe]),_:1},8,["checked"])])],4)])])])}}});const ke=P(_e,[["__scopeId","data-v-bad1dc00"]]);export{ke as default};