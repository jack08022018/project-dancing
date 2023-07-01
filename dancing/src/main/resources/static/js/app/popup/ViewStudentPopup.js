Ext.define('ext.popup.ViewStudentPopup', {
	extend: 'component.MeWindow',
	title: 'Student List',
	width: 1000,
	defaultWidth: 1000,
	layout: 'vbox',
	bodyPadding: '10 10 0 10',
	reloadPopup: function(){},
	reloadParent: function(){},
	initComponent: function() {
		
		var me = this;

		me.reloadPopup = function(classId) {
			currentClass = classId;
			getAllStudentOfClass();
			me.show();
		}

		let changeStudentStatusPopup = Ext.create('ext.popup.ChangeStudentStatusPopup', {
            reloadParent: function() {
                getAllStudentOfClass();
            }
        });

        let mainStore = Ext.widget('mestore');
        let mainGrid = Ext.create('Ext.grid.Panel', {
            width: '100%',
            flex: 1,
            minHeight: 500,
            store: mainStore,
            margin: '5 0 0 0',
            columns: [
                {text : 'No', width: 40, align: 'center', sortable: false, menuDisabled: true,
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        return ++row;
                    }
                },
                {text : 'Student Name', width: 120, dataIndex: 'name', sortable: false, menuDisabled: true},
                {text : 'Mobile', width: 100, dataIndex: 'mobile', align : 'center', sortable: false, menuDisabled: true},
                {text : 'Status', width: 90, dataIndex: 'status', align : 'center', sortable: false, menuDisabled: true},
                {text : 'Status', dataIndex: 'status', align: 'center', width: 90, sortable: false, menuDisabled: true,
                    renderer: function(value, rootRecord, record) {
                        return `<a href="#" data-action="view" class="grid-icon">${value}</a>`;
                    }
                },
                {text : 'Notes', minWidth: 200, flex: 1, dataIndex: 'notes', cellWrap: true, sortable: false, menuDisabled: true},
            ],
            listeners: {
                cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    if($(e.target).data('action') == 'view') {
                        changeStudentStatusPopup.reloadPopup(record.data);
                    }else {
                        console.log(record.data)
                    }
                },
            },
        });
		
		this.items = [mainGrid];
		this.callParent(arguments);

        let currentClass;
		async function getAllStudentOfClass() {
            try {
                let params = {
                    id: currentClass + ''
                };
                let ajaxUrl = 'employee/getAllStudentOfClass';
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
		
//		END
	}
});

