/**
 * 区域病理 js 文件
 * @author wqp
 */

import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import TileImage from 'ol/source/TileImage';
import {get, fromLonLat} from 'ol/proj';

function BD09TWGS84(wgsLat, wgsLon) {
  var x = wgsLon * 20037508.34 / 180.;
  var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
  y = y * 20037508.34 / 180.;
  return {'lat' : y, 'lon' : x};
}

var resolutions = [];
for(var i=0; i<= 18; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}

var tileGrid = new TileGrid({
    origin:[0, 0],
    resolutions: resolutions
});

var baiduSource = new TileImage({
    projection: get('EPSG:3857'),
    tileGrid: tileGrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        if(!tileCoord){
            return "";
        }
        var [z, x, y] = tileCoord;

        if(x < 0) {
            x = `M${-x}`;
        }
        if(y < 0) {
            y = `M${-y}`;
        }
        var num = Math.floor(Math.random() * 10);
        return `http://online${num}.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&scaler=2&udt=20180303`;
    }
});

var baiduLayer = new Tile({
    source: baiduSource
});

var map = new Map({
    target:"map",
    layers:[
        baiduLayer
    ],
    view: new View({
        center: fromLonLat([113.44424399246147,23.185374909094077]),
        projection: "EPSG:3857",
        zoom: 12
    })
});