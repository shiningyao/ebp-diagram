/**
 * Created by yaoshining on 2016/12/29.
 */
import * as angular from 'angular';
import '../../assets/styles/diagram.scss';
import {DiagramDirectiveFactory} from './directives/diagram.directive';

let module = angular.module('ebp.diagram', [])
    .directive('ebpDiagram', DiagramDirectiveFactory);

module.run(() => {

});

export default module;