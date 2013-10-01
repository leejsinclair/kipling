'use strict';

angular.module('kipplingApp').controller('MainCtrl', function ($scope) {
      $scope.data = {
      	"businessValue": "",
      	"users": "",
      	"result": ""
      };

      $scope.ticket = {
      	"businessValue": "why",
      	"users": "who",
      	"result": "what",
      	"class": "danger"
      };

      $scope.points = {
            "keypresses": 0,
            "storyLength": 0,
            "elements": 0,
            "total": 0
      };

      $scope.statusMessage = "";

      $scope.$watch( 'data', function( newValue){
      	var progress = 0;
            var combinedText = $scope.data.businessValue + $scope.data.users + $scope.data.result;
            $scope.points.elements = 0;

      	if( $scope.data.businessValue!=="" ) {
      		$scope.ticket.businessValue = $scope.data.businessValue;
      		progress++;
      	} else {
      		$scope.ticket.businessValue = "[ why ]";
      	}

      	if( $scope.data.users!=="" ) {
      		$scope.ticket.users = $scope.data.users;
      		progress++;
      	} else {
      		$scope.ticket.users = "[ who ]";
      	}

      	if( $scope.data.result!=="" ) {
      		$scope.ticket.result = $scope.data.result;
      		progress++;
      	} else {
      		$scope.ticket.result = "[ what ]";
      	}

      	switch( progress ) {
      		case 0:
      			$scope.ticket.class = "danger";
      			break;
      		case 1:
      			$scope.ticket.class = "warning";
      			break;
      		case 2:
      			$scope.ticket.class = "info";
                        $scope.points.elements += 5;
      			break;
      		case 3:
      			$scope.ticket.class = "success";
                        $scope.points.elements += 10;
      			break;
      	}

            $scope.points.keypresses = Math.min( 10, $scope.points.keypresses + 1);
            $scope.points.storyLength = function( len ) {
                  switch(true) {
                        case (len<50):
                              return 0;
                              break;
                        case (len<70):
                              return 2;
                              break;
                        case (len<100):
                              return 5;
                              break;
                        case (len<130):
                              return 8;
                              break;
                        case (len<=150):
                              return 10;
                              break;
                        default:
                              return 7;
                  }
            }(combinedText.length);
            $scope.points.total = $scope.points.keypresses + $scope.points.elements + $scope.points.storyLength;

            var percentage = ($scope.points.total/30) * 100;

            switch (true) {
                  case (percentage<20):
                        $scope.progressEncouragement = "";
                        break;
                  case (percentage<33):
                        $scope.progressEncouragement = "We are off..";
                        break;
                  case (percentage<50):
                        $scope.progressEncouragement = "Sounds good so far";
                        break;
                  case (percentage<80):
                        $scope.progressEncouragement = "Story evanalist";
                        break;
                  case (percentage<90):
                        $scope.progressEncouragement = "Just a bit more";
                        break;
                  default:
                        $scope.progressEncouragement = "Super star!";
            }

      }, true);

      $(document).ready( function(){
        $('#copyButton').zclip({
          "path":'/swf/ZeroClipboard.swf',
          "copy":$('#myStory').text(),
          "afterCopy": function() {
            $scope.statusMessage = "Coppied to clipboard";
            $scope.$apply();
            setTimeout( function(){
                  $scope.statusMessage = "";
                  $scope.$apply();
            }, 5000)
          }
        });
      });
  });
