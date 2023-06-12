Ext.define('ext.AdminPage', {
	extend: 'Ext.form.Panel',
	header: false,
	border: false,
	width : '100%',
	layout: 'fit',
	initComponent : function() {

		let me = this;

		let adminClass = Ext.create('ext.AdminClass');
		let adminStudent = Ext.create('ext.AdminStudent');

		let tab = Ext.create('Ext.tab.Panel', {
//            height: 500,
//            width: '100%',
            tabPosition: 'top',
//
            // this will force the tabBar to be displayed in the header instead of a dockedItem
            //tabBarHeaderPosition: 0, // before the title
            //tabBarHeaderPosition: 1, // after the title
            //tabBarHeaderPosition: 2, // values greater than 1 will move tools to the left of the tabs
            //tabBarHeaderPosition: 3,
            tabBarHeaderPosition: 0,
//            header: {
//                title: {
//                    text: 'Hello World', flex: 0
//                }
//            },
            // setting flex on the tabBar will make it stretch to fill the available space and will then show the scroller icons when needed
            tabBar: {
                flex: 1
            },
//            tools: [
//                {type: 'plus', tooltip: 'Add a new tab',
//                    handler: function () {
//                        let tabPanel = this.up('tabpanel'),
//                            newPanel = tabPanel.add({
//                                xtype: 'panel',
//                                title: 'New Tab',
//                                closable: true
//                            });
//                        tabPanel.setActiveItem(newPanel);
//                    }
//                },
//                {type: 'refresh'},
//                {type: 'gear'},
//                {type: 'pin'},
//                {type: 'search'},
//                {type: 'save'},
//                {type: 'help'},
//            ],
            items: [
                {title: '<b>CLASS</b>', layout: 'fit', items: [adminClass]},
                {title: '<b>STUDENT</b>', layout: 'fit', items: [adminStudent]}
            ],
        });

		this.items = [tab];
		this.callParent(arguments);

//		END
	}
});

