(this["webpackJsonpbudget-project-firebase"]=this["webpackJsonpbudget-project-firebase"]||[]).push([[0],{187:function(e,t,a){e.exports={container:"Router_container__3W9N5"}},191:function(e,t,a){e.exports={container:"StatisticsPage_container__39qDY",graph:"StatisticsPage_graph__3v7SO",cardcontainer:"StatisticsPage_cardcontainer__2iX91"}},342:function(e,t,a){},343:function(e,t,a){},344:function(e,t,a){e.exports={container:"Login_container__29sE5"}},389:function(e,t,a){e.exports=a(629)},394:function(e,t,a){},399:function(e,t,a){},501:function(e,t,a){},561:function(e,t,a){},562:function(e,t,a){},629:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(75),o=a.n(l),i=(a(394),a(127),a(57)),s=a(42),c=a(26),u=a(25),d=a(32),m=a(33),h=a(61),p=(a(399),a(680)),g=a(679),f=a(667),y=a(656),E=a(104),v=a(668),b=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={dropdownMenuStyle:{display:"none"}},e.handleToggleDropdownMenu=function(){var t=Object.assign({},e.state);"none"===t.dropdownMenuStyle.display?t.dropdownMenuStyle={display:"flex"}:t.dropdownMenuStyle={display:"none"},e.setState(t)},e}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{padded:!0,className:"tablet computer only"},r.a.createElement(g.a,{borderless:!0,inverted:!0,fluid:!0,fixed:"top"},r.a.createElement(g.a.Item,{header:!0,as:"a"},"Oznom - Budget Your Spending."),r.a.createElement(g.a.Item,null,Date()),r.a.createElement(g.a.Menu,{position:"right"},r.a.createElement(g.a.Item,null,r.a.createElement(f.a,{placeholder:"Search...",size:"small"})),r.a.createElement(g.a.Item,{as:"a"},"Dashboard"),r.a.createElement(g.a.Item,{as:"a"},"About"),r.a.createElement(g.a.Item,{as:"a",onClick:this.props.signOut},"Logout")))),r.a.createElement(p.a,{padded:!0,className:"mobile only"},r.a.createElement(g.a,{borderless:!0,inverted:!0,fluid:!0,fixed:"top"},r.a.createElement(g.a.Item,{header:!0,as:"a"},"Oznom - Budget Your Spending."),r.a.createElement(g.a.Menu,{position:"right"},r.a.createElement(g.a.Item,null,r.a.createElement(y.a,{basic:!0,inverted:!0,icon:!0,toggle:!0,onClick:this.handleToggleDropdownMenu},r.a.createElement(E.a,{name:"content"})))),r.a.createElement(g.a,{borderless:!0,fluid:!0,inverted:!0,vertical:!0,style:this.state.dropdownMenuStyle},r.a.createElement(g.a.Item,{as:"a"},"Dashboard"),r.a.createElement(g.a.Item,{as:"a"},"About"),r.a.createElement(g.a.Item,{as:"a"},"Help"),r.a.createElement(v.a,{fitted:!0}),r.a.createElement(g.a.Item,null,r.a.createElement(f.a,{placeholder:"Search...",size:"small"}))))))}}]),a}(n.Component),D=(a(501),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={activeItem:"dashboard"},e.handleItemClick=function(t,a){var n=a.name;e.setState({activeItem:n},e.navigate(n))},e.navigate=function(e){h.c.navigate("".concat(e))},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this.state.activeItem;return r.a.createElement(p.a.Column,{tablet:3,computer:3,only:"tablet computer",id:"sidebar"},r.a.createElement(g.a,{vertical:!0,borderless:!0,fluid:!0,text:!0},r.a.createElement(g.a.Item,{name:"dashboard",active:"dashboard"===e,onClick:this.handleItemClick,as:"a"},"Overview"),r.a.createElement(v.a,{hidden:!0}),r.a.createElement(g.a.Item,{name:"daily",active:"daily"===e,onClick:this.handleItemClick,as:"a"},"Daily Spendings"),r.a.createElement(g.a.Item,{name:"monthly",active:"monthly"===e,onClick:this.handleItemClick,as:"a"},"Monthly Spendings"),r.a.createElement(g.a.Item,{name:"yearly",active:"yearly"===e,onClick:this.handleItemClick,as:"a"},"Yearly Spendings"),r.a.createElement(v.a,{hidden:!0})))}}]),a}(n.Component)),C=a(191),S=a.n(C),w=a(321),O=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(w.a,Object.assign({},{margin:{top:20,right:20,bottom:60,left:80},animate:!0,enableSlices:"x"},{theme:{fontSize:"14px",textColor:"black",axis:{legend:{text:{fontSize:16,fontWeight:"bold"}}}},data:this.props.data,xScale:{type:"time",format:"%d/%m/%Y",precision:"day"},xFormat:"time:%d/%m/%Y",yScale:{type:"linear",stacked:!1},axisLeft:{tickSize:0,tickPadding:15,legend:"Amount",legendOffset:-65,legendPosition:"middle",format:function(e){return"\xa3"+Number(e)}},axisBottom:{format:"%b %d",tickValues:"every 6 days",legend:"Date",legendOffset:40,legendPosition:"middle"},curve:"catmullRom",enablePointLabel:!1,pointSymbol:function(e){var t=e.size,a=e.color,n=e.borderWidth,l=e.borderColor;return r.a.createElement("g",null,r.a.createElement("circle",{fill:"#fff",r:t/2,strokeWidth:n,stroke:l}),r.a.createElement("circle",{r:t/5,strokeWidth:n,stroke:l,fill:a,fillOpacity:.35}))},pointSize:9,pointBorderWidth:1,pointBorderColor:{from:"color",modifiers:[["darker",.3]]},colors:this.props.scheme,lineWidth:4,yFormat:function(e){return"\xa3"+Number(e)},useMesh:!0,enableSlices:!1}))}}]),a}(n.Component),k=a(193),j=a.n(k);j.a.initializeApp({apiKey:"AIzaSyDgwgqpQf71Q7Sy2KK4G4aiPiyqyo0cRlU",authDomain:"personal-project-budget.firebaseapp.com",databaseURL:"https://personal-project-budget.firebaseio.com",projectId:"personal-project-budget",storageBucket:"personal-project-budget.appspot.com",messagingSenderId:"192207216810",appId:"1:192207216810:web:3c3dc60961e1fc55bf70d3"});var M=j.a.firestore(),I=j.a,R=a(671),F=a(676),A=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={monthly:null,yearly:null,data:null,activeLoader:!1,dataPresent:!1},e.dateReturner=function(e){var t=e.getMonth()+1,a=e.getDate(),n=e.getFullYear();return"".concat(a,"/").concat(t,"/").concat(n)},e.dateObjectRetreiver=function(){for(var t=new Date,a=new Date(t.getFullYear(),t.getMonth()-1,1),n=[];a.getMonth()===t.getMonth()-1;){var r={};r.x=e.dateReturner(new Date(a)),r.y=Math.round(e.state.monthly/30+e.state.yearly/365),n.push(r),a.setDate(a.getDate()+1)}return console.log(n),n},e.dateObjectRetreiverDaily=function(){for(var t=new Date,a=new Date(t.getFullYear(),t.getMonth()-1,1),n=[];a.getMonth()===t.getMonth()-1;){var r={};r.x=e.dateReturner(new Date(a)),r.y=0,n.push(r),a.setDate(a.getDate()+1)}return n},e.getDaysInMonth=function(e,t){for(var a=new Date(t,e,1),n=[];a.getMonth()===e;)n.push(new Date(a)),a.setDate(a.getDate()+1);return n},e.allDataPresent=function(){return!(!e.state.data||!e.state.data2)},e.totalGetter=function(){var t=0;if(e.state.data)return e.state.data[0].data.forEach((function(e){t+=Number(e.y)})),t},e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.user!==e.user&&(console.log(this.props.user),this.componentDidMount())}},{key:"componentDidMount",value:function(){var e=this,t=new Date,a=new Date(t.getFullYear(),t.getMonth()-1,1),n=new Date(t.getFullYear(),t.getMonth(),0,23,59);this.props.user&&M.collection("monthly").where("uid","==",this.props.user.uid).get().then((function(t){e.setState({activeLoader:!0});var a=t.docs.map((function(e){return e.data()})),n=0;a.forEach((function(e){n+=Number(e.amount)})),e.setState({monthly:n})})).then((function(){M.collection("yearly").where("uid","==",e.props.user.uid).get().then((function(t){var a=t.docs.map((function(e){return e.data()})),n=0;a.forEach((function(e){n+=Number(e.amount)})),e.setState({yearly:n})}))})).then((function(){M.collection("spendings").where("date",">=",a).where("date","<=",n).where("uid","==",e.props.user.uid).get().then((function(t){var a=e.dateObjectRetreiver(),n=e.dateObjectRetreiverDaily(),r=t.docs.map((function(e){return e.data()}));r.sort((function(e,t){return t.date-e.date})).reverse(),r.forEach((function(t){t.date=e.dateReturner(t.date.toDate())}));for(var l=0,o=function(){var t=r[l].date,o=a.find((function(e){return e.x===t})),i=n.find((function(e){return e.x===t})),s={},c=r.filter((function(e){return e.date===t})),u=e.state.monthly/30+e.state.yearly/365;c.forEach((function(e){return u+=Number(e.amount)})),s.x=t,s.y=u,a.splice(a.indexOf(o),1,s),n.splice(n.indexOf(i),1,s),l+=c.length};l<r.length;)o();e.setState({data:[{id:"Daily",color:"hsl(290, 70%, 50%)",data:a}],data2:[{id:"Daily",color:"hsl(290, 70%, 50%)",data:n}],activeLoader:!1})}))})).then((function(){e.setState({dataPresent:!0})}))}},{key:"render",value:function(){return console.log(this.state.data),r.a.createElement("section",{className:S.a.container},r.a.createElement(R.a,{active:this.state.activeLoader}),r.a.createElement("div",{className:S.a.graph},this.allDataPresent()&&r.a.createElement(O,{scheme:{scheme:"category10"},data:this.state.data}),this.allDataPresent()&&r.a.createElement("h4",{style:{opacity:.7,textAlign:"center"}},"Excluding Yearly/Monthly Bills"),this.allDataPresent()&&r.a.createElement(O,{scheme:{scheme:"nivo"},data:this.state.data2})),this.state.dataPresent&&r.a.createElement("div",{className:S.a.cardcontainer},this.state.monthly?r.a.createElement(F.a,{header:"Current Monthly Bills",description:"For the month of March 2020 your current monthly bills are \xa3".concat(this.state.monthly)}):r.a.createElement(F.a,{header:"Current Monthly Bills",description:"You do not currently have any monthly bills."}),this.state.yearly?r.a.createElement(F.a,{header:"Current Yearly Bills",description:"For the month of Year 2020 your current Yearly bills are \xa3".concat(this.state.yearly)}):r.a.createElement(F.a,{header:"Current Yearly Bills",description:"You do not currently have any yearly bills."}),r.a.createElement(F.a,{color:"black",header:"Total Monthly Spends - Feb",description:this.totalGetter()}),r.a.createElement(F.a,{color:"black",header:"Amount Over/Under Budget - Feb",description:3e3-this.totalGetter()})))}}]),a}(n.Component),x=a(681),U=(a(561),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"monthGetter",value:function(){var e=new Date;return new Date(e.getFullYear(),e.getMonth()-1,1).toLocaleString("default",{month:"long"})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{padded:!0},r.a.createElement(p.a.Row,null,r.a.createElement(x.a,{dividing:!0,size:"huge",as:"h1"},"Dashboard",r.a.createElement(x.a,{style:{opacity:.7,margin:"10px 0px",width:"100%"},as:"h2"},"Spending Trends - ",this.monthGetter()))),r.a.createElement(p.a.Row,null,r.a.createElement(A,{user:this.props.user}))))}}]),a}(n.Component)),P=(a(562),a(672)),z=a(678),N=a(675),B=a(674),Y=a(683),L=a(246),H=a.n(L),_=(a(563),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={spends:[],filteredspends:[],loading:!1,error:!1,formData:{name:"",amount:"",date:new Date,type:"daily",uid:null},filterDate:new Date,active:!1},e.handleChange=function(t){console.log(t),e.setState({formData:Object(s.a)({},e.state.formData,{date:t})})},e.handleChangeFilter=function(t){e.setState({filterDate:t},e.dateFilter(t))},e.dateFilter=function(t){var a=e.state.spends.filter((function(a){return e.dateReturner(a.date.toDate())===e.dateReturner(t)}));e.setState({filteredspends:a})},e.dataRestore=function(){e.setState({filteredspends:e.state.spends})},e.handleChangeAmount=function(t){e.setState({formData:Object(s.a)({},e.state.formData,Object(i.a)({},t.target.name,t.target.value))})},e.dataRetriever=function(){e.props.user&&M.collection("spendings").where("uid","==",e.props.user.uid).get().then((function(t){var a=t.docs.map((function(e){return Object.assign(e.data(),{spendID:e.id})}));a.sort((function(e,t){return t.date-e.date})),e.setState({spends:a.reverse(),filteredspends:a.reverse()})})).then((function(){e.setState({loading:!1,active:!0})}))},e.submitButton=function(){!e.state.formData.name||e.state.formData.amount<0?e.setState({error:!0}):(e.setState({loading:!0}),M.collection("spendings").add(e.state.formData).then((function(){e.setState({error:!1}),e.dataRetriever()})))},e.dataRemover=function(t){M.collection("spendings").doc(t).delete().then((function(){e.dataRetriever()}))},e.dateReturner=function(e){var t=e.getMonth()+1,a=e.getDate(),n=e.getFullYear();return"".concat(a,"/").concat(t,"/").concat(n)},e.dataPresent=function(){return 0!==e.state.filteredspends.length},e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.user!==e.user&&null!==this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})},this.dataRetriever())}},{key:"componentDidMount",value:function(){this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})}),this.dataRetriever()}},{key:"render",value:function(){var e=this;return r.a.createElement("section",null,r.a.createElement(p.a,{padded:!0},r.a.createElement(p.a.Row,null,r.a.createElement(x.a,{dividing:!0,size:"huge",as:"h1"},"Daily Spendings"))),r.a.createElement(P.a,{loading:this.state.loading},r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Name *"),r.a.createElement("input",{name:"name",placeholder:"Enter the name of the spend",value:this.state.formData.name,onChange:this.handleChangeAmount})),r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Amount *"),r.a.createElement("input",{name:"amount",type:"number",placeholder:"\xa3",value:this.state.formData.amount,onChange:this.handleChangeAmount})),r.a.createElement(P.a.Field,{label:"Date",control:H.a,selected:this.state.formData.date,dateFormat:"d/M/yyyy",onChange:this.handleChange}),r.a.createElement(y.a,{type:"submit",onClick:this.submitButton},"Submit")),r.a.createElement(z.a,{hidden:!this.state.error,color:"red"},r.a.createElement(z.a.Header,null,"Error"),r.a.createElement("p",null,"Please fill in all the fields properly.")),r.a.createElement(v.a,{section:!0,horizontal:!0},"Daily Spends"),this.state.active&&r.a.createElement(N.a,{color:"green",singleLine:!0,striped:!0,selectable:!0,unstackable:!0},r.a.createElement(N.a.Header,null,r.a.createElement(N.a.Row,null,r.a.createElement(N.a.HeaderCell,null,r.a.createElement(B.a,{text:"Filter Date",icon:"filter",floating:!0,labeled:!0,button:!0,className:"icon"},r.a.createElement(B.a.Menu,null,r.a.createElement(B.a.Header,{content:"Date Filter"}),r.a.createElement(B.a.Item,null,r.a.createElement(P.a,{onClick:function(e){return e.stopPropagation()}},r.a.createElement(P.a.Field,{control:H.a,selected:this.state.filterDate,dateFormat:"d/M/yyyy",onChange:this.handleChangeFilter}))),r.a.createElement(B.a.Divider,null),r.a.createElement(B.a.Item,{onClick:this.dataRestore},"All"),r.a.createElement(B.a.Item,null,"Current Month")))),r.a.createElement(N.a.HeaderCell,null,"Name"),r.a.createElement(N.a.HeaderCell,null,"Amount"),r.a.createElement(N.a.HeaderCell,{textAlign:"center"},"Remove Item"))),r.a.createElement(Y.a.Group,{as:N.a.Body,animation:"fade up",duration:200},this.state.filteredspends.map((function(t,a){return r.a.createElement(N.a.Row,{key:a},r.a.createElement(N.a.Cell,null,e.dateReturner(t.date.toDate())),r.a.createElement(N.a.Cell,null,t.name),r.a.createElement(N.a.Cell,null,"\xa3",t.amount),r.a.createElement(N.a.Cell,{textAlign:"center"},r.a.createElement(E.a,{onClick:function(){return e.dataRemover(t.spendID)},link:!0,name:"remove",size:"large",color:"red"})))})))))}}]),a}(n.Component)),W=a(342),T=a.n(W),G=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={spends:[],loading:!1,error:!1,formData:{name:"",amount:null,type:"monthly",uid:null}},e.handleChangeAmount=function(t){e.setState({formData:Object(s.a)({},e.state.formData,Object(i.a)({},t.target.name,t.target.value))})},e.dataRetriever=function(){e.props.user&&M.collection("monthly").where("uid","==",e.props.user.uid).get().then((function(t){var a=t.docs.map((function(e){return Object.assign(e.data(),{spendID:e.id})}));e.setState({spends:a.reverse()})})).then((function(){e.setState({loading:!1})}))},e.dataRemover=function(t){M.collection("monthly").doc(t).delete().then((function(){e.dataRetriever()}))},e.submitButton=function(){!e.state.formData.name||e.state.formData.amount<0?e.setState({error:!0}):(e.setState({loading:!0}),M.collection("monthly").add(e.state.formData).then((function(){e.setState({error:!1}),e.dataRetriever()})))},e.dataPresent=function(){return 0!==e.state.spends.length},e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.user!==e.user&&null!==this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})},this.dataRetriever())}},{key:"componentDidMount",value:function(){this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})}),this.dataRetriever()}},{key:"render",value:function(){var e=this;return console.log(this.state.formData.uid),r.a.createElement("section",{className:T.a.container},r.a.createElement(p.a,{padded:!0},r.a.createElement(p.a.Row,null,r.a.createElement(x.a,{dividing:!0,size:"huge",as:"h1"},"Recurring Monthly Spendings",r.a.createElement(x.a,{style:{opacity:.7,margin:"10px 0px",width:"100%"},as:"h2"},"This is where you enter your recurring  monthly bills.")))),r.a.createElement(P.a,{loading:this.state.loading},r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Name"),r.a.createElement("input",{name:"name",placeholder:"Enter the name of the monthly cost",value:this.state.formData.name,onChange:this.handleChangeAmount})),r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Amount"),r.a.createElement("input",{name:"amount",type:"number",step:"0.01",placeholder:"\xa3",value:this.state.formData.amount,onChange:this.handleChangeAmount})),r.a.createElement(y.a,{type:"submit",onClick:this.submitButton},"Submit")),r.a.createElement(z.a,{hidden:!this.state.error,color:"red"},r.a.createElement(z.a.Header,null,"Error"),r.a.createElement("p",null,"Please fill in all the fields properly.")),r.a.createElement(v.a,{section:!0,horizontal:!0},"Monthly Spends"),this.dataPresent()&&r.a.createElement(N.a,{color:"green",singleLine:!0,striped:!0,selectable:!0,unstackable:!0},r.a.createElement(N.a.Header,null,r.a.createElement(N.a.Row,null,r.a.createElement(N.a.HeaderCell,null,"Type"),r.a.createElement(N.a.HeaderCell,null,"Name"),r.a.createElement(N.a.HeaderCell,null,"Amount"),r.a.createElement(N.a.HeaderCell,{textAlign:"center"},"Remove Item"))),r.a.createElement(Y.a.Group,{as:N.a.Body,animation:"fade up",duration:2e3},this.state.spends.map((function(t,a){return r.a.createElement(N.a.Row,{key:a},r.a.createElement(N.a.Cell,null,"Monthly"),r.a.createElement(N.a.Cell,null,t.name),r.a.createElement(N.a.Cell,null,"\xa3",t.amount),r.a.createElement(N.a.Cell,{textAlign:"center"},r.a.createElement(E.a,{onClick:function(){return e.dataRemover(t.spendID)},link:!0,name:"remove",size:"large",color:"red"})))})))))}}]),a}(n.Component),q=a(343),K=a.n(q),J=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={spends:[],loading:!1,error:!1,formData:{name:"",amount:null,type:"yearly",uid:null}},e.handleChangeAmount=function(t){e.setState({formData:Object(s.a)({},e.state.formData,Object(i.a)({},t.target.name,t.target.value))})},e.dataRetriever=function(){e.props.user&&M.collection("yearly").where("uid","==",e.props.user.uid).get().then((function(t){var a=t.docs.map((function(e){return Object.assign(e.data(),{spendID:e.id})}));e.setState({spends:a.reverse()})})).then((function(){e.setState({loading:!1})}))},e.dataRemover=function(t){M.collection("yearly").doc(t).delete().then((function(){e.dataRetriever()}))},e.submitButton=function(){!e.state.formData.name||e.state.formData.amount<0?e.setState({error:!0}):(e.setState({loading:!0}),M.collection("yearly").add(e.state.formData).then((function(){e.setState({error:!1}),e.dataRetriever()})))},e.dataPresent=function(){return 0!==e.state.spends.length},e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.user!==e.user&&null!==this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})},this.dataRetriever())}},{key:"componentDidMount",value:function(){this.props.user&&this.setState({formData:Object(s.a)({},this.state.formData,{uid:this.props.user.uid})}),this.dataRetriever()}},{key:"render",value:function(){var e=this;return r.a.createElement("section",{className:K.a.container},r.a.createElement(p.a,{padded:!0},r.a.createElement(p.a.Row,null,r.a.createElement(x.a,{dividing:!0,size:"huge",as:"h1"},"Recurring Yearly Spendings"))),r.a.createElement(P.a,{loading:this.state.loading},r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Name"),r.a.createElement("input",{name:"name",placeholder:"Enter the name of the yearly cost",value:this.state.formData.name,onChange:this.handleChangeAmount})),r.a.createElement(P.a.Field,null,r.a.createElement("label",null,"Amount"),r.a.createElement("input",{name:"amount",type:"number",step:"0.01",placeholder:"\xa3",value:this.state.formData.amount,onChange:this.handleChangeAmount})),r.a.createElement(y.a,{type:"submit",onClick:this.submitButton},"Submit")),r.a.createElement(z.a,{hidden:!this.state.error,color:"red"},r.a.createElement(z.a.Header,null,"Error"),r.a.createElement("p",null,"Please fill in all the fields properly.")),r.a.createElement(v.a,{section:!0,horizontal:!0},"Yearly Spends"),this.dataPresent()&&r.a.createElement(N.a,{color:"green",singleLine:!0,striped:!0,selectable:!0,unstackable:!0},r.a.createElement(N.a.Header,null,r.a.createElement(N.a.Row,null,r.a.createElement(N.a.HeaderCell,null,"Type"),r.a.createElement(N.a.HeaderCell,null,"Name"),r.a.createElement(N.a.HeaderCell,null,"Amount"),r.a.createElement(N.a.HeaderCell,{textAlign:"center"},"Remove Item"))),r.a.createElement(Y.a.Group,{as:N.a.Body,animation:"fade up",duration:2e3},this.state.spends.map((function(t,a){return r.a.createElement(N.a.Row,{key:a},r.a.createElement(N.a.Cell,null,"Yearly"),r.a.createElement(N.a.Cell,null,t.name),r.a.createElement(N.a.Cell,null,"\xa3",t.amount),r.a.createElement(N.a.Cell,{textAlign:"center"},r.a.createElement(E.a,{onClick:function(){return e.dataRemover(t.spendID)},link:!0,name:"remove",size:"large",color:"red"})))})))))}}]),a}(n.Component),Q=a(187),V=a.n(Q),X=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(h.b,{className:V.a.container,primary:!1},r.a.createElement(h.a,{noThrow:!0,from:"/",to:"dashboard"}),r.a.createElement(U,{user:this.props.user,path:"dashboard"}),r.a.createElement(_,{user:this.props.user,path:"daily"}),r.a.createElement(G,{user:this.props.user,path:"monthly"}),r.a.createElement(J,{user:this.props.user,path:"yearly"}))}}]),a}(n.Component),$=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b,{signOut:this.props.signOut}),r.a.createElement(p.a,{padded:!0},r.a.createElement(D,null),r.a.createElement(p.a.Column,{mobile:16,tablet:13,computer:13,floated:"right",id:"content"},r.a.createElement(X,{user:this.props.user}))))}}]),a}(n.Component),Z=a(682),ee=a(344),te=a.n(ee),ae=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={signUpClicked:!1},e.handleChange=function(){e.setState({signUpClicked:!e.state.signUpClicked})},e}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("section",{className:te.a.container},r.a.createElement(p.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(p.a.Column,{style:{maxWidth:450}},r.a.createElement(x.a,{as:"h2",color:"#21295C",textAlign:"center"},r.a.createElement("h1",{style:{color:"#21295C",fontSize:"48px",fontWeight:"bolder"}},"Oznom")," Log-in to your account"),this.state.signUpClicked?r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{error:this.props.error,size:"large"},r.a.createElement(Z.a,{stacked:!0},r.a.createElement(P.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"Name",name:"name",value:this.props.signUpFormData.name,onChange:this.props.handleDetails}),r.a.createElement(P.a.Input,{error:this.props.errorMessage1,fluid:!0,icon:"envelope",iconPosition:"left",placeholder:"E-mail address",name:"email",value:this.props.signUpFormData.email,onChange:this.props.handleDetails}),r.a.createElement(P.a.Input,{error:this.props.errorMessage2,name:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",value:this.props.signUpFormData.password,onChange:this.props.handleDetails}),r.a.createElement(P.a.Input,{fluid:!0,icon:"money bill alternate",type:"number",iconPosition:"left",placeholder:"Monthly Total Budget",name:"budget",value:this.props.signUpFormData.budget,onChange:this.props.handleDetails}),r.a.createElement(z.a,{error:!0,header:"Action Forbidden",content:this.props.content}),r.a.createElement(y.a,{onClick:this.props.signUp,secondary:!0,fluid:!0,size:"large"},"Sign Up"))),r.a.createElement(z.a,{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},"Already have an account?",r.a.createElement(y.a,{onClick:this.handleChange,secondary:!0,size:"tiny"},"Login"))):r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{error:this.props.error2,size:"large"},r.a.createElement(Z.a,{stacked:!0},r.a.createElement(P.a.Input,{error:this.props.errorMessage3,fluid:!0,icon:"user",iconPosition:"left",placeholder:"E-mail address",name:"email",value:this.props.loginFormData.email,onChange:this.props.handleDetailsLogin}),r.a.createElement(P.a.Input,{error:this.props.errorMessage4,name:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",value:this.props.loginFormData.password,onChange:this.props.handleDetailsLogin}),r.a.createElement(z.a,{error:!0,header:"Action Forbidden",content:this.props.content2}),r.a.createElement(y.a,{onClick:this.props.signIn,secondary:!0,fluid:!0,size:"large"},"Login"))),r.a.createElement(z.a,{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},"New to us?",r.a.createElement(y.a,{onClick:this.handleChange,secondary:!0,size:"tiny"},"Sign Up"))))))}}]),a}(n.Component),ne=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={user:null,additionalUserInfo:null,signUpFormData:{email:"",password:"",name:"",budget:null},loginFormData:{email:"",password:""},error:!1,content:"",errorMessage1:null,errorMessage2:null,errorMessage3:null,errorMessage4:null,error2:!1,content2:""},e.errorReset=function(){console.log("resetted"),e.setState({error:!1,content:"",errorMessage1:null,errorMessage2:null,errorMessage3:null,errorMessage4:null,error2:!1,content2:""})},e.handleDetails=function(t){e.setState({signUpFormData:Object(s.a)({},e.state.signUpFormData,Object(i.a)({},t.target.name,t.target.value))})},e.handleDetailsLogin=function(t){e.setState({loginFormData:Object(s.a)({},e.state.loginFormData,Object(i.a)({},t.target.name,t.target.value))})},e.signIn=function(){I.auth().signInWithEmailAndPassword(e.state.loginFormData.email,e.state.loginFormData.password).catch((function(t){e.errorReset();var a=t.code;switch(a){case"auth/invalid-email":e.setState({errorMessage3:{content:"Please enter a valid email adrress",pointing:"below"}});break;case"auth/wrong-password":e.setState({errorMessage4:{content:"The password you have entered in incorrect."}});break;case"auth/user-not-found":console.log("notfound"),e.setState({error2:!0,content2:"There isn't an account associated with that e-mail address."});break;default:e.setState({error2:!0,content:"An error has occured. Code: ".concat(a)})}return!1})).then((function(t){t&&(e.setState({user:t.user,additionalUserInfo:t.additionalUserInfo}),h.c.navigate("/app"))}))},e.signUp=function(){I.auth().createUserWithEmailAndPassword(e.state.signUpFormData.email,e.state.signUpFormData.password).catch((function(t){var a=t.code;switch(e.errorReset(),a){case"auth/invalid-email":e.setState({errorMessage1:{content:"Please enter a valid email adrress",pointing:"below"}});break;case"auth/weak-password":e.setState({errorMessage2:{content:"Please enter a stronger password"}});break;case"auth/email-already-in-use":e.setState({error:!0,content:"You can only sign up for an account once with a given e-mail address."});break;default:e.setState({error:!0,content:"An error has occured. Code: ".concat(a)})}return!1})).then((function(t){t&&e.setState({user:t.user,additionalUserInfo:t.additionalUserInfo},e.additionalSignUp)}))},e.signOut=function(){I.auth().signOut().then((function(){e.setState({user:null}),h.c.navigate("/")}))},e.additionalSignUp=function(){M.collection("users").add({uid:e.state.user.uid,name:e.state.signUpFormData.name,budget:e.state.signUpFormData.budget}).then((function(){h.c.navigate("/app")}))},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.authListener()}},{key:"authListener",value:function(){var e=this;I.auth().onAuthStateChanged((function(t){t?(e.setState({user:t}),localStorage.setItem("user",t.uid)):(e.setState({user:null}),localStorage.removeItem("user"))}))}},{key:"render",value:function(){return r.a.createElement(h.b,{className:V.a.container,primary:!1},r.a.createElement(h.a,{noThrow:!0,from:"/",to:"login"}),r.a.createElement($,{user:this.state.user,signOut:this.signOut,path:"app/*"}),r.a.createElement(ae,{error:this.state.error,error2:this.state.error2,content:this.state.content,content2:this.state.content2,errorMessage1:this.state.errorMessage1,errorMessage2:this.state.errorMessage2,errorMessage3:this.state.errorMessage3,errorMessage4:this.state.errorMessage4,loginFormData:this.state.loginFormData,signUpFormData:this.state.signUpFormData,signIn:this.signIn,signUp:this.signUp,handleDetailsLogin:this.handleDetailsLogin,handleDetails:this.handleDetails,path:"login"}))}}]),a}(n.Component);var re=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(ne,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[389,1,2]]]);
//# sourceMappingURL=main.eb6f86d9.chunk.js.map