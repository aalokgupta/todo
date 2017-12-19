
// var todos = [];
var app = angular.module('todoModule', [])
                  .controller('todoController', function($scope, $http){
                  var todos = [];
                  var obj = {};
                  $scope.extractTodoFromResponse = function(data) {
                    var len = data.length;
                    for(var i = 0; i < len; i++) {
                      var obj = {title: data[i].title,
                                category: data[i].category,
                                date: moment([data[i].year, data[i].month, data[i].day]).fromNow(),
                                desc: data[i].desc
                              };
                        todos.push(obj);
                    }
                  }

                  $scope.getTodos = function() {
                    todos = [];
                    $http({
                        method: "GET",
                        url: '/todos',
                    }).then( function onSuccess(response){
                          console.log(response.status);
                          if(200 === response.status) {
                              $scope.extractTodoFromResponse(response.data);
                              $scope.todos = todos;
                          }
                    }, function onError(response) {
                          console.log("error occured while post data to server");
                    });
                  }

                  $scope.getTodos();

                  $scope.createTodo = function() {

                      var date = new Date(jQuery('#id-date').val());
                      var day = date.getDate();
                      var month = date.getMonth() + 1;
                      var year = date.getFullYear();
                      var cat = jQuery('#id-category');
                      var category = $("#id-category :selected").text();
                      var title = jQuery('#id-title').val();
                      var desc = jQuery('#id-desc').val();

                      var todo = {day: day,
                                  month: month,
                                  year: year,
                                  category: category,
                                  title: title,
                                  desc: desc};

                      $scope.postTodo(todo);
                  }

                  $scope.updateTodoList = function (todos) {
                      $scope.extractTodoFromResponse(todos)
                      $scope.todos = todos;
                  }

                  $scope.postTodo = function (todo) {
                    $http({
                        method: "POST",
                        url: '/createTodo',
                        data: todo
                    }).then( function onSuccess(response){
                          if(200 === response.status) {
                              $scope.updateTodoList(response.data);
                          }
                    }, function onError(response) {
                          console.log("error occured while post data to server");
                    });
                  }

                  $scope.search = function(todo) {
                    $http({
                            method: "POST",
                            url: '/search',
                            data: todo
                        }).then( function onSuccess(response){
                                  if(200 === response.status) {
                                  $scope.updateTodoList(response.data);
                              }
                          }, function onError(response) {
                              console.log("error occured while post data to server");
                        });
                  }

                  $scope.searchTodo = function() {
                    var date = new Date(jQuery('#id-date-search').val());
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear()
                    var category = jQuery("#id-category-search :selected").text();
                    var desc = jQuery('#id-desc-search').val();
                    var todo = {
                                category: category,
                                desc: desc};
                      obj["desc"] = desc;
                      // console.log("obj = "+JSON.stringify(obj));
                      $scope.search(obj);
                    }

                      jQuery('#id-category-search').on('change', function() {
                          var category = jQuery("#id-category-search :selected").text();
                          var todo = {category: category};
                          obj["category"] = category;
                          $scope.search(todo);

                       });

                       jQuery('#id-date-search').on('change', function(e) {
                           var date = new Date(jQuery('#id-date-search').val());
                           var day = date.getDate();
                           var month = date.getMonth() + 1;
                           var year = date.getFullYear();
                           var todo = {day: day,
                                       month: month,
                                      year: year};
                          obj["day"] = day;
                          obj["month"] = month;
                          obj["year"] = year;

                          $scope.search(todo);
                             // }
                        });

                });
