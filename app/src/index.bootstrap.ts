/**
 * Created by yaoshining on 2016/12/29.
 */
import * as angular from 'angular';
import '../assets/styles/main.scss';

angular.module('demo', ['ebp.diagram'])
    .run(() => {
        console.log('Demo Module is running...');
    });

angular.bootstrap(document.querySelector('html'), ['demo']);