document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    pages.forEach(page => {
        observer.observe(page);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const effectsContainer = document.getElementById('background-effects');

    // 定义中心区域的范围（文字区域）
    const centerWidth = 1.0; // 中心区域宽度占页面的100%
    const centerHeight = 0.2; // 中心区域高度占页面的20%
    const centerLeft = (1 - centerWidth) / 2; // 中心区域左边界
    const centerTop = (1 - centerHeight) / 2; // 中心区域上边界

    function isInCenter(x, y) {
        // 检查坐标是否在中心区域内
        return x >= centerLeft && x <= centerLeft + centerWidth &&
               y >= centerTop && y <= centerTop + centerHeight;
    }

    function createEffect(className, content, count) {
        for (let i = 0; i < count; i++) {
            const effect = document.createElement('div');
            effect.classList.add(className);
            effect.textContent = content;

            let x, y;
            do {
                // 随机生成位置
                x = Math.random(); // 0 ~ 1（相对于页面宽度）
                y = Math.random(); // 0 ~ 1（相对于页面高度）

                // 确保表情生成在文字的上方或下方
                if (y < centerTop) {
                    // 上方区域
                    y = Math.random() * centerTop; // 0 ~ centerTop
                } else if (y > centerTop + centerHeight) {
                    // 下方区域
                    y = Math.random() * (1 - (centerTop + centerHeight)) + (centerTop + centerHeight); // centerTop + centerHeight ~ 1
                }
            } while (isInCenter(x, y)); // 如果位置在中心区域，则重新生成

            effect.style.left = `${x * 100}vw`;
            effect.style.top = `${y * 100}vh`;
            effect.style.animationDelay = `${Math.random() * 5}s`;
            effectsContainer.appendChild(effect);
        }
    }

    createEffect('star', '🌟', 10); // 创建10个星星
    createEffect('heart', '💖', 10); // 创建10个爱心
    createEffect('cake', '🎂', 10); // 创建10个蛋糕
});

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    const musicPrompt = document.getElementById('music-prompt');

    // 用户点击页面时播放音乐
    document.addEventListener('click', function() {
        music.play();
        musicPrompt.style.display = 'none'; // 隐藏提示框
    });

    // 检查音乐是否已播放，如果没有则显示提示框
    if (music.paused) {
        musicPrompt.style.display = 'block';
    }
});

// 抖音点赞动画功能（随机图标版）
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('like-animation-container');
    let likeCount = 0;
    
    // 可用的图标列表
    const icons = [
        { symbol: '💖', type: 'heart', color: 'rgba(255, 0, 0, 0.3)' },
        { symbol: '🌟', type: 'star', color: 'rgba(255, 215, 0, 0.3)' },
        { symbol: '🌙', type: 'moon', color: 'rgba(173, 216, 230, 0.3)' },
        { symbol: '🎂', type: 'cake', color: 'rgba(255, 182, 193, 0.3)' }
    ];
    
    // 随机选择图标
    function getRandomIcon() {
        return icons[Math.floor(Math.random() * icons.length)];
    }
    
    // 创建点赞动画
    function createLikeAnimation(x, y) {
        likeCount++;
        
        // 随机选择一个图标
        const randomIcon = getRandomIcon();
        
        // 创建主图标元素
        const icon = document.createElement('div');
        icon.className = 'like-animation';
        icon.innerHTML = randomIcon.symbol;
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        container.appendChild(icon);
        
        // 创建波纹效果
        const ripple = document.createElement('div');
        ripple.className = `ripple ${randomIcon.type}`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        container.appendChild(ripple);
        
        // 创建粒子效果（使用相同的图标）
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.innerHTML = randomIcon.symbol;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.fontSize = `${10 + Math.random() * 10}px`;
            container.appendChild(particle);
            
            // 移除粒子元素
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
        
        // 移除元素
        setTimeout(() => {
            if (icon.parentNode) {
                icon.parentNode.removeChild(icon);
            }
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
        
        return randomIcon;
    }
    
    // 监听整个文档的点击事件
    document.addEventListener('click', function(e) {
        createLikeAnimation(e.clientX, e.clientY);
    });
    
    // 特别为特定元素添加更强烈的动画效果
    const specialElements = document.querySelectorAll('.heart, .heart-icon, .big-heart, .star, .cake, .love-letter');
    specialElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            // 创建多个动画效果，使用不同的随机图标
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 50;
                    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 50;
                    createLikeAnimation(x, y);
                }, i * 100);
            }
        });
    });
    
    // 双击点赞功能（随机图标版）
    let lastTap = 0;
    document.addEventListener('click', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // 双击事件 - 创建多个不同图标的动画
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const x = e.clientX + (Math.random() - 0.5) * 100;
                    const y = e.clientY + (Math.random() - 0.5) * 100;
                    createLikeAnimation(x, y);
                }, i * 100);
            }
        }
        
        lastTap = currentTime;
    });
    
    // 自动生成一些随机动画（可选）
    function createRandomAnimation() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createLikeAnimation(x, y);
        
        // 随机时间后再次创建
        setTimeout(createRandomAnimation, 2000 + Math.random() * 3000);
    }
    
    // 页面加载后开始自动生成一些动画
    setTimeout(() => {
        // createRandomAnimation(); // 取消注释这行可以启用自动动画
    }, 3000);
});
