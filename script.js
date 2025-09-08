// 尝试自动播放音乐
function tryAutoPlayMusic() {
    const audio = document.getElementById('loveSong');
    const musicDisc = document.querySelector('.music-disc');
    const playIndicator = document.querySelector('.play-indicator');
    const needleContainer = document.querySelector('.needle-container');
    
    // 如果音频已设置了源
    if (audio.src && audio.src !== window.location.href) {
        // 尝试播放
        audio.play().then(() => {
            // 播放成功，取消静音
            audio.muted = false;
            musicDisc.style.animationPlayState = 'running';
            playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
            playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            needleContainer.style.transform = 'rotate(-5deg)';
        }).catch(error => {
            console.log('自动播放失败，等待用户交互:', error);
            // 监听用户首次交互
            const handleUserInteraction = () => {
                audio.play().then(() => {
                    audio.muted = false;
                    musicDisc.style.animationPlayState = 'running';
                    playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
                    playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                    needleContainer.style.transform = 'rotate(-5deg)';
                }).catch(err => {
                    console.log('用户交互后播放仍失败:', err);
                });
                
                // 移除所有事件监听器
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
                document.removeEventListener('keydown', handleUserInteraction);
            };
            
            // 添加多种用户交互事件监听器
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
            document.addEventListener('keydown', handleUserInteraction);
        });
    }
}

// 初始化粒子效果
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#e91e63"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e91e63",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// 计算恋爱倒计时
function updateLoveCountdown() {
    // 设置你们在一起的日期
    const togetherDate = new Date('2024-08-26'); // 2024年8月26日在一起
    const now = new Date();
    
    // 计算时间差（毫秒）
    const timeDiff = now - togetherDate;
    
    // 转换为天、时、分、秒
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // 更新DOM元素
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours % 24;
    document.getElementById('minutes').textContent = minutes % 60;
    document.getElementById('seconds').textContent = seconds % 60;
}

// 加载预设音乐
function loadPresetMusic() {
    const audio = document.getElementById('loveSong');
    const musicDisc = document.querySelector('.music-disc');
    const playIndicator = document.querySelector('.play-indicator');
    const needleContainer = document.querySelector('.needle-container');
    const presetSelect = document.getElementById('presetMusic');
    
    // 获取选择的预设音乐URL
    const selectedMusicUrl = presetSelect.value;
    
    if (selectedMusicUrl) {
        // 移除之前可能存在的文件URL对象
        if (audio.src && audio.src.startsWith('blob:')) {
            try {
                URL.revokeObjectURL(audio.src);
            } catch (e) {
                console.log('清理URL对象失败:', e);
            }
        }
        
        // 设置音频源
        audio.src = selectedMusicUrl;
        
        // 尝试播放音乐
        audio.play().then(() => {
            // 播放成功
            musicDisc.style.animationPlayState = 'running';
            playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
            playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            needleContainer.style.transform = 'rotate(-5deg)';
            
            // 显示成功提示
            const notification = document.createElement('div');
            notification.className = 'music-notification';
            notification.textContent = '正在播放预设音乐';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 1000;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(notification);
            
            // 3秒后移除提示
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }).catch(error => {
            console.log('播放预设音乐失败:', error);
            playIndicator.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            // 3秒后恢复按钮状态
            setTimeout(() => {
                playIndicator.innerHTML = '<i class="fas fa-music"></i>';
            }, 3000);
            
            // 重置选择
            presetSelect.value = '';
        });
    }
}

// 音乐播放控制
function toggleMusic() {
    const audio = document.getElementById('loveSong');
    const musicDisc = document.querySelector('.music-disc');
    const playIndicator = document.querySelector('.play-indicator');
    const needleContainer = document.querySelector('.needle-container');
    
    // 首先确保音频已静音状态被取消
    audio.muted = false;
    
    // 如果音频源为空，触发文件选择对话框
    if (!audio.src || audio.src === window.location.href) {
        const musicFileInput = document.getElementById('musicFileInput');
        musicFileInput.click();
        
        // 设置文件选择后的处理函数
        musicFileInput.onchange = function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const objectURL = URL.createObjectURL(file);
                
                // 设置音频源并播放
                audio.src = objectURL;
                audio.play().then(() => {
                    // 播放成功
                    musicDisc.style.animationPlayState = 'running';
                    playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
                    playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                    needleContainer.style.transform = 'rotate(-5deg)';
                }).catch(error => {
                    console.log('播放选择的音乐失败:', error);
                    playIndicator.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                    // 3秒后恢复按钮状态
                    setTimeout(() => {
                        playIndicator.innerHTML = '<i class="fas fa-music"></i>';
                    }, 3000);
                });
            }
        };
        return;
    }
    
    if (audio.paused) {
        audio.play().then(() => {
            // 播放成功
            musicDisc.style.animationPlayState = 'running';
            playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
            playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            needleContainer.style.transform = 'rotate(-5deg)';
        }).catch(error => {
            console.log('无法自动播放音乐:', error);
            // 显示错误提示
            playIndicator.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            // 3秒后恢复按钮状态
            setTimeout(() => {
                playIndicator.innerHTML = '<i class="fas fa-play"></i>';
            }, 3000);
            return;
        });
    } else {
        // 暂停播放
        audio.pause();
        // 停止旋转动画
        musicDisc.style.animationPlayState = 'paused';
        // 显示播放图标
        playIndicator.innerHTML = '<i class="fas fa-play"></i>';
        playIndicator.style.background = 'linear-gradient(135deg, #e91e63, #ff4081)';
        needleContainer.style.transform = 'rotate(-15deg)';
    }
}

