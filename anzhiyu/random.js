var posts=["2023/11/11/news/域名之家/","2024/01/10/test/Hexo-插件整理/","2024/01/10/test/Hexo自动文章固定链接插件 abbrlink/","2013/12/25/test/gallery-post/","2024/01/10/test/hexo博客功能实现指南/","2013/12/26/test/images/","2013/12/24/test/link-post/","2018/07/24/test/markdown/","2013/12/25/test/tag-plugins/","2024/03/01/test/「馨客栈研究院」网站嵌入bilibili视频的一些总结/","2024/01/15/test/如何让个站被主流搜索引擎收录/","2024/01/11/writing/2024-1-11我为什么建博客/","2024/01/12/writing/2024-1-12抢票，抢出来了年味/","2024/01/17/writing/2024-1-17重塑心态，就是在改写你的命运/","2024/01/12/writing/2024-1-19今天散学典礼/","2024/03/01/writing/2024-3-1这个世界是一个草台班子，大家的水平都很差，大家也都很坏/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"如趣","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","siteshot":"https://s11.ax1x.com/2024/01/19/pFEQlcR.png","tag":"综合"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"海思博客","link":"https://www.hisi.top","avatar":"https://www.fomal.cc/assets/avatar.webp","descr":"无论何时何地做一个善于思考的人","siteshot":"https://source.fomal.cc/siteshot/www.fomal.cn.jpg","tag":"生活"},{"name":"如趣·sofuns.com","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };