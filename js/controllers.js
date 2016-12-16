
angular.module('starter.controllers', [])
//首页数据请求
.controller('HomeCtrl', function($scope,$http,$ionicSlideBoxDelegate,$ionicTabsDelegate) {
        $http({
            url: "/Handler/OfflineCourseHandler.ashx?action=indexshow",
            method: "post",
            params: ""
        }).success(function (result) {
            //console.log(result);
            //轮播图数据
            $scope.bannerList = result.data.bannerList;
            $ionicSlideBoxDelegate.$getByHandle("slide").update();
            //让轮播图及时舒心
            $ionicSlideBoxDelegate.$getByHandle("slide").loop("true")
            //让轮播图及时刷新
            //好评榜数据/
            $scope.goodList = [
                [result.data.goodList[0], result.data.goodList[1]],
                [result.data.goodList[2], result.data.goodList[3]],
            ]
            //$scope.bannerList=result.data.bannerList;
            $scope.newList = [
                [result.data.newList[0], result.data.newList[1]],
                [result.data.newList[2], result.data.newList[3]],
            ]
            $scope.chooseList = result.data.chooseList;
            $scope.$on('$ionicView.beforeEnter', function() {
                //关闭tab选项卡
                $ionicTabsDelegate.showBar(true);
            });
            //在此作用域下绑定监听ionic视图在离开之前的事件
            //$scope.$on('$ionicView.beforeEnter', function() {
            //    //关闭tab选项卡
            //    $ionicTabsDelegate.showBar(true);
            //});
            //$scope.$on('$ionicView.beforeLeave', function() {
            //    //打开tab选项卡
            //    $ionicTabsDelegate.showBar(false);
            //});
        })
        //进入详情页
        $scope.myLessCtrl=function(id){
            window.location='#/tab/homeStudy/'+id;
        }
    })

//课程列表
.controller('CourseCtrl', function($scope, Chats,$http,$state) {
    $scope.show=false;
    $scope.hide=false;
        //课程列表
    $scope.toggle = function(){
        $scope.xqBtn={color:'#333'}
      $scope.hide=false;
      $scope.show = !$scope.show;
        if($scope.show){
            $scope.colorBtn={color:'blue'}
        }else{
            $scope.colorBtn={color:'#333'}
        }
    }
    //价格列表
    $scope.tog=function(){
        $scope.colorBtn={color:'#333'}
        $scope.show=false;
        $scope.hide=!$scope.hide;
        if($scope.hide){
            $scope.xqBtn={color:'blue'}
        }else{
            $scope.xqBtn={color:'#333'}
        }
    }
        //请求专业列表
    $http({
        url:"/Handler/OfflineCourseHandler.ashx?action=getcategory",
        method:"post",
        params:""
    }).success(function(reuslt){
        $scope.majorList = reuslt.data;
    })
    //价格分类
    $scope.priceBtn = [
        {"id":"0",title:"全部"},
        {"id":"1",title:"免费"},
        {"id":"2",title:"收费"},
    ]
        //分页列表
        $scope.lists=[];
        $scope.pageStart=1;
        $scope.searchText="",
        $scope.CategoryTwo="";
        $scope.CpriceId='';
        //加载课程
        $scope.loadPage=function(pageStart){
            $scope.courseData = {
                searchText:$scope.searchText,
                CategoryTwo:$scope.CategoryTwo,
                CpriceId:$scope.CpriceId,
                pageStart:pageStart
            }
            //未开始请求时，先把加载数据禁止掉
            $scope.moredata=false;
        $http({
        "url":"/Handler/OfflineCourseHandler.ashx?action=courseshow",
        method:'post',
        params:$scope.courseData
            }).success(function(result){
            $scope.lists=$scope.lists.concat(result.data.list);
            //煤业的条数
            $scope.totalPage=Math.ceil(result.data.count/result.data.pageSize)
            //console.log($scope.paSize);
            $scope.pageStart=result.data.pageStart
            if($scope.pageStart<$scope.totalPage){
                //ng-if 对数据进行实时监控
               $scope.moredata=true;
            }
        })
        }
        $scope.loadMore=function(){
            $scope.loadPage($scope.pageStart+1)
            $scope.$broadcast("scroll.infiniteScrollComplete")
        }
        $scope.loadMore()
        //$on 是$scope下面的方法之一  同时起到绑定的作用
//$stateChaneSuccess  状态改变的一个过程
        $scope.$on("$stateChangeSuccess",function(){
            $scope.loadMore()
        })
        //筛选课程
        $scope.searchCourse = function(searchText,CategoryId,CpriceId){
            $scope.pageStart=0;
            $scope.searchText=searchText,
            $scope.CategoryTwo=CategoryId;
            $scope.CpriceId=CpriceId;
            $scope.moredata=true;
            $scope.lists=[];
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $scope.loadMore();
            $scope.colorBtn={"color":"#333"};
            $scope.show=false;
            $scope.xqBtn={"color":"#333"};
            $scope.hide=false;
        }
        //下拉刷新
        $scope.doRefresh=function(){
            $interval(function(){
                $scope.$broadcast('scroll.refreshComplete')
            },1000)
        }
        //跳转到课程详情
        $scope.stateLess=function(id){
            window.location='#/tab/curseStudy/'+id;
        }
    })
