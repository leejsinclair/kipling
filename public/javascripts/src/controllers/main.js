'use strict';

angular.module('kipplingApp').controller('MainCtrl', function ($scope) {
	$scope.data = {
		'businessValue': '',
		'users': '',
		'result': ''
	};

	$scope.ticket = {
		'businessValue': 'why',
		'users': 'who',
		'result': 'what',
		'class': 'danger'
	};

	$scope.points = {
		'keypresses': 0,
		'storyLength': 0,
		'elements': 0,
		'total': 0
	};

	$scope.examples = {
		'users': [
			'a registered user',
			'an unregisted user',
			'a random website visitor',
			'a big bird',
			'a disgruntled user',
			'a customer',
			'an administrator',
			'a manager',
			'a team member',
			'an approver'
		],
		'features': [
			'to track history of registered products',
			'to review items in my shopping cart',
			'to review to progress of my account',
			'the spell checker to ignore words with numbers',
			'a way to contact support',
			'the system to format my harddrive'
		],
		'value': [
			'the sign up conversion rate increases',
			'users can share ideas and create compelling content',
			'users can enjoy a seamless experience'
		]
	};

	$scope.statusMessage = '';

	$scope.resetPoints = function() {
		$scope.points = {
			'keypresses': 0,
			'storyLength': 0,
			'elements': 0,
			'total': 0
		};
	};

	$scope.random = function( name ) {
		var len = $scope.examples[name].length;
		var rnd = Math.floor(Math.random() * len );
		return $scope.examples[name][rnd];
	};

	$scope.$watch( 'data', function( /*newValue*/ ){
		var progress = 0;
		var combinedText = $scope.data.businessValue + $scope.data.users + $scope.data.result;
		$scope.points.elements = 0;

		if( $scope.data.businessValue!=='' && typeof($scope.data.businessValue)!=='undefined' ) {
			$scope.ticket.businessValue = $scope.data.businessValue;
			progress++;
		} else {
			$scope.ticket.businessValue = '[ why ]';
		}

		console.log($scope.data.users);

		if( $scope.data.users!=='' && typeof($scope.data.users)!=='undefined' ) {
			$scope.ticket.users = $scope.data.users;
			progress++;
		} else {
			$scope.ticket.users = '[ who ]';
		}

		if( $scope.data.result!=='' && typeof($scope.data.result)!=='undefined'  ) {
			$scope.ticket.result = $scope.data.result;
			progress++;
		} else {
			$scope.ticket.result = '[ what ]';
		}

		switch( progress ) {
		case 0:
			$scope.ticket.class = 'danger';
			break;
		case 1:
			$scope.ticket.class = 'warning';
			break;
		case 2:
			$scope.ticket.class = 'info';
			$scope.points.elements += 5;
			break;
		case 3:
			$scope.ticket.class = 'success';
			$scope.points.elements += 10;
			break;
		}

		$scope.points.keypresses = Math.min( 10, $scope.points.keypresses + 1);

		$scope.points.storyLength = (function( len ) {
			switch(true) {
			case (len<50):
				return 0;
			case (len<70):
				return 2;
			case (len<100):
				return 5;
			case (len<130):
				return 8;
			case (len<=150):
				return 10;
			default:
				return 7;
			}
		})(combinedText.length);

		if( typeof(combinedText.length) === 'undefined' || combinedText.length<20 ) {
			$scope.points.keypresses = 0;
			$scope.points.storyLength = 0;
		}

		console.log( combinedText.length, $scope.points.keypresses, $scope.points.elements, $scope.points.storyLength);

		$scope.points.total = $scope.points.keypresses + $scope.points.elements + $scope.points.storyLength;

		var percentage = ($scope.points.total/30) * 100;

		switch (true) {
		case (percentage<20):
			$scope.progressEncouragement = '';
			break;
		case (percentage<33):
			$scope.progressEncouragement = 'We are off..';
			break;
		case (percentage<50):
			$scope.progressEncouragement = 'It\'s a start';
			break;
		case (percentage<80):
			$scope.progressEncouragement = 'This is a story';
			break;
		case (percentage<90):
			$scope.progressEncouragement = 'Just a bit more';
			break;
		default:
			$scope.progressEncouragement = 'Super star!';
		}

	}, true);


	/*
	$(document).ready( function(){
	  $('#copyButton').zclip({
	    'path':'/swf/ZeroClipboard.swf',
	    'copy':$('#myStory').text(),
	    'afterCopy': function() {
		$scope.statusMessage = 'Coppied to clipboard';
		$scope.$apply();
		setTimeout( function(){
			$scope.statusMessage = '';
			$scope.$apply();
		}, 5000)
	    }
	  });
	});
	*/
});