// 保存爱的留言
function saveLoveMessage() {
    const messageText = document.getElementById('love-message').value;
    if (messageText.trim() === '') {
        alert('请输入您的留言！');
        return;
    }
    
    // 创建留言元素
    const messageElement = document.createElement('div');
    messageElement.className = 'saved-message';
    messageElement.textContent = messageText;
    
    // 添加到保存的留言区域
    const savedMessagesContainer = document.getElementById('saved-messages');
    savedMessagesContainer.appendChild(messageElement);
    
    // 清空输入框
    document.getElementById('love-message').value = '';
    
    // 添加动画效果
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
}

// 回忆问答游戏
let quizData = [
    {
        question: "我们第一次见面的地方是哪里？",
        options: ["高铁站", "公园", "火车站", "餐厅"],
        correct: 0,
        hint: "记得那天我们在车站初次相遇。"
    },
    {
        question: "我们第一次一起做的手工是什么？",
        options: ["滴胶画", "手印画", "印章画", "海报画"],
        correct: 1,
        hint: "这是我做的第一个手工。"
    },
    {
        question: "我们在一起的纪念日是哪一天？",
        options: ["2024年8月26日", "2024年7月15日", "2024年9月10日", "2024年6月30日"],
        correct: 0,
        hint: "查看页面顶部的倒计时！"
    },
    {
        question: "你送给我的第一个礼物是什么？",
        options: ["鲜花饼", "明信片", "手表", "以上均不对"],
        correct: 3,
        hint: "是你呀！"
    },
    {
        question: "我们第一次一起旅行去了哪里？",
        options: ["重庆", "福州", "武汉", "南京"],
        correct: 3,
        hint: "和你一起逛梧桐大道很开心呀~"
    },
    {
        question: "我最喜欢的你唱的一首歌是什么？",
        options: ["最后一页", "晴天", "特别的人", "慢慢喜欢你"],
        correct: 2,
        hint: "这首歌有一句歌词是'不求计分的平等~'。"
    },
    {
        question: "你第一次给的点的奶茶是什么？",
        options: ["古茗", "霸王茶姬", "蜜雪冰城", "茶百道"],
        correct: 1,
        hint: "暑假我实习时，配合你的鲜花饼，嘻嘻！"
    },
    {
        question: "我最喜欢的你的一个特点是什么？",
        options: ["善良", "聪明", "幽默", "坚强"],
        correct: 0,
        hint: "你总是对周围的人很好。"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswerSelected = false;

// 开始回忆问答游戏
function startMemoryQuiz() {
    // 重置游戏状态
    currentQuestionIndex = 0;
    score = 0;
    isAnswerSelected = false;
    
    // 显示游戏容器
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'block';
    
    // 重置下一题按钮的点击事件
    const nextButton = document.getElementById('next-question');
    nextButton.onclick = nextQuestion;
    
    // 显示第一题
    showQuestion();
}

// 显示问题
function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showQuizResult();
        return;
    }
    
    const currentQuestion = quizData[currentQuestionIndex];
    
    // 更新问题文本
    const questionElement = document.getElementById('quiz-question');
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // 清空并更新选项
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    // 清空结果显示
    const resultElement = document.getElementById('quiz-result');
    resultElement.textContent = '';
    resultElement.className = 'quiz-result';
    
    // 隐藏下一题按钮
    const nextButton = document.getElementById('next-question');
    nextButton.style.display = 'none';
    
    // 重置答案选择状态
    isAnswerSelected = false;
    
    // 创建选项元素
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        // 添加点击事件
        optionElement.addEventListener('click', () => {
            if (!isAnswerSelected) {
                selectAnswer(optionElement, index);
            }
        });
        
        optionsContainer.appendChild(optionElement);
    });
}

