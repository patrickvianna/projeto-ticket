angular.module('myApp').component('paginator', {
    bindings: {
      url: '@',
      total: '@',
    },
    controller: ['$location', function($location) {
      this.$onInit = function() {
         var total = parseInt(this.total) || 1;
         this.totalArray = Array(total).fill(0).map((e, i) => i + 1);

         var pages = [];
        for(var i = startPage; i <= endPage; i++)
        {
            pages.push(i);
        }
         this.current = parseInt($location.search().page) || 1;
         this.needPagination = this.total > 1;
         this.hasPrev = this.current > 1;
         this.hasNext = this.current < this.total;
 
         this.isCurrent = function(i) {
           return this.current == i
         }
      }
 
    }],
    template: `
       <ul ng-if="$ctrl.needPagination"
         class="pagination pagination-sm no-margin pull-right">
         <li ng-if="$ctrl.hasPrev">
           <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1}}">«</a>
         </li>
         <li ng-class="{active: $ctrl.isCurrent(i)}"
           ng-repeat="i in $ctrl.totalArray">
           <a href="{{ $ctrl.url }}?page={{i}}">{{i}}</a>
         </li>
         <li ng-if="$ctrl.hasNext">
           <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1}}">»</a>
         </li>
       </ul>
    `
 });
 