(window.webpackJsonp=window.webpackJsonp||[]).push([[6,4],{402:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{items:[{title:"Initial setup",page:"initialSetup",computerType:"both"},{title:"Server Roles",page:"serverRoles",computerType:"server"},{title:"Other services",page:"otherServices",computerType:"both"},{title:"Users",page:"users",computerType:"both"},{title:"Build",page:"build",computerType:"both"}]}},computed:{computerType:function(){return this.isServer?"server":"client"}},methods:{goTo:function(e){this.$router.push(e)}},props:{isServer:{type:Boolean}}},l=n(91),o=n(123),c=n.n(o),d=n(379),m=n(384),v=n(180),D=n(119),h=n(82),S=n(372),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mx-auto",attrs:{width:"256",height:"500"}},[n("v-navigation-drawer",{attrs:{permanent:""}},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-h6"},[e._v("\n          Setup phases\n        ")])],1)],1),e._v(" "),n("v-divider"),e._v(" "),n("v-list",{attrs:{dense:"",nav:""}},e._l(e.items,(function(t){return"both"==t.computerType||t.computerType==e.computerType?n("v-list-item",{key:t.title,attrs:{button:""},on:{click:function(n){return e.$emit("switchSettings",t.page)}}},[n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(e.items.filter((function(t){return"both"==t.computerType||t.computerType==e.computerType})).indexOf(t)+1)+". "+e._s(t.title))])],1)],1):e._e()})),1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VCard:d.a,VDivider:m.a,VList:v.a,VListItem:D.a,VListItemContent:h.a,VListItemTitle:h.b,VNavigationDrawer:S.a})},407:function(e,t,n){"use strict";n.r(t);var r=n(91),component=Object(r.a)({},(function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v("Welcome to the script editor.")])])}],!1,null,null,null);t.default=component.exports},465:function(e,t,n){"use strict";n.r(t);n(52),n(61),n(60),n(11),n(5);var r=n(402),l=n(407);n(32),n(12),n(34);function o(e,t){return"$SecPassword = ConvertTo-SecureString '".concat(t,"' -AsPlainText -Force\n$Cred = New-Object System.Management.Automation.PSCredential('").concat(e,"', $SecPassword)\n")}function c(e){return new Promise((function(t,n){var r,l,c,d,m="#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n",v="#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n",D="#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n";e.changeAdminPassword&&(m+=(r=e.adminPwd,"net user administrator ".concat(r," /active:yes\n"))),m+=o(e.adminUser,e.adminPwd),e.changeHostname&&(m+=(l=e.hostname,'Rename-Computer -NewName "'.concat(l,'" -DomainCredential $Cred\n'))),v+="Restart-Computer -Force -Restart\n",e.isServer&&(v+=o(e.adminUser,e.adminPwd),e.ADDS.install&&(v+=(c=e.ADDS.domainName,d=e.ADDS.netbiosName,'Install-ADDSForest -DomainName "'.concat(c,'" -CreateDnsDelegation:$false -DatabasePath ')+'"C:\\Windows\\NTDS" -SafeModeAdministratorPassword $SecPassword -DomainMode "7" '+'-DomainNetbiosName "'.concat(d,'" -ForestMode "7" -InstallDns:$true -LogPath ')+'"C:\\Windows\\NTDS" -SysvolPath "C:\\Windows\\SYSVOL" -Force:$true\n'),v+="Restart-Computer -Force -Restart\n")),D+=o(e.adminUser,e.adminPwd),e.enableWinRM&&(D+='Set-Service WinRM -StartMode Automatic\nGet-WmiObject -Class win32_service | Where-Object {$_.name -like "WinRM"}\nSet-Item WSMan:localhost\\client\\trustedhosts -Value * -Force\nnetsh advfirewall firewall add rule name="WinRM-HTTP" dir=in localport=5985 protocol=TCP action=allow\n'),e.enableRDP&&(D+='Set-ItemProperty \'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\' -Name "fDenyTSConnections" -Value 0\nSet-ItemProperty \'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp\\\' -Name "UserAuthentication" -Value 0\nEnable-NetFirewallRule -DisplayGroup "Remote Desktop\n'),e.isServer&&e.ADDS.install?e.users.forEach((function(e){var t,n,r,l;D+=(t=e.samAccountName,n=e.name,r=e.password,l=e.winRM,"$UserPassword = ConvertTo-SecureString '".concat(r,"' -AsPlainText -Force\nNew-ADUser -Name \"").concat(n,'" -GivenName "').concat(n,'" -SamAccountName "').concat(t,'" -AccountPassword $UserPassword -ChangePasswordAtLogon $False -Enabled $True\n').concat(l?'net localgroup "Remote Management Users" /add '+t+" /dom":""))})):e.users.forEach((function(e){var t,n,r;D+=(t=e.samAccountName,e.name,n=e.password,r=e.winRM,"net user ".concat(t," ").concat(n," /add\n\n").concat(o(t,n),"\nStart-Process PowerShell -Cred $Cred -ArgumentList 'whoami'\n    \n\n").concat(r?'net localgroup "Remote Management Users" /add '+t+" /dom":""))})),t({powershell1:m,powershell2:v,powershell3:D})}))}var d={name:"CreateScript",components:{ScriptOptionsMenu:r.default,home:l.default},computed:{},data:function(){return{script1:"",script2:"",script3:"",snackbar:!1,snackBarText:"",userSam:"",userDisplayName:"",userPassword:"",userWinRMAccess:!1,selectedUsers:[],currentPage:"default",userTableHeaders:[{text:"Name",value:"samAccountName"},{text:"Display Name",value:"name"},{text:"Password",value:"password"},{text:"WinRM Access",value:"winRM"}],setupDetails:{hostname:"",adminPwd:"",changeHostname:!1,changeAdminPassword:!1,isServer:!1,ADDS:{install:!1,domainName:"",netbiosName:""},ADCS:{install:!1},enableWinRM:!1,enableRDP:!1,users:[]}}},methods:{switchPage:function(e){this.currentPage=e},addUser:function(){if(this.setupDetails.users.map((function(u){return u.samAccountName})).includes(this.userSam))return this.snackBarText="User ".concat(this.userSam," already exists"),void(this.snackbar=!0);this.setupDetails.users.push({name:this.userDisplayName,samAccountName:this.userSam,password:this.userPassword,winRM:this.userWinRMAccess}),this.userSam="",this.userDisplayName="",this.userPassword="",this.userWinRMAccess=!1},deleteUsers:function(){var e=this;this.setupDetails.users=this.setupDetails.users.filter((function(t){return!e.selectedUsers.includes(t)})),this.selectedUsers=[]},buildScript:function(){var e=this;c(this.setupDetails).then((function(script){e.script1=script.powershell1,e.script2=script.powershell2,e.script3=script.powershell3}))},downloadScript:function(e){var script="";switch(e){case 1:script=this.script1;break;case 2:script=this.script2;break;case 3:script=this.script3}var element=document.createElement("a");element.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(script)),element.setAttribute("download","script-".concat(e,".ps1")),element.style.display="none",document.body.appendChild(element),element.click(),document.body.removeChild(element)}}},m=n(91),v=n(123),D=n.n(v),h=n(205),S=n(468),w=n(460),f=n(374),_=n(464),P=n(179),A=n(461),C=n(462),R=n(406),k=n(463),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-snackbar",{model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.snackBarText)+"\n  ")]),e._v(" "),n("v-row",{},[n("v-col",{staticClass:"container",attrs:{col:"3"}},[n("ScriptOptionsMenu",{attrs:{isServer:e.setupDetails.isServer},on:{switchSettings:e.switchPage}})],1),e._v(" "),n("v-col",{attrs:{sm:"9"}},["default"==e.currentPage?n("home"):e._e(),e._v(" "),"initialSetup"==e.currentPage?n("div",[n("v-checkbox",{attrs:{label:"Computer is a: "+(e.setupDetails.isServer?"Server":"Workstation")},model:{value:e.setupDetails.isServer,callback:function(t){e.$set(e.setupDetails,"isServer",t)},expression:"setupDetails.isServer"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Change hostname: "+e.setupDetails.changeHostname.toString()},model:{value:e.setupDetails.changeHostname,callback:function(t){e.$set(e.setupDetails,"changeHostname",t)},expression:"setupDetails.changeHostname"}}),e._v(" "),n("v-text-field",{attrs:{label:"Hostname",counter:"15",disabled:!e.setupDetails.changeHostname},model:{value:e.setupDetails.hostname,callback:function(t){e.$set(e.setupDetails,"hostname",t)},expression:"setupDetails.hostname"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Change admin password: "+e.setupDetails.changeAdminPassword.toString()},model:{value:e.setupDetails.changeAdminPassword,callback:function(t){e.$set(e.setupDetails,"changeAdminPassword",t)},expression:"setupDetails.changeAdminPassword"}}),e._v(" "),n("v-text-field",{attrs:{label:"Admin password",counter:"256",disabled:!e.setupDetails.changeAdminPassword},model:{value:e.setupDetails.adminPwd,callback:function(t){e.$set(e.setupDetails,"adminPwd",t)},expression:"setupDetails.adminPwd"}})],1):e._e(),e._v(" "),"serverRoles"==e.currentPage?n("div",[n("v-checkbox",{attrs:{label:"Install Active Directory Domain Services: "+e.setupDetails.ADDS.install.toString()},model:{value:e.setupDetails.ADDS.install,callback:function(t){e.$set(e.setupDetails.ADDS,"install",t)},expression:"setupDetails.ADDS.install"}}),e._v(" "),e.setupDetails.ADDS.install?n("div",[n("v-text-field",{attrs:{label:"Domain Name (e.g. lab.local)",counter:"256"},model:{value:e.setupDetails.ADDS.domainName,callback:function(t){e.$set(e.setupDetails.ADDS,"domainName",t)},expression:"setupDetails.ADDS.domainName"}}),e._v(" "),n("v-text-field",{attrs:{label:"Domain Netbios Name (e.g. LAB)",counter:"256"},model:{value:e.setupDetails.ADDS.netbiosName,callback:function(t){e.$set(e.setupDetails.ADDS,"netbiosName",t)},expression:"setupDetails.ADDS.netbiosName"}})],1):e._e()],1):e._e(),e._v(" "),"otherServices"==e.currentPage?n("div",[n("v-checkbox",{attrs:{label:"Enable WinRM: "+e.setupDetails.enableWinRM.toString()},model:{value:e.setupDetails.enableWinRM,callback:function(t){e.$set(e.setupDetails,"enableWinRM",t)},expression:"setupDetails.enableWinRM"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Enable RDP: "+e.setupDetails.enableRDP.toString()},model:{value:e.setupDetails.enableRDP,callback:function(t){e.$set(e.setupDetails,"enableRDP",t)},expression:"setupDetails.enableRDP"}}),e._v(" "),n("v-checkbox",{attrs:{label:"Install ADCS: "+e.setupDetails.ADCS.install.toString()},model:{value:e.setupDetails.ADCS.install,callback:function(t){e.$set(e.setupDetails.ADCS,"install",t)},expression:"setupDetails.ADCS.install"}})],1):e._e(),e._v(" "),"users"==e.currentPage?n("div",[n("v-text-field",{attrs:{label:"Sam Account Name"},model:{value:e.userSam,callback:function(t){e.userSam=t},expression:"userSam"}}),e._v(" "),n("v-text-field",{attrs:{label:"Display Name"},model:{value:e.userDisplayName,callback:function(t){e.userDisplayName=t},expression:"userDisplayName"}}),e._v(" "),n("v-text-field",{attrs:{label:"Password"},model:{value:e.userPassword,callback:function(t){e.userPassword=t},expression:"userPassword"}}),e._v(" "),n("v-checkbox",{attrs:{label:"WinRM Access"},model:{value:e.userWinRMAccess,callback:function(t){e.userWinRMAccess=t},expression:"userWinRMAccess"}}),e._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{elevation:"2",large:"",color:"green"},on:{click:e.addUser}},[e._v("Add User")]),e._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{dense:"",headers:e.userTableHeaders,items:e.setupDetails.users,"item-key":"name",singleSelect:!1,"show-select":""},model:{value:e.selectedUsers,callback:function(t){e.selectedUsers=t},expression:"selectedUsers"}}),e._v(" "),e.selectedUsers.length>0?n("v-btn",{staticClass:"mt-2",attrs:{fab:"",small:"",color:"red"},on:{click:e.deleteUsers}},[n("v-icon",[e._v("mdi-delete")])],1):e._e()],1):e._e(),e._v(" "),"build"==e.currentPage?n("div",[n("p",[e._v("There will be 3 scripts being created (Only 2 if the computer is a client):")]),e._v(" "),n("p",[e._v("1. Customizing Windows via registry tweaks, debloating it, changing hostname, changing admin password and other things that require a reboot.")]),e._v(" "),n("p",[e._v("2. Installing ADDS, setting up the forest, and other server stuff that do require a reboot (ONLY IF THE COMPUTER IS A SERVER)")]),e._v(" "),n("p",[e._v("3. Creating files, installing services that do not require a reboot, creating users, and other tasks that do not require a reboot.")]),e._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{elevation:"2",large:"",color:"primary"},on:{click:e.buildScript}},[e._v("Build Scripts")]),e._v(" "),n("v-textarea",{attrs:{label:"Script #1",disabled:!0},model:{value:e.script1,callback:function(t){e.script1=t},expression:"script1"}}),e._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{elevation:"2",large:""},on:{click:function(t){return e.downloadScript(1)}}},[e._v("Download Script #1")]),e._v(" "),e.setupDetails.isServer?n("v-textarea",{attrs:{label:"Script #2",disabled:!0},model:{value:e.script2,callback:function(t){e.script2=t},expression:"script2"}}):e._e(),e._v(" "),e.setupDetails.isServer?n("v-btn",{staticClass:"mb-4",attrs:{elevation:"2",large:""},on:{click:function(t){return e.downloadScript(2)}}},[e._v("Download Script #2")]):e._e(),e._v(" "),n("v-textarea",{attrs:{label:"Script #3",disabled:!0},model:{value:e.script3,callback:function(t){e.script3=t},expression:"script3"}}),e._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{elevation:"2",large:""},on:{click:function(t){return e.downloadScript(3)}}},[e._v("Download Script #3")])],1):e._e()],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;D()(component,{ScriptOptionsMenu:n(402).default}),D()(component,{VBtn:h.a,VCheckbox:S.a,VCol:w.a,VContainer:f.a,VDataTable:_.a,VIcon:P.a,VRow:A.a,VSnackbar:C.a,VTextField:R.a,VTextarea:k.a})}}]);