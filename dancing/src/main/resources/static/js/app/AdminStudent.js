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
				getClassList();
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
                saveClassInfo();
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

		async function getClassList() {
			try {
				let params = {
				    'id': getFormField(formSearch, 'id').getValue(),
				    'songTitle': getFormField(formSearch, 'song').getValue(),
				};
				let ajaxUrl = 'api/getClassList';
				let data = await postDataAjax(ajaxUrl, params);
				console.log(data);
				mainStore.loadData(data);
				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}

        var currentInfo = {};
		function setClassInfo(s) {
            try {
                console.log(s);
                currentInfo = s;
                getFormField(formInfo, 'song').setValue(s.songTitle);
                getFormField(formInfo, 'createDate').setValue(new Date(s.createDate));
                getFormField(formInfo, 'startDate').setValue(new Date(s.startDate));
                getFormField(formInfo, 'endDate').setValue(new Date(s.endDate));
                getFormField(formInfo, 'startTime').setValue(s.startTime);
                getFormField(formInfo, 'endTime').setValue(s.endTime);
                getFormField(formInfo, 'address').setValue(s.address);
                getFormField(formInfo, 'status').setValue(s.status);
				rightPanel.setDisabled(false);
            }catch(e) {
                handleException(e);
            }
        }

        async function saveClassInfo() {
            try {
                if(!formInfo.isValid()) {
                    throw new Error();
                }
                currentInfo.songTitle = getFormField(formInfo, 'song').getValue();
                currentInfo.createDate = getFormField(formInfo, 'createDate').getValue();
                currentInfo.startDate = getFormField(formInfo, 'startDate').getValue();
                currentInfo.endDate = getFormField(formInfo, 'endDate').getValue();
                currentInfo.startTime = getFormField(formInfo, 'startTime').getValue();
                currentInfo.endTime = getFormField(formInfo, 'endTime').getValue();
                currentInfo.address = getFormField(formInfo, 'address').getValue();
                currentInfo.status = getFormField(formInfo, 'status').getValue();
                let ajaxUrl = 'api/saveClassInfo';
                await postDataAjax(ajaxUrl, currentInfo);
            }catch(e) {
                handleException(e);
            }
        }

//		END
	}
});

