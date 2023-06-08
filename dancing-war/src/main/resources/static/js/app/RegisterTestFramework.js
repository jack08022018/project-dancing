Ext.define('ext.view.basicInformationMngt.RegisterTestFramework', {
	extend: 'Ext.form.Panel',
	header: false,
	width : '100%',
	border: false,
	layout: 'border',
	writeAuth: true,
	initComponent : function() {
		
//		window + ;
//		😁😊😂🤣❤😍😒👌😘💕👍🙌🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️✌🤞😉😎🎶😢💖😜👏💋🌹🎉🎂🤳🐱‍👤🐱‍🏍🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀✔👀😃✨😆🤔🤢🎁
		
		let me = this;
		
		Ext.tip.Tip.prototype.minWidth = void 0;
        Ext.tip.QuickTipManager.init();
		
		let targetStore = Ext.widget('mestore');
		let yearStore = Ext.widget('mestore');
		let versionStore = Ext.widget('mestore');
		let typeStore = Ext.widget('metreestore');
		let statusStore = Ext.widget('mestore');
		let levelStore = Ext.widget('metreestore');
		let gradeStore = Ext.widget('mestore');
		
		let targetInfoStore = Ext.widget('mestore');
		let yearInfoStore = Ext.widget('mestore');
		let typeInfoStore = Ext.widget('metreestore');
		let statusInfoStore = Ext.widget('mestore');
		let versionInfoStore = Ext.widget('mestore');
		let yleStore = Ext.widget('mestore');
		
		let targetStoreOpt = getStoreOpt(true, 'All', '', true, 'VN');
		let versionStoreOpt = getStoreOpt(true, 'All', '', true, '01');
		let yearStoreOpt = getStoreOpt(false, 'All', '', true, new Date().getFullYear());
		let statusStoreOpt = getStoreOpt(false, 'All', '', false, '', true);
		let statusInfoStoreOpt = getStoreOpt(false, 'All', '', true, 'N', false);
		let targetInfoStoreOpt = getStoreOpt(false, 'All', '', false, '', true);
		let yearInfoStoreOpt = getStoreOpt(false, 'All', '', false, '', true);
		let versionInfoStoreOpt = getStoreOpt(false, 'All', '', true, '01');
		let levelStoreOpt = getStoreOpt(true, 'All', '', false, '');
		let typeStoreOpt = getStoreOpt(true, 'All', '', false, '');
		let typeInfoStoreOpt = getStoreOpt(false, 'All', '', false, '');
		let gradeStoreOpt = getStoreOpt(false, 'All', '', false, '');
		let yleStoreOpt = getStoreOpt(false, 'All', '', false, '');
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	iconCls: 'fa fa-search btn-icon', 
	    	style: 'float : right;',
	    	handler: function() {
	    		getTestFrameworkList();
	    		resetFormInfo();
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
		        {xtype: 'mecombo', width: '100%', labelWidth: 70, name: 'target', fieldLabel: 'Test Target',
					store: targetStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
					matchFieldWidth: false,
					listConfig: {
						listeners: {
							beforeshow: function(picker) {
//								picker.minWidth = 300;
							}
						}
					}
		        },
		        {xtype: 'mecombo', width: '100%', labelWidth: 60, name: 'year', fieldLabel: 'Year',
		        	store: yearStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'mecombo', width: '100%', labelWidth: 45, name: 'version', fieldLabel: 'Version',
		        	store: versionStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'treecombomulti', store: levelStore, labelWidth : 70, fieldLabel : 'Level', width: '100%', treeWidth: 200, editable: false, name: 'level'},
		        {xtype: 'treecombotesttype', store: typeStore, labelWidth : 60, fieldLabel: 'Test Type', width: '100%', 
		        	treeWidth: 200, editable: false, name: 'type'
        		},
				{xtype: 'mecombo', width: '100%', labelWidth: 45, name: 'status', fieldLabel: 'Status',
					store: statusStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				},
				{xtype: 'metext', width: '100%', colspan: 2, labelWidth: 70, name: 'name', fieldLabel: 'Test Name',
					listeners: {
		                specialkey: function (f, e) {    
		                    if (e.getKey() == e.ENTER) {
		                    	getTestFrameworkList();
		                    }
		                }
		            }		    
				},
				btnSearch,
			]
		});
		
		let mainStore = Ext.widget('mestore', {
			pageSize: PAGE_SIZE,
            proxy: {
				type : 'ajax',
				url: CONTEXT_PATH + '/basicInfomationMngt/getTestFrameworkList.json',
				reader: {
					type: 'json',
					enablePaging: true,
					rootProperty: 'data',
					totalProperty: 'totalCount',
				}
            },
            queryMode: 'local',
		});	
		let mainGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			flex: 1,
			store: mainStore,
			margin: '5 0 0 0',
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
				{text : 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
				{text : 'Test Name', minWidth: 150, flex: 1, dataIndex: 'testName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Test Type', minWidth: 150, flex: 1, dataIndex: 'testTypeName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'From Date', minWidth: 100, flex: 1, dataIndex: 'startDate', align : 'center', sortable: false, menuDisabled: true, 
					renderer: function(value, metaData, record, row, col, store, gridView) {
						return stringToDate(value);
					}
				},
				{text : 'Status', minWidth: 100, flex: 1, dataIndex: 'useYnName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Year', minWidth: 100, flex: 1, dataIndex: 'yearCode', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Version', minWidth: 100, flex: 1, dataIndex: 'versionName', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Target', minWidth: 100, flex: 1, dataIndex: 'targetName', align : 'center', sortable: false, menuDisabled: true},
			],
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
		    		if(cellIndex != 0) {
		    			getTestFrameworkDetail(record.data.testFwCode)
		    			rightPanel.setDisabled(false);
		    		}
		        },
		 	},
		 	bbar : new Ext.PagingToolbar({
    			store : mainStore,
    			pageSize : PAGE_SIZE,
    			displayInfo : true,
    			listeners : {
    				beforechange : function(pagingtoolbar, page, eOpts) {
    					setParamsToProxy(paramsToSearch, this.store.getProxy());
    					resetFormInfo();
    					rightPanel.setDisabled(true);
    				}
    			}
    		}),
		});
		
		let btnExcel = Ext.widget('mebutton', {
			text: 'Excel',
			iconCls: 'far fa-file-excel btn-icon',
			padding: '8 10',
			margin: '5 0 0 0',
			menu: [
				{text: 'Selected output',
					handler: function(value) {
						exportExcel('S');
					}
				},
				{text: 'Current Page',
					handler: function(value) {
						exportExcel('P');
					}
				},
				{text: 'All output',
					handler: function(value) {
						exportExcel('A');
					}
				}
			]
		});
		let btnRegister = Ext.widget('mebutton', {
			text: 'New Registration', 
			iconCls: 'far fa-file btn-icon', 
			padding: '8 10', 
			margin: '5 0 0 0',
//			hidden: !me.writeAuth, 
//			hideMode: 'visibility',
			handler: function() {
				resetFormInfo();
				rightPanel.setDisabled(false);
			}
		});
		
		let copyTestFrameworkPopup = Ext.create('ext.view.basicInformationMngt.popup.CopyTestFrameworkPopup', {
			writeAuth: me.writeAuth,
			reloadParent: function(info) {
				resetFormInfo();
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
			}
		});
		let btnCopyTestFW = Ext.widget('mebutton', {
			text: 'Copy Test Framework Information', 
			iconCls: 'far fa-copy btn-icon', 
			padding: '8 10', 
			hidden: !me.writeAuth, 
			hideMode: 'visibility',
			handler: function() {
				copyTestFrameworkPopup.reloadPopup(infoCurrent);
			}
		});
		let searchTestFrameworkStatsPopup = Ext.create('ext.view.basicInformationMngt.popup.SearchTestFrameworkStatsPopup', {
			reloadParent: function(info) {
				getFormField(formInfo, 'applyStats').setValue(info.testName);
				getFormField(formInfo, 'applyStats').applyStatsCodeList = info.testFwCode + '';
			}
		});
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			layout: 'column',
			items: [
		        {xtype: 'hiddenfield', name: 'testFwCode', value: 0},
		        {xtype: 'mecombo', columnWidth: .25, fieldLabel: 'Test Target', labelWidth: 70, name: 'target', allowBlank: false,
		        	store: targetInfoStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'mecombo', columnWidth: .25, fieldLabel: 'Test Status', labelWidth: 70, name: 'status', margin: '0 0 0 10', allowBlank: false,
		        	store: statusInfoStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'mecombo', columnWidth: .25, fieldLabel: 'Year', labelWidth: 40, name: 'year', margin: '0 0 0 10', allowBlank: false, style: 'float: right;',
		        	store: yearInfoStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        	listeners: {
		        		change: function (combo, value) {
		        			let year = this.value;
		        			if(year != null) {
		        				getFormField(formInfo, 'start').setValue(year + '/01/01');
		        				getFormField(formInfo, 'end').setValue(year + '/12/31');
		        			}
		        		}
		        	}
		        },
		        {xtype: 'mecombo', columnWidth: .25, fieldLabel: 'Version', labelWidth: 55, name: 'version', margin: '0 0 0 10', allowBlank: false,
		        	store: versionInfoStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'treecombotesttype', columnWidth: .25, fieldLabel: 'Test Type', labelWidth: 70, name: 'type', margin: '10 0 0 0', allowBlank: false,
		        	store: typeInfoStore, editable: false, rootVisibleCustom: false,
		        	select: function(value) {
		        		let testType = typeInfoStore.findNode('id', value).data;
		        		getFormField(formInfo, 'yleLevel').setDisabled(!isYLE(testType.treeId));
		        	}
		        },
		        {xtype: 'mecombo', columnWidth: .25, fieldLabel: 'YLE Level', labelWidth: 70, name: 'yleLevel', margin: '10 0 0 10', allowBlank: false,
		        	store: yleStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
				{xtype: 'fieldcontainer', columnWidth: .5, layout: 'hbox', labelWidth: 55, margin: '10 0 0 10', labelSeparator: '',
		        	fieldLabel: 'Period' + '<span style = "color:red;">*</span>', 
					items: [
						{xtype: 'medate', flex: .45, name: 'start', value: new Date(new Date().getFullYear(), new Date().getMonth(), 1), allowBlank: false,
							listeners: {
								change: function(combo, value){
									if(this.value != null){
										getFormField(formInfo, 'end').setMinValue(this.value);
									}
								}
							}
						},
						{xtype: 'medisplayfield', flex: .1, value: '~', style: 'text-align: center;'},
						{xtype: 'medate', flex: .45, name: 'end', value: new Date(), style: 'float: right;', allowBlank: false}
					]
				},
				{xtype: 'fieldcontainer', columnWidth: 1, layout: 'hbox', fieldLabel: ' ', labelWidth: 70, labelSeparator: '',
					items: [
				        btnCopyTestFW
			        ]
				},
				{xtype: 'medisplayfield', columnWidth: .5, fieldLabel: 'Test Code', labelWidth: 70, name: 'code', margin: '10 0 0 0', readOnly: true},
				{xtype: 'mecombo', columnWidth: .5, fieldLabel: 'Grade', labelWidth: 55, name: 'grade', margin: '10 0 0 10', multiSelect: true,
		        	store: gradeStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        	triggers : {
				  		clear : {
				  			cls : 'x-form-clear-trigger', weight: 1,
				  			handler : function() {
				  				this.setValue();
				  			}
				  		}
			  	    },
			  	    listConfig: {
				        tpl: Ext.create('Ext.XTemplate',
				        	'<li class="comboboxMulti">',
				        		'<tpl for=".">',
				        			'<div class="boundList x-boundlist-item" style="background:none;border:none;">',
				        				'<span class="checkbox" style="display: inline-block; margin-right: 5px;" value={detailCode}></span>{codeName}',
				        			'</div>',
				        		'</tpl>',
				        	'</li>'
				        )
					},
					listeners: {
						afterrender: function() {
							let tree = this;
							let tooltip = {
								anchor: 'top',
								trackMouse: true,
								html: '',
								listeners : {
									beforeshow: function updateTipBody(tip) {
										tip.update(tree.rawValue);
									}
								}
							}
							Ext.create('Ext.tip.ToolTip', Ext.applyIf(tooltip, {target: this.getEl()}));
						}
					}
		        },
				{xtype: 'metext', columnWidth: 1, fieldLabel: 'Test Name', labelWidth: 70, name: 'name', margin: '10 0 0 0', allowBlank: false},
				{xtype: 'metext', columnWidth: 1, labelWidth: 70, name: 'applyStats', fieldLabel: 'Apply Stats', editable: false, margin: '10 0 0 0',
					triggers: {
						clear: {
							cls: 'x-form-clear-trigger', hidden: true,
							handler: function() {
								this.reset();
								getFormField(formInfo, 'applyStats').reset();
								getFormField(formInfo, 'applyStats').applyStatsCodeList = '';
								this.getTriggers().clear.hide();
							}
						},
						search: {
							cls: 'x-form-search-trigger',
							handler: function() {
								if(!me.writeAuth) return;
								searchTestFrameworkStatsPopup.reloadPopup();
							}
						}
					},
					listeners: {
						change: function() {
							if(this.value != '') {
								this.getTriggers().clear.show();
							}else {
								this.getTriggers().clear.hide();
							}
						}
					}
				},
				{xtype: 'mearea', columnWidth: 1, fieldLabel: 'Note', labelWidth: 70, name: 'note', margin: '10 0 0 0'}
	        ]
		});
		
		let campusAddPopup = Ext.create('ext.view.testFramework.popup.campusAddPopup', {
			writeAuth: me.writeAuth,
			getAuth: me.getAuth,
			reloadParent: function(list) {
				let returnList = [];
				Ext.each(list, function(item) {
					if(campusStore.findRecord('clientCode', item.clientCode) == null) {
						item.startDate = getFormField(formInfo, 'start').getValue();
						item.endDate = getFormField(formInfo, 'end').getValue();
						returnList.push(item);
					}
				})
				if(returnList.length > 0) {
					let testType = typeInfoStore.findNode('id', getFormField(formInfo, 'type').getValue()).data;
					if(structureStore.data.length == 0 || isPLAT(testType.treeId)) {
						Ext.each(returnList, function(item) {
							campusStore.insert(campusStore.data.length, item);
						})
						return;
					}
					checkCampusLevel(returnList);
				}
			}
		});
		function getTestTypeTreeId() {
			let testType = typeInfoStore.findNode('id', getFormField(formInfo, 'type').getValue()).data;
			return testType.treeId;
		}
		let btnAddCampus = Ext.widget('mebutton', {
	    	text: 'Add Campus', 
	    	iconCls: 'fas fa-plus-circle btn-icon', 
	    	padding: '8 10', 
	    	handler: function() {
	    		campusAddPopup.reloadPopup({targetGbn: getFormField(formInfo, 'target').getValue()});
			}
	    });
		let campusStore = Ext.widget('mestore');
		let campusGrid = Ext.create('Ext.grid.Panel',{
			width: '100%',
			height: 240,
			margin: '10 0 0 0',
			store : campusStore,
			tbar: [{xtype: 'label', text: 'Apply Campus'}, {xtype: 'tbfill'}, btnAddCampus],
			listeners: {
				cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
					console.log(record.data)
			    	if($(e.target).data('action') == 'delete'){
			    		if(structureStore.data.length > 0 && campusStore.data.length == 1) {
			    			showMessageBoxWarning('Cannot delete');
			    			return;
			    		}
			    		Ext.Msg.confirm('', 'Do you want to delete it?', function(msg) {
					        if (msg == 'yes') {
					        	campusStore.remove(record);
					        }
						});
			    	}
			    }
		 	},
			columns: [
				{text: 'Campus Name', flex: 1, dataIndex: 'campusName', align : 'center', sortable: false},
				{text: 'Valid From Date', width: 140, align : 'center', sortable: false, xtype: 'widgetcolumn',
					widget: {
		        		  xtype: 'medate', width: '100%', editable: false, allowBlank: false, bind: '{record.startDate}',
					},
					onWidgetAttach: function(column, widget, record) {
	                    widget.setDisabled(false);
	                }
				},
				{text: 'Valid To Date', width: 140, align : 'center', sortable: false, xtype: 'widgetcolumn',
					widget: {
		        		  xtype: 'medate', width: '100%', editable: false, allowBlank: false, bind: '{record.endDate}',
					},
					onWidgetAttach: function(column, widget, record) {
	                    widget.setDisabled(false);
	                }
				},
		        {header: ' ', align: 'center', width: 60, sortable: false,
	                renderer: function(value, rootRecord, record) {
	                	if(!me.writeAuth || (record.data.studentExistYn == 'Y')) return '';
                		return '<a href="#" data-action="delete" class="far fa-trash-alt grid-icon"></a>';
	           		}
		        }
			],
		});
		
		let addTestStructurePopup = Ext.create('ext.view.basicInformationMngt.popup.AddTestStructurePopup', {
			writeAuth: me.writeAuth,
			getAuth: me.getAuth,
			reloadParent: function(info) {
				info.testTypeParent = getTestTypeTreeId();
				if(info.newRecord == true) {
					structureStore.insert(structureStore.data.length, info);
					getFormField(formInfo, 'type').setReadOnly(true);
				}else {
					let index = structureStore.findBy(function (record) {
		        		return record.data.structureSeq == info.structureSeq;
		        	});
					structureStore.data.items[index].data = info;
				}
				structureGrid.getView().refresh();
			}
		});
		let addStructurePlatPopup = Ext.create('ext.view.basicInformationMngt.popup.AddStructurePlatPopup', {
			writeAuth: me.writeAuth,
			getAuth: me.getAuth,
			reloadParent: function(info) {
				info.testTypeParent = getTestTypeTreeId();
				if(info.newRecord == true) {
					structureStore.insert(structureStore.data.length, info);
					getFormField(formInfo, 'type').setReadOnly(true);
				}else {
					let index = structureStore.findBy(function (record) {
		        		return record.data.structureSeq == info.structureSeq;
		        	});
					structureStore.data.items[index].data = info;
				}
				structureGrid.getView().refresh();
			}
		});
		let addStructureYlePopup = Ext.create('ext.view.basicInformationMngt.popup.AddStructureYlePopup', {
			writeAuth: me.writeAuth,
			getAuth: me.getAuth,
			reloadParent: function(info) {
				info.testTypeParent = getTestTypeTreeId();
				if(info.newRecord == true) {
					structureStore.insert(structureStore.data.length, info);
					getFormField(formInfo, 'type').setReadOnly(true);
				}else {
					let index = structureStore.findBy(function (record) {
		        		return record.data.structureSeq == info.structureSeq;
		        	});
					structureStore.data.items[index].data = info;
				}
				structureGrid.getView().refresh();
			}
		});
		let btnAddStructure = Ext.widget('mebutton', {
	    	text: 'Add Test Structure', 
	    	iconCls: 'fas fa-plus-circle btn-icon', 
	    	padding: '8 10', 
	    	handler: function() {
	    		functionAddStructure();
			}
	    });
		
		let cloneTestStructurePopup = Ext.create('ext.view.basicInformationMngt.popup.CloneTestStructurePopup', {
			reloadParent: function() {
				getTestFrameworkDetail(infoCurrent.testFwCode);
			}
		});
		
		let structureStore = Ext.widget('mestore');
		let structureGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			minHeight: 200,
			flex: 1,
			margin: '10 0 0 0',
			store: structureStore,
			tbar: [{xtype: 'label', text: ' Test Structure'}, {xtype: 'tbfill'}, btnAddStructure],
			listeners: { 
				cellclick: selectStructure,
		 	},
			columns: [
				{text : 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true, 
					renderer: function(value, metaData, record, row, col, store, gridView) {
						return row + 1;
					}
				},
				{text : 'Stage', width: 80, dataIndex: 'stageName', align: 'center', sortable: false, menuDisabled: true},
				{text : 'Level', minWidth: 150, flex: 1, dataIndex: 'levelNameList', align : 'center', sortable: false, menuDisabled: true,
	           		renderer: function(value, metaData, record, row, col, store, gridView) {
	           			if(isPLAT(record.data.testTypeParent)) return 'All';
	           			let info = _(record.data.levelList)
							.map(s => s.testCourseName)
							.join(', ');
						 metaData.tdAttr = Ext.String.format('data-qtip="{0}"', info);
						 return info;
					}
				},
				{text : 'Ordinal Date', minWidth: 100, flex: 1, dataIndex: 'structureOrdinalDay', align : 'center', sortable: false, menuDisabled: true,
					renderer: function(value, rootRecord, record) {
						if(_.includes([11, 12, 13], value)) return value + '<sup>th</sup>';
						if(value % 10 == 1) return value + '<sup>st</sup>';
						if(value % 10 == 2) return value + '<sup>nd</sup>';
						if(value % 10 == 3) return value + '<sup>rd</sup>';
						return value + '<sup>th</sup>';
	           		}
				},
				{text : 'Opened Duration', flex: 1.5, minWidth: 150, dataIndex: 'openDuration', align : 'center', sortable: false, menuDisabled: true},
				{text : 'Test Subject', flex: 2, minWidth: 200, align : 'center', sortable: false, menuDisabled: true,
	           		renderer: function(value, metaData, record, row, col, store, gridView) {
	           			let info = _(record.data.subjectList)
							.map(s => s.testSubjectName)
							.join(', ');
						 metaData.tdAttr = Ext.String.format('data-qtip="{0}"', info);
						 return info;
					}
				},
		        {header: 'Clone', align: 'center', width: 60, sortable: false, menuDisabled: true, //locked: true,
	                renderer: function(value, rootRecord, record) {
	                	let testTypeParent = record.data.testTypeParent;
	                	if(record.data.newRecord == true || isPLAT(testTypeParent) || isYLE(testTypeParent)) {
	                		return '';
	                	}
	                	if(infoCurrent.testFwCode != 0 && infoCurrent.studentExistYn == 'N') {
	                		return '<a href="#" action="clone" class="far fa-clone grid-icon"></a>';
	                	}
	                	return '';
	           		}
		        },
		        {header: ' ', align: 'center', width: 60, sortable: false, menuDisabled: true, //locked: true,
	                renderer: function(value, rootRecord, record) {
	                	if(record.data.studentExistYn != 'Y') {
	                		return '<a href="#" action="delete" class="far fa-trash-alt grid-icon"></a>';
	                	}
	                	return '';
	           		}
		        }
			],
		});
		
		let btnSave = Ext.widget('mebutton', {
	    	text: 'Save', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	handler: function() {
	    		saveTestFramework();
			}
	    });
		let btnApplyTest = Ext.widget('mebutton', {
	    	text: 'Apply Test Schedule for Classes', 
	    	iconCls: 'fas fa-check btn-icon', 
	    	padding: '8 10', 
	    	margin: '0 5',
	    	handler: function() {
	    		applyTestFramework();
			}
	    });
		let btnCancel = Ext.widget('mebutton', {
	    	text: 'Cancel', 
	    	iconCls: 'fas fa-ban', 
	    	padding: '8 10',
	    	handler: function() {
	    		if(infoCurrent.testFwCode != 0) {
	    			getTestFrameworkDetail(infoCurrent.testFwCode);
	    		}else {
	    			resetFormInfo();
	    		}
			}
	    });
		
		let tab = Ext.create('Ext.tab.Panel', {
			height: 500,
			width: '100%',
			tabPosition: 'bottom', 
//
            // this will force the tabBar to be displayed in the header instead of a dockedItem
			//tabBarHeaderPosition: 0, // before the title
			//tabBarHeaderPosition: 1, // after the title
			//tabBarHeaderPosition: 2, // values greater than 1 will move tools to the left of the tabs
			//tabBarHeaderPosition: 3,
            tabBarHeaderPosition: 1,
            header: {
                title: {
                    text: 'Hello World', flex: 0
                }
            },
            // setting flex on the tabBar will make it stretch to fill the available space and will then show the scroller icons when needed
            tabBar: {
                flex: 1
            },
            tools: [
                {type: 'plus', tooltip: 'Add a new tab',
                	handler: function () {
                		let tabPanel = this.up('tabpanel'),
                        	newPanel = tabPanel.add({
	                            xtype: 'panel',
	                            title: 'New Tab',
	                            closable: true
                        	});
                		tabPanel.setActiveItem(newPanel);
                	}
                }, 
                {type: 'refresh'}, 
                {type: 'gear'},
                {type: 'pin'},
                {type: 'search'},
                {type: 'save'},
                {type: 'help'},
            ],
            items: [
                {title: 'Foo', html: 'Select Foo 1', padding: '5px'}, 
                {title: 'Foo 1'}
            ],
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
	    			items: [btnExcel, {xtype: 'tbfill'}, btnRegister]
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
                campusGrid, 
                structureGrid,
                {xtype: 'container', layout: 'hbox', width: '100%', hidden: !me.writeAuth, hideMode: 'visibility', margin: '5 0 0 0',
                	items: [{xtype: 'tbfill'}, btnSave, btnApplyTest, btnCancel]
                },
//                tab
            ],
		});
		
		this.items = [leftPanel, rightPanel];
		this.callParent(arguments);
		
		init();
		async function init() {
			Common.getGeneralCode(targetStore, 'TU', 'SY0001', targetStoreOpt, getFormField(formSearch, 'target'));
			Common.getYearList(yearStore, yearStoreOpt, getFormField(formSearch, 'year'));
			Common.getGeneralCode(versionStore, 'TU', 'ST0001', versionStoreOpt, getFormField(formSearch, 'version'));
			Common.getGeneralCode(statusStore, 'TU', 'ST0003', statusStoreOpt, getFormField(formSearch, 'status'));
			Common.getLevelStore(levelStore, getFormField(formSearch, 'level'), levelStoreOpt, {clienCodeString: ''});
			Common.getTestTypeStore(typeStore, getFormField(formSearch, 'type'), typeStoreOpt);
			
			Common.getGeneralCode(statusInfoStore, 'TU', 'ST0003', statusInfoStoreOpt, getFormField(formInfo, 'status'));
			Common.getGeneralCode(targetInfoStore, 'TU', 'SY0001', targetInfoStoreOpt, getFormField(formInfo, 'target'));
			Common.getYearList(yearInfoStore, yearInfoStoreOpt, getFormField(formInfo, 'year'));
			Common.getGeneralCode(versionInfoStore, 'TU', 'ST0001', versionInfoStoreOpt, getFormField(formInfo, 'version'));
			Common.getTestTypeStore(typeInfoStore, getFormField(formInfo, 'type'), typeInfoStoreOpt);
			Common.getGeneralCodeKEMS(gradeStore, 'LC', 'MT0003', gradeStoreOpt, getFormField(formInfo, 'grade'));
			Common.getGeneralCode(yleStore, 'TU', 'ST0007', yleStoreOpt, getFormField(formInfo, 'yleLevel'));
			
//			rightPanel.setDisabled(true);
		}
		
		let paramsToSearch = {};
		function getTestFrameworkList() {
			if(!formSearch.isValid()) {
				return;
			}
			rightPanel.setDisabled(true);
			let testType = getFormField(formSearch, 'type').getValue();
			paramsToSearch = {
				targetGbn		: getFormField(formSearch, 'target').getValue(),
				yearCode		: getFormField(formSearch, 'year').getValue(),
				versionGbn		: getFormField(formSearch, 'version').getValue(),
				levelCodeList	: getFormField(formSearch, 'level').getValue() == undefined ? '' : getFormField(formSearch, 'level').getValue(),
				testType		: testType == '' ? 0 : testType,
				useYn			: getFormField(formSearch, 'status').getValue(),
				testName		: getFormField(formSearch, 'name').getValue()
			};
			mainStore.loadPage(1, {
				params: paramsToSearch
			})
		}
		
		let infoCurrent;
		async function getTestFrameworkDetail(testFwCode) {
			try {
        		let params = {
    				testFwCode : testFwCode,
				};
        		let ajaxUrl = '/basicInfomationMngt/getTestFrameworkDetail.json';
        		let json = await getDataAjax(ajaxUrl, params);
        		let campusList = json.info.campusList;
				let info = json.info.info;
				infoCurrent = info;
				console.log(info)
				campusList.forEach(s => {
					s.startDate = Common.stringTodate(s.startDate);
					s.endDate = Common.stringTodate(s.endDate);
					s.studentExistYn = info.studentExistYn;
				})
				
				getFormField(formInfo, 'testFwCode').setValue(info.testFwCode);
				getFormField(formInfo, 'grade').setValue(info.gradeGbnList.split(','));
				getFormField(formInfo, 'target').setValue(info.targetGbn);
				getFormField(formInfo, 'status').setValue(info.useYn);
				getFormField(formInfo, 'year').setValue(info.yearCode);
				getFormField(formInfo, 'version').setValue(info.versionGbn);
				getFormField(formInfo, 'type').setValue(info.testType);
				getFormField(formInfo, 'start').setValue(stringToDate(info.startDate));
				getFormField(formInfo, 'end').setValue(stringToDate(info.endDate));
				getFormField(formInfo, 'code').setValue(info.testFwCode);
				getFormField(formInfo, 'name').setValue(info.testName);
				getFormField(formInfo, 'note').setValue(info.testNote);
				getFormField(formInfo, 'applyStats').applyStatsCodeList = info.applyStatsCodeList;
				getFormField(formInfo, 'applyStats').setValue(info.applyStatsCodeName);
				
				btnCopyTestFW.setDisabled(info.studentExistYn == 'Y');
				btnAddStructure.setDisabled(info.studentExistYn == 'Y');
				btnApplyTest.setDisabled(json.info.structureLevelList.length == 0 || info.medalRangeYn == 'Y');
				
				if(campusList.length > 0) {
					campusStore.loadData(campusList);
				}else {
					campusStore.removeAll();
				}
				editInfoAfterApply(info.studentExistYn == 'Y');
				getFormField(formInfo, 'type').setReadOnly(json.info.structureLevelList.length > 0);
				getFormField(formInfo, 'yleLevel').setValue(info.yleLevelCode);
				getFormField(formInfo, 'yleLevel').setDisabled(info.testTypeParent != 'YL');
				if(isPLAT(info.testTypeParent)) {
	    			structureGrid.getColumns()[3].hide();
	    			structureGrid.getColumns()[4].hide();
	    			btnApplyTest.hide();
	    		}else {
	    			structureGrid.getColumns()[3].show();
	    			structureGrid.getColumns()[4].show();
	    			btnApplyTest.show();
	    		}
				loadStructure(json.info);
        	}catch(e) {
        		handleException(e);
				infoCurrent = null;
        	}
		}
		function loadStructure(data) {
			let structureList = _(data.structureLevelList)
				.uniqBy('structureSeq')
				.map(s => {
					let levelList = _(data.structureLevelList)
						.filter(a => a.structureSeq == s.structureSeq)
						.map(a => {
							return {testCourseCode: a.testCourseCode, testCourseName: a.testCourseName};
						})
						.value();
					let subjectList = _(data.subjectList)
						.filter(a => a.structureSeq == s.structureSeq)
						.map(a => {
							let parts = _(data.subjectPartList)
								.filter(b => b.structureSeq == a.structureSeq && b.testSubjectCode == a.testSubjectCode)
								.map(b => {
									return {
										partQuestionCount: b.partQuestionCount, partSeq: b.partSeq, totalScore: b.totalScore, partWritingQuestionCount: b.partWritingQuestionCount, 
										totalWritingScore: b.totalWritingScore, platStatisticYn: b.platStatisticYn == 'Y', inputWritingYn: b.inputWritingYn == 'Y',
									}
								})
								.value();
							return {
								duration: a.duration, partNum: a.partNum, quizCnt: a.quizCnt, requriedTestYn: a.requriedTestYn, structureSubjectOrder: a.structureSubjectOrder,
								teacherControlYn: a.teacherControlYn, testSubjectCode: a.testSubjectCode, testSubjectName: a.testSubjectName, parts: parts,
								rubricCode: a.rubricCode, rubricTitle: a.rubricTitle,
							};
						})
						.value();
					return {
						structureSeq: s.structureSeq, structureOrdinalDay: s.structureOrdinalDay, stageName: s.stageName, stageNum: s.stageNum, appliedTimeLimitYn: s.appliedTimeLimitYn,
						openDuration: s.openDuration, recordStatus: s.recordStatus, testTypeParent: s.testTypeParent, userStageName: s.userStageName, yleLevelCode: s.yleLevelCode,
						testDuration: s.testDuration, levelList: levelList, subjectList: subjectList, newRecord: false, studentExistYn: data.info.studentExistYn, testFwCode: s.testFwCode,
					}
				})
				.value();
			if(structureList.length > 0) {
				structureStore.loadData(structureList);
			}else {
				structureStore.removeAll();
			}
		}
		
		function selectStructure(view, cell, cellIndex, record, row, rowIndex, e) {
			if(cellIndex == 0) {
				console.log(record.data)
				return;
			}
			let clientCodeList = _(campusStore.data.items)
	    		.map(s => s.data.clientCode)
	    		.toString();
	    	if($(e.target).attr('action') == 'delete') {
	    		Ext.Msg.confirm('', 'Do you want to delete it?', function(msg) {
			        if (msg == 'yes') {
			        	structureStore.remove(record);
			        	if(structureStore.data.length == 0) {
			        		getFormField(formInfo, 'type').setReadOnly(false);
			        	}
			        }
				});
	    		return;
	    	}
    		if($(e.target).attr('action') == 'clone') {
	    		let stageLevel = [];
	    		structureStore.each(function(record) {
	    			let levelList = _(record.data.levelList)
	    				.map(s => `${record.data.stageNum}_${s.testCourseCode}`)
	    				.value();
	    			stageLevel = stageLevel.concat(levelList);
	    		});
	    		cloneTestStructurePopup.reloadPopup(record.data, stageLevel, clientCodeList);
	    		return;
	    	}
    		record.data.newRecord = false;
    		let structureInfo = {
				info: record.data
    		}
    		if(isPLAT(record.data.testTypeParent)) {
    			addStructurePlatPopup.reloadPopup(structureInfo);
    			return;
    		}
    		if(isYLE(record.data.testTypeParent)) {
    			addStructureYlePopup.reloadPopup(structureInfo, clientCodeList);
    			return;
    		}
    		addTestStructurePopup.reloadPopup(structureInfo, clientCodeList, []);
		}
		
		function editInfoAfterApply(readOnlyFlag) {
			getFormField(formInfo, 'target').setReadOnly(readOnlyFlag);
			getFormField(formInfo, 'year').setReadOnly(readOnlyFlag);
			getFormField(formInfo, 'start').setReadOnly(readOnlyFlag);
			getFormField(formInfo, 'note').setReadOnly(readOnlyFlag);
			getFormField(formInfo, 'grade').setReadOnly(readOnlyFlag);
		}
		
		function getLevelListToSave() {
			let levelList = [];
			structureStore.each(function(record) {
				let list = record.data.levelCodeList;
				list = Common.isString(list) ? list.split(',') : [list];
				list = list.map(s => s + '_' + record.data.stageNum);
				levelList = levelList.concat(list);
			})
			Ext.each(levelList, function(item) {
				if(_.filter(levelList, function(level) { return item == level; }).length > 1) {
					throw new Error('Duplicate stage level');
				}
			})
			return levelList;
		}
		
		function getCampusListToSave(startDateTW, endDateTW) {
			let clientList = [];
			campusStore.each(function(record) {
				let startDate = Ext.Date.format(record.data.startDate, 'Ymd');
				let endDate = Ext.Date.format(record.data.endDate, 'Ymd');
				if(startDate == null || endDate == null || startDate > endDate || startDate < startDateTW || endDate > endDateTW) {
					throw new Error('Wrong campus date');
				}
				clientList.push({
					clientCode	: record.data.clientCode,
					startDate	: startDate,
					endDate		: endDate
				});
			})
			return clientList;
		}
		
		async function saveTestFramework() {
			let title = 'Register Test Framework';
			try {
				if(!formInfo.isValid()) {
					throw new Error();
				}
				let levelList = [];
				structureStore.data.items.forEach(s =>{
					levelList = _.concat(levelList, s.data.levelList);
				})
				if(!isPLAT(getTestTypeTreeId())) {
					if(_.uniqBy(levelList, 'testCourseCode').length != levelList.length) {
						throw new Error('Duplicate level');
					}
				}
				
				let structureList = [];
				let subjectlist = [];
				let partlist = [];
				let testFwCode = getFormField(formInfo, 'testFwCode').getValue();
				
				structureStore.each(function(record, index) {
					let structure = _.cloneDeep(record.data);
					structure.levelCodeList = _(structure.levelList)
						.map(s => s.testCourseCode)
						.join(',');
					let structureSeq = ++index;
					structure.structureSeq = structureSeq;
					structure.testFwCode = testFwCode;
					Ext.each(record.data.subjectList, function(s) {
						let subject = _.cloneDeep(s);
						subject.structureSeq = structureSeq;
						s.parts.forEach((a, partSeq) => {
							let part = _.cloneDeep(a);
							part.structureSeq = structureSeq;
							part.partSeq = ++partSeq;
							part.testSubjectCode = subject.testSubjectCode;
							part.inputWritingYn = part.inputWritingYn == true ? 'Y' : 'N';
							part.platStatisticYn = part.platStatisticYn == true ? 'Y' : 'N';
							
							delete part.id;
							partlist.push(part);
						})
						delete subject.id;
						delete subject.parts;
						subjectlist.push(subject);
					})
					delete structure.subjectList;
					delete structure.newRecord;
					delete structure.id;
					delete structure.levelList;
					structureList.push(structure);
				})
				
				let startDateTW = Ext.Date.format(getFormField(formInfo, 'start').getValue(), 'Ymd');
				let endDateTW = Ext.Date.format(getFormField(formInfo, 'end').getValue(), 'Ymd');
				let clientList = getCampusListToSave(startDateTW, endDateTW);
				
				let testType = getFormField(formInfo, 'type').getValue();
				let testTypeInfo = typeInfoStore.findNode('id', testType).data;
				let params = {
					testFwCode			: testFwCode,
					targetGbn			: getFormField(formInfo, 'target').getValue(),
					useYn				: getFormField(formInfo, 'status').getValue(),
					yearCode			: getFormField(formInfo, 'year').getValue(),
					versionGbn			: getFormField(formInfo, 'version').getValue(),
					testType			: testType,
					yleLevelCode		: isYLE(testTypeInfo.treeId) ? getFormField(formInfo, 'yleLevel').getValue() : '',
					startDate			: startDateTW,
					endDate				: endDateTW,
					gradeGbnList		: isPLAT(testTypeInfo.treeId) ? getFormField(formInfo, 'grade').getValue().toString() : '',
					testName			: getFormField(formInfo, 'name').getValue(),
					testNote			: getFormField(formInfo, 'note').getValue(),
					applyStatsCodeList	: getFormField(formInfo, 'applyStats').applyStatsCodeList,
					clientListJson		: Ext.encode(clientList),
					structureListJson	: Ext.encode(structureList),
					subjectlistJson		: Ext.encode(subjectlist),
					partlistJson		: Ext.encode(partlist)
				};
				console.log(params)
	        	let ajaxUrl = '/basicInfomationMngt/saveTestFramework.json';
	        	await saveDataAjax(getMsgConfirmSave(), ajaxUrl, params, getMsgSaveSuccess(), title);
	        	resetFormInfo();
				rightPanel.setDisabled(true);
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
			}catch(e) {
				handleException(e);
			}
		}
		
		function resetFormInfo() {
			formInfo.reset();
			infoCurrent = null;
			getFormField(formInfo, 'target').setValue(targetInfoStore.first());
			getFormField(formInfo, 'status').setValue('N');
			getFormField(formInfo, 'year').setValue(new Date().getFullYear());
			getFormField(formInfo, 'version').setValue(versionInfoStore.first());
			getFormField(formInfo, 'type').setReadOnly(false);
			getFormField(formInfo, 'yleLevel').setValue(yleStore.first());
			getFormField(formInfo, 'yleLevel').setDisabled(true);
//			let year = getFormField(formInfo, 'year').getValue();
//			getFormField(formInfo, 'start').setValue(year + '/01/01');
//			getFormField(formInfo, 'end').setValue(year + '/12/31');
			campusStore.removeAll();
			structureStore.removeAll();
			btnCopyTestFW.setDisabled(true);
			btnAddCampus.setDisabled(false);
			btnAddStructure.setDisabled(false);
			btnApplyTest.setDisabled(true);
			editInfoAfterApply(false);
		}
		resetFormInfo();
		
		async function checkCampusLevel(listCampus) {
			try {
				let clientCodeList = _(listCampus)
					.map('clientCode')
					.value();
				campusStore.each(function(record) {
					clientCodeList.push(record.data.clientCode);
				})
				
				let levelCodeList = _(structureStore.data.items)
					.map(s => {
						return _(s.data.levelList)
							.map('testCourseCode')
							.join(',');
					})
					.join(',');
				
				let params = {
					levelCodeList	: levelCodeList,
					clientCodeList	: clientCodeList.toString(),
					countClient		: clientCodeList.length
				}
				let json = await getDataAjax('/basicInfomationMngt/checkCampusLevel.json', params);
				let checkFlag = json.checkFlag;
				if(checkFlag == false) {
					throw new Error('There is confliction data. Please check Test Structure to apply to selected Campus (es)');
				}
				listCampus.forEach(s => {
					campusStore.insert(campusStore.data.length, s);
				})
			}catch(e) {
				handleException(e);
			}
		}
		
		function functionAddStructure() {
			try {
    			if(campusStore.data.length == 0) {
    				throw new Error('Please add campus');
	    		}
    			let typeField = getFormField(formInfo, 'type');
	    		if(!typeField.isValid()) {
	    			throw new Error('Please choose Test Type');
	    		}
	    		let testTypeRecord = _.find(typeField.data, {detailCode: typeField.getValue() + ''});
	    		
	    		let structureInfo = {
	    			info: null, structureSeq: structureStore.data.length + 1, testTypeParent: testTypeRecord.treeId
	    		}
//	    		PLAT
	    		if(isPLAT(testTypeRecord.treeId)) {
	    			addStructurePlatPopup.reloadPopup(structureInfo);
	    			return;
	    		}
	    		let clientCodeList = _(campusStore.data.items)
		    		.map(s => s.data.clientCode)
		    		.value();
//	    		YLE
				if(isYLE(testTypeRecord.treeId)) {
	    			addStructureYlePopup.reloadPopup(structureInfo, clientCodeList.toString());
	    			return;
	    		}
//				unit, level
				let otherStructures = _(structureStore.data.items)
					.map(s => s.data)
					.cloneDeep();
	    		addTestStructurePopup.reloadPopup(structureInfo, clientCodeList.toString(), otherStructures);
    		}catch(e) {
    			handleException(e);
    		}
		}
		
		async function applyTestFramework() {
			let title = 'Register Test Framework';
			try {
				let testFwCode = parseInt(getFormField(formInfo, 'testFwCode').getValue());
				if(testFwCode == 0) {
					throw new Error();
				}
				if(isPLAT(infoCurrent.testTypeParent)) {
					throw new Error('Not apply for PLAT Test');
				}
				let params = {
					testFwCode	: testFwCode,
					useYn		: getFormField(formInfo, 'status').getValue()
				};
				let ajaxUrl = '/basicInfomationMngt/applyTestFramework.json';
				let msgApply = 'The schedule will be applied for related classes of all applied campuses with the rule: The class hasn\'t started yet and had timetable (disable old data).';
				await saveDataAjax(msgApply, ajaxUrl, params, getMsgSaveSuccess(), title);
				resetFormInfo();
				rightPanel.setDisabled(true);
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
			}catch(e) {
				handleException(e);
			}
		}
		function isYLE(treeId) {
			return treeId == 'YL';
		}
		function isPLAT(treeId) {
			return _.includes(['PT', 'AT'], treeId);
		}
		
		let formExcel = Ext.create('Ext.form.Panel', {
			standardSubmit: true,
			url: CONTEXT_PATH + '/basicInfomationMngt/testFrameworkExcel.excel'
		})
		function exportExcel(excelFlag) {
			try {
				if((excelFlag == 'S' && mainGrid.getSelectionModel().getSelection().length == 0) || mainStore.data.length == 0) {
					throw new Error('No data to export');
				}
				Ext.Msg.confirm('Register Test Framework', 'Do you want to export Excel?', async function(btnText) {
					if(btnText == 'yes'){
						let dataJson = [];
						paramsToSearch.excelFlag = excelFlag;
						
						if(excelFlag == 'S') {
							let selectedRows = mainGrid.getSelectionModel().getSelection();
							selectedRows.sort(function(a, b) {
								return a.data.rowNo - b.data.rowNo;
							})
							dataJson = await pushDataToExport(selectedRows);
						} else if(excelFlag == 'P') {
							dataJson = await pushDataToExport(mainStore.data.items);
						}
						paramsToSearch.dataJson = Ext.encode(dataJson);
						formExcel.submit({params: paramsToSearch});
					}	            
				}, this);
			}catch(e) {
				handleException(e);
			}
		}
		function pushDataToExport(data) {
			return _(data)
				.map(s => s.data)
				.value();
		}
		
//		END
	}
});

