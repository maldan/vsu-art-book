import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { smartPage } from '@maldan/tslib-react-help';
import '../Style/App.scss';

export default smartPage(
  (state: unknown) => {
    return (
      <Router>
        <div>Hello world</div>
      </Router>
    );
  },
  connect,
  'global',
  {},
);
