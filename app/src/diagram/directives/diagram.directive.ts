/**
 * Created by yaoshining on 2016/12/29.
 */
export let DiagramDirectiveFactory:ng.IDirectiveFactory = function() {
    'ngInject';

    let linkFunc:ng.IDirectiveLinkFn = function(scope, element) {
        element.addClass('ebp-diagram-container');
    };

    const directive:ng.IDirective = {
        restrict: 'AE',
        link: linkFunc,
        template: require('../tpls/diagram.tpl.html')
    };

    return directive;
};