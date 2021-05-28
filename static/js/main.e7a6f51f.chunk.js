(this["webpackJsonpinstructor-dashboard"]=this["webpackJsonpinstructor-dashboard"]||[]).push([[0],{121:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),s=n(44),c=n.n(s),o=(n(55),n(12)),i=n(3),u=n(4),l=n.n(u),d=n(6),b=n(2),j=n(11),h=n(10),f=n(45),m=n(46),p=n(49),O=n(50),x=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var r,a=e.message,s=e.code;return Object(f.a)(this,n),(r=t.call(this,a)).code=s,r}return n}(Object(O.a)(Error)),g=function(){var e=Object(d.a)(l.a.mark((function e(t,n){var r,a,s=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>2&&void 0!==s[2]?s[2]:{},e.next=3,fetch("https://www.bootcampspot.com/api/instructor/v1".concat(t),{method:"post",headers:Object(b.a)({"Content-Type":"application/json"},r),body:JSON.stringify(n)});case 3:if((a=e.sent).ok){e.next=6;break}throw new x({message:a.statusText,code:a.status});case 6:return e.abrupt("return",a.json());case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),v=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,a=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:{},e.next=3,fetch("https://www.bootcampspot.com/api/instructor/v1/me",{method:"GET",headers:Object(b.a)({"Content-Type":"application/json"},n)});case 3:if((r=e.sent).ok){e.next=7;break}throw console.log(r),new x({message:r.statusText||"Network error",status:r.status});case 7:return e.abrupt("return",r.json());case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g("/login",t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(e){var t=e.authToken;return v("/me",{authToken:t})},I=function(e){var t=e.authToken,n=e.enrollmentId;return g("/sessions",{enrollmentId:n},{authToken:t})},y=function(e){var t=e.authToken,n=e.sessionId;return g("/sessionDetail",{sessionId:n},{authToken:t})},N=function(e){var t=e.authToken,n=e.enrollmentId;return g("/assignments",{enrollmentId:n},{authToken:t})},C=function(e){var t=e.authToken,n=e.assignmentId;return g("/assignmentDetail",{assignmentId:n},{authToken:t})},T=n(35),S=n.n(T),D=function(e){return"".concat("bcs",":").concat(e)},L=function(e,t){return h.d(D(e),t)},E=function(e){return h.b(D(e))},A=function(e){return h.a(D(e))},P=function(){return Object(d.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.c();case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return",0);case 5:return n=new RegExp("^".concat("bcs",":")),r=t.filter((function(e){return n.test(e)})).map((function(e){return h.a(e)})),e.next=9,Promise.all(r);case 9:return e.abrupt("return",r.length);case 10:case"end":return e.stop()}}),e)})))()},F=function(){return E("token")},R=function(){return P()},Y=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,a,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,e.prev=1,e.next=4,w({email:n,password:r});case 4:if(a=e.sent,s=a.errorCode,c=a.authenticationInfo,!s){e.next=9;break}throw new Error(s);case 9:return e.next=11,L("token",c.authToken);case 11:return e.abrupt("return",{result:!0});case 14:return e.prev=14,e.t0=e.catch(1),e.next=18,A("token");case 18:return e.abrupt("return",{error:e.t0});case 19:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(d.a)(l.a.mark((function e(){var t,n,r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F();case 3:if(t=e.sent){e.next=6;break}throw new Error("You must be logged in to access cohorts.");case 6:return e.next=8,E("cohorts");case 8:if(!(n=e.sent)){e.next=11;break}return e.abrupt("return",{result:n});case 11:return e.next=13,k({authToken:t});case 13:if(r=e.sent,a=r.Enrollments){e.next=17;break}throw new Error("You don't have any cohorts.");case 17:return n=a.map((function(e){var t=e.id,n=e.course;return{name:n.name,startDate:n.startDate,endDate:n.endDate,courseId:n.id,enrollmentId:t}})),L("cohorts",n),e.abrupt("return",{result:n});case 22:if(e.prev=22,e.t0=e.catch(0),401!==e.t0.status){e.next=28;break}return e.t0.message="You must login.",e.next=28,R();case 28:return e.abrupt("return",{error:e.t0});case 29:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,a,s,c,o,i,u,d,b,h;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.cohortId,e.prev=1,e.next=4,F();case 4:if(r=e.sent){e.next=7;break}throw new Error("You must be logged in to access cohorts.");case 7:return e.next=9,E("students:".concat(n));case 9:if(!(a=e.sent)){e.next=12;break}return e.abrupt("return",{result:a});case 12:return s=parseInt(n),e.next=15,Promise.all([I({authToken:r,enrollmentId:s}),N({authToken:r,enrollmentId:s})]);case 15:return c=e.sent,o=Object(j.a)(c,2),i=o[0],u=o[1],d=new Map,b=i.calendarSessions.filter((function(e){return"academic"===e.context.contextCode})).map((function(e){return e.session.id})),e.next=23,Promise.all(b.map((function(e){return y({authToken:r,sessionId:e})})));case 23:return e.sent.forEach((function(e){e.students.forEach((function(t){var n,r=t.student.id,a=d.get(r);a||((a=S()(t.student,["id","email","firstName","lastName","active"])).attendance=[],a.totalAbsent=0,a.excusedAbsent=0,a.grades=[],d.set(r,a));var s={absent:!!t.absence,startTime:e.session.session.startTime,excused:(null===(n=t.absence)||void 0===n?void 0:n.excused)||!1};s.absent&&s.excused&&(a.excusedAbsent+=1),s.absent&&(a.totalAbsent+=1),a.attendance.push(s)}))})),h=u.calendarAssignments.filter((function(e){return e.required})).map((function(e){return e.id})),e.next=28,Promise.all(h.map((function(e){return C({authToken:r,assignmentId:e})})));case 28:return e.sent.forEach((function(e){var t=S()(e.assignment,["id","dueDate","effectiveDueDate","title"]);t.type=/project/i.test(t.title)?"project":"homework",e.students.forEach((function(e){var n,r=e.student.id,a=null===(n=e.grade)||void 0===n?void 0:n.grade,s={assignment:t,status:a?"graded":e.submission?"ungraded":"not_submitted",mark:a||""};d.get(r).grades.push(s)}))})),e.next=32,L("students:".concat(n),d);case 32:return e.abrupt("return",{result:d});case 35:return e.prev=35,e.t0=e.catch(1),e.abrupt("return",{error:e.t0});case 38:case"end":return e.stop()}}),e,null,[[1,35]])})));return function(t){return e.apply(this,arguments)}}(),M=n(0),W=Object(r.createContext)({isLoggedIn:!1,pending:!1,signOut:function(){},login:function(e){e.email,e.password},cohorts:function(){}});function U(e){var t=e.children,n=Object(r.useState)({error:"",pending:!0,isLoggedIn:!1}),a=Object(j.a)(n,2),s=a[0],c=a[1];Object(r.useEffect)((function(){F().then((function(e){return c((function(t){return Object(b.a)(Object(b.a)({},t),{},{isLoggedIn:!!e,pending:!1})}))}))}),[]);var o=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R();case 3:c((function(e){return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:!1})})),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),c((function(e){return Object(b.a)(Object(b.a)({},e),{},{error:"Unable to log out. Please try again."})}));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),i=function(e){return c((function(t){return Object(b.a)(Object(b.a)({},t),{},{pending:!1,isLoggedIn:!1,error:e})}))},u=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,c((function(e){return Object(b.a)(Object(b.a)({},e),{},{pending:!0})})),e.next=4,Y({email:n,password:r});case 4:if(a=e.sent,"INVALID_CREDENTIALS"!==(null===(s=a.error)||void 0===s?void 0:s.message)){e.next=8;break}return e.abrupt("return",i("Invalid username or password"));case 8:if(!s){e.next=10;break}return e.abrupt("return",i("An unexpected error occurred. Please try again."));case 10:c((function(e){return Object(b.a)(Object(b.a)({},e),{},{pending:!1,isLoggedIn:!0,error:""})}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(M.jsx)(W.Provider,{value:Object(b.a)(Object(b.a)({},s),{},{login:u,signOut:o}),children:t})}var q=function(){return Object(r.useContext)(W)},J=function(e){var t=Object(r.useState)({pending:!1,result:null,error:null,isLoaded:!1}),n=Object(j.a)(t,2),a=n[0],s=n[1],c=function(){var t=Object(d.a)(l.a.mark((function t(){var n,r,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a.isLoaded&&!a.pending){t.next=2;break}return t.abrupt("return");case 2:return s((function(e){return Object(b.a)(Object(b.a)({},e),{},{pending:!0})})),t.next=5,e();case 5:n=t.sent,r=n.result,c=n.error,s({result:r,error:c,pending:!1,isLoaded:!0});case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(b.a)(Object(b.a)({},a),{},{load:c})},_=n(48),G=function(e){return e.filter((function(e){return e}))},V=function(e){return G(e).join(" ")};function z(e){var t=e.onClose,n=e.children;return Object(M.jsxs)("div",{className:"offcanvas-header",children:[Object(M.jsx)("h5",{className:"offcanvas-title",id:"offCanvasLabel",children:n}),Object(M.jsx)(Q,{onClose:t})]})}function K(e){var t=e.children;return Object(M.jsx)("div",{className:"offcanvas-body small",children:t})}function Q(e){var t=e.onClose;return Object(M.jsx)("button",{type:"button",className:"btn-close text-reset","aria-label":"Close",onClick:t})}var X=function(e){var t=e.show,n=e.style,r=e.title,a=e.onClose,s=e.children,c=V(["offcanvas","offcanvas-end",t&&"show"]);return Object(M.jsxs)("div",{className:c,tabIndex:-1,id:"offCanvas","aria-labelledby":"offCanvasLabel",style:Object(b.a)({visibility:t?"visible":"hidden"},n),children:[Object(M.jsx)(z,{onClose:a,children:r}),Object(M.jsx)(K,{children:s})]})};function Z(){return Object(M.jsxs)("ul",{className:"list-group list-group-flush",children:[Object(M.jsx)("li",{className:"list-group-item",children:"Students failing to meet completion requirements are highlighted in pink."}),Object(M.jsx)("li",{className:"list-group-item",children:"Students at risk of failing to meet completion requirements are highlighted in yellow."})]})}function $(e){var t=e.student;return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(ee,{attendance:t.attendance}),Object(M.jsx)(te,{grades:t.grades})]})}function ee(e){var t=e.attendance.filter((function(e){return e.absent}));return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("h6",{children:"Absences"}),Object(M.jsxs)("ul",{className:"list-group list-group-flush",children:[0===t.length&&Object(M.jsx)("p",{children:"None"}),t.map((function(e){return Object(M.jsxs)("li",{className:"list-group-item",children:[Object(_.a)(new Date(e.startTime),"M/D/YYYY")," ",e.excused&&"excused"]},e.startTime)}))]})]})}function te(e){var t=e.grades,n=G(t.filter((function(e){return("graded"!==e.status||"I"===e.mark)&&Date.parse(e.assignment.effectiveDueDate)<Date.now()})).map((function(e){return Object(M.jsx)(ne,{grade:e},e.assignment.title)})));return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("h6",{className:"mt-3",children:"Homework Issues"}),0===n.length?Object(M.jsx)("p",{children:"None"}):Object(M.jsx)("ul",{className:"list-group list-group-flush",children:n})]})}function ne(e){var t=e.grade,n=t.mark,r=t.assignment.title,a="not submitted",s="danger";"I"===n?a="incomplete":(a="ungraded",s="warning");var c=V(["badge","bg-".concat(s),"warning"===s&&"text-dark"]);return Object(M.jsxs)("li",{className:"list-group-item d-flex align-items-center",children:[Object(M.jsx)("div",{style:{minWidth:90},children:Object(M.jsx)("span",{className:c,children:a})}),Object(M.jsx)("div",{className:"ps-2",children:r})]})}function re(e){var t=e.students,n=e.onSelectStudent,r=e.onHelp;return Object(M.jsxs)("table",{className:"table table-sm table-hover mt-5 caption-top",style:{maxWidth:650},children:[Object(M.jsxs)("caption",{children:["Click on a student to view additional details."," ",Object(M.jsx)("button",{style:{verticalAlign:"inherit",padding:0,cursor:"help"},className:"btn btn-link",onClick:r,children:"help"})]}),Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{scope:"col",children:"Name"}),Object(M.jsx)("th",{scope:"col",children:"Absent"}),Object(M.jsx)("th",{scope:"col",children:"Incomplete"}),Object(M.jsx)("th",{scope:"col",children:"Not Submitted"}),Object(M.jsx)("th",{scope:"col",children:"Missed HW"}),Object(M.jsx)("th",{scope:"col",children:"Ungraded"})]})}),Object(M.jsx)("tbody",{children:t.map((function(e){return Object(M.jsx)(ae,{student:e,onSelectStudent:n},e.id)}))})]})}function ae(e){var t=e.student,n=e.onSelectStudent,r=t.firstName,a=t.lastName,s=t.totalAbsent,c=function(e){var t=0,n=0,r=0;return e.filter((function(e){return Date.parse(e.assignment.effectiveDueDate)<Date.now()})).forEach((function(e){"graded"===e.status&&"I"!==e.mark||("I"!==e.mark?"not_submitted"!==e.status?r+=1:n+=1:t+=1)})),{totalIncomplete:t,totalNotSubmitted:n,totalUngraded:r,totalMissedHW:t+n}}(t.grades),o=c.totalIncomplete,i=c.totalNotSubmitted,u=c.totalUngraded,l=c.totalMissedHW,d="";return s>5||l>2?d="table-danger":(s>4||l>1)&&(d="table-warning"),Object(M.jsxs)("tr",{className:d,onClick:function(){return n(t)},children:[Object(M.jsxs)("td",{children:[r," ",a]}),Object(M.jsx)("td",{children:s}),Object(M.jsx)("td",{children:o}),Object(M.jsx)("td",{children:i}),Object(M.jsx)("td",{children:l}),Object(M.jsx)("td",{children:u})]})}var se=function(){var e,t=Object(i.i)().enrollmentId,n=Object(r.useState)({show:!1,title:"",children:null}),a=Object(j.a)(n,2),s=a[0],c=a[1],o=(e=t,J((function(){return B({cohortId:e})})));return Object(r.useEffect)((function(){o.load()}),[o]),o.error?Object(M.jsx)("p",{children:o.error}):o.pending||!o.isLoaded?Object(M.jsx)("p",{children:"Loading students..."}):Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(re,{onSelectStudent:function(e){c({show:!0,title:"".concat(e.firstName," ").concat(e.lastName),children:Object(M.jsx)($,{student:e})})},students:Array.from(o.result.values()),onHelp:function(){c({show:!0,title:"Dashboard Help",children:Object(M.jsx)(Z,{})})}}),Object(M.jsx)(X,Object(b.a)({onClose:function(){return c((function(e){return Object(b.a)(Object(b.a)({},e),{},{show:!1})}))}},s))]})};var ce=function(){var e=J(H);return Object(r.useEffect)((function(){e.load()}),[e]),e.pending||!e.isLoaded?Object(M.jsx)("p",{children:"Loading cohorts..."}):e.error?Object(M.jsxs)("p",{children:["Error loading cohorts. ",e.error.message]}):0===e.result.length?Object(M.jsx)("p",{children:"You don't have any cohorts."}):1===e.result.length?Object(M.jsx)(i.a,{to:"/".concat(e.result[0].enrollmentId)}):Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("h1",{children:"Please choose a cohort"}),e.result.map((function(e){var t=e.name,n=e.enrollmentId;return Object(M.jsx)(o.b,{to:"/".concat(n),className:"btn btn-outline-secondary",children:t},n)}))," "]})};var oe=function(){return Object(M.jsx)("div",{className:"container",children:Object(M.jsxs)(i.d,{children:[Object(M.jsx)(i.b,{path:"/:enrollmentId",children:Object(M.jsx)(se,{})}),Object(M.jsx)(i.b,{path:"/",children:Object(M.jsx)(ce,{})})]})})},ie=n(15),ue=n(24),le=function(e){return h.d("login:email",e)};function de(){return Object(M.jsx)("h1",{className:"h5 mb-3 fw-normal",children:"Please sign in with your BCS Credentials"})}function be(e){var t=e.label,n=e.controlId,r=Object(ie.a)(e,["label","controlId"]);return Object(M.jsxs)("div",{className:"form-floating",children:[Object(M.jsx)("input",Object(b.a)({name:n,id:n,className:"form-control"},r)),Object(M.jsx)("label",{htmlFor:n,children:t})]})}function je(e){var t=e.controlId,n=Object(ie.a)(e,["controlId"]);return Object(M.jsx)("div",{className:"my-3 text-center",children:Object(M.jsxs)("label",{children:[Object(M.jsx)("input",Object(b.a)({name:t,type:"checkbox"},n))," Remember me"]})})}function he(e){var t=e.children,n=e.show;return Object(M.jsx)("div",{className:"mt-3",style:{maxHeight:n?100:0,transition:"max-height ease 400ms",overflow:"hidden",height:"auto"},children:Object(M.jsx)("div",{className:"alert alert-danger",role:"alert",children:t})})}function fe(e){var t=e.pending,n=Object(ie.a)(e,["pending"]);return Object(M.jsx)("button",Object(b.a)(Object(b.a)({type:"submit",className:"w-100 btn btn-lg btn-primary"},n),{},{children:t?Object(M.jsx)(me,{children:"Loading..."}):"Submit"}))}function me(e){var t=e.children;return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),Object(M.jsx)("span",{className:"visually-hidden",children:t})]})}var pe=function(){var e=Object(i.g)(),t=Object(i.h)(),n=q(),a=n.login,s=n.isLoggedIn,c=n.pending,o=n.error,u=Object(r.useState)({email:"",password:"",remember:!1,dirty:!1}),f=Object(j.a)(u,2),m=f[0],p=f[1];Object(r.useEffect)((function(){if(s){var n,r,a={pathname:(null===(n=t.state)||void 0===n||null===(r=n.from)||void 0===r?void 0:r.pathname)||"/"};e.replace(a)}}),[s,e,t]),Object(r.useEffect)((function(){h.b("login:email").then((function(e){return p((function(t){return Object(b.a)(Object(b.a)({},t),{},{remember:!!e,email:e||""})}))}))}),[]);var O=function(e){var t=e.target,n=t.name,r=t.value,a=t.type,s=t.checked;p((function(e){return Object(b.a)(Object(b.a)({},e),{},Object(ue.a)({dirty:!0},n,"checkbox"===a?s:r))}))},x=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=m.email,r=m.password,s=m.remember,c={email:n.trim(),password:r.trim()},p((function(e){return Object(b.a)(Object(b.a)({},e),{},{dirty:!1})})),!s){e.next=9;break}return e.next=7,le(c.email);case 7:e.next=11;break;case 9:return e.next=11,h.a("login:email");case 11:a(c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(M.jsx)("main",{style:{maxWidth:330},className:"w-100 py-5 mx-auto",children:Object(M.jsxs)("form",{onSubmit:x,children:[Object(M.jsx)(de,{}),Object(M.jsx)(be,{label:"Email address",type:"email",controlId:"email",style:{marginBottom:-1,borderBottomRightRadius:0,borderBottomLeftRadius:0},value:m.email,onChange:O,disabled:c}),Object(M.jsx)(be,{label:"Password",type:"password",controlId:"password",style:{borderTopRightRadius:0,borderTopLeftRadius:0},value:m.password,onChange:O,disabled:c}),Object(M.jsx)(je,{controlId:"remember",checked:m.remember,onChange:O,disabled:c}),Object(M.jsx)(fe,{disabled:!function(){var e=m.email,t=m.password,n=m.dirty;return e.trim()&&t.trim()&&n}()||c,pending:c}),Object(M.jsx)(he,{show:o&&!m.dirty,children:o})]})})};var Oe=function(e){var t=e.children,n=Object(ie.a)(e,["children"]),r=q().isLoggedIn;return Object(M.jsx)(i.b,Object(b.a)(Object(b.a)({},n),{},{render:function(e){var n=e.location;return r?t:Object(M.jsx)(i.a,{to:{pathname:"/login",state:{from:n}}})}}))};var xe=function(){var e=q(),t=e.isLoggedIn,n=e.signOut;return Object(M.jsxs)("header",{className:"navbar navbar-dark bg-dark shadow",children:[Object(M.jsx)(o.b,{className:"navbar-brand px-3 col-sm-3",to:"/",children:"Instructor Dashboard"}),Object(M.jsx)("div",{className:"navbar-nav px-3",children:Object(M.jsx)("div",{className:"nav-item",children:t&&Object(M.jsx)("button",{className:"nav-link bg-dark btn",onClick:n,children:"Sign out"})})})]})};var ge=function(){return Object(M.jsx)(U,{children:Object(M.jsxs)(o.a,{basename:"/instructor-dashboard",children:[Object(M.jsx)(xe,{}),Object(M.jsxs)(i.d,{children:[Object(M.jsx)(i.b,{path:"/login",children:Object(M.jsx)(pe,{})}),Object(M.jsx)(Oe,{path:"/",children:Object(M.jsx)(oe,{})})]})]})})},ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,122)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(M.jsx)(a.a.StrictMode,{children:Object(M.jsx)(ge,{})}),document.getElementById("root")),ve()}},[[121,1,2]]]);
//# sourceMappingURL=main.e7a6f51f.chunk.js.map