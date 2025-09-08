# 爱情纪念日网站

一个精心设计的爱情纪念日网站，用于记录和庆祝爱情的美好时光。预览效果:https://hcb2073288060.github.io/HCB-807/

## 功能特点

✨ **精美的视觉效果** - 采用现代化设计风格，搭配优雅的动画和过渡效果

🎵 **背景音乐系统** - 右下角设计了美观的音乐播放器，支持点击播放/暂停控制

📸 **照片墙展示** - 可以上传和展示情侣的珍贵照片回忆

📊 **爱情统计** - 实时显示相爱天数、小时数、分钟数和秒数

🎁 **爱情里程碑** - 记录爱情中的重要时刻和纪念日

💖 **爱情宣言** - 展示情侣的爱情宣言和誓言

## 快速开始

### 1. 克隆项目

```bash
# 克隆到本地
git clone https://github.com/your-username/love-anniversary.git

# 进入项目目录
cd love-anniversary
```

### 2. 启动服务器

使用Python启动一个简单的HTTP服务器：

```bash
python -m http.server 8080
```

或者使用Node.js的http-server：

```bash
npm install -g http-server
http-server -p 8080
```

### 3. 访问网站

打开浏览器，访问以下地址：
- 本地访问: http://localhost:8080
- 自定义域名: http://HCB_love_807:8080 (需要配置hosts文件)

## 自定义指南

### 修改爱情开始日期

1. 打开 `script.js` 文件
2. 找到 `togetherDate` 变量，修改为你们的爱情开始日期：

```javascript
const togetherDate = new Date('2024-08-26'); // 修改为你们的爱情开始日期
```

### 更换照片内容

1. 打开 `index.html` 文件
2. 在照片墙部分修改 `img` 标签的 `src` 属性和 `gallery-caption` 的内容：

```html
<div class="gallery-item">
    <img src="images/photo1.jpg" alt="爱情回忆">
    <div class="gallery-caption">第一次相遇</div>
</div>
```

### 添加更多照片

在 `gallery-container` 中添加更多的 `gallery-item` 元素：

```html
<div class="gallery-item">
    <img src="images/your-photo.jpg" alt="照片描述">
    <div class="gallery-caption">照片标题</div>
</div>
```

### 修改颜色主题

1. 打开 `style.css` 文件
2. 在 `:root` 部分修改CSS变量的值：

```css
:root {
    --primary-color: #e91e63;
    --secondary-color: #ff4081;
    --accent-color: #4caf50;
    --text-color: #333;
    --light-bg: #f9f9f9;
    /* 其他颜色变量... */
}
```

### 自定义背景音乐

1. 打开 `index.html` 文件
2. 修改 `audio` 标签的 `src` 属性：

```html
<audio id="loveSong" src="你的音乐URL" loop autoplay></audio>
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画效果
- **JavaScript** - 交互功能和动态效果
- **Chart.js** - 数据可视化图表
- **Font Awesome** - 图标库

## 浏览器兼容性

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## 让其他电脑访问网站

如果您希望其他电脑也能访问这个网站，有以下几种方法：

### 方法一：同一局域网内分享

1. 确保您的电脑和其他设备连接在同一个Wi-Fi或局域网下
2. 找到您电脑的局域网IP地址：
   - Windows系统：按Win+R键，输入`cmd`，然后在命令提示符中输入`ipconfig`，找到"IPv4地址"
   - Mac系统：打开终端，输入`ifconfig`，找到"inet"后面的地址
3. 启动本地服务器（如之前所述使用`python -m http.server 8080`）
4. 其他设备打开浏览器，输入`http://您的IP地址:8080`即可访问

### 方法二：使用内网穿透工具（临时分享到互联网）

如果您想让不在同一局域网的朋友也能访问，可以使用内网穿透工具，如ngrok：

1. 访问 https://ngrok.com/ 注册并下载ngrok
2. 解压下载的文件并安装
3. 打开命令行，运行`ngrok http 8080`（确保您的本地服务器已经启动）
4. ngrok会生成一个临时的公开URL（如`https://xxxx-xxxx-xxxx-xxxx.ngrok.io`）
5. 分享这个URL给您的朋友，他们就可以通过互联网访问您的网站

> 注意：ngrok的免费版URL会定期变化，适合临时分享

### 方法三：部署到免费的静态网站托管服务

如果您希望长期稳定地让其他人访问网站，可以部署到免费的静态网站托管服务：

#### 使用GitHub Pages部署

1. 在GitHub上创建一个新的仓库
2. 将您的项目文件上传到这个仓库
3. 进入仓库的"Settings" > "Pages"设置
4. 在"Source"选项中选择一个分支（通常是main或master），然后点击"Save"
5. 几分钟后，您的网站就会发布在`https://您的用户名.github.io/仓库名/`

#### 使用Netlify部署

1. 访问 https://www.netlify.com/ 注册并登录
2. 点击"Add new site" > "Import an existing project"
3. 选择您的Git仓库（GitHub、GitLab等）
4. 按照提示完成部署设置
5. 部署成功后，您的网站会有一个自动生成的URL（也可以绑定自定义域名）

## 注意事项

1. 请确保您的浏览器支持现代JavaScript和CSS特性
2. 如果页面加载缓慢，可能是由于图片资源过多或网络问题
3. 在生产环境中，请考虑优化图片大小和使用CDN加速
4. 背景音乐可能会被某些浏览器的自动播放策略阻止，需要用户交互后才能播放

## 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

💖 愿爱情长久，幸福美满！ 💖
