Ext.define('ext.LoginPage', {
	alias : 'widget.loginPage',
	extend : 'Ext.container.Container',
	cls: 'wrapper-login',
	border: false,
	//layout: 'fit',
	autoScroll: false,
	initComponent : function() {

		var me = this;

		var formLogin = Ext.create('Ext.form.Panel', {
			width : null,
			height: 351,
			cls: 'login-form clearfix',
			bodyStyle: 'background: none;',
			border : false,
			margin: '30 0 0 0',
			items: [
		        {xtype: 'label', width: '100%', text: 'Wrong user name or password', itemId: 'wrong', margin: '0 0 7 0',
		        	style: "display: block; color: red; font-size: 15px; text-align: center;",
		        },
				{xtype : 'metext', cls: 'form-controls username', width: '100%', name : 'username', allowBlank: false},
				{xtype : 'metext', cls: 'form-controls password', width: '100%', name : 'password', inputType: 'password', allowBlank: false,
					listeners:  {
		                specialkey: function (f,e) {
		                    if (e.getKey() == e.ENTER) {
		                    	login();
		                    }
		                }
		            }
				},
				{xtype: 'button', border: false, cls: 'login-button', text: 'Login',
					handler: function() {
						login();
					}
				},
				{xtype: 'mecheckbox', width : '100%', boxLabel: 'Remember Me', inputValue: 'html', margin: "10 0 0", cls : "check-box", name: 'remember'}
			]
		});

		var formMain = Ext.create('Ext.panel.Panel',{
			border : false,
			cls: 'login-content',
			width : 595,
			bodyCls: 'wrap-auto-full',
			style: 'background: none;',
			bodyStyle: 'background: none;',
			margin: '0 auto',
			items : [
			     {xtype: 'image', cls:'logo-plc', itemId: 'logoPlc', border: false, width: 170, src : CONTEXT_PATH + 'images/admin/admin_logo.png', },
		         {xtype: 'label', width: '100%', cls: 'loginLogan', xtype: 'label', text: 'TEACHING LEARNING EVALUATION SYSTEM'},
		         formLogin
	        ]
		});

		this.items = [formMain];
		this.callParent(arguments);

		formLogin.getComponent('wrong').setHidden(true);

		function loadUserPassFromCookie() {
			let username = Ext.util.Cookies.get('username');
			let password = Ext.util.Cookies.get('password');
			if(username != null) {
				getFormField(formLogin, 'username').setValue(username);
			}
			if(password != null) {
				getFormField(formLogin, 'password').setValue(password);
			}
		}
//		loadUserPassFromCookie();

		let expiry = new Date(new Date().getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
		function setUserPassCookie(userId, password) {
			Ext.util.Cookies.set('username', userId);
			Ext.util.Cookies.set('password', password);
			Ext.util.Cookies.set('expires', expiry.toGMTString());
//			document.cookie = "userId=" + escape(userId) + "; password=" + escape(password) + "; expires=" + expiry.toGMTString();
		}

		async function login() {
            try {
                if(!formLogin.isValid()) {
                    return;
                }
                let params = {
                    'username': getFormField(formLogin, 'username').getValue().trim(),
                    'password': getFormField(formLogin, 'password').getValue().trim(),
                };
                let ajaxUrl = 'login';
                let json = await postDataAjax(ajaxUrl, params);
                console.log(json);
                let info = json.data;
                localStorage.setItem('accessToken', info.accessToken);
                localStorage.setItem('username', info.username);
                switch(info.roles[0]) {
                    case 'ADMIN':
                       document.location.href = CONTEXT_PATH + "view/adminPage";
                        break;
                    case 'EMPLOYEE':
                        document.location.href = CONTEXT_PATH + "view/adminStudent";
                        break;
                    default:
                        document.location.href = CONTEXT_PATH + "view/studentInfo";
                        break;
                }
            }catch(e) {
                handleException(e);
            }
        }

		function logina() {
			if(!formLogin.isValid()) {
				return;
			}
			console.log("AA: " + CONTEXT_PATH + '/login')
			Ext.getBody().mask("Loading...", "x-mask-loading", true);
			formLogin.getForm().submit({
    			url: CONTEXT_PATH + 'login',
    			encType : 'multipart/form-data',
				success : async function(fp, res) {
					Ext.get(document.body).unmask();
					var json = Ext.JSON.decode(res.response.responseText);
					console.log(json)
					localStorage.setItem('jwtToken', json.data.accessToken);
					document.location.href = CONTEXT_PATH + "view/adminClass";
//					if(json.loggedStatus == true) {
//						if(getFormField(formLogin, 'remember').getValue() == true) {
//							await setUserPassCookie(getFormField(formLogin, 'userId').getValue(), getFormField(formLogin, 'password').getValue());
//						}
//						document.location.href = CONTEXT_PATH + "/view/index";
//					}else {
//						formLogin.getComponent('wrong').setHidden(false);
//					}
                },
                error: function(fp, res) {
                	Ext.get(document.body).unmask();
					showMessageBoxError('Error');
                },
                failure: function(fp, res) {
                	Ext.get(document.body).unmask();
					showMessageBoxError('Failed');
                }
			});
		}

//		End
	}
});
