Ext.define('ext.popup.UpdateMobileStudentPopup', {
	extend: 'component.MeWindow',
	title: 'Change Mobile',
	width: 300,
	defaultWidth: 300,
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
            handler: function() {
                updateMobileStudent();
            }
        });

		let formInfo = Ext.create('Ext.form.Panel', {
            width: '100%',
            border: false,
            layout: 'vbox',
            items: [
                {xtype: 'metext', flex: 1, fieldLabel: 'Name', labelWidth: 50, name: 'name', readOnly: true},
                {xtype: 'mephone', flex: 1, fieldLabel: 'Mobile', labelWidth: 50, name: 'mobile', allowBlank: false},
//                {xtype: 'container', layout: 'hbox', columnWidth: 1, margin: '5 0 0 0',
//                    items: [{xtype: 'tbfill'}, btnSave]
//                },
            ]
        });

		this.items = [formInfo];
		this.bbar = [
             {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;', padding: 0,
                 layout: {
                     type: 'hbox',
                     align: 'middle',
                     pack: 'end'
                 },
                 items: [btnSave]
             }
        ];
		this.callParent(arguments);

        let currentInfo = {};
		function getInfo(info) {
            try {
                currentInfo = info;
                console.log(info)
                getFormField(formInfo, 'name').setValue(info.name);
                getFormField(formInfo, 'mobile').setValue(info.mobile);
            }catch(e) {
                handleException(e);
            }
        }

        async function updateMobileStudent() {
            try {
                if(!formInfo.isValid()) {
                    throw new Error();
                }
                let params = {
                    id: currentInfo.id,
                    mobile: getFormField(formInfo, 'mobile').getValue().replaceAll('-', ''),
                };

                let ajaxUrl = 'employee/updateMobileStudent';
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

