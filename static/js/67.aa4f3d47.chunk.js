"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[67],{67:(e,s,a)=>{a.r(s),a.d(s,{default:()=>N});var t=a(661);const i="Dialogs_dialogs__rxG43",n="Dialogs_dialogsItems__dAHdH",d="Dialogs_item__TWkCd",r="Dialogs_active__ROeba",o="Dialogs_messages__CtKjq";var l=a(43),c=a(475),x=a(257),g=a(579);function m(e){let s="/Dialogs/".concat(e.id);return(0,g.jsx)("div",{className:"".concat(d),children:(0,g.jsxs)(c.k2,{to:s,className:e=>e.isActive?r:d,children:[(0,g.jsx)("img",{alt:"Avatar",src:x}),e.name]})})}const u="Messages_myMessage__fWnB8",j="Messages_otherMessage__JNwu+";function _(e){return(0,g.jsxs)("div",{className:u,children:[e.textMessage,(0,g.jsx)("img",{alt:"avatar",src:x})]})}function h(e){return(0,g.jsxs)("div",{className:j,children:[(0,g.jsx)("img",{alt:"avatar",src:x}),e.textMessage]})}var v=a(768);const p=l.memo((e=>{let s=0,a=e.dialogsData.map((e=>(0,g.jsx)(m,{name:e.name,id:e.id},e.id))),t=e.messagesData.map((e=>(s++,0===e.id?(0,g.jsx)(_,{textMessage:e.message},s):(0,g.jsx)(h,{textMessage:e.message},s))));return(0,g.jsxs)("div",{className:i,children:[(0,g.jsx)("div",{className:n,children:a}),(0,g.jsxs)("div",{className:o,children:[t,(0,g.jsx)(v.T,{})]})]})}));var w=a(3),y=a(216);let B=e=>({isAuth:e.auth.isAuth});var T=a(923),D=a(892),M=a(336);const N=(0,T.Zz)((0,w.Ng)((e=>({dialogsData:e.dialogsPage.dialogsData,messagesData:e.dialogsPage.messagesData})),(e=>({sendNewMessage:s=>{e((0,t.g)(s))}}))),(e=>(0,w.Ng)(B,{})((function(s){return s.isAuth?(0,g.jsx)(e,{...s}):(0,g.jsx)(y.C5,{to:"/Login"})}))))((function(e){return(0,g.jsx)(D.l1,{initialValues:{newTextBody:""},validationSchema:M.RB,onSubmit:s=>{e.sendNewMessage(s.newTextBody),s.newTextBody=""},children:(0,g.jsx)(p,{...e})})}))},336:(e,s,a)=>{a.d(s,{Ko:()=>i,RB:()=>d,__:()=>n});var t=a(899);const i=t.Ik().shape({email:t.Yj().email("Invalid email").required("Required email"),password:t.Yj().required("Required password")}),n=t.Ik().shape({newTextBody:t.Yj().max(100,"Too Long!").required("Required")}),d=t.Ik().shape({newTextBody:t.Yj().required("Required")})},768:(e,s,a)=>{a.d(s,{T:()=>d});const t={sendMessageBox:"PostSmtFormCss_sendMessageBox__CaGjP"};a(43);var i=a(892),n=a(579);function d(){const e=(0,i.j7)();let s=e.touched.newTextBody&&e.errors.newTextBody;return(0,n.jsx)("div",{className:t.sendMessageBox,children:(0,n.jsxs)(i.lV,{children:[(0,n.jsx)(i.D0,{type:"textarea",id:"newTextBody",name:"newTextBody",placeholder:"Enter your message",component:"textarea"}),s?(0,n.jsx)("div",{children:e.errors.newTextBody}):null,(0,n.jsx)("button",{type:"submit",children:"Send"})]})})}}}]);
//# sourceMappingURL=67.aa4f3d47.chunk.js.map