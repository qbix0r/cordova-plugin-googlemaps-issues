import {Component, NgZone} from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';

declare var plugin: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  private mapObject: any;
  private points: any;

  private defaultMarkerIcon: any = {url: 'assets/marker-red.png', size: {width: 28, height: 48}};
  private selectedMarkerIcon: any = {url: 'assets/marker-yellow.png', size: {width: 28, height: 48}}

  private selectedMarker: any;

  constructor(public navCtrl: NavController, private platform: Platform, private zone: NgZone, private events: Events) {
    this.initPoints();

    events.subscribe('menu:toggle', (opened) => {
      if(this.mapObject)
        this.mapObject.setClickable(!opened);
    });
  }

  ionViewDidEnter() {
    this.init();
  }

  ionViewDidLeave() {
    this.mapObject.remove();
  }

  init() {
    if(!this.platform.is('cordova'))
      return;

    let div = document.getElementById("mapCanvas");

    let config = {
        'camera': {
          target: {
            lat: 0,
            lng: 0
          },
          zoom: 7
        }
    };

    this.mapObject = plugin.google.maps.Map.getMap(div, config);
    this.mapObject.one(plugin.google.maps.event.MAP_READY, () => {
      this.mapObject.setClickable(true);
      this.mapObject.on(plugin.google.maps.event.MAP_CLICK, (latLng) => {
        console.log('map click', latLng);
        this.zone.run(() => {
          if(this.selectedMarker)
            this.selectedMarker.setIcon(this.defaultMarkerIcon);
          this.selectedMarker = null;
        })
      });

      this.generateMarkers();

    });
  }

  generateMarkers() {
    var positionList = new plugin.google.maps.BaseArrayClass(this.points);
    console.log('position list get array', positionList.getArray());

    let that = this;

    positionList.map(function(point, cb) {
      that.mapObject.addMarker({
        'position': {lat: point.lat,
          lng: point.lng},
        'icon': that.defaultMarkerIcon
      }, cb)
    }, function(markers) {
      console.log('created markers', markers);

      for (let i = 0; i < markers.length; i++) {
        let marker = markers[i];
        console.log('options set', marker);
        marker.on(plugin.google.maps.event.MARKER_CLICK, () => {
          that.zone.run(() => {
            if(that.selectedMarker)
              that.selectedMarker.setIcon(that.defaultMarkerIcon);
            that.selectedMarker = marker;
            that.selectedMarker.setIcon(that.selectedMarkerIcon);
          });
        });
        marker.setDisableAutoPan(true);
      }
    });
  }

  showMarkerDetails() {
    alert('Clicked, show marker details!');
  }

  initPoints() {
    this.points = [
      {
        "lat": -0.7897,
        "lng": 0.5489
      },
      {
        "lat": -0.3491,
        "lng": 1.1653
      },
      {
        "lat": -1.6077,
        "lng": 0.534
      },
      {
        "lat": 0.3935,
        "lng": -1.3512
      },
      {
        "lat": -0.588,
        "lng": 0.82
      },
      {
        "lat": -1.922,
        "lng": 1.9337
      },
      {
        "lat": -1.0738,
        "lng": -1.4345
      },
      {
        "lat": 1.0275,
        "lng": 1.0124
      },
      {
        "lat": 1.2328,
        "lng": 1.5673
      },
      {
        "lat": -1.8329,
        "lng": 0.6972
      },
      {
        "lat": -1.2034,
        "lng": -0.3761
      },
      {
        "lat": -0.1855,
        "lng": -1.1522
      },
      {
        "lat": 1.8432,
        "lng": -0.496
      },
      {
        "lat": 0.5613,
        "lng": 0.7239
      },
      {
        "lat": 0.9331,
        "lng": -1.7425
      },
      {
        "lat": 0.869,
        "lng": -0.2523
      },
      {
        "lat": 0.2638,
        "lng": -1.1531
      },
      {
        "lat": 1.814,
        "lng": 0.3392
      },
      {
        "lat": -1.9367,
        "lng": 0.7097
      },
      {
        "lat": -1.0306,
        "lng": 0.2518
      },
      {
        "lat": 1.8268,
        "lng": 0.6744
      },
      {
        "lat": 1.4023,
        "lng": 0.2954
      },
      {
        "lat": 0.2251,
        "lng": 1.6303
      },
      {
        "lat": -0.1096,
        "lng": 0.929
      },
      {
        "lat": 0.1608,
        "lng": -0.6254
      },
      {
        "lat": 1.0292,
        "lng": -0.0868
      },
      {
        "lat": 0.2127,
        "lng": 1.5744
      },
      {
        "lat": 1.6826,
        "lng": -1.0558
      },
      {
        "lat": -1.8912,
        "lng": -1.8307
      },
      {
        "lat": -1.6851,
        "lng": 0.6235
      },
      {
        "lat": 0.4197,
        "lng": 1.0925
      },
      {
        "lat": 1.1906,
        "lng": 1.0981
      },
      {
        "lat": 0.8999,
        "lng": -0.8911
      },
      {
        "lat": -1.9702,
        "lng": 1.9317
      },
      {
        "lat": -1.6764,
        "lng": 0.8096
      },
      {
        "lat": 1.171,
        "lng": 0.9427
      },
      {
        "lat": 0.4524,
        "lng": 1.1212
      },
      {
        "lat": -0.0528,
        "lng": 1.6817
      },
      {
        "lat": -0.3784,
        "lng": 0.5306
      },
      {
        "lat": 0.6292,
        "lng": -1.3194
      },
      {
        "lat": -1.7517,
        "lng": 0.5717
      },
      {
        "lat": 1.1616,
        "lng": -0.3108
      },
      {
        "lat": -1.8032,
        "lng": 1.941
      },
      {
        "lat": -1.3811,
        "lng": -1.9785
      },
      {
        "lat": -0.8299,
        "lng": -1.2022
      },
      {
        "lat": -1.5031,
        "lng": -1.7507
      },
      {
        "lat": 1.2722,
        "lng": 0.3193
      },
      {
        "lat": -1.9616,
        "lng": 0.3355
      },
      {
        "lat": -1.5698,
        "lng": 0.3648
      },
      {
        "lat": 1.1734,
        "lng": -0.206
      },
      {
        "lat": 1.3581,
        "lng": -0.0503
      },
      {
        "lat": -0.7724,
        "lng": 1.1394
      },
      {
        "lat": 0.0031,
        "lng": 0.7996
      },
      {
        "lat": -1.1736,
        "lng": 1.0125
      },
      {
        "lat": -0.5235,
        "lng": 0.2291
      },
      {
        "lat": -1.6537,
        "lng": -1.6739
      },
      {
        "lat": 0.0982,
        "lng": 0.4197
      },
      {
        "lat": -0.8585,
        "lng": -1.2116
      },
      {
        "lat": -1.1014,
        "lng": -1.4213
      },
      {
        "lat": -0.7703,
        "lng": 1.0397
      },
      {
        "lat": -1.1883,
        "lng": -1.8877
      },
      {
        "lat": -1.2373,
        "lng": 0.7285
      },
      {
        "lat": -0.9766,
        "lng": -0.5262
      },
      {
        "lat": 0.0248,
        "lng": 1.4162
      },
      {
        "lat": -1.9891,
        "lng": 1.5618
      },
      {
        "lat": -0.1764,
        "lng": -0.6303
      },
      {
        "lat": 0.0733,
        "lng": -1.7834
      },
      {
        "lat": 0.8631,
        "lng": 0.1903
      },
      {
        "lat": -1.3316,
        "lng": 1.9217
      },
      {
        "lat": -1.0724,
        "lng": 0.8086
      },
      {
        "lat": -0.14,
        "lng": 0.0082
      },
      {
        "lat": 0.4039,
        "lng": -0.6275
      },
      {
        "lat": 1.5411,
        "lng": -1.143
      },
      {
        "lat": 0.1177,
        "lng": -0.7172
      },
      {
        "lat": 1.5992,
        "lng": -1.9197
      },
      {
        "lat": 0.5452,
        "lng": -1.1862
      },
      {
        "lat": 1.7335,
        "lng": -1.6889
      },
      {
        "lat": 1.5313,
        "lng": -0.7313
      },
      {
        "lat": -0.8224,
        "lng": 1.1537
      },
      {
        "lat": 1.518,
        "lng": 0.4554
      },
      {
        "lat": -1.8331,
        "lng": -0.6952
      },
      {
        "lat": 1.5566,
        "lng": 1.257
      },
      {
        "lat": -0.451,
        "lng": 1.0258
      },
      {
        "lat": -0.2153,
        "lng": 1.2213
      },
      {
        "lat": 0.973,
        "lng": 1.4632
      },
      {
        "lat": 0.1323,
        "lng": -1.6633
      },
      {
        "lat": -1.2438,
        "lng": 0.4957
      },
      {
        "lat": 0.112,
        "lng": -1.6808
      },
      {
        "lat": 0.6953,
        "lng": 1.4829
      },
      {
        "lat": 0.3777,
        "lng": 0.3471
      },
      {
        "lat": 1.4211,
        "lng": 0.8395
      },
      {
        "lat": -1.7639,
        "lng": -0.9892
      },
      {
        "lat": -0.7535,
        "lng": -0.1186
      },
      {
        "lat": 1.5027,
        "lng": 1.5245
      },
      {
        "lat": -0.6754,
        "lng": 0.2407
      },
      {
        "lat": 1.7846,
        "lng": -0.0542
      },
      {
        "lat": -1.2601,
        "lng": 1.1483
      },
      {
        "lat": 0.103,
        "lng": -0.6437
      },
      {
        "lat": -0.68,
        "lng": 0.2293
      },
      {
        "lat": 0.2749,
        "lng": -0.3239
      },
      {
        "lat": -1.1427,
        "lng": 1.4754
      },
      {
        "lat": 0.8873,
        "lng": -0.0317
      },
      {
        "lat": 1.1851,
        "lng": 1.9051
      },
      {
        "lat": -1.8145,
        "lng": 1.2065
      },
      {
        "lat": -0.2197,
        "lng": -1.5503
      },
      {
        "lat": 1.233,
        "lng": -1.3777
      },
      {
        "lat": 0.5859,
        "lng": 0.3543
      },
      {
        "lat": -0.189,
        "lng": -1.3906
      },
      {
        "lat": 1.24,
        "lng": -0.7653
      },
      {
        "lat": -0.8102,
        "lng": 0.7451
      },
      {
        "lat": -0.1331,
        "lng": 0.8934
      },
      {
        "lat": 0.2496,
        "lng": -1.479
      },
      {
        "lat": 1.2558,
        "lng": 0.7064
      },
      {
        "lat": -1.8138,
        "lng": -1.269
      },
      {
        "lat": -1.2055,
        "lng": 0.5649
      },
      {
        "lat": 1.7291,
        "lng": -1.0714
      },
      {
        "lat": 1.2959,
        "lng": 1.4597
      },
      {
        "lat": 0.339,
        "lng": -1.7095
      },
      {
        "lat": 0.1614,
        "lng": 1.42
      },
      {
        "lat": -1.1871,
        "lng": -1.964
      },
      {
        "lat": -1.5598,
        "lng": -0.8068
      },
      {
        "lat": -1.4023,
        "lng": 1.7041
      },
      {
        "lat": -1.084,
        "lng": 0.7892
      },
      {
        "lat": -1.5721,
        "lng": -0.8992
      },
      {
        "lat": -1.5261,
        "lng": -0.4481
      },
      {
        "lat": 0.1713,
        "lng": 0.8288
      },
      {
        "lat": 1.9403,
        "lng": 0.7177
      },
      {
        "lat": 0.1609,
        "lng": 0.6009
      },
      {
        "lat": 1.7556,
        "lng": -1.7654
      },
      {
        "lat": 0.6293,
        "lng": -1.4429
      },
      {
        "lat": -1.96,
        "lng": -0.6638
      },
      {
        "lat": -0.588,
        "lng": 0.4744
      },
      {
        "lat": -0.4852,
        "lng": -0.8766
      },
      {
        "lat": 0.7872,
        "lng": 1.2612
      },
      {
        "lat": 0.2992,
        "lng": -0.2044
      },
      {
        "lat": -1.6627,
        "lng": 0.9259
      },
      {
        "lat": 0.6464,
        "lng": -1.4661
      },
      {
        "lat": -0.4601,
        "lng": -1.0144
      },
      {
        "lat": 0.216,
        "lng": -0.689
      },
      {
        "lat": -1.8191,
        "lng": 1.5339
      },
      {
        "lat": -0.9806,
        "lng": 0.3231
      },
      {
        "lat": -1.7754,
        "lng": 0.1121
      },
      {
        "lat": -1.2521,
        "lng": 1.7824
      },
      {
        "lat": 0.0621,
        "lng": 0.6768
      },
      {
        "lat": -1.3055,
        "lng": -0.955
      },
      {
        "lat": 0.2169,
        "lng": 0.1543
      },
      {
        "lat": -0.4993,
        "lng": 1.1455
      },
      {
        "lat": 0.5053,
        "lng": 1.6976
      },
      {
        "lat": -0.0528,
        "lng": -1.06
      },
      {
        "lat": -0.4967,
        "lng": 0.6077
      },
      {
        "lat": 1.8256,
        "lng": -1.1826
      },
      {
        "lat": 0.5241,
        "lng": -0.7138
      },
      {
        "lat": -1.4957,
        "lng": 0.0508
      },
      {
        "lat": 1.9409,
        "lng": -1.2205
      },
      {
        "lat": 0.4497,
        "lng": -1.9226
      },
      {
        "lat": -1.7273,
        "lng": -0.4929
      },
      {
        "lat": -0.3257,
        "lng": 1.3856
      },
      {
        "lat": 0.382,
        "lng": 0.4649
      },
      {
        "lat": -0.7561,
        "lng": 1.18
      },
      {
        "lat": -0.6109,
        "lng": 0.58
      },
      {
        "lat": -0.7784,
        "lng": 0.5374
      },
      {
        "lat": -0.9691,
        "lng": 1.7523
      },
      {
        "lat": -0.195,
        "lng": 1.9132
      },
      {
        "lat": 1.1493,
        "lng": -1.1313
      },
      {
        "lat": 1.2716,
        "lng": -1.4114
      },
      {
        "lat": 0.5286,
        "lng": -0.2228
      },
      {
        "lat": -0.4411,
        "lng": -1.5282
      },
      {
        "lat": -1.478,
        "lng": -0.4962
      },
      {
        "lat": 1.7944,
        "lng": 1.3843
      },
      {
        "lat": 0.054,
        "lng": 0.0844
      },
      {
        "lat": -1.1434,
        "lng": -0.4878
      },
      {
        "lat": 0.5172,
        "lng": 0.7328
      },
      {
        "lat": -0.3554,
        "lng": -0.3743
      },
      {
        "lat": -0.374,
        "lng": -1.4047
      },
      {
        "lat": -1.4334,
        "lng": -1.2165
      },
      {
        "lat": -0.3614,
        "lng": 0.8117
      },
      {
        "lat": 1.4467,
        "lng": -0.1166
      },
      {
        "lat": 1.3089,
        "lng": 0.9766
      },
      {
        "lat": -0.9072,
        "lng": -1.2069
      },
      {
        "lat": -0.2336,
        "lng": -0.8144
      },
      {
        "lat": -1.1149,
        "lng": 1.9115
      },
      {
        "lat": -1.6453,
        "lng": 1.2458
      },
      {
        "lat": 1.0105,
        "lng": 1.5207
      },
      {
        "lat": -1.7402,
        "lng": 1.0963
      },
      {
        "lat": -0.0846,
        "lng": -1.3785
      },
      {
        "lat": -0.9952,
        "lng": -1.3616
      },
      {
        "lat": -1.5993,
        "lng": 0.6315
      },
      {
        "lat": -1.6369,
        "lng": -1.7904
      },
      {
        "lat": 0.6394,
        "lng": 0.0399
      },
      {
        "lat": 0.7341,
        "lng": 1.2854
      },
      {
        "lat": -1.1785,
        "lng": 1.4725
      },
      {
        "lat": 0.8691,
        "lng": -0.6947
      },
      {
        "lat": 0.495,
        "lng": 1.3308
      },
      {
        "lat": -1.646,
        "lng": 0.8194
      },
      {
        "lat": -1.6659,
        "lng": 1.1484
      },
      {
        "lat": 1.737,
        "lng": 0.6071
      },
      {
        "lat": 1.6171,
        "lng": -1.5824
      },
      {
        "lat": 1.3073,
        "lng": -1.1694
      },
      {
        "lat": 0.9934,
        "lng": -1.578
      },
      {
        "lat": 1.2457,
        "lng": -0.5259
      }
    ]
  }
}
