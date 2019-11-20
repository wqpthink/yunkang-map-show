/**
 * 区域病理 js 文件
 * @author wqp
 * 矢量底图:http://t0.tianditu.gov.cn/vec_w/wmts?tk=您的密钥	球面墨卡托投影
 * 矢量注记:http://t0.tianditu.gov.cn/cva_w/wmts?tk=您的密钥	球面墨卡托投影
 */

import Map from 'ol/Map';
import View from 'ol/View';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTS from 'ol/source/WMTS';
import VectorSource from 'ol/source/Vector';
import {get as getProjection , fromLonLat} from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';
import { vectorBaseMapUrl, vectorSignMapUrl } from '../util/tiandituConf';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style';


var projection = getProjection('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(19); // 分辨率
var matrixIds = new Array(19); // 矩阵id
for (var z = 1; z < 20; z++) {
	// generate resolutions and matrixIds arrays for this WMTS
	resolutions[z] = size / Math.pow(2, z);
	matrixIds[z] = z;
}

var geoMarker = new Feature({
  type: 'icon',
  geometry: new Point(fromLonLat([113.432312,23.18201]))
});

var styles = {
  'route': new Style({
    stroke: new Stroke({
      width: 6, color: [237, 212, 0, 0.8]
    })
  }),
  'icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: '1.png'
    })
  }),
  'geoMarker': new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({color: 'black'}),
      stroke: new Stroke({
        color: 'white', width: 2
      })
    })
  })
};

var map = new Map({
    target:"map",
    view: new View({
        center: fromLonLat([113.432312,23.18201]),
        projection: projection,
        zoom: 12,
        maxZoom: 21,
        minZoom: 1
    }),
    layers:[
      new TileLayer({ // 矢量底图图层
        opacity: 0.7,
        minResolution: resolutions[resolutions.length -1],
        maxResolution: resolutions[0],
        source: new WMTS({
          url: vectorBaseMapUrl,
          projection: projection,
          layer: 'vec',
          format: 'tiles',
          matrixSet: 'w',
          style: 'default',
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions, // 分辨率
            matrixIds: matrixIds
          })
        })
      }),
      new TileLayer({ // 矢量注记图层
        opacity: 0.7,
        minResolution: resolutions[resolutions.length -1],
        maxResolution: resolutions[0],
        source: new WMTS({
          url: vectorSignMapUrl,
          projection: projection,
          layer: 'cva',
          format: 'tiles',
          matrixSet: 'w',
          style: 'default',
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions, // 分辨率
            matrixIds: matrixIds
          })
        })
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [geoMarker]
        }),
        style: function(feature){
          return styles[feature.get('type')]
        }
      })
    ]
});