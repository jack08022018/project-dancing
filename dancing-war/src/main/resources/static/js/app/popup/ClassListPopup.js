Ext.define('ext.popup.ClassListPopup', {
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

		me.reloadPopup = function() {
			me.show();
		}
		
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
//
        let mainStore = Ext.widget('mestore');
        let mainGrid = Ext.create('Ext.grid.Panel', {
            width: '100%',
            flex: 1,
            minHeight: 500,
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
                {text : 'Song', minWidth: 150, flex: 1, dataIndex: 'songTitle', align : 'center', sortable: false, menuDisabled: true},
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
                {text : 'Address', width: 200, dataIndex: 'address', align : 'center', sortable: false, menuDisabled: true},
                {text : 'Status', width: 70, dataIndex: 'status', align : 'center', sortable: false, menuDisabled: true},
            ],
            listeners: {
                cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    console.log(record.data);
//					if(cellIndex != 0) {
//					}
                },
            },
        });
		
		this.items = [formSearch, mainGrid];
		this.callParent(arguments);

        let studioList = [];
        async function getStudioList() {
            try {
                let params = {};
                let ajaxUrl = 'employee/getStudioList';
                let json = await postDataAjax(ajaxUrl, params);
                let data = json.data;
                data.forEach(s => {
                    s.displayValue = `${s.studioName} - ${s.address}`;
                });
                studioList = data;
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
            }catch(e) {
                handleException(e);
            }
        }
		
//		END
	}
});

