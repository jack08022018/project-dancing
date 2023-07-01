Ext.define('ext.popup.AssignStudentPopup', {
	extend: 'component.MeWindow',
	title: 'Class List',
	width: 1000,
	defaultWidth: 1000,
	layout: 'vbox',
	bodyPadding: '10 10 0 10',
	reloadPopup: function(){},
	reloadParent: function(){},
	initComponent: function() {
		
		var me = this;

        let currentStudent = {};
		me.reloadPopup = function(info) {
		    currentStudent = info;
		    mainStore.removeAll();
		    formSearch.reset();
			me.show();
		}
		
		let btnSearch = Ext.widget('mebutton', {
            text: 'Search',
            padding: '8 10',
            iconCls: 'fa fa-search btn-icon',
            style: 'float : right;',
            handler: function() {
                getClassListCanAssign();
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
                {xtype: 'metext', width: '100%', labelWidth: 30, name: 'id', fieldLabel: 'ID',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getClassListCanAssign();
                            }
                        }
                    }
                },
                {xtype: 'metext', width: '100%', labelWidth: 30, name: 'song', fieldLabel: 'Song',
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                getClassListCanAssign();
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
            minHeight: 500,
            store: mainStore,
            margin: '5 0 10 0',
            columns: [
                {text : 'No', width: 40, align: 'center', sortable: false, menuDisabled: true,
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return ++row;
                    }
                },
                {text : 'ID', width: 40, dataIndex: 'id', align: 'center', sortable: false, menuDisabled: true},
                {text : 'Song', minWidth: 150, flex: 1, dataIndex: 'songTitle', align : 'center', sortable: false, menuDisabled: true},
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
                {text : 'Address', width: 200, dataIndex: 'address', align : 'center', sortable: false, menuDisabled: true},
                {text : 'Min max Student', width: 120, dataIndex: 'minStudent', align : 'center', sortable: false, menuDisabled: true,
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return record.data.minStudent + ' ~ ' + record.data.maxStudent;
                    }
                },
                {text : 'Total Student', width: 100, dataIndex: 'totalStudentAssign', align : 'center', sortable: false, menuDisabled: true},
            ],
            listeners: {
                cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    console.log(record.data);
                },
            },
        });

        var btnAssign = Ext.widget('mebutton', {
            text: 'Assign',
            iconCls: 'fas fa-check btn-icon',
            padding: '8 10',
            handler: async function() {
                assignStudent();
            }
        });
		
		this.items = [formSearch, mainGrid];
		this.bbar = [
             {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
                 layout: {
                     type: 'hbox',
                     align: 'middle',
                     pack: 'center'
                 },
                 items: [btnAssign]
             }
        ];
		this.callParent(arguments);

		async function getClassListCanAssign() {
            try {
                let params = {
                    'id': getFormField(formSearch, 'id').getValue(),
                    'songTitle': getFormField(formSearch, 'song').getValue(),
                };
                let ajaxUrl = 'employee/getClassListCanAssign';
                let json = await postDataAjax(ajaxUrl, params);
                let data = json.data;
                if(data.length > 0) {
                    mainStore.loadData(data);
                }else {
                    mainStore.removeAll();
                }
            }catch(e) {
                handleException(e);
            }
        }

        async function assignStudent() {
            try {
                let selectedRows = mainGrid.getSelectionModel().getSelection();
                if(selectedRows.length == 0) {
                    throw new Error('Please choose one class to assign!');
                }
                let selected = selectedRows[0].data;

                var mobileEmployee = localStorage.getItem('username');
                let ajaxUrl = mobileEmployee == 'admin' ? 'admin/assignStudent' : 'employee/assignStudent';
                let params = {
                    'idClass': selected.id,
                    'idStudent': currentStudent.id,
                    'mobileEmployee': mobileEmployee
                };
                await postDataAjax(ajaxUrl, params);
                showMessageSaveSuccess();
                getClassListCanAssign();
            }catch(e) {
                handleException(e);
            }
        }
		
//		END
	}
});

