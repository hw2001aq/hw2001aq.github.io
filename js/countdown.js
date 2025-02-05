const CountdownTimer = (() => {
    const config = {
        targetDate: "2025-04-04",
        targetName: "清明节",
        units: {
            day: { text: "今日", divider: 1, unit: "小时" },
            week: { text: "本周", divider: 24, unit: "天" },
            month: { text: "本月", divider: 24, unit: "天" },
            year: { text: "本年", divider: 24, unit: "天" }
        }
    };

    function getTimeUnit(unit) {
        const now = new Date();
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        
        if (unit === 'day') {
            const currentHour = new Date().getHours();
            const remaining = 24 - currentHour;
            const percentage = (currentHour / 24) * 100;
            
            return {
                name: config.units[unit].text,
                remaining: remaining,
                percentage: percentage.toFixed(2),
                unit: config.units[unit].unit
            };
        }

        const ranges = {
            week: () => {
                const currentDay = start.getDay();
                const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
                start.setDate(start.getDate() + mondayOffset);
                end.setDate(start.getDate() + 6);
            },
            month: () => {
                start.setDate(1);
                end.setMonth(end.getMonth() + 1, 0);
            },
            year: () => {
                start.setMonth(0, 1);
                end.setMonth(11, 31);
            }
        };
        ranges[unit]?.();

        const total = unit === "day" ? 24 : Math.floor((end - start) / 86400000) + 1;
        const passed = Math.floor((now - start) / (3600000 * config.units[unit].divider));
        const percentage = (passed / total) * 100;

        return {
            name: config.units[unit].text,
            remaining: total - passed,
            percentage: percentage.toFixed(2),
            unit: config.units[unit].unit
        };
    }

    function updateCountdown() {
        const elements = ['eventName', 'eventDate', 'daysUntil', 'countRight']
            .map(id => document.getElementById(id));
        
        if (elements.some(el => !el)) return;
        
        const [eventName, eventDate, daysUntil, countRight] = elements;
        const timeData = Object.keys(config.units).reduce((acc, unit) => ({...acc, [unit]: getTimeUnit(unit)}), {});
        const daysRemaining = Math.round((new Date(config.targetDate) - new Date().setHours(0,0,0,0)) / 86400000);

        eventName.textContent = config.targetName;
        eventDate.textContent = config.targetDate;
        daysUntil.textContent = daysRemaining;
        countRight.innerHTML = Object.entries(timeData)
            .map(([_, item]) => `
                <div class="cd-count-item">
                    <div class="cd-item-name">${item.name}</div>
                    <div class="cd-item-progress">
                        <div class="cd-progress-bar" style="width: ${item.percentage}%; opacity: ${item.percentage/100}"></div>
                        <span class="cd-percentage ${item.percentage >= 46 ? 'cd-many' : ''}">${item.percentage}%</span>
                        <span class="cd-remaining ${item.percentage >= 60 ? 'cd-many' : ''}">
                            <span class="cd-tip">还剩</span>${item.remaining}<span class="cd-tip">${item.unit}</span>
                        </span>
                    </div>
                </div>
            `).join('');
    }

    function injectStyles() {
        const styles = `
            .card-countdown .item-content {
                display: flex;
            }
            .cd-count-left {
                position: relative;
                display: flex;
                flex-direction: column;
                margin-right: 0.8rem;
                line-height: 1.5;
                align-items: center;
                justify-content: center;
            }
            .cd-count-left .cd-text {
                font-size: 14px;
            }
            .cd-count-left .cd-name {
                font-weight: bold;
                font-size: 18px;
            }
            .cd-count-left .cd-time {
                font-size: 30px;
                font-weight: bold;
                color: var(--anzhiyu-main);
            }
            .cd-count-left .cd-date {
                font-size: 12px;
                opacity: 0.6;
            }
            .cd-count-left::after {
                content: "";
                position: absolute;
                right: -0.8rem;
                width: 2px;
                height: 80%;
                background-color: var(--anzhiyu-main);
                opacity: 0.5;
            }
            .cd-count-right {
                flex: 1;
                margin-left: .8rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .cd-count-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 24px;
            }
            .cd-item-name {
                font-size: 14px;
                margin-right: 0.8rem;
                white-space: nowrap;
            }
            .cd-item-progress {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                width: 100%;
                border-radius: 8px;
                background-color: var(--anzhiyu-background);
                overflow: hidden;
            }
            .cd-progress-bar {
                height: 100%;
                border-radius: 8px;
                background-color: var(--anzhiyu-main);
            }
            .cd-percentage,
            .cd-remaining {
                position: absolute;
                font-size: 12px;
                margin: 0 6px;
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }
            .cd-many {
                color: #fff;
            }
            .cd-remaining {
                opacity: 0;
                transform: translateX(10px);
            }
            .card-countdown .item-content:hover .cd-remaining {
                transform: translateX(0);
                opacity: 1;
            }
            .card-countdown .item-content:hover .cd-percentage {
                transform: translateX(-10px);
                opacity: 0;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    let timer;
    const start = () => {
        injectStyles();
        updateCountdown();
        timer = setInterval(updateCountdown, 600000);
    };
    
    ['pjax:complete', 'DOMContentLoaded'].forEach(event => document.addEventListener(event, start));
    document.addEventListener('pjax:send', () => timer && clearInterval(timer));
    
    return { start, stop: () => timer && clearInterval(timer) };
})();

(() => {
    const injectCSS = () => {
      const style = document.createElement('style');
      style.textContent = `
        .card-latest-comments .item-headline i {
          color: var(--anzhiyu-main);
        }
  
        .card-latest-comments .headline-right {
          position: absolute;
          right: 24px;
          top: 20px;
          transition: all 0.3s;
          opacity: 0.6;
        }
  
        .card-latest-comments .headline-right:hover {
          color: var(--anzhiyu-main);
          opacity: 1;
          transform: rotate(90deg);
        }
  
        .aside-list-author {
          display: flex;
          align-items: center;
          font-weight: bold;
          height: 22px;
          gap: 5px;
        }
  
        .aside-list-date {
          font-size: 0.7rem;
          font-weight: normal;
          margin-left: auto;
        }
  
        .aside-list-content {
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-decoration: none;
          line-height: 1.2;
        }
  
        .aside-list-item:last-child {
          margin-bottom: 0!important;
        }
  
        [data-theme='dark'] .aside-list-item-right {
          filter: brightness(0.95);
        }
      `;
      document.head.appendChild(style);
    };
  
    const LatestComments = {
      API_URL: 'https://twikoo.sofuns.com/.netlify/functions/twikoo',
      ADMIN_EMAIL_MD5: '1505c11f8598cd124968c2eace822497',
      PAGE_SIZE: 5,
      LOADING_GIF: 'https://lib.bsgun.cn/Hexo-static/img/loading.gif',
    
      async fetchComments() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
    
        try {
          const response = await fetch(this.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'GET_RECENT_COMMENTS',
              includeReply: true,
              pageSize: this.PAGE_SIZE
            }),
            signal: controller.signal
          });
    
          const { data } = await response.json();
          return data;
        } catch (error) {
          console.error('获取评论出错:', error);
          return null;
        } finally {
          clearTimeout(timeoutId);
        }
      },
    
      formatTimeAgo(timestamp) {
        const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
        if (diff < 60) return '刚刚';
        if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;
    
        return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }) + '日';
      },
    
      formatContent(content) {
        if (!content) return '';
        
        return content
          .replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g, '[代码块]')
          .replace(/<code>([^<]{4,})<\/code>/g, '[代码]')
          .replace(/<code>([^<]{1,3})<\/code>/g, '$1')
          .replace(/<img[^>]*>/g, '[图片]')
          .replace(/<a[^>]*?>[\s\S]*?<\/a>/g, '[链接]')
          .replace(/<[^>]+>/g, '')
          .replace(/&(gt|lt|amp|quot|#39|nbsp);/g, m => 
            ({'>':'>', '<':'<', '&':'&', 'quot':'"', '#39':"'", 'nbsp':' '})[m.slice(1,-1)])
          .replace(/\s+/g, ' ')
          .trim();
      },
    
      generateCommentHTML(comment) {
        const { created, comment: content, url, avatar, nick, mailMd5, id } = comment;
        const timeAgo = this.formatTimeAgo(created);
        const formattedContent = this.formatContent(content);
        const adminBadge = mailMd5 === this.ADMIN_EMAIL_MD5 ? `
          <svg t="1731283534336" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29337" width="22" height="22"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m291.84 366.08c-46.08 0-79.36 23.04-92.16 66.56l-163.84 358.4h-66.56L312.32 435.2c-17.92-46.08-46.08-71.68-89.6-71.68v-35.84H512v35.84h-40.96c-25.6 2.56-30.72 23.04-12.8 61.44l102.4 225.28 89.6-199.68c25.6-56.32 2.56-84.48-71.68-89.6v-35.84h225.28v40.96z" fill="#06c013" p-id="29338" data-spm-anchor-id="a313x.search_index.0.i73.2b2d3a81BgxnVW" class=""></path></svg>` : '';
    
        return `
          <div class="aside-list-item" title="${formattedContent}" onclick="pjax.loadUrl('${url}#${id}')">
            <div class="thumbnail">
              <img class="aside-list-avatar" src="${avatar}" alt="avatar">
            </div>
            <div class="content">
              <div class="aside-list-author">
                ${nick} ${adminBadge}
                <span class="aside-list-date">${timeAgo}</span>
              </div>
              <div class="aside-list-content">${formattedContent}</div>
            </div>
          </div>
        `;
      },
    
      getErrorTemplate(icon, message) {
        return `
          <div style="min-height: 346px;display: flex;padding: 20px;text-align: center;justify-content: center;align-items: center;flex-direction: column;">
            <i class="fas fa-${icon}" style="font-size: 2rem; color: ${icon === 'exclamation-circle' ? '#ff6b6b' : '#999'}; margin-bottom: 10px;"></i>
            <p style="color: #666;margin: 0;">${message}</p>
          </div>
        `;
      },
    
      async insertComponent() {
        const container = document.getElementById("latest-comments");
        if (!container) return;
    
        container.innerHTML = `<img src="${this.LOADING_GIF}" style="display: flex;min-height: 346px;object-fit: cover;">`;
    
        const comments = await this.fetchComments();
        let content;
    
        if (comments === null) {
          content = this.getErrorTemplate('exclamation-circle', '评论加载失败，请稍后再试');
        } else if (comments.length === 0) {
          content = this.getErrorTemplate('comment-slash', '还没有评论呢~ 快来抢沙发吧！');
        } else {
          content = comments.map(this.generateCommentHTML.bind(this)).join('');
        }
    
        container.style.opacity = '0';
        container.innerHTML = content;
    
        requestAnimationFrame(() => {
          container.style.transition = 'opacity 0.3s ease-in';
          container.style.opacity = '1';
        });
      }
    };
    
    // 初始化时注入CSS并启动组件
    ['DOMContentLoaded', 'pjax:success'].forEach(event => 
      document.addEventListener(event, () => {
        injectCSS();
        LatestComments.insertComponent();
      })
    );
  })();