// 选择答案
function selectAnswer(optionElement, selectedIndex) {
    isAnswerSelected = true;
    const currentQuestion = quizData[currentQuestionIndex];
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    
    // 添加选中样式
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none'; // 禁用所有选项的点击
    });
    
    // 检查答案是否正确
    if (selectedIndex === currentQuestion.correct) {
        // 答案正确
        score++;
        optionElement.classList.add('correct');
        resultElement.textContent = `回答正确！❤️ 提示：${currentQuestion.hint}`;
        resultElement.className = 'quiz-result correct';
        
        // 添加庆祝动画
        createCelebrationAnimation();
        
        // 答案正确时，延迟1.5秒后自动跳转到下一题
        setTimeout(() => {
            try {
                nextQuestion();
            } catch (error) {
                console.log('自动跳转失败，游戏继续:', error);
                // 确保游戏可以继续
                if (nextButton) {
                    nextButton.style.display = 'block';
                    nextButton.style.visibility = 'visible';
                    nextButton.style.opacity = '1';
                    nextButton.style.zIndex = '9999';
                }
            }
        }, 1500);
    } else {
        // 答案错误
        optionElement.classList.add('incorrect');
        // 高亮正确答案
        allOptions[currentQuestion.correct].classList.add('correct');
        resultElement.textContent = `回答错误！正确答案是：${currentQuestion.options[currentQuestion.correct]}。提示：${currentQuestion.hint}`;
        resultElement.className = 'quiz-result incorrect';
        
        // 答案错误时，显示下一题按钮但不自动跳转
        if (nextButton) {
            // 重置所有可能影响显示的样式
            nextButton.style.display = 'block';
            nextButton.style.visibility = 'visible';
            nextButton.style.opacity = '1';
            nextButton.style.zIndex = '9999';
            nextButton.style.position = 'relative';
            nextButton.style.marginTop = '20px';
            nextButton.style.padding = '15px 40px';
            nextButton.style.fontSize = '1.1rem';
            nextButton.style.cursor = 'pointer';
            nextButton.style.border = '2px solid #e91e63';
            // 添加明确的点击事件
            nextButton.onclick = nextQuestion;
            
            // 确保按钮在视图中可见
            nextButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// 下一题
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// 显示游戏结果
function showQuizResult() {
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    
    // 显示结果
    questionElement.textContent = '游戏结束！';
    optionsContainer.innerHTML = '';
    
    let resultText = '';
    let resultClass = '';
    
    if (score === quizData.length) {
        resultText = `恭喜你！你答对了所有${quizData.length}题！你对我们的回忆了如指掌！❤️`;
        resultClass = 'quiz-result correct';
    } else if (score >= quizData.length * 0.7) {
        resultText = `很棒！你答对了${score}题，答错了${quizData.length - score}题。你对我们的回忆很了解！👍`;
        resultClass = 'quiz-result correct';
    } else if (score >= quizData.length * 0.4) {
        resultText = `不错！你答对了${score}题，答错了${quizData.length - score}题。再努力一下就能更了解我们的回忆了！💪`;
        resultClass = 'quiz-result';
    } else {
        resultText = `继续加油！你答对了${score}题，答错了${quizData.length - score}题。多和我聊聊我们的回忆吧！😊`;
        resultClass = 'quiz-result incorrect';
    }
    
    resultElement.textContent = resultText;
    resultElement.className = resultClass;
    
    // 更改按钮为重新开始
    nextButton.textContent = '再玩一次';
    nextButton.style.display = 'inline-block';
    nextButton.onclick = startMemoryQuiz;
    
    // 添加庆祝动画
    createCelebrationAnimation();
}

// 创建庆祝动画
function createCelebrationAnimation() {
    try {
        // 使用存在的quiz-container作为动画容器
        const container = document.getElementById('quiz-container');
        if (!container) return; // 如果容器不存在，就直接返回
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = `${Math.random() * 10 + 5}px`;
            particle.style.background = ['#e91e63', '#9c27b0', '#ff4081', '#4caf50', '#2196f3', '#ffeb3b'][Math.floor(Math.random() * 6)];
            particle.style.borderRadius = '50%';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '100';
            
            // 随机角度和距离
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // 添加动画
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });
            
            container.appendChild(particle);
            
            // 动画结束后移除
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    particle.remove();
                }
            }, 2000);
        }
    } catch (error) {
        console.log('庆祝动画创建失败，游戏继续:', error);
    }
}

// 初始化关系数据图表
function initRelationshipChart() {
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('relationshipChart').getContext('2d');
        
        // 模拟数据 - 表示每个月的幸福感指数
        const months = ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
        const happinessData = [75, 82, 78, 85, 88, 90, 86, 92, 94, 95, 97, 100];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: '我们的幸福指数',
                    data: happinessData,
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    borderColor: 'rgba(233, 30, 99, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(233, 30, 99, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Microsoft YaHei',
                                size: 14
                            },
                            color: '#333'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Microsoft YaHei',
                            size: 14
                        },
                        bodyFont: {
                            family: 'Microsoft YaHei',
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 5,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                family: 'Microsoft YaHei'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Microsoft YaHei'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
}

