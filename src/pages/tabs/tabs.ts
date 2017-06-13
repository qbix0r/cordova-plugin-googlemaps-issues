import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {MapPage} from "../map/map";
import {MapIosPage} from "../map-ios/map-ios";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;
  tab2Root = MapPage;
  tab3Root = MapIosPage;

  constructor() {

  }
}
