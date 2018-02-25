(function (ng) {
    console.log('init ctrl');
    ng.module('test')
        .controller('TestController', TestController);

    TestController.$inject = ['$scope', '$rootScope', '$timeout'];

    function TestController($scope, $rootScope, $timeout) {
        var self = this;
        self.$scope = $scope;
        self.$timeout = $timeout;
        self.init();

    }

    TestController.prototype = {
        init: function () {
            var self = this;
            self.form = {};
            self.title = "";
            self.description = "";
            self.showPreview = false;
            self.enableParty = true;
            setTimeout(self.test, 1000);

            var countUp = function () {

                if (self.enableParty) {
                    self.togglePreview();
                }

                self.$timeout(countUp, 500);
            }

            self.$timeout(countUp, 500);
        },
        test: function () {
            console.log('test');
        },
        onSend: function () {
            var self = this;
            self.enableParty = !self.enableParty;
        },
        togglePreview: function () {
            var self = this;
            console.log('toggle');
            self.showPreview = !self.showPreview;
        }

    };
})(angular);


