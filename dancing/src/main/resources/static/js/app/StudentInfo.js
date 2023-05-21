Ext.define('ext.StudentInfo', {
	extend: 'Ext.form.Panel',
	header: false,
	width : '100%',
	border: false,
			autoScroll: true,
	layout: {
        type: 'vbox',
        align: 'center',
//        pack: 'center'
    },
    bodyStyle: 'background-color: #f5f5f5;',
	initComponent : function() {
		let me = this;

		let childForm = Ext.create('Ext.form.Panel', {
            width : '100%',
            title: 'SỐ BUỔI ĐÃ TẬP',
            layout: {
                type: 'table',
                columns: 2,
                align: 'middle',
                pack: 'center',
                tdAttrs: {style: 'padding: 0 10px 0 0; vertical-align : top;'}
            },
            items: [
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},
                {xtype: 'displayfield', width: '100%', hideLabel: true, cls: 'custom-displayfield', value: '2023/05/20'},

            ]
        });

		let mainForm = Ext.create('Ext.form.Panel', {
			width : 380,
			border : false,
			padding : 5,
			margin: '5 0 5 0',
			style : 'border: 1px solid #b5b8c8; border-radius:7px;box-shadow: #39393980 0px 0px 25px;background-color: white;',
			bodyStyle: 'background-color: white;',
			layout: 'vbox',
			items: [
				{xtype: 'metext', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Họ tên',
				    value: 'Thùy Nhung', readOnly: true, labelStyle: 'font-weight: bold;'
                },
				{xtype: 'metext', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Số điện thoại',
				    value: '0933248099', editable: false, readOnly: true, labelStyle: 'font-weight: bold;'
				},
				{xtype: 'medate', width: '100%', labelWidth: 120, name: 'target', fieldLabel: 'Ngày đóng học phí',
				    value: new Date(), editable: false, readOnly: true, cls: 'custom-datefield',
				    labelStyle: 'font-weight: bold;'
				},
				{xtype: 'medate', width: '100%', labelWidth: 120, name: 'target', fieldLabel: 'Ngày hết hạn',
                    value: new Date(), editable: false, readOnly: true, cls: 'custom-datefield',
                    labelStyle: 'font-weight: bold;'
                },
                {xtype: 'metext', columnWidth: 1, labelWidth: 120, name: 'target', fieldLabel: 'Loại thẻ',
                    value: 'Cơ bản', readOnly: true, labelStyle: 'font-weight: bold;'
                },
                childForm
			]
		});

		this.items = [mainForm];
		this.callParent(arguments);

		async function getData() {
			try {
				let params = {};
				let ajaxUrl = 'api/getData';
				let json = await postDataAjax(ajaxUrl, params);
				console.log(json);
			}catch(e) {
				handleException(e);
			}
		}

		getData();

//		END
	}
});

