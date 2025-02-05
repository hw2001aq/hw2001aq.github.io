var posts=["2024/11/20/news/域名之家/","2023/06/01/hexo/anzhiyu主题标签/","2024/03/13/read/《人生海海》：一个人真正的强大，是放过自己/","2024/12/21/read/《如何阅读一本书》：学会阅读，打开知识的大门/","2024/11/20/read/《悉达多》：人生意义的探寻和追溯/","2024/01/11/read/书单  我的私人书单10部/","2024/12/03/read/书单 I 查理·芒格推荐的66本书/","2024/01/11/read/书单 理解人生模式的二十二本书/","2024/01/11/read/书单 读了 100 本开智正典，我有了这些收获/","2024/01/11/read/书单｜一个人的阅读史（2022修订版）/","2024/01/11/read/书单｜这三本书，劝你往烂了读/","2025/01/02/read/图书馆基础知识篇——中国图书馆分类法/","2024/01/11/read/读书： 不要着急读书，先建立好自己的阅读体系/","2024/01/11/read/读书： 如何科学地给自己「洗脑」？/","2024/01/11/read/读书： 提高写作能力的6本书/","2024/01/11/read/读书： 读书和不读书，差的是整个人生。（深度好文）/","2023/11/11/writing/2024-1-11我为什么建博客/","2024/01/12/writing/2024-1-12抢票，抢出来了年味/","2024/01/17/writing/2024-1-17重塑心态，就是在改写你的命运/","2024/01/12/writing/2024-1-19今天散学典礼/","2024/12/13/writing/2024-12-13预制人”成热梗，谨防形成的“人机人格/","2024/03/01/writing/2024-3-1这个世界是一个草台班子，大家的水平都很差，大家也都很坏/","2024/12/11/writing/2024-12-11小区流浪猫横行，该如何解决/","2025/02/25/writing/腺样体肥大，该不该手术？/","2025/01/02/writing/life/life25_0001/","2025/02/05/writing/life/如果用500元一年内赚一百万？/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"如趣","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","siteshot":"https://s11.ax1x.com/2024/01/19/pFEQlcR.png","tag":"综合"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"海思博客","link":"https://www.hisi.top","avatar":"https://s21.ax1x.com/2025/01/26/pEEW5T0.png","descr":"无论何时何地做一个善于思考的人","siteshot":"https://s21.ax1x.com/2025/01/26/pEEWWOs.png","tag":"生活"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情","tag":"技术"},{"name":"Eurkon","link":"https://blog.eurkon.com","avatar":"https://blog.eurkon.com/images/user/avatar.jpg","descr":"及时当勉励，岁月不待人。"},{"name":"如趣·sofuns.com","link":"https://blog.sofuns.com/","avatar":"https://blog.sofuns.com/img/logo.png","descr":"Are you OK?,Our life is so fun.","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
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