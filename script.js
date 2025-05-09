// 移动端菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    // 检测设备类型
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // 为移动设备添加提示
    if (isMobile && document.querySelector('.table-responsive')) {
        const tableHint = document.createElement('div');
        tableHint.className = 'mobile-table-hint';
        tableHint.innerHTML = '← 左右滑动查看完整表格 →';
        tableHint.style.textAlign = 'center';
        tableHint.style.fontSize = '14px';
        tableHint.style.color = '#636e72';
        tableHint.style.padding = '5px 0';
        tableHint.style.backgroundColor = 'rgba(255,255,255,0.9)';
        
        const tableResponsive = document.querySelector('.table-responsive');
        tableResponsive.insertBefore(tableHint, tableResponsive.firstChild);
        
        // 5秒后淡出提示
        setTimeout(() => {
            tableHint.style.transition = 'opacity 1s ease';
            tableHint.style.opacity = '0';
        }, 5000);
    }

    // 增强所有页面的地图跳转功能
    // 1. 通用地图跳转函数
    function openAmapLocation(locationName, coordinates) {
        // 如果没有提供坐标，使用地名进行搜索
        if (!coordinates) {
            window.open(`https://uri.amap.com/search?keyword=${encodeURIComponent(locationName)}&src=mypage`);
            return;
        }
        
        // 移动设备尝试打开APP
        if (isMobile) {
            let mapUrl;
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // iOS设备
                mapUrl = `iosamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(locationName)}&lat=${coordinates.split(',')[1]}&lon=${coordinates.split(',')[0]}&dev=0`;
            } else {
                // Android设备
                mapUrl = `androidamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(locationName)}&lat=${coordinates.split(',')[1]}&lon=${coordinates.split(',')[0]}&dev=0`;
            }
            
            // 添加提示信息
            const mapOpenHint = document.createElement('div');
            mapOpenHint.className = 'map-open-hint';
            mapOpenHint.textContent = '正在打开高德地图...';
            mapOpenHint.style.position = 'fixed';
            mapOpenHint.style.top = '50%';
            mapOpenHint.style.left = '50%';
            mapOpenHint.style.transform = 'translate(-50%, -50%)';
            mapOpenHint.style.padding = '10px 20px';
            mapOpenHint.style.backgroundColor = 'rgba(0,0,0,0.7)';
            mapOpenHint.style.color = 'white';
            mapOpenHint.style.borderRadius = '30px';
            mapOpenHint.style.zIndex = '1000';
            document.body.appendChild(mapOpenHint);
            
            // 尝试打开APP
            window.location.href = mapUrl;
            
            // 设置延时，如果APP未打开，则跳转到网页版
            setTimeout(function() {
                window.location.href = `https://uri.amap.com/marker?position=${coordinates}&name=${encodeURIComponent(locationName)}`;
                document.body.removeChild(mapOpenHint);
            }, 2000);
        } else {
            // 非移动设备直接打开网页版
            window.open(`https://uri.amap.com/marker?position=${coordinates}&name=${encodeURIComponent(locationName)}`);
        }
    }

    // 2. 为地图页的所有标记添加点击事件
    const mapMarkers = document.querySelectorAll('.map-marker');
    if (mapMarkers.length > 0) {
        const locationCoordinates = {
            // 广州
            '广州塔': '113.330904,23.113901',
            '沙面岛': '113.242513,23.107123',
            '珠江夜游': '113.321503,23.118443',
            '陈家祠': '113.253349,23.130042',
            '上下九步行街': '113.245862,23.12298',
            '北京路步行街': '113.280751,23.123474',
            '广州博物馆': '113.258501,23.124701',
            // 中山
            '孙中山故居': '113.419602,22.466564',
            '孙中山纪念堂': '113.287306,23.135956',
            '翠亨村': '113.418872,22.464925',
            // 深圳
            '深圳世界之窗': '113.979471,22.536728',
            '欢乐谷': '114.058727,22.544511',
            '华强北': '114.093376,22.548414',
            '海上世界': '113.921485,22.479845',
            // 香港
            '维多利亚港': '114.17134,22.293496',
            '尖沙咀海滨长廊': '114.170953,22.2935',
            '星光大道': '114.172826,22.293158',
            '旺角购物区': '114.170141,22.319023',
            '太平山顶': '114.15004,22.271383',
            '凌霄阁摩天台': '114.150085,22.271437',
            '中环': '114.15803,22.281874',
            '兰桂坊': '114.154988,22.280785',
            // 餐厅
            '莲香楼': '113.267279,23.125127',
            '泮溪酒家': '113.270186,23.128995',
            '广州酒家': '113.269941,23.119395',
            '翠亨邨餐厅': '113.419602,22.466564',
            '南苑酒家': '113.419987,22.467312',
            '世界之窗美食广场': '113.979471,22.536728',
            '深圳湾海鲜餐厅': '113.939456,22.505329',
            // 交通
            '广州南站': '113.269868,22.988416',
            '中山站': '113.399449,22.51997',
            '深圳北站': '114.058414,22.60989',
            '福田口岸': '114.071892,22.522657',
            '罗湖口岸': '114.119841,22.533153'
        };
        
        mapMarkers.forEach(marker => {
            marker.style.cursor = 'pointer';
            
            marker.addEventListener('click', function() {
                const markerId = this.id;
                const locationName = this.querySelector('text').textContent.trim();
                const coordinates = locationCoordinates[locationName] || null;
                
                openAmapLocation(locationName, coordinates);
            });
        });
    }

    // 3. 为所有行程卡片中的景点名称添加点击事件
    const attractionTitles = document.querySelectorAll('.attraction h5');
    if (attractionTitles.length > 0) {
        attractionTitles.forEach(title => {
            title.style.cursor = 'pointer';
            title.style.color = 'var(--primary-color)';
            title.style.textDecoration = 'underline';
            title.style.textDecorationColor = 'transparent';
            title.style.transition = 'all 0.3s ease';
            
            title.addEventListener('mouseover', function() {
                this.style.textDecorationColor = 'var(--primary-color)';
            });
            
            title.addEventListener('mouseout', function() {
                this.style.textDecorationColor = 'transparent';
            });
            
            title.addEventListener('click', function() {
                const locationName = this.textContent.trim();
                const locationCoordinates = {
                    '广州塔（小蛮腰）': '113.330904,23.113901',
                    '沙面岛': '113.242513,23.107123',
                    '珠江夜游': '113.321503,23.118443',
                    '陈家祠': '113.253349,23.130042',
                    '上下九步行街': '113.245862,23.12298',
                    '北京路步行街': '113.280751,23.123474',
                    '广州博物馆': '113.258501,23.124701',
                    '孙中山故居纪念馆': '113.419602,22.466564',
                    '孙中山纪念堂': '113.287306,23.135956',
                    '翠亨村': '113.418872,22.464925',
                    '深圳世界之窗': '113.979471,22.536728',
                    '欢乐谷': '114.058727,22.544511',
                    '华强北': '114.093376,22.548414',
                    '海上世界': '113.921485,22.479845',
                    '维多利亚港': '114.17134,22.293496',
                    '尖沙咀海滨长廊': '114.170953,22.2935',
                    '星光大道': '114.172826,22.293158',
                    '旺角购物区': '114.170141,22.319023',
                    '太平山顶': '114.15004,22.271383',
                    '凌霄阁摩天台': '114.150085,22.271437',
                    '中环': '114.15803,22.281874',
                    '兰桂坊': '114.154988,22.280785'
                };
                
                openAmapLocation(locationName, locationCoordinates[locationName]);
            });
        });
    }

    // 4. 为时间线项目添加高德地图跳转
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            const title = item.querySelector('.timeline-title');
            if (title) {
                title.style.cursor = 'pointer';
                title.style.color = 'var(--primary-color)';
                title.style.transition = 'all 0.3s ease';
                
                title.addEventListener('mouseover', function() {
                    this.style.textDecoration = 'underline';
                });
                
                title.addEventListener('mouseout', function() {
                    this.style.textDecoration = 'none';
                });
                
                title.addEventListener('click', function(e) {
                    e.stopPropagation(); // 防止触发父元素的点击事件
                    const locationName = this.textContent.trim();
                    const markerId = item.getAttribute('data-marker-id');
                    const marker = document.getElementById(markerId);
                    
                    // 如果能找到对应的marker，从marker中获取地点名称
                    let markerLocationName = locationName;
                    if (marker) {
                        const markerText = marker.querySelector('text');
                        if (markerText) {
                            markerLocationName = markerText.textContent.trim();
                        }
                    }
                    
                    // 通过地点名称查找坐标
                    const locationCoordinates = {
                        // 之前定义的坐标...
                    };
                    
                    openAmapLocation(markerLocationName, locationCoordinates[markerLocationName]);
                });
            }
        });
    }

    // 5. 为交通图标添加点击事件
    const transportIcons = document.querySelectorAll('.timeline-transport i');
    if (transportIcons.length > 0) {
        transportIcons.forEach(icon => {
            const transportText = icon.nextSibling;
            if (transportText && transportText.textContent) {
                icon.parentElement.style.cursor = 'pointer';
                
                icon.parentElement.addEventListener('click', function() {
                    const transportType = this.textContent.trim();
                    let searchKeyword = transportType;
                    
                    // 从文本中提取地点名称
                    const transportRegex = /(乘坐|搭乘|前往|到达)(.+?)(站|口岸|机场|码头)/;
                    const match = transportType.match(transportRegex);
                    if (match && match[2]) {
                        searchKeyword = match[2] + match[3];
                    }
                    
                    // 特定交通站点的坐标
                    const transportCoordinates = {
                        '广州南站': '113.269868,22.988416',
                        '广州火车站': '113.258113,23.147784',
                        '中山站': '113.399449,22.51997',
                        '深圳北站': '114.058414,22.60989',
                        '深圳站': '114.117241,22.531894',
                        '福田口岸': '114.071892,22.522657',
                        '罗湖口岸': '114.119841,22.533153',
                        '香港西九龙站': '114.165955,22.304493',
                        '尖沙咀地铁站': '114.172341,22.298648',
                        '中环地铁站': '114.158232,22.281982'
                    };
                    
                    // 搜索相应的交通地点
                    for (const [key, value] of Object.entries(transportCoordinates)) {
                        if (transportType.includes(key)) {
                            openAmapLocation(key, value);
                            return;
                        }
                    }
                    
                    // 如果没有找到具体坐标，则搜索关键词
                    openAmapLocation(searchKeyword);
                });
            }
        });
    }

    // 地图页面交互
    if (document.querySelector('.map-tabs')) {
        const mapTabs = document.querySelectorAll('.map-tab');
        const mapSvgs = document.querySelectorAll('.map-svg');
        const timelines = document.querySelectorAll('.timeline');
        
        // 触摸交互增强
        if (isMobile) {
            const mapSvgContainer = document.querySelector('.map-svg-container');
            if (mapSvgContainer) {
                // 添加移动端提示
                const mapHint = document.createElement('div');
                mapHint.className = 'map-touch-hint';
                mapHint.innerHTML = '使用双指缩放和平移地图 <i class="fas fa-hand-pointer"></i>';
                mapHint.style.position = 'absolute';
                mapHint.style.top = '10px';
                mapHint.style.left = '10px';
                mapHint.style.padding = '5px 10px';
                mapHint.style.backgroundColor = 'rgba(255,255,255,0.8)';
                mapHint.style.borderRadius = '20px';
                mapHint.style.fontSize = '12px';
                mapHint.style.zIndex = '10';
                mapHint.style.pointerEvents = 'none';
                
                mapSvgContainer.appendChild(mapHint);
                
                // 3秒后淡出提示
                setTimeout(() => {
                    mapHint.style.transition = 'opacity 1s ease';
                    mapHint.style.opacity = '0';
                }, 3000);
                
                // 重置缩放按钮更明显
                const resetZoomBtn = document.querySelector('.zoom-reset');
                if (resetZoomBtn) {
                    resetZoomBtn.style.backgroundColor = 'var(--secondary-color)';
                    resetZoomBtn.style.color = 'white';
                }
            }
        }

        mapTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // 移除所有活跃状态
                mapTabs.forEach(t => t.classList.remove('active'));
                mapSvgs.forEach(m => m.style.display = 'none');
                timelines.forEach(t => t.style.display = 'none');

                // 添加当前活跃状态
                tab.classList.add('active');
                mapSvgs[index].style.display = 'block';
                timelines[index].style.display = 'block';
                
                // 重置缩放
                if (typeof resetMapZoom === 'function') {
                    resetMapZoom();
                }
            });
        });

        // 地图筛选功能
        const mapFilters = document.querySelectorAll('.map-filter');
        const mapMarkers = document.querySelectorAll('.map-marker');

        mapFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                if (category === 'all') {
                    // 显示所有标记
                    mapMarkers.forEach(marker => marker.style.display = 'block');
                    
                    // 移除所有活跃状态并激活"全部"
                    mapFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                } else {
                    // 切换当前筛选器的活跃状态
                    this.classList.toggle('active');
                    
                    // 检查是否有任何筛选器处于活跃状态
                    const activeFilters = Array.from(mapFilters).filter(f => f.classList.contains('active'));
                    
                    if (activeFilters.length === 0) {
                        // 如果没有活跃筛选器，显示所有标记并激活"全部"
                        mapMarkers.forEach(marker => marker.style.display = 'block');
                        mapFilters[0].classList.add('active'); // 假设第一个是"全部"
                    } else {
                        // 隐藏"全部"筛选器的活跃状态
                        mapFilters[0].classList.remove('active');
                        
                        // 根据活跃筛选器显示对应标记
                        mapMarkers.forEach(marker => {
                            const markerCategory = marker.getAttribute('data-category');
                            const shouldShow = activeFilters.some(f => f.getAttribute('data-category') === markerCategory);
                            marker.style.display = shouldShow ? 'block' : 'none';
                        });
                    }
                }
            });
        });

        // 地图缩放控制
        const zoomInBtn = document.querySelector('.zoom-in');
        const zoomOutBtn = document.querySelector('.zoom-out');
        const resetBtn = document.querySelector('.zoom-reset');
        const mapSvgContainer = document.querySelector('.map-svg-container');
        let currentScale = 1;
        
        function applyZoom() {
            const activeSvg = document.querySelector('.map-svg[style*="display: block"]');
            if (activeSvg) {
                const svg = activeSvg.querySelector('svg');
                svg.style.transform = `scale(${currentScale})`;
                svg.style.transformOrigin = 'center';
            }
        }
        
        function resetMapZoom() {
            currentScale = 1;
            const allSvgs = document.querySelectorAll('.map-svg svg');
            allSvgs.forEach(svg => {
                svg.style.transform = 'scale(1)';
            });
        }
        
        if (zoomInBtn && zoomOutBtn && resetBtn) {
            zoomInBtn.addEventListener('click', function() {
                currentScale = Math.min(currentScale + 0.1, 2.5); // 限制最大缩放倍数
                applyZoom();
            });
            
            zoomOutBtn.addEventListener('click', function() {
                currentScale = Math.max(currentScale - 0.1, 0.5); // 限制最小缩放倍数
                applyZoom();
            });
            
            resetBtn.addEventListener('click', function() {
                resetMapZoom();
                // 重置滚动位置
                const activeSvg = document.querySelector('.map-svg[style*="display: block"]');
                if (activeSvg) {
                    activeSvg.scrollLeft = 0;
                    activeSvg.scrollTop = 0;
                }
            });
        }
        
        // 为移动设备添加触摸手势支持
        if (isMobile) {
            const activeSvgs = document.querySelectorAll('.map-svg');
            
            activeSvgs.forEach(svg => {
                // 双指缩放功能
                let initialDistance = 0;
                let initialScale = 1;
                
                svg.addEventListener('touchstart', function(e) {
                    if (e.touches.length === 2) {
                        e.preventDefault();
                        initialDistance = getDistance(e.touches[0], e.touches[1]);
                        initialScale = currentScale;
                    }
                }, { passive: false });
                
                svg.addEventListener('touchmove', function(e) {
                    if (e.touches.length === 2) {
                        e.preventDefault();
                        const distance = getDistance(e.touches[0], e.touches[1]);
                        const scale = initialScale * (distance / initialDistance);
                        
                        // 限制缩放范围
                        currentScale = Math.min(Math.max(scale, 0.5), 2.5);
                        applyZoom();
                    }
                }, { passive: false });
                
                function getDistance(touch1, touch2) {
                    return Math.hypot(
                        touch2.clientX - touch1.clientX,
                        touch2.clientY - touch1.clientY
                    );
                }
            });
        }
    }

    // 图鉴页面交互
    if (document.querySelector('.gallery-tabs')) {
        const galleryTabs = document.querySelectorAll('.gallery-tab');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // 移除所有活跃状态
                galleryTabs.forEach(t => t.classList.remove('active'));
                
                // 添加当前活跃状态
                this.classList.add('active');
                
                if (category === 'all') {
                    // 显示所有项目
                    galleryItems.forEach(item => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    });
                } else {
                    // 筛选项目
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === category) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });

        // 景点图片点击预览放大效果
        const galleryImages = document.querySelectorAll('.gallery-img-container');
        
        galleryImages.forEach(imgContainer => {
            imgContainer.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    const overlay = document.createElement('div');
                    overlay.className = 'image-preview-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
                    overlay.style.display = 'flex';
                    overlay.style.alignItems = 'center';
                    overlay.style.justifyContent = 'center';
                    overlay.style.zIndex = '1000';
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';
                    
                    const previewImg = document.createElement('img');
                    previewImg.src = img.src;
                    previewImg.style.maxWidth = '90%';
                    previewImg.style.maxHeight = '90%';
                    previewImg.style.objectFit = 'contain';
                    previewImg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                    previewImg.style.transform = 'scale(0.9)';
                    previewImg.style.transition = 'transform 0.3s ease';
                    
                    overlay.appendChild(previewImg);
                    document.body.appendChild(overlay);
                    
                    // 强制回流后应用过渡效果
                    setTimeout(() => {
                        overlay.style.opacity = '1';
                        previewImg.style.transform = 'scale(1)';
                    }, 50);
                    
                    // 点击关闭预览
                    overlay.addEventListener('click', function() {
                        overlay.style.opacity = '0';
                        previewImg.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 300);
                    });
                }
            });
        });
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    
                    // 创建一个新的图片对象预加载图片
                    const preloadImg = new Image();
                    preloadImg.onload = function() {
                        image.src = src;
                        image.classList.remove('lazy-load');
                        
                        // 添加淡入效果
                        image.style.opacity = '0';
                        setTimeout(() => {
                            image.style.transition = 'opacity 0.5s ease';
                            image.style.opacity = '1';
                        }, 50);
                        
                        observer.unobserve(image);
                    };
                    preloadImg.onerror = function() {
                        // 图片加载失败时使用占位图
                        image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFOUVDRUYiLz48cGF0aCBkPSJNNzQuNSA4Ny41SDEyNC41VjExMi41SDc0LjVWODcuNVoiIGZpbGw9IiM5OUE0QUYiLz48cGF0aCBkPSJNNzAgNjBIMTMwVjE0MEg3MFY2MFoiIHN0cm9rZT0iIzk5QTRBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTExMCA3MEMxMTUuNTIzIDcwIDEyMCA3NC40NzcyIDEyMCA4MEMxMjAgODUuNTIyOCAxMTUuNTIzIDkwIDExMCA5MEMxMDQuNDc3IDkwIDEwMCA4NS41MjI4IDEwMCA4MEMxMDAgNzQuNDc3MiAxMDQuNDc3IDcwIDExMCA3MFoiIGZpbGw9IiM5OUE0QUYiLz48L3N2Zz4=';
                        image.classList.remove('lazy-load');
                        observer.unobserve(image);
                    };
                    preloadImg.src = src;
                }
            });
        }, {
            rootMargin: '200px 0px' // 提前200px加载
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 不支持IntersectionObserver的浏览器回退方案
        function lazyLoad() {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                    const src = img.getAttribute('data-src');
                    img.src = src;
                    img.classList.remove('lazy-load');
                }
            });
        }
        
        // 初始加载
        lazyLoad();
        
        // 滚动时加载
        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
}); 