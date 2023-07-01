Ext.define('ext.StudioInfo', {
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
				getStudioList();
			}
		});

		let formSearch = Ext.create('Ext.form.Panel', {
			width : '100%',
			border : false,
			padding : '10 0 0 10',
			style : 'border:1px solid #b5b8c8; border-radius:3px;',
			layout: {
				type: 'table',
				columns: 3,
				tdAttrs: {style: 'padding: 0px 10px 0px 0px; vertical-align : top;'}
			},
			items: [
			    {xtype: 'metext', width: '100%', labelWidth: 80, name: 'name', fieldLabel: 'Studio Name',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getStudioList();
                            }
                        }
                    }
                },
				{xtype: 'metext', width: '100%', labelWidth: 50, name: 'address', fieldLabel: 'Address',
					listeners: {
						specialkey: function (f, e) {
							if (e.getKey() == e.ENTER) {
				                getStudioList();
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
				{text : 'Studio Name', minWidth: 150, flex: 1, dataIndex: 'studioName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Address', minWidth: 200, flex: 1, dataIndex: 'address', align : 'center', sortable: false, menuDisabled: true},
			],
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    setStudioInfo(record.data);
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
                saveStudio();
            }
        });

		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			layout: 'column',
			items: [
			    {xtype: 'metext', columnWidth: .5, fieldLabel: 'Studio Name', labelWidth: 80, name: 'name', margin: '10 0 0 0'},
                {xtype: 'memoney', columnWidth: .5, fieldLabel: 'Prize Per Hours', labelWidth: 100, name: 'prize', allowBlank: false, margin: '10 0 0 10'},
				{xtype: 'metext', columnWidth: .5, fieldLabel: 'Address', labelWidth: 80, name: 'address', margin: '5 0 0 0'},
				{xtype: 'mearea', columnWidth: 1, fieldLabel: 'Notes', labelWidth: 80, name: 'notes', margin: '5 0 0 0'},
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

		async function getStudioList() {
			try {
				let params = {
				    'studioName': getFormField(formSearch, 'name').getValue().trim(),
				    'address': getFormField(formSearch, 'address').getValue().trim(),
				};
				let ajaxUrl = 'employee/getStudioList';
				let json = await postDataAjax(ajaxUrl, params);
				console.log(json);
				mainStore.loadData(json.data);
				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}

        var currentInfo = {};
		function setStudioInfo(s) {
            try {
                console.log(s);
                currentInfo = s;
                getFormField(formInfo, 'name').setValue(s.studioName);
                getFormField(formInfo, 'prize').setValue(s.prizePerHours);
                getFormField(formInfo, 'address').setValue(s.address);
                getFormField(formInfo, 'notes').setValue(s.notes);
				rightPanel.setDisabled(false);
            }catch(e) {
                handleException(e);
            }
        }

        async function saveStudio() {
            try {
                if(!formInfo.isValid()) {
                    throw new Error();
                }
                currentInfo.studioName = getFormField(formInfo, 'name').getValue().trim();
                currentInfo.prizePerHours = getFormField(formInfo, 'prize').getValue().replaceAll(',', '');
                currentInfo.address = getFormField(formInfo, 'address').getValue().trim();
                currentInfo.notes = getFormField(formInfo, 'notes').getValue().trim();

                console.log(currentInfo)
                let ajaxUrl = 'admin/saveStudio';
                await saveDataAjax(ajaxUrl, currentInfo);
                showMessageSaveSuccess();
            }catch(e) {
                handleException(e);
            }
        }

//		END
	}
});

