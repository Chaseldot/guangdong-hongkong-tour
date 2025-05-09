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

        // 地图与时间线联动
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                const markerId = this.getAttribute('data-marker-id');
                const marker = document.getElementById(markerId);
                
                // 移除所有活跃时间线项
                timelineItems.forEach(i => i.classList.remove('active'));
                
                // 添加当前活跃状态
                this.classList.add('active');
                
                // 滚动到地图标记位置
                if (marker) {
                    // 使标记突出显示
                    const allMarkers = document.querySelectorAll('.map-marker');
                    allMarkers.forEach(m => {
                        m.style.transition = 'all 0.3s ease';
                        m.style.opacity = '0.4';
                    });
                    
                    marker.style.opacity = '1';
                    marker.style.transform = 'scale(1.1)';
                    
                    // 5秒后恢复所有标记正常显示
                    setTimeout(() => {
                        allMarkers.forEach(m => {
                            m.style.opacity = '1';
                            m.style.transform = 'scale(1)';
                        });
                    }, 5000);
                    
                    // 获取SVG上下文以便正确计算位置
                    const activeSvg = document.querySelector('.map-svg[style*="display: block"]');
                    if (activeSvg) {
                        // 在SVG坐标系中计算标记的位置
                        const markerFirstChild = marker.firstElementChild;
                        if (markerFirstChild && markerFirstChild.tagName.toLowerCase() === 'circle') {
                            const cx = parseFloat(markerFirstChild.getAttribute('cx'));
                            const cy = parseFloat(markerFirstChild.getAttribute('cy'));
                            
                            // 获取SVG视图框
                            const viewBox = activeSvg.querySelector('svg').getAttribute('viewBox').split(' ');
                            const viewBoxWidth = parseFloat(viewBox[2]);
                            const viewBoxHeight = parseFloat(viewBox[3]);
                            
                            // 计算缩放比例
                            const svgRect = activeSvg.querySelector('svg').getBoundingClientRect();
                            const scaleX = svgRect.width / viewBoxWidth;
                            const scaleY = svgRect.height / viewBoxHeight;
                            
                            // 计算中心点偏移
                            const offsetX = (cx * scaleX) - (svgRect.width / 2);
                            const offsetY = (cy * scaleY) - (svgRect.height / 2);
                            
                            // 平滑滚动到标记位置
                            activeSvg.scrollTo({
                                left: offsetX,
                                top: offsetY,
                                behavior: 'smooth'
                            });
                        }
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

        // 景点名称点击事件，在移动端打开高德地图
        const galleryTitles = document.querySelectorAll('.gallery-title a');
        
        galleryTitles.forEach(title => {
            title.addEventListener('click', function(e) {
                // 仅在移动设备上执行
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    const locationName = this.textContent;
                    const locationCoords = this.getAttribute('data-coords');
                    
                    // 尝试打开高德地图APP
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                        // 构建高德地图APP链接
                        let mapUrl;
                        
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            // iOS设备
                            mapUrl = `iosamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(locationName)}&lat=${locationCoords.split(',')[1]}&lon=${locationCoords.split(',')[0]}&dev=0`;
                        } else {
                            // Android设备
                            mapUrl = `androidamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(locationName)}&lat=${locationCoords.split(',')[1]}&lon=${locationCoords.split(',')[0]}&dev=0`;
                        }
                        
                        // 尝试打开APP
                        window.location.href = mapUrl;
                        
                        // 添加提示信息
                        const mapOpenHint = document.createElement('div');
                        mapOpenHint.className = 'map-open-hint';
                        mapOpenHint.textContent = '正在打开地图...';
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
                        
                        // 设置延时，如果APP未打开，则跳转到网页版
                        setTimeout(function() {
                            window.location.href = `https://uri.amap.com/marker?position=${locationCoords}&name=${encodeURIComponent(locationName)}`;
                            document.body.removeChild(mapOpenHint);
                        }, 2000);
                    } else {
                        // 非移动设备直接打开网页版
                        window.open(`https://uri.amap.com/marker?position=${locationCoords}&name=${encodeURIComponent(locationName)}`);
                    }
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