//我的课程
.controller('mycourseCtrl', function($scope, $http){
  $scope.data = {
            showDelete: false
  };
        $scope.dl_tf=true;
        //我的课程
        //加载课程方法
        $scope.lessonData=function(url){
            $http({
                url:url,
                method:"get",
                params:""
            }).success(function(result){
                $scope.myLesson="";
                $scope.dl_tf=false;
                $scope.myLesson=result.data;

            })
        }
        //成功以后加载我的课程调用一次
        $scope.lessonData('/Handler/OnCourseHandler.ashx?action=mycourse');
        //全部课程
        $scope.myCou=false;
        $scope.outCou=false;
        //点击我的课程
        $scope.mylesson=function(){
            $scope.xqBtn={color:'#333'}
            $scope.lessonData('/Handler/OnCourseHandler.ashx?action=mycourse')
            $scope.outCou=false;
            $scope.myCou=!$scope.myCou;
            if($scope.myCou){
                $scope.colorBtn={color:'blue'}
            }else{
                $scope.colorBtn={color:'#333'}
            }
        }
        //点击全部课程
        $scope.outlesson=function(){
            $scope.lessonData('/Handler/OnCourseHandler.ashx?action=mycollection')
            $scope.colorBtn={color:'#333'}
            $scope.myCou=false;
            $scope.outCou=!$scope.outCou;
            if($scope.outCou){
                $scope.xqBtn={color:'blue'}
            }else{
                $scope.xqBtn={color:'#333'}
            }
        }
        //未登录，请登录
        $scope.placeLogin=function(){
            window.location="#/tab/personal"
        }
        //删除收藏
        $scope.itemDelete=function(id){
            $http({
                url:"/Handler/OnCourseHandler.ashx?action=deletecollection",
                method:"post",
                params:{
                    courseId:id
                }
            }).success(function(result){
                console.log(result);
                $scope.myLesson.splice($scope.myLesson.indexOf(id,1))
            })

        }
})
//注册控制器
.controller('Res', function($scope,$http,$ionicPopup) {
        $scope.userIn={
            userName:"",
            email:"",
            phone:"",
            userPwd:"",
            nickname:"",
            userPic:""
        };
        $scope.zhuce=function(){
            console.log($scope.userIn);
            $http({
                url:"/Handler/UserHandler.ashx?action=add",
                method:"post",
                params:$scope.userIn,
                success:function(result){
                    //$ionicPopup.alert({
                    //        title: 'Don\'t eat that!',
                    //        template: result
                    //    });
                },
                err:function(r){
                    console.log(r);
                }
            })
        }
    })
