layui.use(['form'], function(){
	var form = layui.form(),
	$ = layui.jquery;

	var $sender_province = $('#sender_province')
	,$sender_city = $('#sender_city')
	,$sender_county = $('#sender_county')
	,senderCityValue = $sender_city.val()
	,senderCountyValue = $sender_county.val();

	$sender_province.combobox({    
		data: [{    
			"id":1,    
			"text":"汉东省"   
		},{    
			"id":2,    
			"text":""   
		},{    
			"id":3,    
			"text":"",    
		},{    
			"id":4,    
			"text":""   
		},{    
			"id":5,    
			"text":""   
		}],
		valueField:'id',    
		textField:'text',
		onSelect: function (rec) {
			$sender_city.combobox('clear');
			$sender_county.combobox('clear');
			// $sender_city.combobox('reload',base_shop.region + "?parent_id=" +rec.id);
		},
		onLoadSuccess : function (data){
			$sender_city.combobox('setValue',senderCityValue);
		}
	});  
	$sender_city.combobox({
		valueField:'id',
		textField:'text',
		onSelect:function(rec){
			$sender_county.combobox('clear');
			// $sender_county.combobox('reload',base_shop.region + "?parent_id=" +rec.id);
		}, 
		onLoadSuccess : function (data){
			$sender_county.combobox('setValue',senderCountyValue);
		}
	});
	$sender_county.combobox({
		valueField:'id',
		textField:'text',
		onLoadSuccess: function (data){
			senderCountyValue = null;
		}
	});

});    