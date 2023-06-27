
function handleException(e) {
	if(!(e.info == null) && e.info.status == 401) {
	    localStorage.removeItem("accessToken");
	    localStorage.removeItem("username");
	    document.location.href = CONTEXT_PATH + "view/login";
	}else {
	    let message = e.message;
	    if(message != null && message != '') {
	        showMessageBoxError(message);
	    }else {
            showMessageBoxError(e.info.message);
	    }
        console.log(e.info)
        console.log(e.stack)
	}
}

function showMessageSaveSuccess(){
	Ext.MessageBox.show({
		cls : 'messageBoxTextCenter',
		title : 'Emira',
		msg : 'Saved data successfully',
		buttons : Ext.MessageBox.YES,
		icon : Ext.MessageBox.INFO
	});
}

function showMessageBoxError(message){
	Ext.MessageBox.show({
		cls : 'messageBoxTextCenter',
		title : 'Emira',
		msg : message,
		buttons : Ext.MessageBox.YES,
		icon : Ext.MessageBox.ERROR
	});
}
function getDataAjax(ajaxUrl, params) {
	let deferred = new Ext.Deferred();
	mask();
	Ext.Ajax.request({
		url : CONTEXT_PATH + ajaxUrl,
		jsonData : params,
		timeout: 10000,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),

		},
		success : function(response) {
			var json = Ext.decode(response.responseText);
            if(json.status != '00') {
                deferred.reject({info: json});
            }else {
                deferred.resolve(json);
            }
		},
		error : function(response) {
			unMask();
			deferred.reject({info: Ext.decode(response.responseText)});
		},
		failure: function(response){
			unMask();
			deferred.reject({info: Ext.decode(response.responseText)});
		}
	});
	return deferred.promise;
}

//let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwOTA2NzA0OTA1IiwiaWF0IjoxNjg3MDg4MzA4LCJleHAiOjE2ODcxNzQ3MDh9.o8h2htVXrIVwifGSnIdVbDIrSVfBAIfH3TFJPl9L2i4241VHc5T70lDrQxHJ7GRhyXo2DN9sh6k3djtZgn3IEw';
function postDataAjax(ajaxUrl, params) {
	let deferred = new Ext.Deferred();
	mask();
	Ext.Ajax.request({
		url : CONTEXT_PATH + ajaxUrl,
		jsonData : params,
		timeout: 10000,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
//			'Authorization': 'Bearer ' + token,
			'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
		},
		success : function(response) {
			var json = Ext.decode(response.responseText);
			if(json.status != '00') {
			    deferred.reject({info: json});
			}else {
			    deferred.resolve(json);
            }
			unMask();
		},
		error : function(response) {
			unMask();
			deferred.reject({info: Ext.decode(response.responseText)});
		},
		failure: function(response){
			unMask();
			deferred.reject({info: Ext.decode(response.responseText)});
		}
	});
	return deferred.promise;
}

function mask() {
	Ext.getBody().addCls('parentMask'); 
	Ext.getBody().mask("Loading...", "x-mask-loading", false);
}
function unMask() {
	Ext.getBody().removeCls('parentMask');
	Ext.getBody().unmask();
}

function getFormField(form, field) {
	return form.getForm().findField(field);
}

function getStoreOpt(isAddNewOption, newDisplayField, newValueField, isSelectedValue, selectedValue, isSelectFirst) {
	return {
		isAddNewOption 	: isAddNewOption,
		newDisplayField : newDisplayField,
		newValueField 	: newValueField,
		isSelectedValue : isSelectedValue,
		selectedValue 	: selectedValue,
		isSelectFirst	: isSelectFirst
	}
}

function formatSizeUnits(bytes){
	if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
	else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
	else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
	else if (bytes>1)           {bytes=bytes+' bytes';}
	else if (bytes==1)          {bytes=bytes+' byte';}
	else                        {bytes='0 byte';}
	return bytes;
}

function setParamsToProxy(params, proxy) {
	for (const key of Object.keys(params)) {
	    const value = params[key];
	    proxy.setExtraParam(key, value);
	}
}
function formatNumber(value, decimalPlaces) {
	return Number(Math.round(value + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}
