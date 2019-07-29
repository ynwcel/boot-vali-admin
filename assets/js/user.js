;;(function($){
    $('select.select2').select2();
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].iCheck, input[type="radio"].iCheck,input[type="checkbox"].icheck, input[type="radio"].icheck').iCheck({
      checkboxClass: 'icheckbox_minimal-green',
      radioClass   : 'iradio_minimal-green'
    })

    $('input.datepicker,input.date').datetimepicker({
         format: 'YYYY-MM-DD',//use this option to display seconds
         icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-arrows ',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
         }
    }).attr('autocomplete','off').prop('autocomplete','off');
    $('input.datetimepicker,input.datetime').datetimepicker({
         
         format: 'YYYY-MM-DD HH:mm:ss ',//use this option to display seconds
         showClear:true,
         //showClose:true,
         icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-arrows ',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
         }
        }).attr('autocomplete','off').prop('autocomplete','off');

    $('input.timepicker,input.time').datetimepicker({
         format: 'HH:mm:ss ',//use this option to display seconds
         icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-arrows ',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
         }
        }).attr('autocomplete','off').prop('autocomplete','off');


})(jQuery);



function layer_load($title,$url,width,height,$layer_id){
    var loader = layer.open({ type:3 });
    width = width || 600;
    height = height || 420;
    $.get($url,function($content){
        layer.close(loader);       
        layer.open({
          type: 1,
          id:'layui-layer_' + ($('div.layui-layer').length+1),
          skin: 'layui-layer-rim', //加上边框
          area: [width+'px',height+'px'], //宽高
          content: '<div class="container-fluid" style="padding-top:20px;"><div class="row"><div class="col-xs-12">' + $content + '</div></div></div>',
          title:$title
        });
    })
}

function layer_load_max($title,$url,$layer_id){
    var loader = layer.open({ type:3 });
    width = parseInt($(window).width()-20);
    height = parseInt($(window).height()-20);
    $.get($url,function($content){
        layer.close(loader);       
        layer.open({
          type: 1,
          id:'layui-layer_' + ($('div.layui-layer').length+1),
          skin: 'layui-layer-rim', //加上边框
          area: [width+'px',height+'px'], //宽高
          content: '<div class="container-fluid" style="padding-top:20px;"><div class="row"><div class="col-xs-12">' + $content + '</div></div></div>',
          title:$title
        });
    })
}

function layer_show($title,$content,width,height){
    width = width || 600;
    height = height || 420;
    layer.open({
      type: 1,
      id:'layui-layer_' + ($('div.layui-layer').length+1),
      skin: 'layui-layer-rim', //加上边框
      area: [width+'px',height+'px'], //宽高
      content: '<div class="container-fluid" style="padding-top:20px;"><div class="row"><div class="col-xs-12">' + $content + '</div></div></div>',
      title:$title
    });
}

function layer_confirm($text,$url){
    var confirm;
    confirm = layer.open({
        content:$text,
        icon:3,
        btn: ['确定','取消'], //按钮
        yes:function(){
            if($url){
                window.location.href=$url;
            }
            layer.close(confirm);
        }, 
        no:function(){
            layer.close();
        }
    });
}

function layer_success($text,$url){
    var layer_success;
    layer_success = layer.open({
        title:'提示',
        content:$text,
        icon:6,
        btn: ['确定'], //按钮
        yes:function(){
            if($url){
                window.location.href=$url;
            }
            layer.close(layer_success);
        }
    });
}
function layer_success_reload($text){
    var layer_success;
    layer_success = layer.open({
        title:'提示',
        content:$text,
        icon:6,
        btn: ['确定'], //按钮
        yes:function(){
            window.location.reload();
            layer.close(layer_success);
        }
    });
}

function layer_error($text,$url){
    var layer_error;
    layer_error = layer.open({
        title:'提示',
        content:$text,
        icon:5,
        btn: ['确定'], //按钮
        yes:function(){
            if($url){
                window.location.href=$url;
            }
            layer.close(layer_error);
        }
    });
}
function layer_error_reload($text){
    var layer_error;
    layer_error = layer.open({
        title:'提示',
        content:$text,
        icon:5,
        btn: ['确定'], //按钮
        yes:function(){
            window.location.reload();
            layer.close(layer_error);
        }
    });
}

function layer_ajax_form($el,success_fn,error_fn){
    var err_fn = function(){
        layer_error('请求出错');
    }
    var suc_fn = function(){
        layer_error('请求成功');
    }
    success_fn = success_fn || suc_fn;
    error_fn = error_fn || err_fn;
    $($el).bind('submit',function(){
        var el = $(this);
        var el_action = el.attr('action');
        var el_method = el.attr('method');
        var el_data = el.serialize();
            el_data= el_data+'&'+'sessionStorage_server_id='+sessionStorage.getItem('server_id');
        var t = layer.load(0);
        $.ajax({
            url:el_action,
            data:el_data,
            method:el_method,
            cache:false,
            complete:function(){
                layer.close(t);
            },
            success:function(d){
                success_fn(d);
            },
            error:function(e){
                error_fn(e);
            }
        })
        return false;
    })
}

;(function($){
    $(document).ready(function(){
        $('body').delegate('form.layer_ajax_form','submit',function(){
            var el = $(this);
            var error_fn = window[el.attr('onerror')];
            var success_fn = window[el.attr('onsuccess')];
            if(typeof(success_fn) == "undefined"){
                success_fn = function(_d){
                    try{
                        d = JSON.parse(d);
                    }catch($err){
                        d = _d;
                    }
                    if(typeof(d) == 'object' && typeof(d.flag) == 'boolean' && typeof(d.msg)=='string'){
                        if(d.flag == true){
                            layer_success_reload(d.msg);
                        }else{
                            layer_error(d.msg);
                        }
                    }else if(typeof(d) == 'string' && d != ""){
                        layer_success(d);
                    }else{
                        layer_success('操作成功');
                    }
                }
            }
            if(typeof(error_fn) == "undefined"){
                error_fn = function(){
                    layer_error('请求出错');
                }
            }
            var t = layer.load(0);
            var el_action = el.attr('action');
            var el_method = el.attr('method');
            var el_data = el.serialize();
            $.ajax({
                url:el_action,
                data:el_data,
                dataType:'json',
                method:el_method,
                cache:false,
                success:function(d){
                    success_fn(d);
                    layer.close(t);
                },
                error:function(e){
                    error_fn(e);
                    layer.close(t);
                }
            })
            return false;
        })
    })
})(jQuery)