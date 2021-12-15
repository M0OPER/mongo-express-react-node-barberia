import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './general.css';

import { BaseApp } from './BaseApp';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook, faUserCog, faUserTag, faUserCheck, faCalendarCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons'

library.add( faAddressBook, faUserCog, faUserTag, faUserCheck, faCalendarCheck, faClipboardList)

ReactDOM.render(
  <BaseApp />,
  document.getElementById('root')
);