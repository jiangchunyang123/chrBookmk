document.addEventListener('DOMContentLoaded', function() {

    console.log('bookmarktree:',getBookmarks());
  });

  var bookmarks;
  function getBookmarks(){
      bookmarks = []
     var tree = chrome.bookmarks.getTree(function(result){
          console.log('tree:',result);
          for(var i=0;i<result.length;i++){
              reversBookmarks(result[i]);
          }
          syncBook();
    });
    return bookmarks;
  }
  
  function reversBookmarks(result){
      if(result==null){
          return;
      }
  
      var bookmark = {
          id:result.id == null ? 0 : result.id,
          parentId:result.parentId == null ? 0 : result.parentId,
          index:result.index == null ? 0 : result.index,
          url:result.url == null ? 'None' : result.url,
          title:result.title == null ? 'None' : result.title
      }
  
      bookmarks.push(bookmark)
  
      if(result.children==null){  
          return;
      }
  
      for(var i=0; i<result.children.length;i++){
          reversBookmarks(result.children[i]);
      }
  }
  
  function syncBook(uid){
      jsonStr = JSON.stringify({data:bookmarks});
    //   $.ajax({
    //     type:"get",  
    //     url:"http://localhost:8090/bookmk/asdasdasd",
    //     async: "true",
    //     contentType: 'application/json',
    //     success:function(result){
    //             console.log('resultaaa:',result);
    //   }
    //   });
      $.ajax({
            type : "put" ,      // 此处发送的是PUT请求（可变更为其他需要的请求）
        //    dataType : "json" ,
       //   contentType: 'application/json',
          url: "http://localhost:8090/bookmk/put/333", 
          async: "true",
          data: {
              "bookmarks":jsonStr
          }, success: function (data,status) {
              console.log(data);
          }
    });
  }