//登陆
.controller('Personal', function($scope,$http,$state) {

$scope.settings = {
    enableFriends: true
  }
$scope.userInfo={
        userName:"",
        userPwd:""
    }

$scope.load= function () {
            $http({
                url:"/Handler/UserHandler.ashx?action=login",
                method:"post",
                params:$scope.userInfo,
            }).success(function(result){
                window.location='#/tab/information'
            })
};
    })
//个人详情
.controller('information',function($scope,$http,$ionicPopup){
        $http({
            url:"/Handler/UserHandler.ashx?action=isLogin",
            method:"post",
            params:"",
        }).success(function(result){
            //$ionicPopup.alert({
            //    title: '登陆状态',
            //    template: result.success
            //})
            $http({
                url:"/Handler/OnCourseHandler.ashx?action=returnuserinfo",
                method:"get",
                params:"",

            }).success(function(result){
                $scope.name=result.nickname;
                $scope.email=result.email;
                $scope.telephone=result.phone;
                $scope.userId=result.tokenId
            })
        })
        //退出
        $scope.quit=function(){
            $http({
                url:"/Handler/UserHandler.ashx?action=quit",
                method:"post",
                params:"",
            }).success(function(result){
                window.location='#/tab/personal'
            })
        }
    })
//课程详情表
.controller('StudyCtrl',function($scope,$stateParams,$ionicModal,$http,$rootScope,$ionicPopup){
        //$stateParams 在url中截取ID myId
        //$rootScope 可以取到所有controller中的数据
        var mystudy={
            courseId:$stateParams.myId
        }

        $scope.myId=$stateParams.myId;
        $scope.goBug=false;
        //为video赋值默认值
        $scope.Vurl='video/mov_aaa.mp4';
        //判断是否登陆
        function isLogin(){
            $http.post('/Handler/UserHandler.ashx?action=isLogin')
                .success(function(result){
                    $scope.goBug=true;
                    if(result.success){
                        $http({
                            url:"/Handler/OnCourseHandler.ashx?action=learnshow",
                            method:"post",
                            params:mystudy,

                        }).success(function(result){
                            console.log(result);
                            //获取课程list
                            $scope.CDlists=result.data.CDlist;
                            console.log($scope.CDlists);
                            $scope.Cname=result.data.Cname
                            //获取评论内容
                            $scope.Evaluate=result.data.evaluate;
                            $scope.cDLsis=true;
                            $scope.Evalu=false;

                        });


                    }
                    $scope.collection();
                }
            )
        }
        isLogin()
        //点击事件
        $scope.mymulu=function(){
            $scope.cDLsis=true;
            $scope.Evalu=false;
        }
        $scope.myxiangqing=function(){
            $scope.cDLsis=false;
            $scope.Evalu=true;
        }
        //评论模态框
        $ionicModal.fromTemplateUrl('templates/modal.html',{
            scope:$scope
        }).then(function(modal){
            $scope.modal=modal
        })
        //提交评论
        $scope.lista={
            "mentValue":""
        }
        $scope.addMent=function(){
            $http({
                url:"/Handler/OnCourseHandler.ashx?action=addcoursecomments",
                method:"post",
                params:{
                    courseId:$scope.myId,
                    evaluate:$scope.lista.mentValue
                }
                }
            ).success(function(){
                    $scope.modal.hide();
                    isLogin();
                    $scope.cDLsis=true;
                    $scope.Evalu=false;
                    $scope.lista.mentValue=""
                })
        }
        //收藏
        $scope.collection=function(){
            $http({
                url:"/Handler/OnCourseHandler.ashx?action=collection",
                method:"post",
                params:mystudy
            }).success(function(result){
                if(result.ifColected==true){
                    $scope.shoucang="已收藏"
                }else{
                    $scope.shoucang="收藏"
                }
            })
        }
    })

    /*底部tabs隐藏显示的指令*/
    .directive('hideTabs', function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function() {
                    $rootScope.hideTabs=attributes.hideTabs;
                });

                scope.$on('$ionicView.beforeLeave', function() {
                    $rootScope.hideTabs = false;
                });
            }
        };
 })