// 初始化活动类型分布图表
function initActivityChart() {
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('activityChart').getContext('2d');
        
        // 模拟数据 - 表示不同活动类型的分布
         const activities = ['约会聚餐', '看电影听音乐', '旅行', '赠送礼物', '聊天谈心', '户外活动'];
        const counts = [25, 18, 10, 15, 30, 20];
        const colors = [
            'rgba(233, 30, 99, 0.8)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(255, 152, 0, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(0, 188, 212, 0.8)'
        ];
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: activities,
                datasets: [{
                    data: counts,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                family: 'Microsoft YaHei',
                                size: 12
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Microsoft YaHei',
                            size: 14
                        },
                        bodyFont: {
                            family: 'Microsoft YaHei',
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 5,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value}次 (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// 初始化爱情里程碑图表
function initMilestoneChart() {
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('milestoneChart').getContext('2d');
        
        // 实际数据 - 表示爱情里程碑
         const milestones = ['相识', '确认关系', '第一次约会', '第一次旅行', '第一个情人节', '恋爱周年'];
        const days = [0, 58, 95, 95, 231, 365];
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: milestones,
                datasets: [{
                    label: '天数',
                    data: days,
                    backgroundColor: 'rgba(233, 30, 99, 0.6)',
                    borderColor: 'rgba(233, 30, 99, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Microsoft YaHei',
                            size: 14
                        },
                        bodyFont: {
                            family: 'Microsoft YaHei',
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 5,
                        callbacks: {
                            label: function(context) {
                                return `第${context.raw}天`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: 'Microsoft YaHei'
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                family: 'Microsoft YaHei'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// 初始化情感分析图表
function initEmotionChart() {
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('emotionChart').getContext('2d');
        
        // 模拟数据 - 表示情感分析
        const emotions = ['幸福感', '信任度', '默契度', '亲密感', '理解度', '依赖感'];
        const scores = [95, 90, 88, 92, 85, 80];
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: emotions,
                datasets: [{
                    label: '情感指数',
                    data: scores,
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    borderColor: 'rgba(233, 30, 99, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(233, 30, 99, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Microsoft YaHei',
                                size: 14
                            },
                            color: '#333'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Microsoft YaHei',
                            size: 14
                        },
                        bodyFont: {
                            family: 'Microsoft YaHei',
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 5
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                family: 'Microsoft YaHei'
                            },
                            stepSize: 20
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                family: 'Microsoft YaHei',
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// 记忆配对游戏
function startMemoryGame() {
    // 创建游戏区域
    const gameContainer = document.getElementById('memory-game');
    
    // 清空现有内容
    gameContainer.innerHTML = '';
    
    // 游戏卡片数据
    const cards = [
        { id: 1, src: '图片/01.jpg', matched: false },
        { id: 2, src: '图片/02.jpg', matched: false },
        { id: 3, src: '图片/03.jpg', matched: false },
        { id: 4, src: '图片/04.jpg', matched: false },
        { id: 5, src: '图片/01.jpg', matched: false },
        { id: 6, src: '图片/02.jpg', matched: false },
        { id: 7, src: '图片/03.jpg', matched: false },
        { id: 8, src: '图片/04.jpg', matched: false }
    ];
    
    // 洗牌
    cards.sort(() => Math.random() - 0.5);
    
    // 创建游戏网格
    const gameGrid = document.createElement('div');
    gameGrid.className = 'memory-game-grid';
    gameGrid.style.display = 'grid';
    gameGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gameGrid.style.gap = '15px';
    gameGrid.style.marginTop = '20px';
    gameGrid.style.width = '100%';
    
    // 游戏状态
    let flippedCards = [];
    let canFlip = true;
    let matchedPairs = 0;
    
    // 创建卡片
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.style.width = '120px';
        cardElement.style.height = '120px';
        cardElement.style.position = 'relative';
        cardElement.style.cursor = 'pointer';
        cardElement.style.perspective = '1000px';
        cardElement.dataset.id = card.id;
        
        // 卡片内部容器（用于3D翻转效果）
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        cardInner.style.width = '100%';
        cardInner.style.height = '100%';
        cardInner.style.position = 'relative';
        cardInner.style.transition = 'transform 0.6s ease';
        cardInner.style.transformStyle = 'preserve-3d';
        
        // 卡片背面
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.width = '100%';
        cardBack.style.height = '100%';
        cardBack.style.backgroundColor = '#e91e63';
        cardBack.style.borderRadius = '10px';
        cardBack.style.display = 'flex';
        cardBack.style.justifyContent = 'center';
        cardBack.style.alignItems = 'center';
        cardBack.style.color = 'white';
        cardBack.style.fontSize = '32px';
        cardBack.style.position = 'absolute';
        cardBack.style.backfaceVisibility = 'hidden';
        cardBack.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        cardBack.textContent = '❤️';
        
        // 卡片正面
        const cardFront = document.createElement('img');
        cardFront.className = 'card-front';
        cardFront.src = card.src;
        cardFront.style.width = '100%';
        cardFront.style.height = '100%';
        cardFront.style.objectFit = 'cover';
        cardFront.style.borderRadius = '10px';
        cardFront.style.position = 'absolute';
        cardFront.style.backfaceVisibility = 'hidden';
        cardFront.style.transform = 'rotateY(180deg)';
        cardFront.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        
        // 添加到卡片元素
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        cardElement.appendChild(cardInner);
        
        // 添加点击事件
        cardElement.addEventListener('click', () => {
            if (!canFlip || flippedCards.length === 2 || cardElement.classList.contains('flipped') || card.matched) {
                return;
            }
            
            // 翻转卡片（3D效果）
            cardInner.style.transform = 'rotateY(180deg)';
            cardElement.classList.add('flipped');
            
            flippedCards.push({ element: cardElement, card });
            
            // 检查是否匹配
            if (flippedCards.length === 2) {
                canFlip = false;
                
                if (flippedCards[0].card.src === flippedCards[1].card.src) {
                    // 匹配成功
                    matchedPairs++;
                    flippedCards[0].card.matched = true;
                    flippedCards[1].card.matched = true;
                    
                    // 添加匹配成功动画
                    flippedCards.forEach(item => {
                        // 增加卡片大小以突出显示
                        item.element.querySelector('.card-inner').style.transform = 'rotateY(180deg) scale(1.05)';
                        item.element.querySelector('.card-inner').style.transition = 'transform 0.3s ease';
                    });
                    
                    flippedCards = [];
                    canFlip = true;
                    
                    // 检查游戏是否结束
                    if (matchedPairs === 4) {
                        setTimeout(() => {
                            alert('恭喜你完成了记忆配对游戏！❤️');
                        }, 500);
                    }
                } else {
                    // 匹配失败，翻转回去
                    setTimeout(() => {
                        flippedCards.forEach(item => {
                            item.element.querySelector('.card-inner').style.transform = 'rotateY(0)';
                            item.element.classList.remove('flipped');
                        });
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        });
        
        gameGrid.appendChild(cardElement);
    });
    
    // 添加响应式布局调整
    function adjustGameLayout() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 600) {
            // 在小屏幕上使用3列布局
            gameGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            gameGrid.querySelectorAll('.memory-card').forEach(card => {
                card.style.width = '80px';
                card.style.height = '80px';
            });
        } else {
            // 在大屏幕上使用4列布局
            gameGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            gameGrid.querySelectorAll('.memory-card').forEach(card => {
                card.style.width = '120px';
                card.style.height = '120px';
            });
        }
    }
    
    // 初始调整
    adjustGameLayout();
    
    // 监听窗口大小变化
    window.addEventListener('resize', adjustGameLayout);
    
    gameContainer.appendChild(gameGrid);
}

// 创建漂浮爱心装饰
function createFloatingHearts() {
    const container = document.querySelector('.container');
    const heartCount = 15; // 创建15个漂浮爱心
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // 随机位置和动画延迟
        const leftPos = Math.random() * 100;
        const delay = Math.random() * 20;
        const size = 10 + Math.random() * 30;
        const duration = 15 + Math.random() * 15;
        
        heart.style.left = `${leftPos}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = 0.5 - Math.random() * 0.3;
        
        container.appendChild(heart);
    }
}

// 页面滚动动画
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').substring(1) === current) {
                link.style.color = '#e91e63';
            }
        });
        
        // 为每个部分添加滚动动画
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - window.innerHeight + sectionHeight / 3)) {
                section.classList.add('section-visible');
                
                // 添加元素入场动画
                const animatedElements = section.querySelectorAll('.countdown-item, .gallery-item, .message-item, .wish-item, .birthday-cake');
                animatedElements.forEach((elem, index) => {
                    setTimeout(() => {
                        elem.style.opacity = '1';
                        elem.style.transform = 'translateY(0)';
                    }, 100 * index);
                });
            }
        });
    });
}

// 为按钮添加悬停动画效果
function addButtonAnimations() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05) translateY(-3px)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
        });
    });
}

// 生日蛋糕蜡烛点燃效果
function initBirthdayCake() {
    const candleBtn = document.getElementById('light-candles');
    if (candleBtn) {
        candleBtn.addEventListener('click', () => {
            const flames = document.querySelectorAll('.flame');
            flames.forEach((flame, index) => {
                setTimeout(() => {
                    flame.style.opacity = '1';
                    flame.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            });
            
            // 显示生日祝福消息
            setTimeout(() => {
                alert('生日快乐！愿你的每一天都充满爱与幸福！❤️');
            }, flames.length * 200 + 500);
            
            // 禁用按钮防止重复点击
            candleBtn.disabled = true;
            candleBtn.textContent = '蜡烛已点燃';
            candleBtn.style.opacity = '0.7';
        });
    }
}

// 保存生日愿望函数（用于按钮直接调用）
function saveBirthdayWish() {
    const wishInput = document.getElementById('birthday-wish');
    
    if (wishInput) {
        const wishText = wishInput.value.trim();
        if (wishText) {
            // 保存愿望到本地存储，这样后台可以通过localStorage查看
            localStorage.setItem('birthdayWish', wishText);
            
            // 添加星星动画
            createWishStars();
            
            // 清空输入框
            wishInput.value = '';
            
            // 显示成功提示
            alert('生日快乐！愿望已保存！✨');
        } else {
            alert('请输入您的生日愿望！');
        }
    }
}

// 生日愿望初始化功能
function initBirthdayWishes() {
    const wishInput = document.getElementById('birthday-wish');
    
    if (wishInput) {
        // 确保输入框为空，不显示上一次保存的愿望
        wishInput.value = '';
    }
}

// 创建愿望星星动画
function createWishStars() {
    // 使用正确的容器ID，与HTML中的section ID匹配
    const container = document.querySelector('.birthday-wish-section');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'wish-star';
        
        // 随机位置和大小
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.backgroundColor = 'rgba(255, 215, 0, 0.8)';
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '10';
        star.style.animation = `wishStar ${duration}s ease-in-out ${delay}s forwards`;
        
        container.appendChild(star);
        
        // 动画结束后移除
        setTimeout(() => {
            if (container.contains(star)) {
                container.removeChild(star);
            }
        }, (delay + duration) * 1000);
    }
}

// 生日祝福墙功能
function initBirthdayWall() {
    const addBtn = document.getElementById('add-blessing');
    const blessingInput = document.getElementById('new-blessing');
    const wallContainer = document.getElementById('wishes-wall');
    
    if (addBtn && blessingInput && wallContainer) {
        // 初始化一些预设祝福
        const presetBlessings = [
            '愿你永远年轻美丽！',
            '生日快乐，我的宝宝！',
            '每一天都要开心哦！',
            '我爱你，生日快乐！',
            '愿所有梦想都成真！'
        ];
        
        // 检查是否有已保存的祝福
        let savedBlessings = JSON.parse(localStorage.getItem('birthdayBlessings')) || [];
        
        // 如果没有保存的祝福，使用预设祝福
        if (savedBlessings.length === 0) {
            savedBlessings = presetBlessings;
            localStorage.setItem('birthdayBlessings', JSON.stringify(savedBlessings));
        }
        
        // 显示所有祝福
        displayBlessings(savedBlessings);
        
        addBtn.addEventListener('click', () => {
            const blessingText = blessingInput.value.trim();
            if (blessingText) {
                // 添加新祝福
                savedBlessings.push(blessingText);
                
                // 保存到本地存储
                localStorage.setItem('birthdayBlessings', JSON.stringify(savedBlessings));
                
                // 显示更新后的祝福列表
                displayBlessings(savedBlessings);
                
                // 清空输入框
                blessingInput.value = '';
                
                // 显示成功提示
                alert('祝福已添加！❤️');
            } else {
                alert('请输入您的生日祝福！');
            }
        });
    }
}

// 显示祝福列表
function displayBlessings(blessings) {
    const wallContainer = document.getElementById('wishes-wall');
    if (wallContainer) {
        // 清空现有祝福
        wallContainer.innerHTML = '';
        
        // 添加新祝福
        blessings.forEach((blessing, index) => {
            const blessingElement = document.createElement('div');
            blessingElement.className = 'blessing-item';
            blessingElement.style.opacity = '0';
            blessingElement.style.transform = 'translateY(20px)';
            blessingElement.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
            
            blessingElement.innerHTML = `
                <span class="blessing-text">${blessing}</span>
                <span class="blessing-heart">❤️</span>
            `;
            
            wallContainer.appendChild(blessingElement);
            
            // 触发动画
            setTimeout(() => {
                blessingElement.style.opacity = '1';
                blessingElement.style.transform = 'translateY(0)';
            }, 50);
        });
    }
}

// 初始化照片墙动画效果 - 增强版，更浪漫、更随机
function initGalleryAnimation() {
    // 获取元素
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryContainer = document.querySelector('.gallery-container');
    const photoGallery = document.querySelector('.photo-gallery');
    
    if (!galleryContainer || !photoGallery) {
        console.error('没有找到照片墙相关容器');
        return;
    }
    
    // 确保照片墙容器在电脑浏览器中有合适的尺寸和响应式布局
    galleryContainer.style.display = 'flex';
    galleryContainer.style.flexWrap = 'wrap';
    galleryContainer.style.justifyContent = 'center';
    galleryContainer.style.gap = '15px';
    galleryContainer.style.padding = '20px';
    
    // 获取爱心形状容器
    const heartContainer = document.querySelector('.gallery-heart-shape');
    
    // 克隆所有图片到爱心形状容器，添加随机性
    const shuffledItems = Array.from(galleryItems).sort(() => Math.random() - 0.5);
    
    shuffledItems.forEach((item, index) => {
        // 为原始图片添加data-position属性和随机初始样式
        item.setAttribute('data-position', index + 1);
        item.style.opacity = '0';
        item.style.transform = `rotate(${(Math.random() * 8 - 4)}deg) scale(0.8)`;
        item.style.transition = 'all 0.6s ease-out';
        
        // 在爱心容器中创建对应的图片，使用不同的随机种子
        const heartItem = document.createElement('div');
        const randomPosition = Math.floor(Math.random() * 20) + 1;
        heartItem.className = `gallery-item heart-position heart-position-${randomPosition}`;
        heartItem.innerHTML = item.innerHTML;
        heartItem.setAttribute('data-position', index + 1);
        
        // 为爱心形状中的图片预设随机旋转和透明度
        heartItem.style.opacity = '0';
        heartItem.style.transform = `rotate(${(Math.random() * 10 - 5)}deg) scale(0.7)`;
        
        heartContainer.appendChild(heartItem);
    });
    
    // 开始动态闪入效果
    startGalleryFlashAnimation(galleryItems, galleryContainer, heartContainer);
}

// 照片墙动态闪入闪出效果
function startGalleryFlashAnimation(originalItems, gridContainer, heartContainer) {
    let currentIndex = 0;
    const totalItems = originalItems.length;
    const displayedItems = new Set();
    let isTransitioning = false;
    
    // 随机位置和角度生成函数
    function getRandomEntryAnimation() {
        const directions = ['top', 'bottom', 'left', 'right'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const randomRotate = (Math.random() * 10 - 5) + 'deg'; // 随机旋转角度 -5到5度
        const randomDelay = Math.random() * 0.5; // 随机延迟0到0.5秒
        
        return { direction: randomDirection, rotate: randomRotate, delay: randomDelay };
    }
    
    // 初始显示几张图片 - 随机选择并添加不同的进入动画
    function showInitialItems() {
        // 打乱图片顺序
        const shuffledIndices = Array.from({length: totalItems}, (_, i) => i);
        for (let i = shuffledIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
        }
        
        // 先显示9张图片（比之前的6张更多样）
        for (let i = 0; i < Math.min(9, totalItems); i++) {
            const itemIndex = shuffledIndices[i];
            const item = originalItems[itemIndex];
            
            // 设置随机进入动画
            setTimeout(() => {
                item.classList.add('visible');
                displayedItems.add(itemIndex);
            }, i * 150 + Math.random() * 200); // 随机延迟增强浪漫感
        }
        
        // 延迟后开始动态切换
        setTimeout(() => {
            startDynamicRotation();
        }, 3000); // 更长的初始展示时间
    }
    
    // 开始动态切换图片 - 更随机、更浪漫的切换逻辑
    function startDynamicRotation() {
        const rotationInterval = setInterval(() => {
            if (isTransitioning) return;
            
            // 控制显示的图片数量，保持在8-12张之间
            const targetCount = Math.min(12, totalItems);
            
            // 随机决定是显示还是隐藏图片
            const action = displayedItems.size >= targetCount || Math.random() > 0.6
                ? 'hide' 
                : 'show';
            
            if (action === 'hide') {
                // 随机选择要隐藏的图片
                const visibleIndices = Array.from(displayedItems);
                if (visibleIndices.length > 8) { // 保证至少显示8张
                    const hideIndex = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
                    
                    // 隐藏选择的图片
                    originalItems[hideIndex].classList.remove('visible');
                    originalItems[hideIndex].classList.add('hidden');
                    displayedItems.delete(hideIndex);
                }
            } else {
                // 随机选择要显示的新图片
                let newIndex;
                const hiddenIndices = [];
                for (let i = 0; i < totalItems; i++) {
                    if (!displayedItems.has(i)) {
                        hiddenIndices.push(i);
                    }
                }
                
                if (hiddenIndices.length > 0) {
                    newIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
                    
                    // 设置随机进入动画
                    const { direction, rotate, delay } = getRandomEntryAnimation();
                    
                    // 设置初始位置
                    const item = originalItems[newIndex];
                    item.style.rotate = rotate;
                    
                    // 延迟后显示新图片
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                        displayedItems.add(newIndex);
                    }, delay * 1000);
                }
            }
        }, 2000); // 更长的切换间隔，更自然
        
        // 12秒后切换到爱心形状
        setTimeout(() => {
            clearInterval(rotationInterval);
            transformToHeartShape(originalItems, gridContainer, heartContainer);
        }, 12000);
    }
    
    showInitialItems();
}

// 将照片墙转换为爱心形状 - 更浪漫、更随机的过渡效果
function transformToHeartShape(originalItems, gridContainer, heartContainer) {
    isTransitioning = true;
    
    // 优雅地隐藏所有原始图片（带随机延迟的淡出效果）
    originalItems.forEach((item, index) => {
        const randomDelay = Math.random() * 0.5; // 随机延迟0-0.5秒
        setTimeout(() => {
            item.classList.remove('visible');
            item.classList.add('hidden');
        }, randomDelay * 1000);
    });
    
    // 平滑淡出网格容器，添加缩放效果增强过渡感
    gridContainer.style.opacity = '0';
    gridContainer.style.transform = 'scale(0.95)';
    gridContainer.style.transition = 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out';
    
    // 准备爱心容器
    heartContainer.style.display = 'block';
    heartContainer.style.opacity = '0';
    heartContainer.style.transform = 'scale(0.9)';
    heartContainer.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
    
    // 显示爱心容器和照片
    setTimeout(() => {
        // 显示爱心容器
        heartContainer.style.opacity = '1';
        heartContainer.style.transform = 'scale(1)';
        
        // 随机顺序获取爱心形状中的照片
        const heartItems = Array.from(heartContainer.querySelectorAll('.gallery-item'));
        const shuffledHeartItems = heartItems.sort(() => Math.random() - 0.5);
        
        // 创建浪漫的波纹式显示效果
        const totalDuration = 2000; // 总动画时长
        const delayInterval = totalDuration / shuffledHeartItems.length;
        
        shuffledHeartItems.forEach((item, index) => {
            // 计算随机延迟，形成自然的波纹效果
            const baseDelay = index * delayInterval * 0.7;
            const randomOffset = Math.random() * 150;
            const totalDelay = baseDelay + randomOffset;
            
            setTimeout(() => {
                // 添加随机旋转角度，增强自然感
                const randomRotate = (Math.random() * 8 - 4) + 'deg'; // -4到4度的随机旋转
                item.style.setProperty('--rotate', randomRotate);
                
                // 添加动画类
                item.classList.add('heart-animate');
                
                // 添加微妙的浮动动画
                setTimeout(() => {
                    addSubtleFloatAnimation(item);
                }, 500);
            }, totalDelay);
        });
        
        // 动画完成后添加交互效果
        setTimeout(() => {
            addHeartGalleryInteractions(shuffledHeartItems);
            isTransitioning = false;
        }, totalDuration + 1000);
    }, 1000);
}

// 全局变量用于控制照片墙状态
let isTransitioning = false;

// 添加微妙的浮动动画效果
function addSubtleFloatAnimation(element) {
    if (isTransitioning) return;
    
    // 随机生成浮动参数
    const floatHeight = Math.random() * 5 + 5; // 5-10px的浮动高度
    const floatDuration = Math.random() * 2 + 3; // 3-5秒的浮动周期
    
    // 设置CSS动画
    element.style.transition = `transform ${floatDuration}s ease-in-out infinite alternate`;
    element.style.transform = element.style.transform + ` translateY(-${floatHeight}px)`;
    
    // 定期更换浮动方向，使动画更加自然
    setInterval(() => {
        if (!isTransitioning && element.isConnected) {
            const currentTransform = element.style.transform;
            if (currentTransform.includes(`translateY(-${floatHeight}px)`)) {
                // 恢复原始位置
                const newTransform = currentTransform.replace(`translateY(-${floatHeight}px)`, '');
                element.style.transform = newTransform;
            } else {
                // 再次浮动
                element.style.transform = element.style.transform + ` translateY(-${floatHeight}px)`;
            }
        }
    }, floatDuration * 1000);
}

// 处理爱心形状中图片的交互效果
function addHeartGalleryInteractions(heartItems) {
    heartItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (isTransitioning) return;
            
            // 提升z-index并添加缩放效果
            const currentZIndex = item.style.zIndex || window.getComputedStyle(item).zIndex;
            item.style.zIndex = parseInt(currentZIndex) + 10;
            item.style.transform = 'scale(1.2) rotate(0deg) translateY(-5px)';
            item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            item.style.transition = 'all 0.3s ease-out';
        });
        
        item.addEventListener('mouseleave', () => {
            if (isTransitioning) return;
            
            // 恢复原始状态
            const currentZIndex = item.style.zIndex || window.getComputedStyle(item).zIndex;
            item.style.zIndex = parseInt(currentZIndex) - 10;
            
            // 恢复旋转角度
            const positionClass = Array.from(item.classList).find(cls => cls.startsWith('heart-position-'));
            if (positionClass) {
                // 检查是否有特定的旋转变量
                const style = window.getComputedStyle(item);
                const rotateVar = style.getPropertyValue('--rotate');
                if (rotateVar) {
                    item.style.transform = `scale(1) translate(var(--translate-x, 0), var(--translate-y, 0)) rotate(${rotateVar})`;
                }
            }
            
            item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
        
        // 添加点击效果
        item.addEventListener('click', () => {
            if (isTransitioning) return;
            
            // 创建一个临时的放大效果
            const originalTransform = item.style.transform;
            item.style.transform = 'scale(1.3) rotate(0deg)';
            item.style.zIndex = '100';
            
            // 0.3秒后恢复
            setTimeout(() => {
                item.style.transform = originalTransform;
                item.style.zIndex = '5';
            }, 300);
        });
    });
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    // 初始化粒子背景
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });
    
    // 初始化照片墙动画
    initGalleryAnimation();
    
    // 创建漂浮爱心装饰
    createFloatingHearts();
    
    // 更新恋爱倒计时
    updateLoveCountdown();
    setInterval(updateLoveCountdown, 1000);
    
    // 初始化关系数据图表
    initRelationshipChart();
    // 初始化其他数据图表
    initActivityChart();
    initMilestoneChart();
    initEmotionChart();
    
    // 添加页面滚动动画
    addScrollAnimations();
    
    // 添加按钮悬停动画
    addButtonAnimations();
    
    // 初始化记忆配对游戏
    startMemoryGame();
    
    // 初始化生日蛋糕
    initBirthdayCake();
    
    // 初始化生日愿望
    initBirthdayWishes();
    
    // 初始化生日祝福墙
    initBirthdayWall();
    
    // 添加页面加载动画
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 1s ease';
    
    // 尝试自动播放音乐
    const audio = document.getElementById('loveSong');
    const musicDisc = document.querySelector('.music-disc');
    const playIndicator = document.querySelector('.play-indicator');
    const needleContainer = document.querySelector('.needle-container');
    
    // 设置自动播放标志
    let isAudioEnabled = false;
    
    // 增强的自动播放函数
    function attemptAutoPlay() {
        if (isAudioEnabled) return;
        
        // 取消静音
        audio.muted = false;
        
        audio.play().then(() => {
            // 播放成功
            isAudioEnabled = true;
            musicDisc.style.animationPlayState = 'running';
            playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
            playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            needleContainer.style.transform = 'rotate(-5deg)';
            console.log('音乐自动播放成功');
        }).catch(error => {
            console.log('自动播放尝试失败，等待用户交互:', error);
        });
    }
    
    // 立即尝试自动播放
    attemptAutoPlay();
    
    // 延迟100毫秒再次尝试（有些浏览器可能需要短暂延迟）
    setTimeout(attemptAutoPlay, 100);
    
    // 再延迟1000毫秒第三次尝试
    setTimeout(attemptAutoPlay, 1000);
    
    // 设置初始状态
    playIndicator.innerHTML = '<i class="fas fa-play"></i>';
    playIndicator.style.background = 'linear-gradient(135deg, #e91e63, #ff4081)';
    needleContainer.style.transform = 'rotate(-15deg)';
    
    // 添加多种用户交互事件监听器，增加触发播放的机会
    document.addEventListener('click', enableAudioOnInteraction);
    document.addEventListener('touchstart', enableAudioOnInteraction);
    document.addEventListener('mousemove', enableAudioOnInteraction, { once: true });
    document.addEventListener('keydown', enableAudioOnInteraction, { once: true });
    document.addEventListener('scroll', enableAudioOnInteraction, { once: true });
    
    // 用户交互后启用音频播放的函数
    function enableAudioOnInteraction() {
        if (isAudioEnabled) return;
        
        // 取消静音
        audio.muted = false;
        
        audio.play().then(() => {
            isAudioEnabled = true;
            console.log('用户交互后音乐开始播放');
            // 开始旋转动画
            musicDisc.style.animationPlayState = 'running';
            // 显示暂停图标
            playIndicator.innerHTML = '<i class="fas fa-pause"></i>';
            playIndicator.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            needleContainer.style.transform = 'rotate(-5deg)';
            
            // 移除事件监听器，避免重复调用
            document.removeEventListener('click', enableAudioOnInteraction);
            document.removeEventListener('touchstart', enableAudioOnInteraction);
            document.removeEventListener('mousemove', enableAudioOnInteraction);
            document.removeEventListener('keydown', enableAudioOnInteraction);
            document.removeEventListener('scroll', enableAudioOnInteraction);
        }).catch(error => {
            console.log('用户交互后播放仍失败:', error);
        });
    }
    
    // 为照片添加悬停效果（爱心形状中的照片）
    document.addEventListener('DOMContentLoaded', () => {
        const allGalleryItems = document.querySelectorAll('.gallery-item');
        allGalleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.1) rotate(0deg)';
                item.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.2)';
                item.style.zIndex = '10';
                item.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                // 如果是爱心位置的图片，恢复旋转角度
                if (item.classList.contains('heart-position-1')) item.style.transform = 'scale(1) rotate(-10deg)';
                else if (item.classList.contains('heart-position-2')) item.style.transform = 'scale(1) rotate(5deg)';
                else if (item.classList.contains('heart-position-3')) item.style.transform = 'scale(1) rotate(-5deg)';
                else if (item.classList.contains('heart-position-4')) item.style.transform = 'scale(1) rotate(10deg)';
                else if (item.classList.contains('heart-position-5')) item.style.transform = 'scale(1) rotate(2deg)';
                else if (item.classList.contains('heart-position-6')) item.style.transform = 'scale(1) rotate(-8deg)';
                else if (item.classList.contains('heart-position-7')) item.style.transform = 'scale(1) rotate(7deg)';
                else if (item.classList.contains('heart-position-8')) item.style.transform = 'scale(1) rotate(-3deg)';
                else if (item.classList.contains('heart-position-9')) item.style.transform = 'scale(1) rotate(4deg)';
                else if (item.classList.contains('heart-position-10')) item.style.transform = 'scale(1) rotate(-6deg)';
                else if (item.classList.contains('heart-position-11')) item.style.transform = 'scale(1) rotate(8deg)';
                else if (item.classList.contains('heart-position-12')) item.style.transform = 'scale(1) rotate(-4deg)';
                else if (item.classList.contains('heart-position-13')) item.style.transform = 'scale(1) rotate(3deg)';
                else if (item.classList.contains('heart-position-14')) item.style.transform = 'scale(1) rotate(-5deg)';
                else if (item.classList.contains('heart-position-15')) item.style.transform = 'scale(1) rotate(6deg)';
                else if (item.classList.contains('heart-position-16')) item.style.transform = 'scale(1) rotate(-7deg)';
                else if (item.classList.contains('heart-position-17')) item.style.transform = 'scale(1) rotate(5deg)';
                else if (item.classList.contains('heart-position-18')) item.style.transform = 'scale(1) rotate(-2deg)';
                else if (item.classList.contains('heart-position-19')) item.style.transform = 'scale(1) rotate(4deg)';
                else if (item.classList.contains('heart-position-20')) item.style.transform = 'scale(1) rotate(-4deg)';
                else item.style.transform = 'scale(1)';
                
                item.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                item.style.zIndex = '5';
            });
        });
    });
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 初始化生日庆祝功能
    initBirthdayCake();
    initBirthdayWishes();
    initBirthdayWall();
    
    // 为回忆问答游戏按钮添加点击事件
    const startQuizButton = document.getElementById('start-quiz');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', startMemoryQuiz);
    }
    
    // 为下一题按钮添加点击事件
    const nextQuestionButton = document.getElementById('next-question');
    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', nextQuestion);
    }
});