layui.use('form', function() {
	var form = layui.form(),
	$ = layui.jquery;

    //登记时间 datetime组件激活
    claimTime();
    //展开隐藏高级搜索功能
    AdvancedSearch();
    //问题件点击跳转详情页,另起标签
    linkDetail();
    //查询，重置
    searchReset();
    //省市站点选择
    selectSite();

    //登记时间
    function claimTime() {
    	$('#date_start').datetimebox({
    		value: '3/4/2010 2:3',
    		required: true,
    		showSeconds: false
    	});
    	$('#date_end').datetimebox({
    		value: '3/4/2010 2:3',
    		required: true,
    		showSeconds: false
    	});
    }

    //展开隐藏高级搜索功能
    function AdvancedSearch() {
    	$('.show-btn').on('click', function(event) {
    		event.preventDefault();
    		$('.advanced-query').toggle();
    		var task = $('.advanced-query').css('display');
    		if (task.indexOf('none') > -1) {
    			$(this).text('展开其他搜索条件');
    		} else {
    			$(this).text('收起其他搜索条件');
    		}
    	});
    }

    //问题件点击跳转详情页,另起标签
    function linkDetail() {
    	$(document).on('click', '.express-box', function(event) {
    		event.preventDefault();
    		var order_no = $(this).find('span.order_no').text().trim();
    		parent.tab.tabAdd({
    			href: 'issue_release_detail.html',
    			title: '无头件详情'
    		});
    	});
    }

    //查询，重置
    function searchReset() {
        //查询
        var page = {
        	pageNumber: 1,
        	pageSize: 12
        };
        $('.search').on('click', function(event) {
        	event.preventDefault();
        	var data = $('#claimForm').serializeArray();
        	data.push(page);
        	$('#claimForm').form('submit', {
        		type: 'post',
                // url: headless.search,
                data: data,
                onSubmit: function() {
                    //时间校验，必填项校验。
                    var startTime = new Date($('#date_start').datetimebox('getValue')).getTime(),
                    nowTime = new Date().getTime(),
                    task = (nowTime - startTime) / 1000 / 3600 / 24 / 30;
                    if (task > 3) {
                    	layer.msg('只能查询登记时间在最近三个月以内的数据！', { time: 1000, icon: 5, offset: '80px' });
                    	return false;
                    }
                    var isValid = $(this).form('validate');
                    return isValid;
                },
                success: function(data) {
                	pagination();
                	resultList();
                    /*console.log(data)
                    var msg = JSON.parse(data).message,
                    code = JSON.parse(data).code;
                    if (code == 200) {
                        layer.msg('成功', { time: 1000 });
                    } else if (code == 600) {
                        layer.msg(msg, { time: 1000 });
                    } else {
                        layer.msg('失败，服务器响应异常!', { time: 1000 });
                    }*/
                }
            });
        });
        //重置
        $('.reset').on('click', function(event) {
        	event.preventDefault();
        	$('#claimForm').form('reset');
        });
    }

    //省市站点选择
    function selectSite() {
    	$('#sender_province').combobox({
    		// url: headless.province,
    		valueField: 'ProvinceID',
    		textField: 'ProvinceName',
    		onSelect: function(rec) {
    			$('#sender_city').combobox('clear').combobox('reload', headless.city + "?province_id=" + rec.ProvinceID);
    			$("#sender_site").combobox('clear').combobox('reload', headless.site + "?province_id=" + rec.ProvinceID);
    		},
    		onLoadSuccess: function(data) {}
    	});
    	$('#sender_city').combobox({
    		valueField: 'CityID',
    		textField: 'CityName',
    		onSelect: function(rec) {
    			$("#sender_site").combobox('clear').combobox('reload', headless.site + "?city_id=" + rec.CityID);
    		},
    		onLoadSuccess: function(data) {

    		}
    	});
    	$("#sender_site").combobox({
    		valueField: 'SiteId',
    		textField: 'SiteName',
    		onLoadSuccess: function(data) {

    		}
    	});
    }

});
