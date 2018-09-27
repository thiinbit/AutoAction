chrome.storage.local.get('aa_trigerurl', function(_tri){
    var tri = _tri.aa_trigerurl.trim();
    if(tri && tri != '') {
        var curUrl = location.href;
        var triPatt = new RegExp(tri);
        if (triPatt.test(curUrl)) {
            chrome.storage.local.get('aa_mode', function(_m) {
                var m = _m.aa_mode.trim();
                if(m && m == 'sub') {
                    chrome.storage.local.get('aa_sub_turl', function(_turl) {
                        var turl = _turl.aa_sub_turl.trim();
                        if(turl && turl != '') {
                            chrome.storage.local.get('aa_sub_kvs', function(_kvs) {
                                var kvs = _kvs.aa_sub_kvs;
                                var kvParams = {};
                                for(var kv of kvs) {
                                    kvParams[kv.k] = kv.v;
                                }
                                $.post(turl, kvParams);
                            });
                        }
                    });
                }else if(m && m == 'cs') {
                    chrome.storage.local.get('aa_cs_scr', function(_scr) {
                        var scr = _scr.aa_cs_scr.trim();
                        if(scr && scr != ''){
                            eval(scr);
                        }
                    });
                }
            });
        }
    }
});
