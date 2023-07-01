Ext.define('ext.popup.ChangeStudentStatusPopup', {
	extend: 'component.MeWindow',
	title: 'Change Status',
	width: 600,
	defaultWidth: 600,
	layout: 'fit',
	bodyPadding: '10 10 0 10',
	reloadPopup: function(){},
	reloadParent: function(){},
	initComponent: function() {
		
		var me = this;

		me.reloadPopup = function(info) {
			me.show();
			getInfo(info);
		}

		let btnSave = Ext.widget('mebutton', {
            text: 'Save',
            iconCls: 'far fa-save btn-icon',
            padding: '8 10',
            margin: '5 0 0 0',
            handler: function() {
                changeStudentStatus();
            }
        });

		let formInfo = Ext.create('Ext.form.Panel', {
            width: '100%',
            flex: 1,
            border: false,
            layout: 'column',
            items: [
                {xtype: 'metext', columnWidth: .5, fieldLabel: 'Name', labelWidth: 40, name: 'name', readOnly: true},
                {xtype: 'mecombo', columnWidth: .5, fieldLabel: 'Status', labelWidth: 40, name: 'status', margin: '0 0 0 10',
                    store: Ext.widget('mestore', {
                       fields: ['code', 'name'],
                       data: [
                           {'code': 'ASSIGN', 'name': 'Assign'},
                           {'code': 'PAYMENT', 'name': 'Payment'},
                           {'code': 'DELETE', 'name': 'Delete'},
                       ]
                    }),
                    valueField: 'code', displayField: 'name', editable: false,
                },
                {xtype: 'mearea', columnWidth: 1, fieldLabel: 'Notes', labelWidth: 40, name: 'notes', margin: '5 0 0 0'},
                {xtype: 'container', layout: 'hbox', columnWidth: 1, margin: '5 0 10 0',
                    items: [{xtype: 'tbfill'}, btnSave]
                },
            ]
        });

		this.items = [formInfo];
		this.callParent(arguments);

        let currentInfo = {};
		function getInfo(info) {
            try {
                currentInfo = info;
                console.log(info)
                getFormField(formInfo, 'name').setValue(info.name);
                getFormField(formInfo, 'status').setValue(info.status);
                getFormField(formInfo, 'notes').setValue(info.notes);
            }catch(e) {
                handleException(e);
            }
        }

        async function changeStudentStatus() {
            try {
                if(!formInfo.isValid()) {
                    throw new Error();
                }
                let params = {
                    id: currentInfo.id,
                    status: getFormField(formInfo, 'status').getValue(),
                    notes: getFormField(formInfo, 'notes').getValue().trim(),
                };
                console.log(params)

                let ajaxUrl = 'admin/changeStudentStatus';
                await saveDataAjax(ajaxUrl, params);
                showMessageSaveSuccess();
                me.reloadParent();
                me.close();
            }catch(e) {
                handleException(e);
            }
        }
		
//		END
	}
});

