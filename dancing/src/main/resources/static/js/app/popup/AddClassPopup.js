Ext.define('ext.popup.AddClassPopup', {
	extend: 'component.MeWindow',
	title: 'Add Class',
	width: 700,
	defaultWidth: 700,
	layout: 'fit',
	bodyPadding: '10 10 0 10',
	loadSubject: function(){},
	reloadPopup: function(){},
	reloadParent: function(){},
	initComponent: function() {
		
		var me = this;

		me.reloadPopup = function() {
			me.show();
		}
		
		var formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			layout: 'column',
			items: [
				{xtype: 'hiddenfield', name: 'platStatisticList', value: ''},
				{xtype: 'medisplayfield', columnWidth: .5, labelWidth: 130, name: 'number', fieldLabel: 'Number of Question'},
				{xtype: 'mepanel', layout: 'hbox', columnWidth: .5, margin: '0 0 10 10',
					items: [
				    	{xtype: 'menumber', flex: 1, labelWidth: 90, name: 'duration', fieldLabel: 'Duration', minValue: 1, decimalPrecision: 0},
				    	{xtype: 'label', text: 'minutes', margin: '6 20 0 10'}
					]
				},
				{xtype: 'meradiogroup', name: 'radio', columns: 2, columnWidth: .5, labelWidth: 130, fieldLabel: 'Have to Test?', labelSeparator: '', //minWidth: 480,
					allowBlank: false, invalidCls: Ext.baseCSSPrefix + 'form-invalid',
					items: [
				        {name: 'radio', inputValue: 'Y', boxLabel: 'Required', width: '100%', checked: true},
						{name: 'radio', inputValue: 'N', boxLabel: 'Optional', width: '100%'},
				    ],
				},
				{xtype: 'mecheckbox', name: 'checkbox', columnWidth: .5, labelWidth: 140, fieldLabel: 'Be Controlled?', labelSeparator: '', margin: '0 0 0 10'},
				{xtype: 'mecombo', columnWidth: .5, labelWidth: 130, name: 'partNum', fieldLabel: '# of Part', allowBlank: false,
					store: partStore, valueField: 'partSeq', displayField: 'partName', queryMode: 'local', editable: false,
				},
				{xtype: 'mecheckbox', name: 'plat', columnWidth: .5, labelWidth: 140, fieldLabel: 'In the statistic with PLAT', labelSeparator: '', margin: '0 0 10 10'},
				{xtype: 'mepanel', colspan: 2, columnWidth: 1,
					layout: {
						type: 'hbox',
						pack: 'center'
				
					},
					items: [btnConfirm]
				}
			]
		});
		
		var btnConfirm = Ext.widget('mebutton', {
	    	text: 'Confirm', 
	    	iconCls: 'fas fa-check btn-icon', 
	    	padding: '8 10', 
	    	handler: async function() {
	    		confirmSubject();
//	    		var checkboxRows = Ext.ComponentQuery.query('checkboxgroup', subjectGrid.getView());
//	    		let all = checkboxRows.map(ms => checkPartPlat(ms))
//	    		try {
//					await Promise.all(all);
//				}catch(e) {
//					console.log(e)
//				}
			}
	    });
		
		this.items = [formInfo];
		this.bbar = [
             {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;', padding: 5,
            	 layout: { 
            		 type: 'hbox', 
            		 align: 'middle', 
            		 pack: 'center'
    			 },
        		 items: [btnConfirm]
             }
        ];
		this.callParent(arguments);
		
//		END
	}
});

