webpackJsonp([0,5,6],{0:function(e,t,n){n("+prg"),e.exports=n("lVK7")},pnOm:function(e,t,n){"use strict";var i=n("U7vG"),s=n("azq/"),o=n("sFNP"),a=n("FA3V"),r=n("fsMb"),l=n("NPdQ"),m=i.createClass({displayName:"App",getInitialState:function(){return{showSettings:!1,showChildren:!1,prebootHTML:this.props.params.prebootHTML}},componentWillMount:function(){l.load(),a.loadSession(),r.loadSession(),"undefined"!=typeof window&&window.addEventListener("beforeunload",this.handleBeforeUnload)},componentDidMount:function(){this.setState({prebootHTML:"",showChildren:!0})},componentWillUnmount:function(){"undefined"!=typeof window&&window.removeEventListener("beforeunload",this.handleBeforeUnload)},handleBeforeUnload:function(){a.saveSession(),r.saveSession()},toggleSettings:function(e){e.preventDefault(),this.setState({showSettings:!this.state.showSettings})},render:function(){return i.createElement("div",{className:"App",onClick:this.state.showSettings&&this.toggleSettings},i.createElement("div",{className:"App__wrap"},i.createElement("div",{className:"App__header"},i.createElement(s,{to:"/news",className:"App__homelinkicon"},i.createElement("img",{src:"img/logo.png",width:"16",height:"16",alt:""}))," ",i.createElement(s,{to:"/news",activeClassName:"active",className:"App__homelink"},"React HN")," ",i.createElement(s,{to:"/newest",activeClassName:"active"},"new")," | ",i.createElement(s,{to:"/newcomments",activeClassName:"active"},"comments")," "," | ",i.createElement(s,{to:"/show",activeClassName:"active"},"show")," | ",i.createElement(s,{to:"/ask",activeClassName:"active"},"ask")," | ",i.createElement(s,{to:"/jobs",activeClassName:"active"},"jobs"),i.createElement("a",{className:"App__settings",tabIndex:"0",onClick:this.toggleSettings,onKeyPress:this.toggleSettings},this.state.showSettings?"hide settings":"settings"),this.state.showSettings&&i.createElement(o,{key:"settings"})),i.createElement("div",{className:"App__content"},i.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.prebootHTML}}),this.state.showChildren?this.props.children:""),i.createElement("div",{className:"App__footer"},i.createElement("a",{href:"https://github.com/insin/react-hn"},"insin/react-hn"))))}});e.exports=m},"4fZb":function(e,t,n){"use strict";var i=n("U7vG"),s=n("/hDg"),o=(n("Hwo6"),n("VIGu")),a=n("uaYK"),r=n("NPdQ"),l=n("bFfS"),m=n("H9Jo"),c=i.createClass({displayName:"Comment",mixins:[l,s],getDefaultProps:function(){return{loadingSpinner:!1}},getInitialState:function(){return{comment:{}}},componentWillMount:function(){this.bindFirebaseRef()},componentWillUnmount:function(){this.clearDelayTimeout()},componentDidUpdate:function(e,t){if(!this.state.comment)return void this.props.threadStore.adjustExpectedComments(-1);if(t.comment&&t.comment.id){if(!t.comment.deleted&&this.state.comment.deleted&&this.props.threadStore.commentDeleted(this.state.comment),!t.comment.dead&&this.state.comment.dead)this.props.threadStore.commentDied(this.state.comment);else if(t.comment!==this.state.comment&&this.props.threadStore.loading){var n=this.state.comment.kids?this.state.comment.kids.length:0,i=t.comment.kids?t.comment.kids.length:0;this.props.threadStore.adjustExpectedComments(n-i)}}else this.state.comment.id&&(t.comment&&t.comment.delayed&&this.clearDelayTimeout(),this.props.threadStore.commentAdded(this.state.comment)),t.comment&&!t.comment.delayed&&this.state.comment.delayed&&this.props.threadStore.commentDelayed(this.props.id)},bindFirebaseRef:function(){r.offlineMode?a.itemRef(this.props.id).then(function(e){return e.json()}).then(function(e){this.replaceState({comment:e})}.bind(this)):this.bindAsObject(o.itemRef(this.props.id),"comment",this.handleFirebaseRefCancelled),this.timeout&&(this.timeout=null)},handleFirebaseRefCancelled:function(e){this.unbind("comment"),this.timeout=setTimeout(this.bindFirebaseRef,3e4),this.state.comment&&!this.state.comment.delayed&&(this.state.comment.delayed=!0,this.forceUpdate())},clearDelayTimeout:function(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)},toggleCollapse:function(e){e.preventDefault(),this.props.threadStore.toggleCollapse(this.state.comment.id)},render:function(){var e=this.state.comment,t=this.props;if(!e)return this.renderError(e,{id:this.props.id,className:"Comment Comment--error Comment--level"+t.level});if(!e.id)return this.renderCommentLoading(e);if(e.dead&&!r.showDead)return null;if(e.deleted)return r.showDeleted?this.renderCommentDeleted(e,{className:"Comment Comment--deleted Comment--level"+t.level}):null;var n=t.threadStore.isNew[e.id],s=!!t.threadStore.isCollapsed[e.id],o=s&&t.threadStore.getChildCounts(e);s&&n&&(o.newComments=0);var a=m("Comment Comment--level"+t.level,{"Comment--collapsed":s,"Comment--dead":e.dead,"Comment--new":n});return i.createElement("div",{className:a},i.createElement("div",{className:"Comment__content"},this.renderCommentMeta(e,{collapsible:!0,collapsed:s,link:!0,childCounts:o}),this.renderCommentText(e,{replyLink:!0})),e.kids&&i.createElement("div",{className:"Comment__kids"},e.kids.map(function(e){return i.createElement(c,{key:e,id:e,level:t.level+1,loadingSpinner:t.loadingSpinner,threadStore:t.threadStore})})))}});e.exports=c},VThE:function(e,t,n){"use strict";var i=n("U7vG"),s=n("NPdQ"),o=n("bFfS"),a=n("H9Jo"),r=i.createClass({displayName:"DisplayComment",mixins:[o],getInitialState:function(){return{op:{},parent:{type:"comment"}}},componentWillMount:function(){this.fetchAncestors(this.props.comment)},render:function(){if(this.props.comment.deleted)return null;if(this.props.comment.dead&&!s.showDead)return null;var e=this.props.comment,t=a("Comment Comment--level0",{"Comment--dead":e.dead});return i.createElement("div",{className:t},i.createElement("div",{className:"Comment__content"},this.renderCommentMeta(e,{link:!0,parent:!!this.state.parent.id&&!!this.state.op.id&&e.parent!==this.state.op.id,op:!!this.state.op.id}),this.renderCommentText(e,{replyLink:!1})))}});e.exports=r},USDx:function(e,t,n){"use strict";var i=n("U7vG"),s=n("PJIF"),o=n("sZWe"),a=n("J1hE"),r=i.createClass({displayName:"DisplayListItem",mixins:[o,a],componentWillMount:function(){this.threadState=s.loadState(this.props.item.id)},render:function(){return this.renderListItem(this.props.item,this.threadState)}});e.exports=r},t0E4:function(e,t,n){"use strict";function i(e,t,n){return 1===e?t:e+" "+t+"s"}var s=n("U7vG"),o=n("/hDg"),a=n("zhf/").default,r=n("VIGu"),l=n("uaYK"),m=n("PJIF"),c=n("bRBh"),d=n("4fZb"),h=n("j+W0"),u=n("OieW"),p=n("sZWe"),f=n("H9Jo"),g=n("SIDF"),C=n("NPdQ"),v=s.createClass({displayName:"Item",mixins:[p,o],getInitialState:function(){return{item:c.getCachedStory(Number(this.props.params.id))||{}}},componentWillMount:function(){C.offlineMode?l.itemRef(this.props.params.id).then(function(e){return e.json()}).then(function(e){this.replaceState({item:e})}.bind(this)):this.bindAsObject(r.itemRef(this.props.params.id),"item"),this.state.item.id&&(this.threadStore=new m(this.state.item,this.handleCommentsChanged,{cached:!0}),g(this.state.item.title)),window.addEventListener("beforeunload",this.handleBeforeUnload)},componentWillUnmount:function(){this.threadStore&&this.threadStore.dispose(),window.removeEventListener("beforeunload",this.handleBeforeUnload)},componentWillReceiveProps:function(e){if(this.props.params.id!==e.params.id){this.threadStore.dispose(),this.threadStore=null,this.unbind("item");var t=c.getCachedStory(Number(e.params.id));t&&(this.threadStore=new m(t,this.handleCommentsChanged,{cached:!0}),g(t.title)),C.offlineMode?l.itemRef(e.params.id).then(function(e){return e.json()}).then(function(e){this.replaceState({item:e})}.bind(this)):(this.bindAsObject(r.itemRef(e.params.id),"item"),this.setState({item:t||{}}))}},componentWillUpdate:function(e,t){!this.state.item.id&&t.item.id&&g(t.item.title)},componentDidUpdate:function(e,t){if(t.item.id!==this.state.item.id)this.threadStore&&this.threadStore.itemId===this.state.item.id||(this.threadStore=new m(this.state.item,this.handleCommentsChanged,{cached:!1}),g(this.state.item.title),this.forceUpdate());else if(t.item!==this.state.item){if(this.threadStore.loading){var n=this.state.item.kids?this.state.item.kids.length:0,i=t.item.kids?t.item.kids.length:0,s=n-i;0!==s&&this.threadStore.adjustExpectedComments(s)}this.threadStore.itemUpdated(this.state.item)}},handleBeforeUnload:function(){this.threadStore&&this.threadStore.dispose()},handleCommentsChanged:function(e){this.forceUpdate()},autoCollapse:function(e){e.preventDefault(),this.threadStore.collapseThreadsWithoutNewComments()},markAsRead:function(e){e.preventDefault(),this.threadStore.markAsRead(),this.forceUpdate()},render:function(){var e=this.state,t=e.item,n=this.threadStore;return t.id&&n?s.createElement("div",{className:f("Item",{"Item--dead":t.dead})},s.createElement("div",{className:"Item__content"},this.renderItemTitle(t),this.renderItemMeta(t,null!==n.lastVisit&&n.newCommentCount>0&&s.createElement("span",null," ","(",s.createElement("em",null,n.newCommentCount," new")," in the last ",s.createElement(a,{date:n.lastVisit,formatter:i}),") | ",s.createElement("span",{className:"control",tabIndex:"0",onClick:this.autoCollapse,onKeyPress:this.autoCollapse,title:"Collapse threads without new comments"},"auto collapse")," | ",s.createElement("span",{className:"control",tabIndex:"0",onClick:this.markAsRead,onKeyPress:this.markAsRead},"mark as read"))),t.text&&s.createElement("div",{className:"Item__text"},s.createElement("div",{dangerouslySetInnerHTML:{__html:t.text}})),"poll"===t.type&&s.createElement("div",{className:"Item__poll"},t.parts.map(function(e){return s.createElement(h,{key:e,id:e})}))),t.kids&&s.createElement("div",{className:"Item__kids"},t.kids.map(function(e,t){return s.createElement(d,{key:e,id:e,level:0,loadingSpinner:0===t,threadStore:n})}))):s.createElement("div",{className:"Item Item--loading"},s.createElement(u,{size:"20"}))}});e.exports=v},SE0F:function(e,t,n){"use strict";var i=n("U7vG"),s=n("azq/"),o=i.createClass({displayName:"Paginator",_onClick:function(e){setTimeout(function(){window.scrollTo(0,0)},0)},render:function(){return 1!==this.props.page||this.props.hasNext?i.createElement("div",{className:"Paginator"},this.props.page>1&&i.createElement("span",{className:"Paginator__prev"},i.createElement(s,{to:{pathname:"/"+this.props.route,query:{page:this.props.page-1}},onClick:this._onClick},"Prev")),this.props.page>1&&this.props.hasNext&&" | ",this.props.hasNext&&i.createElement("span",{className:"Paginator__next"},i.createElement(s,{to:{pathname:"/"+this.props.route,query:{page:this.props.page+1}},onClick:this._onClick},"More"))):null}});e.exports=o},"j+W0":function(e,t,n){"use strict";var i=n("U7vG"),s=n("/hDg"),o=n("VIGu"),a=n("OieW"),r=n("HSmy"),l=i.createClass({displayName:"PollOption",mixins:[s],getInitialState:function(){return{pollopt:{}}},componentWillMount:function(){this.bindAsObject(o.itemRef(this.props.id),"pollopt")},render:function(){var e=this.state.pollopt;return e.id?i.createElement("div",{className:"PollOption"},i.createElement("div",{className:"PollOption__text"},e.text),i.createElement("div",{className:"PollOption__score"},e.score," point",r(e.score))):i.createElement("div",{className:"PollOption PollOption--loading"},i.createElement(a,{size:"20"}))}});e.exports=l},sFNP:function(e,t,n){"use strict";var i=n("U7vG"),s=n("NPdQ"),o=i.createClass({displayName:"Settings",componentDidMount:function(){this.refs.container.focus()},onChange:function(e){var t=e.target;"checkbox"===t.type?s[t.name]=t.checked:"number"===t.type&&t.value&&(s[t.name]=t.value),this.forceUpdate(),s.save()},onClick:function(e){e.stopPropagation()},render:function(){return i.createElement("div",{ref:"container",className:"Settings",tabIndex:"-1",onClick:this.onClick},i.createElement("form",{onChange:this.onChange},i.createElement("div",{className:"Settings__setting Settings__setting--checkbox"},i.createElement("label",{htmlFor:"autoCollapse"},i.createElement("input",{type:"checkbox",name:"autoCollapse",id:"autoCollapse",checked:s.autoCollapse})," auto collapse"),i.createElement("p",null,"Automatically collapse comment threads without new comments on page load.")),i.createElement("div",{className:"Settings__setting Settings__setting--checkbox"},i.createElement("label",{htmlFor:"replyLinks"},i.createElement("input",{type:"checkbox",name:"replyLinks",id:"replyLinks",checked:s.replyLinks})," show reply links"),i.createElement("p",null,'Show "reply" links to Hacker News')),i.createElement("div",{className:"Settings__setting Settings__setting--checkbox"},i.createElement("label",{htmlFor:"offlineMode"},i.createElement("input",{type:"checkbox",name:"offlineMode",id:"offlineMode",checked:s.offlineMode})," Offline Mode"),i.createElement("p",null,"Cache comments and content offline.")),i.createElement("div",{className:"Settings__setting Settings__setting--checkbox"},i.createElement("label",{htmlFor:"showDead"},i.createElement("input",{type:"checkbox",name:"showDead",id:"showDead",checked:s.showDead})," show dead"),i.createElement("p",null,"Show items flagged as dead.")),i.createElement("div",{className:"Settings__setting Settings__setting--checkbox"},i.createElement("label",{htmlFor:"showDeleted"},i.createElement("input",{type:"checkbox",name:"showDeleted",id:"showDeleted",checked:s.showDeleted})," show deleted"),i.createElement("p",null,"Show comments flagged as deleted in threads.")),i.createElement("div",{className:"Settings__setting"},i.createElement("table",null,i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",null,i.createElement("label",{htmlFor:"titleFontSize"},"title font size:")),i.createElement("td",null,i.createElement("input",{type:"number",min:"13.333",step:"1",name:"titleFontSize",id:"titleFontSize",value:s.titleFontSize}))),i.createElement("tr",null,i.createElement("td",null,i.createElement("label",{htmlFor:"listSpacing"},"list spacing:")),i.createElement("td",null,i.createElement("input",{type:"number",min:"0",name:"listSpacing",id:"listSpacing",value:s.listSpacing}))))))))}});e.exports=o},OieW:function(e,t,n){"use strict";var i=n("U7vG"),s=i.createClass({displayName:"Spinner",getDefaultProps:function(){return{size:6,spacing:2}},render:function(){var e=this.props.size+"px",t={height:e,width:e,marginRight:this.props.spacing+"px"};return i.createElement("div",{className:"Spinner",style:{width:3*(Number(this.props.size)+Number(this.props.spacing))+"px"}},i.createElement("div",{className:"bounce1",style:t}),i.createElement("div",{className:"bounce2",style:t}),i.createElement("div",{className:"bounce3",style:t}))}});e.exports=s},dApQ:function(e,t,n){"use strict";var i=n("U7vG"),s=n("FA3V"),o=n("eigB"),a=n("SE0F"),r=n("OieW"),l=n("ITt7"),m=n("NPdQ"),c=n("FN8c"),d=c.ITEMS_PER_PAGE,h=n("gah7"),u=n("SIDF"),p=i.createClass({displayName:"Stories",mixins:[o],getInitialState:function(){return{ids:[],limit:this.props.limit,stories:[]}},componentDidMount:function(){u(this.props.title),this.store=new s(this.props.type),this.store.addListener("update",this.handleUpdate),this.store.start(),this.setState(this.store.getState())},componentWillUnmount:function(){this.store.removeListener("update",this.handleUpdate),this.store.stop(),this.store=null},handleUpdate:function(e){this.isMounted()&&(e.limit=e.ids.length,this.setState(e))},render:function(){var e=h(this.getPageNumber(),d,this.state.limit);if(0===this.state.stories.length&&0===this.state.ids.length&&this.getPageNumber()>0){for(var t=[],n=e.startIndex;n<e.endIndex;n++)t.push(i.createElement("li",{key:n,className:"ListItem ListItem--loading",style:{marginBottom:m.listSpacing}},i.createElement(r,null)));return i.createElement("div",{className:"Items Items--loading"},i.createElement("ol",{className:"Items__list",start:e.startIndex+1},t),i.createElement(a,{route:this.props.route,page:e.pageNum,hasNext:e.hasNext}))}return i.createElement("div",{className:"Items"},i.createElement("ol",{className:"Items__list",start:e.startIndex+1},this.renderItems(e.startIndex,e.endIndex)),i.createElement(a,{route:this.props.route,page:e.pageNum,hasNext:e.hasNext}))},renderItems:function(e,t){for(var n=[],s=e;s<t;s++){var o=this.state.stories[s],a=this.state.ids[s];a?n.push(i.createElement(l,{key:a,id:a,index:s,cachedItem:o,store:this.store})):n.push(i.createElement(l,{cachedItem:o,store:this.store}))}return n}});e.exports=p},ITt7:function(e,t,n){"use strict";var i=n("U7vG"),s=n("/hDg"),o=n("PJIF"),a=n("VIGu"),r=n("uaYK"),l=n("NPdQ"),m=(n("FA3V"),n("sZWe")),c=n("J1hE"),d=n("OieW"),h=i.createClass({displayName:"StoryListItem",mixins:[m,c,s],getDefaultProps:function(){return{id:null,cachedItem:null,index:null}},getInitialState:function(){return{item:this.props.cachedItem||{}}},componentWillMount:function(){null!=this.props.id?this.initLiveItem(this.props):null!=this.props.cachedItem&&(this.threadState=o.loadState(this.state.item.id))},componentWillUnmount:function(){null!=this.props.id&&this.props.store.removeListener(this.props.id,this.updateThreadState)},componentWillReceiveProps:function(e){null==this.props.id&&null!=e.id&&this.initLiveItem(e)},componentWillUpdate:function(e,t){this.state.item!==t.item&&null!=t.item&&this.props.store.itemUpdated(t.item,this.props.index)},initLiveItem:function(e){l.offlineMode?r.itemRef(e.id).then(function(e){return e.json()}).then(function(e){this.replaceState({item:e})}.bind(this)):this.bindAsObject(a.itemRef(e.id),"item"),this.threadState=o.loadState(e.id),this.props.store.addListener(e.id,this.updateThreadState)},updateThreadState:function(){this.threadState=o.loadState(this.props.id),this.forceUpdate()},render:function(){return this.state.item&&this.state.item.id?this.renderListItem(this.state.item,this.threadState):i.createElement("li",{className:"ListItem ListItem--loading",style:{marginBottom:l.listSpacing}},i.createElement(d,null))}});e.exports=h},"S+0w":function(e,t,n){"use strict";function i(e){return!e.dead}function s(e){return a.showDead?e:{comments:e.comments.filter(i),stories:e.stories.filter(i)}}var o=n("U7vG"),a=n("NPdQ"),r=n("fsMb"),l=n("USDx"),m=n("VThE"),c=n("SE0F"),d=n("OieW"),h=n("eigB"),u=n("FN8c"),p=u.ITEMS_PER_PAGE,f=n("gah7"),g=n("SIDF"),C=o.createClass({displayName:"Updates",mixins:[h],getInitialState:function(){return s(r.getUpdates())},componentWillMount:function(){this.setTitle(this.props.type),r.start(),r.on("updates",this.handleUpdates)},componentWillUnmount:function(){r.off("updates",this.handleUpdates),r.stop()},componentWillReceiveProps:function(e){this.props.type!==e.type&&this.setTitle(e.type)},setTitle:function(e){g("New "+("comments"===e?"Comments":"Links"))},handleUpdates:function(e){this.isMounted()&&this.setState(s(e))},render:function(){var e="comments"===this.props.type?this.state.comments:this.state.stories;if(0===e.length)return o.createElement("div",{className:"Updates Updates--loading"},o.createElement(d,{size:"20"}));var t=f(this.getPageNumber(),p,e.length);return"comments"===this.props.type?o.createElement("div",{className:"Updates Comments"},e.slice(t.startIndex,t.endIndex).map(function(e){return o.createElement(m,{key:e.id,id:e.id,comment:e})}),o.createElement(c,{route:"newcomments",page:t.pageNum,hasNext:t.hasNext})):o.createElement("div",{className:"Updates Items"},o.createElement("ol",{className:"Items__list",start:t.startIndex+1},e.slice(t.startIndex,t.endIndex).map(function(e){return o.createElement(l,{key:e.id,item:e})})),o.createElement(c,{route:"newest",page:t.pageNum,hasNext:t.hasNext}))}});e.exports=C},lVK7:function(e,t,n){"use strict";n("mypn");var i=n("U7vG"),s=n("O27J"),o=s.render,a=n("+2z7"),r=n("wKL/"),l=n("257T"),m=n("bWYT"),c=r(),d=n("eqvY");o(i.createElement(a,{history:c,render:m(l()),routes:d}),document.getElementById("app"))},bFfS:function(e,t,n){"use strict";var i=n("U7vG"),s=n("azq/"),o=n("zhf/").default,a=n("bRBh"),r=n("NPdQ"),l=n("OieW"),m=n("HSmy"),c={fetchAncestors:function(e){var t=this;a.fetchCommentAncestors(e,function(e){t.isMounted()&&t.setState({parent:e.parent,op:e.op})})},renderCommentLoading:function(e){return i.createElement("div",{className:"Comment Comment--loading Comment--level"+this.props.level},(this.props.loadingSpinner||e.delayed)&&i.createElement(l,{size:"20"}),e.delayed&&i.createElement("div",{className:"Comment__text"},"Unable to load comment – this usually indicates the author has configured a delay. Trying again in 30 seconds."))},renderCommentDeleted:function(e,t){return i.createElement("div",{className:t.className},i.createElement("div",{className:"Comment__content"},i.createElement("div",{className:"Comment__meta"},"[deleted] | ",i.createElement("a",{href:"https://news.ycombinator.com/item?id="+e.id},"view on Hacker News"))))},renderError:function(e,t){return i.createElement("div",{className:t.className},i.createElement("div",{className:"Comment__content"},i.createElement("div",{className:"Comment__meta"},"[error] | comment is ",JSON.stringify(e)," | ",i.createElement("a",{href:"https://news.ycombinator.com/item?id="+t.id},"view on Hacker News"))))},renderCollapseControl:function(e){return i.createElement("span",{className:"Comment__collapse",onClick:this.toggleCollapse,onKeyPress:this.toggleCollapse,tabIndex:"0"},"[",e?"+":"–","]")},renderCommentMeta:function(e,t){return e.dead&&!r.showDead?i.createElement("div",{className:"Comment__meta"},t.collapsible&&this.renderCollapseControl(t.collapsed),t.collapsible&&" ","[dead]",t.childCounts&&" | ("+t.childCounts.children+" child"+m(t.childCounts.children,",ren"),t.childCounts&&t.childCounts.newComments>0&&", ",t.childCounts&&t.childCounts.newComments>0&&i.createElement("em",null,t.childCounts.newComments," new"),t.childCounts&&")"):i.createElement("div",{className:"Comment__meta"},t.collapsible&&this.renderCollapseControl(t.collapsed),t.collapsible&&" ",i.createElement(s,{to:"/user/"+e.by,className:"Comment__user"},e.by)," ",i.createElement(o,{date:1e3*e.time}),t.link&&" | ",t.link&&i.createElement(s,{to:"/comment/"+e.id},"link"),t.parent&&" | ",t.parent&&i.createElement(s,{to:"/"+this.state.parent.type+"/"+e.parent},"parent"),t.op&&" | on: ",t.op&&i.createElement(s,{to:"/"+this.state.op.type+"/"+this.state.op.id},this.state.op.title),e.dead&&" | [dead]",t.childCounts&&" | ("+t.childCounts.children+" child"+m(t.childCounts.children,",ren"),t.childCounts&&t.childCounts.newComments>0&&", ",t.childCounts&&t.childCounts.newComments>0&&i.createElement("em",null,t.childCounts.newComments," new"),t.childCounts&&")")},renderCommentText:function(e,t){return i.createElement("div",{className:"Comment__text"},!e.dead||r.showDead?i.createElement("div",{dangerouslySetInnerHTML:{__html:e.text}}):"[dead]",r.replyLinks&&t.replyLink&&!e.dead&&i.createElement("p",null,i.createElement("a",{href:"https://news.ycombinator.com/reply?id="+e.id},"reply")))}};e.exports=c},sZWe:function(e,t,n){"use strict";var i=n("U7vG"),s=n("azq/"),o=n("zhf/").default,a=n("NPdQ"),r=n("HSmy"),l=n("dyOy"),m=function(e){var t=l(e,!0).hostname,n=t.split(".").slice(-3);return"www"===n[0]&&n.shift(),n.join(".")},c={renderItemMeta:function(e,t){var n=new Date(1e3*e.time);return"job"===e.type?i.createElement("div",{className:"Item__meta"},i.createElement(o,{date:n,className:"Item__time"})):i.createElement("div",{className:"Item__meta"},i.createElement("span",{className:"Item__score"},e.score," point",r(e.score))," ",i.createElement("span",{className:"Item__by"},"by ",i.createElement(s,{to:"/user/"+e.by},e.by))," ",i.createElement(o,{date:n,className:"Item__time"})," | ",i.createElement(s,{to:"/"+e.type+"/"+e.id},e.descendants>0?e.descendants+" comment"+r(e.descendants):"discuss"),t)},renderItemTitle:function(e){var t,n=!!e.url;return t=e.dead?"[dead] "+e.title:n?i.createElement("a",{href:e.url},e.title):i.createElement(s,{to:"/"+e.type+"/"+e.id},e.title),i.createElement("div",{className:"Item__title",style:{fontSize:a.titleFontSize}},t,n&&" ",n&&i.createElement("span",{className:"Item__host"},"(",m(e.url),")"))}};e.exports=c},J1hE:function(e,t,n){"use strict";var i=n("U7vG"),s=n("azq/"),o=n("NPdQ"),a=n("H9Jo"),r={getNewCommentCount:function(e,t){return null===t.lastVisit?0:e.descendants-t.commentCount},renderListItem:function(e,t){if(e.deleted)return null;var n=this.getNewCommentCount(e,t);return i.createElement("li",{className:a("ListItem",{"ListItem--dead":e.dead}),style:{marginBottom:o.listSpacing}},this.renderItemTitle(e),this.renderItemMeta(e,n>0&&i.createElement("span",{className:"ListItem__newcomments"}," ","(",i.createElement(s,{to:"/"+e.type+"/"+e.id},n," new"),")")))}};e.exports=r},eigB:function(e,t){"use strict";var n={getPageNumber:function(e){return"undefined"==typeof e&&(e=this.props.location.query.page),e&&/^\d+$/.test(e)?Math.max(1,Number(e)):1}};e.exports=n},eqvY:function(e,t,n){"use strict";function i(e,t,n,i){return r.createClass({render:function(){return r.createElement(d,o({},this.props,{key:e,route:e,type:t,limit:n,title:i}))}})}function s(e){return r.createClass({render:function(){return r.createElement(h,o({},this.props,{key:e,type:e}))}})}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},a=n("Raii"),r=n("U7vG"),l=n("a8tM"),m=n("t0E4"),c=n("pnOm"),d=n("dApQ"),h=n("S+0w"),u=i("ask","askstories",200,"Ask"),p=s("comments"),f=i("jobs","jobstories",200,"Jobs"),g=i("newest","newstories",500,"New Links"),C=i("show","showstories",200,"Show"),v=i("news","topstories",500);e.exports=r.createElement(l,{path:"/",component:c},r.createElement(a,{component:v}),r.createElement(l,{path:"news",component:v}),r.createElement(l,{path:"newest",component:g}),r.createElement(l,{path:"show",component:C}),r.createElement(l,{path:"ask",component:u}),r.createElement(l,{path:"jobs",component:f}),r.createElement(l,{path:"item/:id",component:m}),r.createElement(l,{path:"job/:id",component:m}),r.createElement(l,{path:"poll/:id",component:m}),r.createElement(l,{path:"story/:id",component:m}),r.createElement(l,{path:"comment/:id",getComponent:function(e,t){n.e(1,function(e){t(null,n("AcQZ"))})}}),r.createElement(l,{path:"newcomments",component:p}),r.createElement(l,{path:"user/:id",getComponent:function(e,t){n.e(2,function(e){t(null,n("4B7v"))})}}),r.createElement(l,{path:"*",getComponent:function(e,t){n.e(3,function(e){t(null,n("O9aJ"))})}}))},VIGu:function(e,t,n){"use strict";function i(e,t){a(e).once("value",function(e){t(e.val())})}function s(e,t){function n(n){s.push(n),s.length>=e.length&&t(s)}var s=[];e.forEach(function(e){i(e,n)})}function o(e){return h.child(e)}function a(e){return h.child("item/"+e)}function r(e){return h.child("user/"+e)}function l(){return h.child("updates/items")}var m=n("OPUS");n("X2NH");var c={databaseURL:"https://hacker-news.firebaseio.com"};m.initializeApp(c);var d="/v0",h=m.database().ref(d);e.exports={fetchItem:i,fetchItems:s,storiesRef:o,itemRef:a,userRef:r,updatesRef:l}},uaYK:function(e,t,n){"use strict";function i(e){return fetch(c+"/"+e+".json",d)}function s(e){return fetch(c+"/item/"+e+".json",d)}function o(e){return s(e).then(function(e){return e.json()})}function a(e){return fetch(c+"/user/"+e+".json",d)}function r(){return fetch(c+"/updates/items/.json",d)}function l(e,t){s(e).then(function(e){t(e)})}function m(e,t){var n=[],i=[];e.forEach(function(e){i.push(o(e))}),Promise.all(i).then(function(i){n=i,n.length>=e.length&&t(n)})}n("j9g7");var c="https://hacker-news.firebaseio.com/v0",d={method:"GET",headers:{Accept:"application/json"}};e.exports={fetchItem:l,fetchItems:m,storiesRef:i,itemRef:s,userRef:a,updatesRef:r}},Hwo6:function(e,t,n){"use strict";function i(e,t){this.itemId=e.id,this.onCommentsChanged=t,this.children={},this.children[e.id]=[],this.isNew={},this.isCollapsed={}}var s=n("7S1B");s(i.prototype,{getChildCounts:function(e){for(var t=0,n=0,i=[e.id];i.length;){for(var s=[],o=0,a=i.length;o<a;o++){var r=this.children[i[o]];r.length&&s.push.apply(s,r)}for(o=0,a=s.length;o<a;o++)this.isNew[s[o]]&&n++;t+=s.length,i=s}return{children:t,newComments:n}},commentAdded:function(e){e.deleted||(this.children[e.id]=[],this.children[e.parent].push(e.id))},commentDeleted:function(e){if(e){var t=this.children[e.parent];t.splice(t.indexOf(e.id),1)}},toggleCollapse:function(e){this.isCollapsed[e]=!this.isCollapsed[e],this.onCommentsChanged({type:"collapse"})}}),e.exports=i},bRBh:function(e,t,n){(function(t){"use strict";function i(e,t,n){for(var i=e.id,o=e.parent;c[o]||d[o];){if(n.itemCount++,n.cacheHits++,d[o])return 1===n.itemCount&&(n.parent=d[o]),n.op=d[o],void t(n);c[o]&&(1===n.itemCount&&(n.parent={id:o,type:"comment"}),i=o,o=c[o])}h.getItem(o,function(e){n.itemCount++,c[i]=o,"comment"===e.type&&(c[e.id]=e.parent),s(e,t,n)},n)}function s(e,t,n){1===n.itemCount&&(n.parent=e),"comment"!==e.type?(n.op=e,d[e.id]={id:e.id,type:e.type,title:e.title},t(n)):i(e,t,n)}var o=n("VIGu"),a=n("uaYK"),r=n("FA3V"),l=n("fsMb"),m=n("NPdQ"),c={},d={},h={getItem:function(e,n,i){var s=this.getCachedItem(e);s?(i&&i.cacheHits++,t(n,s)):m.offlineMode?a.fetchItem(e,n):o.fetchItem(e,n)},getCachedItem:function(e){return r.getItem(e)||l.getItem(e)||null},getCachedStory:function(e){return r.getItem(e)||l.getStory(e)||null},fetchCommentAncestors:function(e,n){var s=Date.now(),o={itemCount:0,cacheHits:0};i(e,function(){o.timeTaken=Date.now()-s,t(n,o)},o)}};e.exports=h}).call(t,n("GJQG").setImmediate)},NPdQ:function(e,t,n){"use strict";var i=n("7S1B"),s=n("VKKs"),o="settings",a={autoCollapse:!0,replyLinks:!0,showDead:!1,showDeleted:!1,titleFontSize:18,listSpacing:16,offlineMode:!1,load:function(){var e=s.get(o);e&&i(this,JSON.parse(e))},save:function(){s.set(o,JSON.stringify({autoCollapse:this.autoCollapse,replyLinks:this.replyLinks,showDead:this.showDead,showDeleted:this.showDeleted,titleFontSize:this.titleFontSize,listSpacing:this.listSpacing,offlineMode:this.offlineMode}))}};e.exports=a},PJIF:function(e,t,n){"use strict";function i(e){var t=m.get(e);return t?JSON.parse(t):{lastVisit:null,commentCount:0,maxCommentId:0}}function s(e,t,n){o.call(this,e,t),this.startedLoading=Date.now(),this.parents={},this.commentCount=0,this.newCommentCount=0,this.maxCommentId=0,this.loading=!0,this.expectedComments=e.kids?e.kids.length:0,this.itemDescendantCount=e.descendants;var s=i(e.id);this.lastVisit=s.lastVisit,this.prevMaxCommentId=s.maxCommentId,this.isFirstVisit=null===s.lastVisit,n.cached||this.checkLoadCompletion()}var o=n("Hwo6"),a=n("NPdQ"),r=n("Y1Gy"),l=n("7S1B"),m=(n("HSmy"),n("VKKs"));s.loadState=i,s.prototype=l(Object.create(o.prototype),{constructor:s,numberOfCommentsChanged:r(function(){this.onCommentsChanged({type:"number"})},123),firstLoadComplete:function(){this.lastVisit=Date.now(),this.prevMaxCommentId=this.maxCommentId,this.isFirstVisit=!1,this.onCommentsChanged({type:"first_load_complete"})},checkLoadCompletion:function(){this.loading&&this.commentCount>=this.expectedComments&&(this.loading=!1,this.isFirstVisit?this.firstLoadComplete():a.autoCollapse&&this.newCommentCount>0&&this.collapseThreadsWithoutNewComments(),this._storeState())},_storeState:function(){m.set(this.itemId,JSON.stringify({lastVisit:Date.now(),commentCount:this.itemDescendantCount,maxCommentId:this.maxCommentId}))},itemUpdated:function(e){this.itemDescendantCount=e.descendants},commentAdded:function(e){return e.deleted?void(this.loading&&(this.expectedComments--,this.checkLoadCompletion())):(o.prototype.commentAdded.call(this,e),e.dead&&!a.showDead?this.expectedComments--:this.commentCount++,this.loading&&e.kids&&(this.expectedComments+=e.kids.length),this.prevMaxCommentId>0&&e.id>this.prevMaxCommentId&&(!e.dead||a.showDead)&&(this.newCommentCount++,this.isNew[e.id]=!0),e.id>this.maxCommentId&&(this.maxCommentId=e.id),e.parent!==this.itemId&&(this.parents[e.id]=e.parent),this.numberOfCommentsChanged(),void(this.loading&&this.checkLoadCompletion()))},commentDelayed:function(e){this.expectedComments--},commentDeleted:function(e){o.prototype.commentDeleted.call(this,e),this.commentCount--,this.isNew[e.id]&&(this.newCommentCount--,delete this.isNew[e.id]),
delete this.parents[e.id],this.numberOfCommentsChanged()},commentDied:function(e){a.showDead||(this.commentCount--,this.isNew[e.id]&&(this.newCommentCount--,delete this.isNew[e.id]))},adjustExpectedComments:function(e){this.expectedComments+=e,this.checkLoadCompletion()},collapseThreadsWithoutNewComments:function(){for(var e=Object.keys(this.isNew),t={},n=0,i=e.length;n<i;n++)for(var s=this.parents[e[n]];s&&!t[s];)t[s]=!0,s=this.parents[s];for(var o={},a=this.children[this.itemId];a.length;){var r=[];for(n=0,i=a.length;n<i;n++){var l=a[n];if(t[l]){var m=this.children[l];m.length&&r.push.apply(r,m)}else this.isNew[l]||(o[l]=!0)}a=r}this.isCollapsed=o,this.onCommentsChanged({type:"collapse"})},markAsRead:function(){this.lastVisit=Date.now(),this.newCommentCount=0,this.prevMaxCommentId=this.maxCommentId,this.isNew={},this._storeState()},dispose:function(){this.numberOfCommentsChanged.cancel(),this._storeState()}}),e.exports=s},FA3V:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){for(var t=g[e],n=v[e],i=0,s=t.length;i<s;i++)n[i]=C[t[i]]||null}function r(e,t){return e?JSON.parse(e):t}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),m=n("vzCy"),c=m.EventEmitter,d=n("VIGu"),h=n("uaYK"),u=n("NPdQ"),p=n("7S1B"),f=null,g={},C={},v={},E=function(e){function t(e){i(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.type=e,e in g||(g[e]=[]),e in v||(v[e]=[],a(e)),n.onStorage=n.onStorage.bind(n),n.onStoriesUpdated=n.onStoriesUpdated.bind(n),n}return o(t,e),l(t,[{key:"getState",value:function(){return{ids:g[this.type],stories:v[this.type]}}},{key:"itemUpdated",value:function(e,t){v[this.type][t]=e,C[e.id]=e}},{key:"onStorage",value:function(e){C[e.key]&&this.emit(e.key)}},{key:"onStoriesUpdated",value:function(e){u.offlineMode?g[this.type]=e:g[this.type]=e.val(),a(this.type),this.emit("update",this.getState())}},{key:"start",value:function(){"undefined"!=typeof window&&(u.offlineMode?h.storiesRef(this.type).then(function(e){return e.json()}).then(function(e){this.onStoriesUpdated(e)}.bind(this)):(f=d.storiesRef(this.type),f.on("value",this.onStoriesUpdated)),window.addEventListener("storage",this.onStorage))}},{key:"stop",value:function(){null!==f&&(u.offlineMode||f.off(),f=null),"undefined"!=typeof window&&window.removeEventListener("storage",this.onStorage)}}]),t}(c);p(E,{getItem:function(e){return C[e]||null},loadSession:function(){"undefined"!=typeof window&&(u.offlineMode?(g=r(window.localStorage.idCache,{}),C=r(window.localStorage.itemCache,{})):(g=r(window.sessionStorage.idCache,{}),C=r(window.sessionStorage.itemCache,{})))},saveSession:function(){"undefined"!=typeof window&&(u.offlineMode?(window.localStorage.setItem("idCache",JSON.stringify(g)),window.localStorage.setItem("itemCache",JSON.stringify(C))):(window.sessionStorage.idCache=JSON.stringify(g),window.sessionStorage.itemCache=JSON.stringify(C)))}}),e.exports=E},fsMb:function(e,t,n){"use strict";function i(e,t){return t.time-e.time}function s(e){var t=Object.keys(e).map(function(t){return e[t]});return t.sort(i),t}function o(){C.comments=a(g.comments),C.stories=a(g.stories)}function a(e){var t=s(e);return t.splice(u,Math.max(0,t.length-u)).forEach(function(t){delete e[t.id]}),t}function r(e){for(var t=0,n=e.length;t<n;t++){var i=e[t];i.deleted||"undefined"!=typeof v[i.type]&&("comment"===i.type?g.comments[i.id]=i:g.stories[i.id]=i)}o(),E.emit("updates",C)}var l=n("vzCy").EventEmitter,m=n("VIGu"),c=n("uaYK"),d=n("NPdQ"),h=n("FN8c"),u=h.UPDATES_CACHE_SIZE,p=n("7S1B"),f=null,g=null,C={},v={comment:!0,job:!0,poll:!0,story:!0},E=p(new l,{loadSession:function(){if("undefined"!=typeof window){var e=window.sessionStorage.updates;g=e?JSON.parse(e):{comments:{},stories:{}},o()}},saveSession:function(){"undefined"!=typeof window&&(window.sessionStorage.updates=JSON.stringify(g))},start:function(){null===f&&(d.offlineMode?c.updatesRef().then(function(e){return e.json()}).then(function(e){c.fetchItems(e,r)}):(f=m.updatesRef(),f.on("value",function(e){m.fetchItems(e.val(),r)})))},stop:function(){d.offlineMode||(f.off(),f=null)},getUpdates:function(){return C},getItem:function(e){return g.comments[e]||g.stories[e]||null},getComment:function(e){return g.comments[e]||null},getStory:function(e){return g.stories[e]||null}});E.off=E.removeListener,e.exports=E},H9Jo:function(e,t){"use strict";function n(e,t){var n=[];"undefined"==typeof t?t=e:n.push(e);for(var i=Object.keys(t),s=0,o=i.length;s<o;s++)t[i[s]]&&n.push(i[s]);return n.join(" ")}e.exports=n},Y1Gy:function(e,t){"use strict";function n(e,t,n){var i,s,o,a,r,l=function l(){var m=Date.now()-a;m<t&&m>0?i=setTimeout(l,t-m):(i=null,n||(r=e.apply(o,s),i||(o=s=null)))},m=function(){o=this,s=arguments,a=Date.now();var m=n&&!i;return i||(i=setTimeout(l,t)),m&&(r=e.apply(o,s),o=s=null),r};return m.cancel=function(){i&&clearTimeout(i)},m}e.exports=n},FN8c:function(e,t){"use strict";e.exports={ITEMS_PER_PAGE:30,SITE_TITLE:"React HN",UPDATES_CACHE_SIZE:500}},"7S1B":function(e,t){"use strict";function n(e,t,n){for(var i=Object.keys(t),s=0,o=i.length;s<o;s++)e[i[s]]=t[i[s]];if(n)for(i=Object.keys(n),s=0,o=i.length;s<o;s++)e[i[s]]=n[i[s]];return e}e.exports=n},gah7:function(e,t){"use strict";function n(e,t,n){var i=(e-1)*t,s=Math.min(n,i+t),o=s<n-1;return{pageNum:e,startIndex:i,endIndex:s,hasNext:o}}e.exports=n},HSmy:function(e,t){"use strict";function n(e,t){return(t||",s").split(",")[1===e?0:1]}e.exports=n},SIDF:function(e,t,n){"use strict";function i(e){"undefined"!=typeof document&&(document.title=e?e+" | "+o:o)}var s=n("FN8c"),o=s.SITE_TITLE;e.exports=i},VKKs:function(e,t){"use strict";e.exports={get:function(e,t){if("undefined"==typeof window)return t;var n=window.localStorage[e];return"undefined"!=typeof n?n:t},set:function(e,t){"undefined"!=typeof window&&(window.localStorage[e]=t)}}}});
//# sourceMappingURL=app.a2901da2.js.map