$(function() {
	init();
});

function init() {
    $('#trigerurl').change(function(){

    });

	$('#action-selector').change(function(event) {
		switchCustomArea($(this).val());
	});

    $('#addbtn').click(function(){
        addParamInput();
    });

    $('#savebtn').click(function(){
        changeTriUrl();
        changeAction();
    });

    initValues();
}

function initValues(){
    chrome.storage.local.get('aa_mode', function(v){
        chrome.storage.local.get('aa_trigerurl', function(tri){
            if (tri.aa_trigerurl && tri.aa_trigerurl != '') {
                $('#trigerurl').val(tri.aa_trigerurl);
            }
        });
        if (v.aa_mode == 'sub'){
            $('#action-selector').val('SUB_FORM');
            switchCustomArea('SUB_FORM');

            chrome.storage.local.get('aa_sub_turl', function(scr){
               $('#targeturl').val(scr.aa_sub_turl);
            });
           chrome.storage.local.get('aa_sub_kvs', function(kvs){
               for(var i=0; i<kvs.aa_sub_kvs.length; i++){  
                   $('[name=aa_name'+ i +']').val(kvs.aa_sub_kvs[i].k);
                   $('[name=aa_value'+ i +']').val(kvs.aa_sub_kvs[i].v);
                   addParamInput();
               }
           }); 
        }else if(v.aa_mode == 'cs'){
            $('#action-selector').val('CUSTOM');
            switchCustomArea('CUSTOM');
            
            chrome.storage.local.get('aa_cs_scr', function(scr){
                $('#csscr').val(scr.aa_cs_scr);
            });
        }
    });
}

function switchCustomArea(v){	
	if (v == 'SUB_FORM'){
		$('.custom-area').show();
		$('.custom-area2').hide();
	}else if (v == 'CUSTOM'){
		$('.custom-area2').show();
		$('.custom-area').hide();
	}
	return true;
}

var paramNum=0;
function addParamInput(){
	paramNum++;
	$(".input-area").append('<div class="input-keyval">' +
                    			'<input name="aa_name' + paramNum + '" placeholder="Param Name">' +
                				'<span>:</span>' +
                    			'<input name="aa_value' + paramNum + '" placeholder="Param Value">' +
                			'</div>');
}

function changeAction(){
    var acv = $('#action-selector').val();
    if(acv == 'SUB_FORM'){
        chrome.storage.local.set({"aa_mode": "sub"});
        var kvs = [];
        $('.input-keyval').each(function(index){
            console.log(index);
            var k = $(this).find('[name=aa_name'+ index +']').val();
            var v = $(this).find('[name=aa_value'+ index +']').val();
            if (k != ''){
                var kv = {};
                kv.k = k;
                kv.v = v;
                kvs.push(kv);
            }
        });
        var turl = $('#targeturl').val();
        console.log(kvs);
        console.log(turl);
        if(!turl || turl == ''){
             $('#targeturl').css('border-color','red')
            return false;
        }
        chrome.storage.local.set({"aa_sub_turl": turl});
        chrome.storage.local.set({"aa_sub_kvs": kvs});
    }else {
        chrome.storage.local.set({"aa_mode": "cs"});
        var scr = $('#csscr').val().trim();
        if(scr && scr != '') {
            chrome.storage.local.set({"aa_cs_scr": scr});    
        }
        console.log(scr);    
    }
}
function changeTriUrl() {
    chrome.storage.local.set({"aa_trigerurl": $('#trigerurl').val()});
    console.log('trigerurl=', $('#trigerurl').val());
}
