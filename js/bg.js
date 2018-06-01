document.addEventListener('DOMContentLoaded', function() {

    console.log('bookmarktree:',getBookmarks());
  });

  var bookmarks;
  var bookMarksCache;
  var uid = "";
  function getBookmarks(){
      bookmarks = []
      chrome.bookmarks.getTree(function(result){
          console.log('tree:',result);
          for(var i=0;i<result.length;i++){
              reversBookmarks(result[i]);
          }
        //  syncBook(123,result);
    });
    return bookmarks;
  }
  
  function reversBookmarks(result){
      if(result==null){
          return;
      }
      //  console.log('result:',result);
      var bookmark = {
          id:result.id == null ? 0 : result.id,
          parentId:result.parentId == null ? 0 : result.parentId,
          idx:result.index == null ? 0 : result.index,
          url:result.url == null ? 'None' : result.url,
          title:result.title == null ? 'None' : result.title,
          dateAdded:result.dateAdded,
          dateGroupModified:result.dateGroupModified
      }
  
      bookmarks.push(bookmark)
  
      if(result.children==null){  
          return;
      }
  
      for(var i=0; i<result.children.length;i++){
          reversBookmarks(result.children[i]);
      }
  }
  
  function syncBook(uid,tree){
  
 
  }
  function uploadBookMark(tree){
    jsonStr = JSON.stringify({data:tree});

    $.ajax({
        type : "put" ,    
        url: "http://localhost:8090/bookmk/put/"+uid, 
        async: "true",
        data: {
            "bookmarks":jsonStr
        }, success: function (data,status) {
            console.log(data);
        }
  });
  }