Ext.define('ext.AdminClass', {
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
				products();
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
				{xtype: 'metext', width: '100%', labelWidth: 30, name: 'song', fieldLabel: 'Song',
					listeners: {
						specialkey: function (f, e) {
							if (e.getKey() == e.ENTER) {
							}
						}
					}
				},
				{xtype: 'mecombo', width: '100%', fieldLabel: 'Status', labelWidth: 50, name: 'status', margin: '0 10 0 0', allowBlank: false,
                    store: Ext.widget('mestore', {
                       fields: ['code', 'name'],
                       data: [
                            {'code': '', 'name': 'ALL'},
                            {'code': 'OPEN', 'name': 'Open'},
                            {'code': 'CLOSE', 'name': 'Close'},
                       ]
                    }),
                    valueField: 'code', displayField: 'name', value: '', editable: false,
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
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
				{text : 'No', width: 40, dataIndex: 'id', align: 'center', sortable: false, menuDisabled: true,
				    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return ++row;
                    }
				},
				{text : 'Song', minWidth: 150, flex: 1, dataIndex: 'songName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Create Date', width: 100, dataIndex: 'createDate', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Period', width: 200, align : 'center', sortable: false, menuDisabled: true},
				{text : 'Time', width: 150, align : 'center', sortable: false, menuDisabled: true},
				{text : 'Address', width: 100, dataIndex: 'address', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Status', width: 70, dataIndex: 'status', align : 'center', sortable: false, menuDisabled: true},
			],
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					if(cellIndex != 0) {
						rightPanel.setDisabled(false);
					}
				},
			},
		});

		let btnRegister = Ext.widget('mebutton', {
			text: 'New Registration',
			iconCls: 'far fa-file btn-icon',
			padding: '8 10',
			margin: '5 0 0 0',
			handler: function() {
				exportPdf();
			}
		});

		let btnSave = Ext.widget('mebutton', {
            text: 'Save',
            iconCls: 'far fa-save btn-icon',
            padding: '8 10',
            handler: function() {
                saveClass();
            }
        });

		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			layout: 'column',
			items: [
			    {xtype: 'metext', columnWidth: .5, fieldLabel: 'Song', labelWidth: 50, name: 'song', margin: '10 0 0 0'},
				{xtype: 'medate', columnWidth: .5, fieldLabel: 'Create Date', labelWidth: 70, name: 'createDate', value: new Date(), editable: false, margin: '10 0 0 10'},
				{xtype: 'fieldcontainer', columnWidth: 1, layout: 'hbox', labelWidth: 50, margin: '10 0 0 0', labelSeparator: '',
                    fieldLabel: 'Period' + '<span style = "color:red;">*</span>',
                    items: [
                        {xtype: 'medate', flex: .45, name: 'start', value: new Date(new Date().getFullYear(), new Date().getMonth(), 1), allowBlank: false, editable: false,
                            listeners: {
                                change: function(combo, value){
                                    if(this.value != null){
                                        getFormField(formInfo, 'end').setMinValue(this.value);
                                    }
                                }
                            }
                        },
                        {xtype: 'medisplayfield', flex: .1, value: '~', style: 'text-align: center;'},
                        {xtype: 'medate', flex: .45, name: 'end', value: new Date(), style: 'float: right;', allowBlank: false, editable: false}
                    ]
                },
                {xtype: 'fieldcontainer', columnWidth: 1, layout: 'hbox', labelWidth: 50, margin: '5 0 0 0', labelSeparator: '',
                    fieldLabel: 'Time' + '<span style = "color:red;">*</span>',
                    items: [
                        {xtype: 'metime', flex: .45, name: 'timeStart', allowBlank: false},
                        {xtype: 'medisplayfield', flex: .1, value: '~', style: 'text-align: center;'},
                        {xtype: 'medate', flex: .45, name: 'timeEnd', style: 'float: right;', allowBlank: false}
                    ]
                },
				{xtype: 'metext', columnWidth: .5, fieldLabel: 'Address', labelWidth: 50, name: 'address', margin: '5 0 0 0'},
				{xtype: 'mecombo', columnWidth: .5, fieldLabel: 'Status', labelWidth: 50, name: 'status', margin: '5 0 0 10', allowBlank: false,
					store: Ext.widget('mestore', {
                       fields: ['code', 'name'],
                       data: [
                           {'code': 'OPEN', 'name': 'Open'},
                           {'code': 'CLOSE', 'name': 'Close'},
                       ]
					}),
					valueField: 'code', displayField: 'name', value: 'OPEN', editable: false,
				},
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

		async function saveClass() {
			try {
				let params = {};
				let ajaxUrl = 'api/saveClass';
				let json = await postDataAjax(ajaxUrl, params);
				console.log(json);
			}catch(e) {
				handleException(e);
			}
		}

//		END
	}
});

