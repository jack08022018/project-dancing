Ext.define('ext.Info', {
	extend: 'Ext.form.Panel',
	header: false,
	width : '100%',
	border: false,
	layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
    },
    bodyStyle: 'background-color: #f5f5f5;',
	initComponent : function() {
		let me = this;

		let mainForm = Ext.create('Ext.form.Panel', {
			width : 400,
			border : false,
			padding : 10,
			style : 'border:1px solid #b5b8c8; border-radius:7px;box-shadow: #39393980 0px 0px 25px;background-color: white;',
			bodyStyle: 'background-color: white;',
			layout: 'vbox',
			items: [
				{xtype: 'metext', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Họ tên',
				    value: 'Thùy Nhung', readOnly: true
                },
				{xtype: 'metext', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Số điện thoại',
				    value: '0933248099', editable: false, readOnly: true
				},
				{xtype: 'medate', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Ngày đóng học phí',
				    value: new Date(), editable: false, readOnly: true, cls: 'custom-datefield'
				},
			]
		});

		this.items = [mainForm];
		this.callParent(arguments);

		async function products() {
			try {
				let params = {
					"currentPage": 0,
					"pageSize": 2
				};
				let ajaxUrl = 'api/products';
				let json = await getDataAjax(ajaxUrl, params);
				console.log(json);
				mainStore.loadData(json.content);
			}catch(e) {
				handleException(e);
			}
		}

//		END
	}
});

