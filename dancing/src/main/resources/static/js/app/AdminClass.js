Ext.define('ext.AdminClass', {
	extend: 'Ext.form.Panel',
	header: false,
	border: false,
	width : '100%',
	layout: 'border',
	initComponent : function() {

		let me = this;

		let addressStore = Ext.widget('mestore');

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
			    {xtype: 'metext', width: '100%', labelWidth: 30, name: 'id', fieldLabel: 'ID',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getClassList();
                            }
                        }
                    }
                },
				{xtype: 'metext', width: '100%', labelWidth: 30, name: 'song', fieldLabel: 'Song',
					listeners: {
						specialkey: function (f, e) {
							if (e.getKey() == e.ENTER) {
				                getClassList();
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

        let viewStudentPopup = Ext.create('ext.popup.ViewStudentPopupAdmin', {
            reloadParent: function(info) {
//                resetFormInfo();
//                mainStore.loadPage(1, {
//                    params: paramsToSearch
//                })
            }
        });

		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			flex: 1,
			store: mainStore,
			margin: '5 0 0 0',
//			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
				{text : 'No', width: 40, align: 'center', sortable: false, menuDisabled: true,
				    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return ++row;
                    }
				},
				{text : 'ID', width: 40, dataIndex: 'id', align: 'center', sortable: false, menuDisabled: true},
				{text : 'Song', minWidth: 150, flex: 1, dataIndex: 'songTitle', cellWrap: true, sortable: false, menuDisabled: true},
				{text : 'Create Date', width: 100, dataIndex: 'createDate', align : 'center', sortable: false, menuDisabled: true,
				    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return Common.dateToString(record.data.createDate);
                    }
				},
				{text : 'Period', width: 170, align : 'center', sortable: false, menuDisabled: true,
				    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return Common.dateToString(record.data.startDate) + ' ~ ' + Common.dateToString(record.data.endDate);
                    }
				},
				{text : 'Time', width: 100, align : 'center', sortable: false, menuDisabled: true,
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return record.data.startTime + ' ~ ' + record.data.endTime;
                    }
                },
				{text : 'Address', width: 200, dataIndex: 'address', cellWrap: true, sortable: false, menuDisabled: true},
				{text : 'Status', width: 70, dataIndex: 'status', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Total Student', dataIndex: 'totalStudentAssign', locked: true,
				    align: 'center', width: 90, sortable: false, menuDisabled: true,
                    renderer: function(value, rootRecord, record) {
                        return `<a href="#" data-action="view" class="grid-icon">  ${value}  </a>`;
                    }
                },
            ],
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    if($(e.target).data('action') == 'view') {
                        viewStudentPopup.reloadPopup(record.data.id);
                    }else {
                        console.log(record.data)
                        setClassInfo(record.data);
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
			    {xtype: 'metext', columnWidth: .5, fieldLabel: 'Song', labelWidth: 50, name: 'song', margin: '10 0 0 0'},
				{xtype: 'medate', columnWidth: .5, fieldLabel: 'Create Date', labelWidth: 70, name: 'createDate', value: new Date(), editable: false, margin: '10 0 0 10'},
				{xtype: 'fieldcontainer', columnWidth: 1, layout: 'hbox', labelWidth: 50, margin: '10 0 0 0', labelSeparator: '',
                    fieldLabel: 'Period' + '<span style = "color:red;">*</span>',
                    items: [
                        {xtype: 'medate', flex: .45, name: 'startDate', allowBlank: false, editable: false,
                            listeners: {
                                change: function(combo, value){
                                    if(this.value != null){
                                        getFormField(formInfo, 'endDate').setMinValue(this.value);
                                    }
                                }
                            }
                        },
                        {xtype: 'medisplayfield', flex: .1, value: '~', style: 'text-align: center;'},
                        {xtype: 'medate', flex: .45, name: 'endDate', style: 'float: right;', allowBlank: false, editable: false}
                    ]
                },
                {xtype: 'fieldcontainer', columnWidth: 1, layout: 'hbox', labelWidth: 50, margin: '5 0 0 0', labelSeparator: '',
                    fieldLabel: 'Time' + '<span style = "color:red;">*</span>',
                    items: [
                        {xtype: 'metime', flex: .45, name: 'startTime', allowBlank: false},
                        {xtype: 'medisplayfield', flex: .1, value: '~', style: 'text-align: center;'},
                        {xtype: 'metime', flex: .45, name: 'endTime', style: 'float: right;', allowBlank: false}
                    ]
                },
                {xtype: 'menumber', columnWidth: .5, fieldLabel: 'Min', labelWidth: 50, name: 'min', minValue: 0,
                    decimalPrecision: 0, allowBlank: false, margin: '5 0 0 0'
                },
                {xtype: 'menumber', columnWidth: .5, fieldLabel: 'Max', labelWidth: 70, name: 'max', minValue: 0,
                    decimalPrecision: 0, allowBlank: false, margin: '5 0 0 10'
                },
				{xtype: 'mecombo', columnWidth: .5, fieldLabel: 'Status', labelWidth: 50, name: 'status', margin: '5 0 0 0', allowBlank: false,
					store: Ext.widget('mestore', {
                       fields: ['code', 'name'],
                       data: [
                           {'code': 'OPEN', 'name': 'Open'},
                           {'code': 'CLOSE', 'name': 'Close'},
                       ]
					}),
					valueField: 'code', displayField: 'name', value: 'OPEN', editable: false,
				},
				{xtype: 'menumber', columnWidth: .5, fieldLabel: 'Total Days', labelWidth: 70, name: 'totalDays', minValue: 0,
                    decimalPrecision: 0, allowBlank: false, margin: '5 0 0 10'
                },
				{xtype: 'mecombo', columnWidth: .5, fieldLabel: 'Address', labelWidth: 50, name: 'address', margin: '5 0 0 0',
				    store: addressStore, valueField: 'id', displayField: 'displayValue', queryMode: 'local',
				    editable: false, allowBlank: false, //forceSelection: true
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

//		console.log("AA: " + localStorage.getItem('username'))

        let studioList = [];
        async function getStudioList() {
			try {
				let params = {};
				let ajaxUrl = 'employee/getStudioList';
				let json = await postDataAjax(ajaxUrl, params);
				let data = json.data;
				console.log(data);
				data.forEach(s => {
				    s.displayValue = `${s.studioName} - ${s.address}`;
				});
				addressStore.loadData(data);
				studioList = data;
				getFormField(formInfo, 'address').setValue(data[0].id);
			}catch(e) {
				handleException(e);
			}
		}
		getStudioList();

		async function getClassList() {
			try {
				let params = {
				    'id': getFormField(formSearch, 'id').getValue(),
				    'songTitle': getFormField(formSearch, 'song').getValue(),
				};
				let ajaxUrl = 'employee/getClassList';
				let json = await postDataAjax(ajaxUrl, params);
				let data = json.data;
				if(data.length > 0) {
				    data.forEach(c => {
				        const studio = studioList.find(s => s.id === c.studioId);
				        c.address = `${studio.studioName} - ${studio.address}`;
				    })
                    mainStore.loadData(data);
				}else {
				    mainStore.removeAll();
				}
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
                getFormField(formInfo, 'address').setValue(s.studioId);
                getFormField(formInfo, 'status').setValue(s.status);
                getFormField(formInfo, 'min').setValue(s.minStudent);
                getFormField(formInfo, 'max').setValue(s.maxStudent);
                getFormField(formInfo, 'totalDays').setValue(s.totalDays);
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
                currentInfo.studioId = getFormField(formInfo, 'address').getValue();
                currentInfo.status = getFormField(formInfo, 'status').getValue();
                currentInfo.minStudent = getFormField(formInfo, 'min').getValue();
                currentInfo.maxStudent = getFormField(formInfo, 'max').getValue();
                currentInfo.totalDays = getFormField(formInfo, 'totalDays').getValue();

                let ajaxUrl = 'admin/saveClassInfo';
                await saveDataAjax(ajaxUrl, currentInfo);
                showMessageSaveSuccess();
            }catch(e) {
                handleException(e);
            }
        }

//		END
	}
});

