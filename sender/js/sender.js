var appId = "**DEV_APP_ID_HERE**";

function SenderController($scope, $window, $log) {
  var cast_api;

  $scope.activity = {status:'disconnected'};
  $scope.receivers = [];
  $scope.appId = appId;

  $scope.launch = function (idx) {
    var selectedReceiver = $scope.receivers[idx];
    $log.info("Launching app on receiver: ", selectedReceiver.name);
    doLaunch(selectedReceiver);
  };

  // Privates
  var initializeApi = function() {
    cast_api = new cast.Api();
    cast_api.addReceiverListener(appId, onReceiverList);
  };

  var onReceiverList = function(list) {
    $scope.receivers = list;
    var fn = list.length ? $log.info : $log.warn;
    fn("Receivers: ", list);
    $scope.$apply();
  };

  var doLaunch = function(receiver) {
    var request = new cast.LaunchRequest(appId, receiver);
    request.parameters = "myParam=123";
    request.description = new cast.LaunchDescription();
    request.description.text = "Time to begin...";
    request.description.url = "http://localhost:3000/";
    cast_api.launch(request, onLaunch);
  };

  var onLaunch = function(activity) {
    $log.info(activity);
    $scope.activity = activity;
    $scope.$apply();
  };

  // Global events
  $window.addEventListener("message", function(event) {
    if (event.source == window && event.data &&
        event.data.source == "CastApi" &&
        event.data.event == "Hello") {
      $log.info("CastApi Hello message received!");
      initializeApi();
    }
  });

  // Bootstrap
  if (typeof $window.cast !== "undefined" && $window.cast.isAvailable) {
    $log.info("Cast is already available");
    initializeApi();
  }

}
