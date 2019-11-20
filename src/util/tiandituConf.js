

// token
var token = '91f63a358f79b79aa13e53de69ccb3a8';

// 矢量底图
var vectorBaseMapUrl = 'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=' + token;
// 矢量注记
var vectorSignMapUrl = 'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk=' + token;

// 矢量底图元数据访问地址
var vectorBaseMapMetaDataUrl = 'http://t0.tianditu.gov.cn/vec_w/wmts?request=GetCapabilities&service=wmts&tk=' + token;
// 矢量注记元数据访问地址
var vectorSignMapMetaDataUrl = 'http://t0.tianditu.gov.cn/cva_w/wmts?request=GetCapabilities&service=wmts&tk=' + token;

// 地理编码响应示例：
// http://api.tianditu.gov.cn/geocoder?ds={"keyWord":"延庆区北京市延庆区延庆镇莲花池村前街50夕阳红养老院"}&tk=您的密钥

// 逆地理编码响应示例：
// http://api.tianditu.gov.cn/geocoder?postStr={'lon':116.37304,'lat':39.92594,'ver':1}&type=geocode&tk=您的密钥

module.exports = {vectorBaseMapUrl, vectorSignMapUrl, vectorBaseMapMetaDataUrl, vectorSignMapMetaDataUrl};