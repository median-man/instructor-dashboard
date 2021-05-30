(this["webpackJsonpinstructor-dashboard"]=this["webpackJsonpinstructor-dashboard"]||[]).push([[0],{126:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),s=n(48),c=n.n(s),i=(n(59),n(60),n(12)),o=n(3),u=n(4),l=n.n(u),d=n(2),b=n(7),j=n(11),h=n(13),f=n(20),m=n(38),O=n(5),p=n(17),g=n(49),x=n(50),v=n(53),w=n(54),y=function(e){Object(x.a)(n,e);var t=Object(v.a)(n);function n(e){var r,a=e.code,s=e.message,c=void 0===s?"Request failed with ".concat(a," status code."):s;return Object(f.a)(this,n),(r=t.call(this,c)).code=a,r}return n}(Object(w.a)(Error)),k="https://www.bootcampspot.com/api/instructor/v1",N=function(){var e=Object(b.a)(l.a.mark((function e(t,n){var r,a,s=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>2&&void 0!==s[2]?s[2]:{},e.next=3,fetch(k+t,{method:"post",headers:Object(d.a)({"Content-Type":"application/json"},r),body:JSON.stringify(n)});case 3:if((a=e.sent).ok){e.next=6;break}throw new y({message:a.statusText,code:a.status});case 6:return e.abrupt("return",a.json());case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),I=function(){var e=Object(b.a)(l.a.mark((function e(t){var n,r,a=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:{},e.next=3,fetch(k+t,{method:"GET",headers:Object(d.a)({"Content-Type":"application/json"},n)});case 3:if((r=e.sent).ok){e.next=6;break}throw new y({message:r.statusText||"Network error",status:r.status});case 6:return e.abrupt("return",r.json());case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=Object(p.a)("token"),C=function(){function e(){Object(f.a)(this,e),Object.defineProperty(this,D,{get:S,set:L})}return Object(m.a)(e,[{key:"expiresAt",get:function(){if(!Object(O.a)(this,D)[D])return-1;var e=Object(g.a)(Object(O.a)(this,D)[D]),t=e.minutesTimeout,n=e.creationTime;return 60*t*1e3+Date.parse(n)}},{key:"toString",value:function(){return Object(O.a)(this,D)[D]}},{key:"clear",value:function(){window.sessionStorage.removeItem("authToken")}},{key:"set",value:function(e){Object(O.a)(this,D)[D]=e}}]),e}();function S(){return window.sessionStorage.getItem("authToken")}function L(e){return window.sessionStorage.setItem("authToken",e)}var E=Object(p.a)("cache"),T=Object(p.a)("authToken"),A=Object(p.a)("authHeader"),P=Object(p.a)("withCache");function F(){return{authToken:Object(O.a)(this,T)[T]}}function H(e,t){return R.apply(this,arguments)}function R(){return(R=Object(b.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Object(O.a)(this,E)[E].get(t)){e.next=6;break}return e.next=4,n();case 4:r=e.sent,Object(O.a)(this,E)[E].set(t,r);case 6:return e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})))).apply(this,arguments)}var Y=new(function(){function e(){Object(f.a)(this,e),Object.defineProperty(this,P,{value:H}),Object.defineProperty(this,A,{get:F,set:void 0}),Object.defineProperty(this,E,{writable:!0,value:new Map}),Object.defineProperty(this,T,{writable:!0,value:new C})}return Object(m.a)(e,[{key:"authExpiresAt",get:function(){return Object(O.a)(this,T)[T].expiresAt}},{key:"isLoggedIn",get:function(){return Date.now()<this.authExpiresAt}},{key:"login",value:function(){var e=Object(b.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("/login",{email:t,password:n});case 2:if(!(r=e.sent).errorCode){e.next=5;break}throw new Error(r.errorCode);case 5:Object(O.a)(this,T)[T].set(r.authenticationInfo.authToken);case 6:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"signOut",value:function(){Object(O.a)(this,E)[E].clear(),Object(O.a)(this,T)[T].clear()}},{key:"me",value:function(){var e=this;return Object(O.a)(this,P)[P]("me",(function(){return I("/me",Object(O.a)(e,A)[A])}))}},{key:"sessions",value:function(e){var t=this;return Object(O.a)(this,P)[P]("sessions/".concat(e),(function(){return N("/sessions",{enrollmentId:e},Object(O.a)(t,A)[A])}))}},{key:"sessionDetail",value:function(e){var t=this;return Object(O.a)(this,P)[P]("sessionDetail/".concat(e),(function(){return N("/sessionDetail",{sessionId:e},Object(O.a)(t,A)[A])}))}},{key:"assignments",value:function(e){var t=this;return Object(O.a)(this,P)[P]("assignments/".concat(e),(function(){return N("/assignments",{enrollmentId:e},Object(O.a)(t,A)[A])}))}},{key:"assignmentDetail",value:function(e){var t=this;return Object(O.a)(this,P)[P]("assignmentDetail/".concat(e),(function(){return N("/assignmentDetail",{assignmentId:e},Object(O.a)(t,A)[A])}))}}]),e}()),M=n(39),B=n.n(M);h.c().then((function(e){return e.filter((function(e){return/^bcs/.test(e)})).forEach((function(e){return h.a(e)}))}));var W=function(){return Y.signOut()},q=function(){var e=Object(b.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,e.prev=1,e.next=4,Y.login(n,r);case 4:return e.abrupt("return",{result:!0});case 7:return e.prev=7,e.t0=e.catch(1),W(),e.abrupt("return",{error:e.t0});case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(b.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,Y.isLoggedIn){e.next=3;break}throw new Error("You must be logged in to access cohorts.");case 3:return e.next=5,Y.me();case 5:if(t=e.sent,n=t.Enrollments){e.next=9;break}throw new Error("You don't have any cohorts.");case 9:return r=n.map((function(e){var t=e.id,n=e.course;return{name:n.name,startDate:n.startDate,endDate:n.endDate,courseId:n.id,enrollmentId:t}})),e.abrupt("return",{result:r});case 13:return e.prev=13,e.t0=e.catch(0),401===e.t0.code&&(e.t0.message="You must login.",W()),e.abrupt("return",{error:e.t0});case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(b.a)(l.a.mark((function e(t){var n,r,a,s,c,i,o,u,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.cohortId,e.prev=1,Y.isLoggedIn){e.next=4;break}throw new Error("You must be logged in to access cohorts.");case 4:return r=parseInt(n),e.next=7,Promise.all([Y.sessions(r),Y.assignments(r)]);case 7:return a=e.sent,s=Object(j.a)(a,2),c=s[0],i=s[1],o=new Map,u=c.calendarSessions.filter((function(e){return"academic"===e.context.contextCode})).map((function(e){return e.session.id})),e.next=15,Promise.all(u.map((function(e){return Y.sessionDetail(e)})));case 15:return e.sent.forEach((function(e){e.students.forEach((function(t){var n,r=t.student.id,a=o.get(r);a||((a=B()(t.student,["id","email","firstName","lastName","active"])).attendance=[],a.totalAbsent=0,a.excusedAbsent=0,a.grades=[],o.set(r,a));var s={absent:!!t.absence,startTime:e.session.session.startTime,excused:(null===(n=t.absence)||void 0===n?void 0:n.excused)||!1};s.absent&&s.excused&&(a.excusedAbsent+=1),s.absent&&(a.totalAbsent+=1),a.attendance.push(s)}))})),d=i.calendarAssignments.filter((function(e){return e.required})).map((function(e){return e.id})),e.next=20,Promise.all(d.map((function(e){return Y.assignmentDetail(e)})));case 20:return e.sent.forEach((function(e){var t=B()(e.assignment,["id","dueDate","effectiveDueDate","title"]);t.type=/project/i.test(t.title)?"project":"homework",e.students.forEach((function(e){var n,r=e.student.id,a=null===(n=e.grade)||void 0===n?void 0:n.grade,s={assignment:t,status:a?"graded":e.submission?"ungraded":"not_submitted",mark:a||""};o.get(r).grades.push(s)}))})),e.abrupt("return",{result:o});case 25:return e.prev=25,e.t0=e.catch(1),e.abrupt("return",{error:e.t0});case 28:case"end":return e.stop()}}),e,null,[[1,25]])})));return function(t){return e.apply(this,arguments)}}(),_=n(0),G=Object(r.createContext)({isLoggedIn:!1,pending:!1,signOut:function(){},login:function(e){e.email,e.password},cohorts:function(){}});function V(e){var t=e.children,n=Object(r.useState)((function(){return{error:"",pending:!1,isLoggedIn:Y.isLoggedIn}})),a=Object(j.a)(n,2),s=a[0],c=a[1],i=function(){var e=Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:W(),c((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoggedIn:!1})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(e){return c((function(t){return Object(d.a)(Object(d.a)({},t),{},{pending:!1,isLoggedIn:!1,error:e})}))},u=function(){var e=Object(b.a)(l.a.mark((function e(t){var n,r,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,c((function(e){return Object(d.a)(Object(d.a)({},e),{},{pending:!0})})),e.next=4,q({email:n,password:r});case 4:if(a=e.sent,"INVALID_CREDENTIALS"!==(null===(s=a.error)||void 0===s?void 0:s.message)){e.next=8;break}return e.abrupt("return",o("Invalid username or password"));case 8:if(!s){e.next=10;break}return e.abrupt("return",o("An unexpected error occurred. Please try again."));case 10:c((function(e){return Object(d.a)(Object(d.a)({},e),{},{pending:!1,isLoggedIn:!0,error:""})}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(_.jsx)(G.Provider,{value:Object(d.a)(Object(d.a)({},s),{},{login:u,signOut:i}),children:t})}var z=function(){return Object(r.useContext)(G)},K=function(e){var t=Object(r.useState)({pending:!1,result:null,error:null,isLoaded:!1}),n=Object(j.a)(t,2),a=n[0],s=n[1],c=function(){var t=Object(b.a)(l.a.mark((function t(){var n,r,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a.isLoaded&&!a.pending){t.next=2;break}return t.abrupt("return");case 2:return s((function(e){return Object(d.a)(Object(d.a)({},e),{},{pending:!0})})),t.next=5,e();case 5:n=t.sent,r=n.result,c=n.error,s({result:r,error:c,pending:!1,isLoaded:!0});case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(d.a)(Object(d.a)({},a),{},{load:c})},Q=n(52),X=function(e){return e.filter((function(e){return e}))},Z=function(e){return X(e).join(" ")};var $=function(e){var t=e.children;return Object(_.jsxs)("div",{className:"d-flex h-100 w-100 justify-content-center align-items-center flex-column",children:[Object(_.jsx)("div",{style:{width:"3.5rem",height:"3.5rem"},className:"spinner-border text-secondary mb-4",role:"status"}),Object(_.jsx)("p",{className:"lead",children:t})]})};function ee(e){var t=e.onClose,n=e.children;return Object(_.jsxs)("div",{className:"offcanvas-header",children:[Object(_.jsx)("h5",{className:"offcanvas-title",id:"offCanvasLabel",children:n}),Object(_.jsx)(ne,{onClose:t})]})}function te(e){var t=e.children;return Object(_.jsx)("div",{className:"offcanvas-body small",children:t})}function ne(e){var t=e.onClose;return Object(_.jsx)("button",{type:"button",className:"btn-close text-reset","aria-label":"Close",onClick:t})}var re=function(e){var t=e.show,n=e.style,r=e.title,a=e.onClose,s=e.children,c=Z(["offcanvas","offcanvas-end",t&&"show"]);return Object(_.jsxs)("div",{className:c,tabIndex:-1,id:"offCanvas","aria-labelledby":"offCanvasLabel",style:Object(d.a)({visibility:t?"visible":"hidden"},n),children:[Object(_.jsx)(ee,{onClose:a,children:r}),Object(_.jsx)(te,{children:s})]})};function ae(){return Object(_.jsxs)("ul",{className:"list-group list-group-flush",children:[Object(_.jsx)("li",{className:"list-group-item",children:"Students failing to meet completion requirements are highlighted in pink."}),Object(_.jsx)("li",{className:"list-group-item",children:"Students at risk of failing to meet completion requirements are highlighted in yellow."})]})}function se(e){var t=e.student;return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(ce,{attendance:t.attendance}),Object(_.jsx)(ie,{grades:t.grades})]})}function ce(e){var t=e.attendance.filter((function(e){return e.absent}));return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("h6",{children:"Absences"}),Object(_.jsxs)("ul",{className:"list-group list-group-flush",children:[0===t.length&&Object(_.jsx)("p",{children:"None"}),t.map((function(e){return Object(_.jsxs)("li",{className:"list-group-item",children:[Object(Q.a)(new Date(e.startTime),"M/D/YYYY")," ",e.excused&&"excused"]},e.startTime)}))]})]})}function ie(e){var t=e.grades,n=X(t.filter((function(e){return("graded"!==e.status||"I"===e.mark)&&Date.parse(e.assignment.effectiveDueDate)<Date.now()})).map((function(e){return Object(_.jsx)(oe,{grade:e},e.assignment.title)})));return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("h6",{className:"mt-3",children:"Homework Issues"}),0===n.length?Object(_.jsx)("p",{children:"None"}):Object(_.jsx)("ul",{className:"list-group list-group-flush",children:n})]})}function oe(e){var t=e.grade,n=t.mark,r=t.status,a=t.assignment.title,s="not submitted",c="danger";"I"===n?s="incomplete":"ungraded"===r&&(s="ungraded",c="warning");var i=Z(["badge","bg-".concat(c),"warning"===c&&"text-dark"]);return Object(_.jsxs)("li",{className:"list-group-item d-flex align-items-center",children:[Object(_.jsx)("div",{style:{minWidth:90},children:Object(_.jsx)("span",{className:i,children:s})}),Object(_.jsx)("div",{className:"ps-2",children:a})]})}function ue(e){var t=e.students,n=e.onSelectStudent,r=e.onHelp;return Object(_.jsxs)("table",{className:"table table-sm table-hover mt-5 caption-top mx-auto",style:{maxWidth:650},children:[Object(_.jsxs)("caption",{children:["Click on a student to view additional details."," ",Object(_.jsx)("button",{style:{verticalAlign:"inherit",padding:0,cursor:"help"},className:"btn btn-link",onClick:r,children:"help"})]}),Object(_.jsx)("thead",{children:Object(_.jsxs)("tr",{children:[Object(_.jsx)("th",{scope:"col",children:"Name"}),Object(_.jsx)("th",{scope:"col",children:"Absent"}),Object(_.jsx)("th",{scope:"col",children:"Incomplete"}),Object(_.jsx)("th",{scope:"col",children:"Not Submitted"}),Object(_.jsx)("th",{scope:"col",children:"Missed HW"}),Object(_.jsx)("th",{scope:"col",children:"Ungraded"})]})}),Object(_.jsx)("tbody",{children:t.map((function(e){return Object(_.jsx)(le,{student:e,onSelectStudent:n},e.id)}))})]})}function le(e){var t=e.student,n=e.onSelectStudent,r=t.firstName,a=t.lastName,s=t.totalAbsent,c=function(e){var t=0,n=0,r=0;return e.filter((function(e){return Date.parse(e.assignment.effectiveDueDate)<Date.now()})).forEach((function(e){"graded"===e.status&&"I"!==e.mark||("I"!==e.mark?"not_submitted"!==e.status?r+=1:n+=1:t+=1)})),{totalIncomplete:t,totalNotSubmitted:n,totalUngraded:r,totalMissedHW:t+n}}(t.grades),i=c.totalIncomplete,o=c.totalNotSubmitted,u=c.totalUngraded,l=c.totalMissedHW,d="";return s>5||l>2?d="table-danger":(s>4||l>1)&&(d="table-warning"),Object(_.jsxs)("tr",{className:d,onClick:function(){return n(t)},children:[Object(_.jsxs)("td",{children:[r," ",a]}),Object(_.jsx)("td",{children:s}),Object(_.jsx)("td",{children:i}),Object(_.jsx)("td",{children:o}),Object(_.jsx)("td",{children:l}),Object(_.jsx)("td",{children:u})]})}var de=function(){var e,t=Object(o.i)().enrollmentId,n=Object(r.useState)({show:!1,title:"",children:null}),a=Object(j.a)(n,2),s=a[0],c=a[1],i=(e=t,K((function(){return U({cohortId:e})})));return Object(r.useEffect)((function(){i.load()}),[i]),i.error?Object(_.jsx)("p",{children:i.error}):i.pending||!i.isLoaded?Object(_.jsx)($,{children:"Loading student data..."}):Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(ue,{onSelectStudent:function(e){c({show:!0,title:"".concat(e.firstName," ").concat(e.lastName),children:Object(_.jsx)(se,{student:e})})},students:Array.from(i.result.values()),onHelp:function(){c({show:!0,title:"Dashboard Help",children:Object(_.jsx)(ae,{})})}}),Object(_.jsx)(re,Object(d.a)({onClose:function(){return c((function(e){return Object(d.a)(Object(d.a)({},e),{},{show:!1})}))}},s))]})};var be=function(){var e=K(J);return Object(r.useEffect)((function(){e.load()}),[e]),e.pending||!e.isLoaded?Object(_.jsx)($,{children:"Loading cohorts..."}):e.error?Object(_.jsxs)("p",{children:["Error loading cohorts. ",e.error.message]}):0===e.result.length?Object(_.jsx)("p",{children:"You don't have any cohorts."}):1===e.result.length?Object(_.jsx)(o.a,{to:"/".concat(e.result[0].enrollmentId)}):Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("h1",{children:"Please choose a cohort"}),e.result.map((function(e){var t=e.name,n=e.enrollmentId;return Object(_.jsx)(i.b,{to:"/".concat(n),className:"btn btn-outline-secondary",children:t},n)}))," "]})};var je=function(){return Object(_.jsx)("div",{className:"container-fluid h-100 w-100",children:Object(_.jsxs)(o.d,{children:[Object(_.jsx)(o.b,{path:"/:enrollmentId",children:Object(_.jsx)(de,{})}),Object(_.jsx)(o.b,{path:"/",children:Object(_.jsx)(be,{})})]})})},he=n(16),fe=n(27),me=function(e){return h.d("login:email",e)};function Oe(){return Object(_.jsx)("h1",{className:"h5 mb-3 fw-normal",children:"Please sign in with your BCS Credentials"})}function pe(e){var t=e.label,n=e.controlId,r=Object(he.a)(e,["label","controlId"]);return Object(_.jsxs)("div",{className:"form-floating",children:[Object(_.jsx)("input",Object(d.a)({name:n,id:n,className:"form-control"},r)),Object(_.jsx)("label",{htmlFor:n,children:t})]})}function ge(e){var t=e.controlId,n=Object(he.a)(e,["controlId"]);return Object(_.jsx)("div",{className:"my-3 text-center",children:Object(_.jsxs)("label",{children:[Object(_.jsx)("input",Object(d.a)({name:t,type:"checkbox"},n))," Remember me"]})})}function xe(e){var t=e.children,n=e.show;return Object(_.jsx)("div",{className:"mt-3",style:{maxHeight:n?100:0,transition:"max-height ease 400ms",overflow:"hidden",height:"auto"},children:Object(_.jsx)("div",{className:"alert alert-danger",role:"alert",children:t})})}function ve(e){var t=e.pending,n=Object(he.a)(e,["pending"]);return Object(_.jsx)("button",Object(d.a)(Object(d.a)({type:"submit",className:"w-100 btn btn-lg btn-primary"},n),{},{children:t?Object(_.jsx)(we,{children:"Logging in..."}):"Submit"}))}function we(e){var t=e.children;return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("span",{className:"spinner-border spinner-border-sm me-3",role:"status","aria-hidden":"true"}),t]})}var ye=function(){var e=Object(o.g)(),t=Object(o.h)(),n=z(),a=n.login,s=n.isLoggedIn,c=n.pending,i=n.error,u=Object(r.useState)({email:"",password:"",remember:!1,dirty:!1}),f=Object(j.a)(u,2),m=f[0],O=f[1];Object(r.useEffect)((function(){if(s){var n,r,a={pathname:(null===(n=t.state)||void 0===n||null===(r=n.from)||void 0===r?void 0:r.pathname)||"/"};e.replace(a)}}),[s,e,t]),Object(r.useEffect)((function(){h.b("login:email").then((function(e){return O((function(t){return Object(d.a)(Object(d.a)({},t),{},{remember:!!e,email:e||""})}))}))}),[]);var p=function(e){var t=e.target,n=t.name,r=t.value,a=t.type,s=t.checked;O((function(e){return Object(d.a)(Object(d.a)({},e),{},Object(fe.a)({dirty:!0},n,"checkbox"===a?s:r))}))},g=function(){var e=Object(b.a)(l.a.mark((function e(t){var n,r,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=m.email,r=m.password,s=m.remember,c={email:n.trim(),password:r.trim()},O((function(e){return Object(d.a)(Object(d.a)({},e),{},{dirty:!1})})),!s){e.next=9;break}return e.next=7,me(c.email);case 7:e.next=11;break;case 9:return e.next=11,h.a("login:email");case 11:a(c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(_.jsx)("main",{style:{maxWidth:330},className:"w-100 py-5 mx-auto h-100 d-flex align-items-center",children:Object(_.jsxs)("form",{onSubmit:g,children:[Object(_.jsx)(Oe,{}),Object(_.jsx)(pe,{label:"Email address",type:"email",controlId:"email",style:{marginBottom:-1,borderBottomRightRadius:0,borderBottomLeftRadius:0},value:m.email,onChange:p,disabled:c}),Object(_.jsx)(pe,{label:"Password",type:"password",controlId:"password",style:{borderTopRightRadius:0,borderTopLeftRadius:0},value:m.password,onChange:p,disabled:c}),Object(_.jsx)(ge,{controlId:"remember",checked:m.remember,onChange:p,disabled:c}),Object(_.jsx)(ve,{disabled:!function(){var e=m.email,t=m.password,n=m.dirty;return e.trim()&&t.trim()&&n}()||c,pending:c}),Object(_.jsx)(xe,{show:i&&!m.dirty,children:i})]})})};var ke=function(e){var t=e.children,n=Object(he.a)(e,["children"]),r=z().isLoggedIn;return Object(_.jsx)(o.b,Object(d.a)(Object(d.a)({},n),{},{render:function(e){var n=e.location;return r?t:Object(_.jsx)(o.a,{to:{pathname:"/login",state:{from:n}}})}}))};var Ne=function(){var e=z(),t=e.isLoggedIn,n=e.signOut;return Object(_.jsxs)("header",{className:"navbar navbar-expand navbar-dark bg-dark shadow",children:[Object(_.jsx)(i.b,{className:"navbar-brand px-3",to:"/",children:"Instructor Dashboard"}),Object(_.jsx)("div",{className:"navbar-nav px-3 ms-auto",children:Object(_.jsx)("div",{className:"nav-item",children:t&&Object(_.jsx)("button",{className:"nav-link bg-dark btn",onClick:n,children:"Sign out"})})})]})};var Ie=function(){return Object(_.jsx)(V,{children:Object(_.jsxs)(i.a,{basename:"/instructor-dashboard",children:[Object(_.jsx)(Ne,{}),Object(_.jsxs)(o.d,{children:[Object(_.jsx)(o.b,{path:"/login",children:Object(_.jsx)(ye,{})}),Object(_.jsx)(ke,{path:"/",children:Object(_.jsx)(je,{})})]})]})})},De=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,127)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(_.jsx)(a.a.StrictMode,{children:Object(_.jsx)(Ie,{})}),document.getElementById("root")),De()},60:function(e,t,n){}},[[126,1,2]]]);
//# sourceMappingURL=main.ad0c530f.chunk.js.map