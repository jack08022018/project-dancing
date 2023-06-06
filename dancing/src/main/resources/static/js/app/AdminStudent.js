Ext.define('ext.AdminStudent', {
	extend: 'Ext.form.Panel',
	header: false,
	border: false,
	width : '100%',
	layout: 'border',
	initComponent : function() {

		let me = this;

		let btnSearch = Ext.widget('mebutton', {
			text: 'Search',
			padding: '8 10',
			iconCls: 'fa fa-search btn-icon',
			style: 'float : right;',
			handler: function() {
				getStudentList();
			}
		});

		let formSearch = Ext.create('Ext.form.Panel', {
			width : '100%',
			border : false,
			padding : '10 0 0 10',
			style : 'border:1px solid #b5b8c8; border-radius:3px;',
			layout: {
				type: 'table',
				columns: 4,
				tdAttrs: {style: 'padding: 0px 10px 0px 0px; vertical-align : top;'}
			},
			items: [
			    {xtype: 'metext', width: '100%', labelWidth: 35, name: 'name', fieldLabel: 'Name',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getClassList();
                            }
                        }
                    }
                },
				{xtype: 'metext', width: '100%', labelWidth: 40, name: 'mobile', fieldLabel: 'Mobile',
					listeners: {
						specialkey: function (f, e) {
							if (e.getKey() == e.ENTER) {
				                getClassList();
							}
						}
					}
				},
				{xtype: 'metext', width: '100%', labelWidth: 30, name: 'class', decimalPrecision: 0, minValue: 0, fieldLabel: 'Class',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getClassList();
                            }
                        }
                    }
                },
				btnSearch,
			]
		});
//
		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			flex: 1,
			store: mainStore,
			margin: '5 0 0 0',
			columns: [
				{text : 'No', width: 40, align: 'center', sortable: false, menuDisabled: true,
				    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return ++row;
                    }
				},
				{text : 'Name', minWidth: 150, flex: 1, dataIndex: 'name', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Mobile', width: 120, dataIndex: 'mobile', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Class', width: 150, dataIndex: '', align : 'center', sortable: false, menuDisabled: true},
			],
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
//                    setClassInfo(record.data);
                    getStudentInfo(record.data.id);
				},
			},
		});

		let btnRegister = Ext.widget('mebutton', {
			text: 'New Registration',
			iconCls: 'far fa-file btn-icon',
			padding: '8 10',
			margin: '5 0 0 0',
			handler: function() {
				currentInfo = {};
				formInfo.reset();
				rightPanel.setDisabled(false);
			}
		});

		let btnSave = Ext.widget('mebutton', {
            text: 'Save',
            iconCls: 'far fa-save btn-icon',
            padding: '8 10',
            handler: function() {
                saveStudentInfo();
            }
        });

		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			layout: 'column',
			items: [
			    {xtype: 'metext', columnWidth: .5, fieldLabel: 'Name', labelWidth: 50, name: 'name', allowBlank: false, margin: '5 0 0 0'},
				{xtype: 'menumber', columnWidth: .5, fieldLabel: 'Age', labelWidth: 55, name: 'age', decimalPrecision: 0, minValue: 0, maxValue: 100, margin: '5 0 0 10'},
				{xtype: 'mephone', columnWidth: .5, fieldLabel: 'Mobile', labelWidth: 50, name: 'mobile', allowBlank: false, margin: '5 0 0 0'},
				{xtype: 'metext', columnWidth: .5, fieldLabel: 'Address', labelWidth: 55, name: 'address', margin: '5 0 0 10'},
				{xtype: 'metext', columnWidth: .5, fieldLabel: 'Facebook', labelWidth: 50, name: 'facebook', allowBlank: false, margin: '5 0 0 0'},
                {xtype: 'metext', columnWidth: .5, fieldLabel: 'Email', labelWidth: 55, name: 'email', margin: '5 0 0 10'},
                {xtype: 'mearea', columnWidth: 1, fieldLabel: 'Notes', labelWidth: 50, name: 'notes', margin: '5 0 0 0'},
                {xtype: 'container', layout: 'hbox', columnWidth: 1, margin: '5 0 0 0',
                    items: [{xtype: 'tbfill'}, btnSave]
                },
			]
		});

		let leftPanel = Ext.widget('panel', {
			width: '50%',
			layout: 'vbox',
			border: false,
			region: 'center',
			split: true,
			bodyPadding: 5,
			items: [
				formSearch,
				mainGrid,
				{xtype: 'container', width : '100%', layout : 'hbox',
					items: [{xtype: 'tbfill'}, btnRegister]
				}
			]
		});

		let rightPanel = Ext.widget('panel', {
			region : 'east',
			collapsible : true,
			border : false,
			header : false,
			layout : 'vbox',
			width : '50%',
			split : true,
			bodyPadding: 5,
			autoScroll: true,
			items: [
				formInfo,
			],
		});

		this.items = [leftPanel, rightPanel];
		this.callParent(arguments);

		async function getStudentList() {
			try {
				let params = {
				    'name': getFormField(formSearch, 'name').getValue().trim(),
				    'mobile': getFormField(formSearch, 'mobile').getValue().trim(),
				};
				let ajaxUrl = 'employee/getStudentList';
				let json = await postDataAjax(ajaxUrl, params);
				console.log(json);
				mainStore.loadData(json.data);
				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}

		async function getStudentInfo(id) {
            try {
                let params = {
                    'id': id,
                };
                let ajaxUrl = 'employee/getStudentInfo';
                let json = await postDataAjax(ajaxUrl, params);
                var info = json.data.info;
                console.log(json);
                getFormField(formInfo, 'name').setValue(info.name);
                getFormField(formInfo, 'age').setValue(info.age);
                getFormField(formInfo, 'mobile').setValue(info.mobile);
                getFormField(formInfo, 'address').setValue(info.address);
                getFormField(formInfo, 'facebook').setValue(info.facebook);
                getFormField(formInfo, 'email').setValue(info.email);
                getFormField(formInfo, 'notes').setValue(info.notes);
                currentInfo = info;
                rightPanel.setDisabled(false);
            }catch(e) {
                handleException(e);
            }
        }

        async function saveStudentInfo() {
            try {
                if(!formInfo.isValid()) {
                    throw new Error();
                }
                currentInfo.name = getFormField(formInfo, 'name').getValue().trim();
                currentInfo.age = getFormField(formInfo, 'age').getValue();
                currentInfo.mobile = getFormField(formInfo, 'mobile').getValue().trim().replaceAll('-', '');
                currentInfo.address = getFormField(formInfo, 'address').getValue().trim();
                currentInfo.facebook = getFormField(formInfo, 'facebook').getValue().trim();
                currentInfo.email = getFormField(formInfo, 'email').getValue().trim();
                currentInfo.notes = getFormField(formInfo, 'notes').getValue().trim();
                console.log(currentInfo);
                let ajaxUrl = 'employee/saveStudent';
                await postDataAjax(ajaxUrl, currentInfo);
            }catch(e) {
                handleException(e);
            }
        }

//		END
	}
});

