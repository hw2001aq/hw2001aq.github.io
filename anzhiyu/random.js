var posts=["posts/a456109.html","posts/de7f0b92.html","posts/85214092.html","posts/10582.html","posts/4d7b7201.html","posts/a8e6abdb.html","posts/5b6a4956.html","posts/14fee7e1.html","posts/8a92238a.html","posts/f8e45f7d.html","posts/76a72c5e.html","posts/9a51797c.html","posts/50ed1b00.html","posts/381cc713.html","posts/43edfea8.html","posts/eef2f034.html","posts/66d3382f.html","posts/3f19f829.html","posts/66d3382f.html","posts/68257aaa.html","posts/f880ca9.html","posts/a5fe959b.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"如趣","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","siteshot":"https://s11.ax1x.com/2024/01/19/pFEQlcR.png","tag":"综合"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"海思博客","link":"https://www.hisi.top","avatar":"https://www.fomal.cc/assets/avatar.webp","descr":"无论何时何地做一个善于思考的人","siteshot":"https://source.fomal.cc/siteshot/www.fomal.cn.jpg","tag":"生活"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情","tag":"技术"},{"name":"Eurkon","link":"https://blog.eurkon.com","avatar":"https://blog.eurkon.com/images/user/avatar.jpg","descr":"及时当勉励，岁月不待人。"},{"name":"如趣·sofuns.com","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
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