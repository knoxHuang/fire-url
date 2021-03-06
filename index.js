var Path = require('path');
var Url = require('url');
var FireUrl = {};

function normalize (str) {
    return str
    .replace(/\\/g, '/')
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
}

FireUrl.normalize = normalize;

FireUrl.join = function () {
    var joined = [].slice.call(arguments, 0).join('/');
    return normalize(joined);
};

FireUrl.dirname = function ( url ) {
    var dirname = Path.dirname(url);
    if ( dirname === '.' )
        return '';
    return normalize(dirname);
};

FireUrl.extname = Path.extname;

FireUrl.basename = function ( url, extname ) {
    if ( FireUrl.dirname(url) === '' ) {
        var basename = Path.basename(url);
        return basename.substring(0,basename.length-1);
    }

    return Path.basename(url,extname);
};

FireUrl.basenameNoExt = function ( url ) {
    return FireUrl.basename(url, FireUrl.extname(url) );
};

var _queryIndices = {};
FireUrl.addRandomQuery = function (url) {
    var queryIndex = _queryIndices[url] || 0;
    _queryIndices[url] = ++queryIndex;
    if (queryIndex < 10) {
        return url + '?00' + queryIndex;
    }
    else if (queryIndex < 100) {
        return url + '?0' + queryIndex;
    }
    else {
        return url + '?' + queryIndex;
    }
};

//
var _ = {};
var prop;
for ( prop in Url ) {
    _[prop] = Url[prop];
}
for ( prop in FireUrl ) {
    _[prop] = FireUrl[prop];
}
module.exports = _;
